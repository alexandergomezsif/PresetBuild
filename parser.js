'use strict';

/**
 * parser.js — Parser tolerante de respuestas de IA
 * Extrae JSON de texto libre (con markdown, explicaciones, etc.),
 * valida la estructura y sanitiza todos los valores contra el hardware real.
 */

window.MVave = window.MVave || {};
var MVave = window.MVave;

MVave.Parser = {

  /**
   * Extrae y parsea un JSON de preset desde texto libre de IA.
   * @param {string} text  Texto crudo de la respuesta de la IA
   * @returns {object}     Preset sanitizado y validado
   * @throws {Error}       Si no se puede extraer un JSON válido
   */
  parseAIResponse(text) {
    if (!text || typeof text !== 'string' || !text.trim()) {
      throw new Error('El campo está vacío. Pega la respuesta de la IA primero.');
    }

    let jsonStr = null;

    // Estrategia 1: Bloque ```json ... ```
    const m1 = text.match(/```json\s*([\s\S]*?)```/i);
    if (m1) jsonStr = m1[1].trim();

    // Estrategia 2: Bloque ``` ... ``` (sin etiqueta de lenguaje)
    if (!jsonStr) {
      const m2 = text.match(/```\s*([\s\S]*?)```/);
      if (m2 && m2[1].trim().startsWith('{')) {
        jsonStr = m2[1].trim();
      }
    }

    // Estrategia 3: Todo el texto como JSON (si empieza con '{')
    if (!jsonStr && text.trim().startsWith('{')) {
      jsonStr = text.trim();
    }

    // Estrategia 4: Extraer el mayor bloque { ... } del texto
    if (!jsonStr) {
      const first = text.indexOf('{');
      const last  = text.lastIndexOf('}');
      if (first !== -1 && last > first) {
        jsonStr = text.substring(first, last + 1);
      }
    }

    if (!jsonStr) {
      throw new Error(
        'No se encontró un JSON en la respuesta. ' +
        'Asegúrate de que la IA haya respondido en el formato JSON solicitado.'
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (err) {
      throw new Error(
        `El JSON encontrado tiene errores de sintaxis: ${err.message}. ` +
        'Prueba pedirle a la IA que solo devuelva el JSON sin texto adicional.'
      );
    }

    return this.sanitizePreset(parsed);
  },

  /**
   * Valida y sanitiza un objeto de preset.
   * Rellena campos faltantes con valores seguros y clampea rangos.
   * @param {object} data  Objeto JSON crudo
   * @returns {object}     Preset limpio y completo
   */
  sanitizePreset(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('El JSON parseado no es un objeto válido.');
    }

    // Si viene de un archivo exportado (con campo "data" envolvente)
    if (data.data && typeof data.data === 'object') {
      data = data.data;
    }

    // Sanitizar signal_chain
    let chain = Array.isArray(data.signal_chain) ? data.signal_chain : [];
    const validBlocks = ['FX', 'AMP', 'CAB', 'MOD', 'REV', 'DLY'];
    chain = chain.filter(b => validBlocks.includes(b));
    // Completar los que falten preservando orden por defecto
    validBlocks.forEach(b => {
      if (!chain.includes(b)) chain.push(b);
    });

    return {
      preset_meta: this._sanitizeMeta(data.preset_meta),
      signal_chain: chain,
      FX:  this._sanitizeFX(data.FX),
      AMP: this._sanitizeAMP(data.AMP),
      CAB: this._sanitizeCAB(data.CAB),
      MOD: this._sanitizeMOD(data.MOD),
      REV: this._sanitizeREV(data.REV),
      DLY: this._sanitizeDLY(data.DLY),
    };
  },

  /* ── Helpers internos ─────────────────────────────── */

  _sanitizeMeta(meta) {
    return {
      artist: meta?.artist || 'Desconocido',
      song:   meta?.song   || 'Sin título',
      notes:  meta?.notes  || '',
    };
  },

  _status(raw) {
    if (typeof raw === 'string' && raw.toLowerCase().includes('bypass')) return 'bypass';
    return 'active';
  },

  _clamp(val, min, max) {
    const n = Math.round(parseFloat(val));
    return isNaN(n) ? Math.round((min + max) / 2) : Math.max(min, Math.min(max, n));
  },

  _sanitizeControls(provided, schemaControls) {
    const result = {};
    for (const [key, def] of Object.entries(schemaControls)) {
      const [mn, mx] = def.range;
      result[key] = this._clamp(provided?.[key] ?? 50, mn, mx);
    }
    return result;
  },

  _sanitizeFX(data) {
    const algos   = MVave.HARDWARE.mVavePocketAmp.dsp_architecture.blocks.FX.algorithms;
    const validKeys = Object.keys(algos);
    const algorithm = validKeys.includes(data?.algorithm) ? data.algorithm : 'Noise Gate';
    return {
      status: this._status(data?.status),
      algorithm,
      controls: this._sanitizeControls(data?.controls, algos[algorithm].controls),
    };
  },

  _sanitizeAMP(data) {
    const hw = MVave.HARDWARE.mVavePocketAmp.dsp_architecture.blocks.AMP;
    let idx = parseInt(data?.model_index, 10);
    if (isNaN(idx) || idx < 1 || idx > 20) idx = 1;
    const model = hw.models.find(m => m.index === idx) || hw.models[0];
    return {
      status:    this._status(data?.status),
      model_index: model.index,
      gui_label:   model.gui_label,
      emulation:   model.emulation,
      type:        model.type,
      controls:    this._sanitizeControls(data?.controls, hw.controls),
    };
  },

  _sanitizeCAB(data) {
    const hw = MVave.HARDWARE.mVavePocketAmp.dsp_architecture.blocks.CAB;
    let idx = parseInt(data?.model_index, 10);
    if (isNaN(idx) || idx < 1 || idx > 20) idx = 2;
    const model = hw.models.find(m => m.index === idx) || hw.models[1];
    return {
      status:    this._status(data?.status),
      model_index: model.index,
      gui_label:   model.gui_label,
      emulation:   model.emulation,
      specs:       model.specs,
      controls:    this._sanitizeControls(data?.controls, hw.controls),
    };
  },

  _sanitizeMOD(data) {
    const algos     = MVave.HARDWARE.mVavePocketAmp.dsp_architecture.blocks.MOD.algorithms;
    const validKeys = Object.keys(algos);
    const algorithm = validKeys.includes(data?.algorithm) ? data.algorithm : 'Chorus';
    return {
      status: this._status(data?.status),
      algorithm,
      controls: this._sanitizeControls(data?.controls, algos[algorithm].controls),
    };
  },

  _sanitizeREV(data) {
    const algos     = MVave.HARDWARE.mVavePocketAmp.dsp_architecture.blocks.REV.algorithms;
    const validKeys = Object.keys(algos);
    const algorithm = validKeys.includes(data?.algorithm) ? data.algorithm : 'Room';
    return {
      status: this._status(data?.status),
      algorithm,
      controls: this._sanitizeControls(data?.controls, algos[algorithm].controls),
    };
  },

  _sanitizeDLY(data) {
    const algos     = MVave.HARDWARE.mVavePocketAmp.dsp_architecture.blocks.DLY.algorithms;
    const validKeys = Object.keys(algos);
    const algorithm = validKeys.includes(data?.algorithm) ? data.algorithm : 'Analog';
    return {
      status: this._status(data?.status),
      algorithm,
      controls: this._sanitizeControls(data?.controls, algos[algorithm].controls),
    };
  },
};
