'use strict';

/**
 * renderer.js — Motor de renderizado visual del Rig
 * Genera el HTML+SVG para cada bloque, incluyendo perillas circulares
 * con arcos que replican la estética de la interfaz M-VAVE EFCS.
 *
 * Matemática del arco SVG:
 *  - Los ángulos se miden en sentido horario desde las 12 en punto.
 *  - Posición mínima (valor=0): 7:30 = 225°
 *  - Posición máxima (valor=100): 4:30 = 135° (225+270=495°≡135°)
 *  - Recorrido total: 270°
 */

window.MVave = window.MVave || {};
var MVave = window.MVave;

MVave.Renderer = {

  /* ── Utilidades de arco SVG ─────────────────────────── */

  /**
   * Convierte ángulo (horario desde 12) a coordenadas SVG cartesianas.
   */
  _polar(cx, cy, r, deg) {
    const rad = (deg - 90) * Math.PI / 180;
    return {
      x: +(cx + r * Math.cos(rad)).toFixed(3),
      y: +(cy + r * Math.sin(rad)).toFixed(3),
    };
  },

  /**
   * Construye el atributo "d" de un arco SVG.
   * @param {number} cx       Centro X
   * @param {number} cy       Centro Y
   * @param {number} r        Radio
   * @param {number} startDeg Ángulo inicial (horario desde 12)
   * @param {number} sweepDeg Barrido en grados
   */
  buildArcPath(cx, cy, r, startDeg, sweepDeg) {
    if (sweepDeg < 0.5) {
      // Arco mínimo para indicar posición de cero
      const p1 = this._polar(cx, cy, r, startDeg);
      const p2 = this._polar(cx, cy, r, startDeg + 1);
      return `M ${p1.x} ${p1.y} A ${r} ${r} 0 0 1 ${p2.x} ${p2.y}`;
    }
    const clamped = Math.min(sweepDeg, 269.9);
    const start   = this._polar(cx, cy, r, startDeg);
    const end     = this._polar(cx, cy, r, startDeg + clamped);
    const large   = clamped > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`;
  },

  /* ── Formateador visual de texto de perilla (maneja Hz y kHz para CAB) ── */
  _formatKnobDisplay(blockName, controlName, value) {
    if (blockName === 'CAB') {
      if (controlName === 'Low Cut') {
        // En M-VAVE: rango 20Hz a 300Hz (lineal 0..100 -> 20..300)
        // O si el valor almacenado ya es directamente la posición 0..100
        const hz = Math.round(20 + (value / 100) * (300 - 20));
        return `${hz}`;
      }
      if (controlName === 'High Cut') {
        // En M-VAVE: rango 18.0k a 5.0k (al revés: 100% = 18.0K abierto, 0% = 5.0K cerrado)
        const khz = (5.0 + (value / 100) * (18.0 - 5.0)).toFixed(1);
        return `${khz}K`;
      }
    }
    return `${value}`;
  },

  /* ── Generador de perilla SVG ───────────────────────── */

  /**
   * Genera el HTML de una perilla circular individual.
   * @param {number} value       Valor actual (0-100)
   * @param {string} label       Nombre del parámetro
   * @param {string} color       Color del bloque (hex)
   * @param {number} min         Mínimo del rango
   * @param {number} max         Máximo del rango
   * @param {string} blockName   Nombre del bloque (data-block)
   * @param {string} controlName Nombre del control (data-control)
   */
  _knob(value, label, color, min = 0, max = 100, blockName, controlName) {
    const v  = Math.max(min, Math.min(max, Math.round(value)));
    const pct = (v - min) / (max - min);
    const sweep = pct * 270;

    const cx = 40, cy = 40, r = 27;
    const trackPath = this.buildArcPath(cx, cy, r, 225, 270);
    const valuePath = this.buildArcPath(cx, cy, r, 225, sweep);
    const displayText = this._formatKnobDisplay(blockName, controlName, v);
    const fontSize = displayText.length >= 5 ? '11' : (displayText.length >= 4 ? '12.5' : '14');

    return `<div class="knob-wrapper" title="${label}: ${displayText} (${v}%)">
      <svg class="knob"
           viewBox="0 0 80 80"
           data-block="${blockName}"
           data-control="${controlName}"
           data-value="${v}"
           data-min="${min}"
           data-max="${max}"
           aria-label="${label} ${displayText}">
        <circle cx="${cx}" cy="${cy}" r="36.5" fill="#0c0f16" stroke="#1b2235" stroke-width="1.5"/>
        <path class="knob-track"
              d="${trackPath}"
              fill="none" stroke="#1e2a3d" stroke-width="7" stroke-linecap="round"/>
        <path class="knob-value-arc"
              d="${valuePath}"
              fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round"/>
        <circle cx="${cx}" cy="${cy}" r="20" fill="#13161f"/>
        <text class="knob-value-text"
              x="${cx}" y="${cy + 5.5}"
              text-anchor="middle"
              fill="#f1f5fb"
              font-size="${fontSize}"
              font-weight="600"
              font-family="Inter,-apple-system,sans-serif">${displayText}</text>
        <circle class="knob-hitarea" cx="${cx}" cy="${cy}" r="36.5" fill="transparent" style="cursor:ns-resize"/>
      </svg>
      <span class="knob-label">${label}</span>
    </div>`;
  },

  /* ── Fila de perillas de un bloque ─────────────────── */

  _knobsRow(blockName, controls, schemaControls) {
    const color = MVave.BLOCK_COLORS[blockName];
    const html = Object.entries(controls).map(([ctrl, val]) => {
      const schema = schemaControls[ctrl];
      const [mn, mx] = schema?.range || [0, 100];
      return this._knob(val, ctrl, color, mn, mx, blockName, ctrl);
    }).join('');
    return `<div class="knobs-row">${html}</div>`;
  },

  /* ── Select de algoritmo / modelo ──────────────────── */

  _algoSelect(blockName, current, options) {
    const opts = options.map(o =>
      `<option value="${o}"${o === current ? ' selected' : ''}>${o}</option>`
    ).join('');
    return `<select class="block-algo-select" data-block="${blockName}" aria-label="Algoritmo ${blockName}">${opts}</select>`;
  },

  _modelSelect(blockName, currentIdx, models) {
    const opts = models.map(m =>
      `<option value="${m.index}"${m.index === currentIdx ? ' selected' : ''}>${m.gui_label}</option>`
    ).join('');
    return `<select class="block-algo-select" data-block="${blockName}" aria-label="Modelo ${blockName}">${opts}</select>`;
  },

  /* ── Encabezado de bloque ───────────────────────────── */

  _blockHeader(blockName, data, index = 0) {
    const color    = MVave.BLOCK_COLORS[blockName];
    const isActive = data.status === 'active';
    const hw       = MVave.HARDWARE.mVavePocketAmp.dsp_architecture.blocks[blockName];

    let selectorHTML = '';
    let subtitleHTML = '';

    if (blockName === 'AMP') {
      selectorHTML = this._modelSelect(blockName, data.model_index, hw.models);
      subtitleHTML = `<span class="block-subtitle">${this._esc(data.emulation || '')}</span>`;
    } else if (blockName === 'CAB') {
      selectorHTML = this._modelSelect(blockName, data.model_index, hw.models);
      subtitleHTML = `<span class="block-subtitle">${this._esc(data.emulation || '')}${data.specs ? ' · ' + data.specs : ''}</span>`;
    } else {
      const algos = Object.keys(hw.algorithms);
      selectorHTML = this._algoSelect(blockName, data.algorithm, algos);
    }

    const toggleColor = isActive ? `style="--toggle-color:${color}"` : '';
    const iconImg = `<img src="ICONOS/${blockName}.svg" class="block-header-icon" alt="${blockName}" width="28" height="28">`;

    return `<div class="block-header">
      <div class="block-label-area">
        <span class="chain-step-badge" title="Paso ${index + 1} de la cadena de señal">${index + 1}</span>
        ${iconImg}
        <span class="block-badge" style="color:${color};border-color:${color}28;background:${color}18">${blockName}</span>
        ${selectorHTML}
      </div>
      <div class="block-header-right">
        ${subtitleHTML}
        <span class="bypass-indicator${isActive ? ' hidden' : ''}">BYPASS</span>
        <label class="toggle-switch" title="${isActive ? 'Clic para poner en bypass' : 'Clic para activar'}">
          <input type="checkbox" class="block-toggle-input" data-block="${blockName}"${isActive ? ' checked' : ''}>
          <span class="toggle-track" ${toggleColor}></span>
        </label>
      </div>
    </div>`;
  },

  /* ── Bloque completo ────────────────────────────────── */

  renderBlock(blockName, data, index = 0) {
    const hw = MVave.HARDWARE.mVavePocketAmp.dsp_architecture.blocks[blockName];
    const isActive = data.status === 'active';

    const schemaControls = (blockName === 'AMP')
      ? hw.controls
      : (blockName === 'CAB')
        ? hw.controls
        : (MVave.getAlgorithmControls(blockName, data.algorithm) || {});

    const header    = this._blockHeader(blockName, data, index);
    const knobsHTML = this._knobsRow(blockName, data.controls, schemaControls);
    const bypassCls = isActive ? '' : 'block-bypass';

    return `<div class="rig-block ${bypassCls}" data-block="${blockName}" style="--bc:${MVave.BLOCK_COLORS[blockName]}">
      ${header}
      <div class="block-knobs-area">
        ${knobsHTML}
      </div>
    </div>`;
  },

  /* ── Iconos SVG exactos de cada bloque (estilo M-VAVE EFCS) ── */
  _getBlockIcon(blockName, color) {
    switch (blockName) {
      case 'FX':
        // Icono circular dentado / ondulado (como en la app M-VAVE)
        return `<svg viewBox="0 0 40 40" class="chain-icon-svg" stroke="${color}" fill="none" stroke-width="2">
          <path d="M20 5 C22 8 26 8 28 6 C30 8 32 11 34 11 C35 13 37 16 36 18 C37 20 37 23 35 25 C35 27 33 29 31 31 C29 32 27 34 25 34 C23 35 20 35 18 34 C16 34 13 33 11 31 C9 29 8 26 8 24 C7 22 7 19 8 17 C9 15 10 12 12 11 C14 10 16 7 18 6 Z"/>
        </svg>`;
      case 'AMP':
        // Icono cabezal de amplificador con perillas (4 puntos)
        return `<svg viewBox="0 0 40 40" class="chain-icon-svg" fill="${color}">
          <circle cx="12" cy="20" r="3.5"/>
          <circle cx="18" cy="20" r="2.2"/>
          <circle cx="23" cy="20" r="2.2"/>
          <circle cx="28" cy="20" r="2.2"/>
        </svg>`;
      case 'CAB':
        // Icono gabinete de altavoces (2 conos verticales)
        return `<svg viewBox="0 0 40 40" class="chain-icon-svg" stroke="${color}" fill="none" stroke-width="2">
          <rect x="11" y="7" width="18" height="26" rx="4"/>
          <circle cx="20" cy="14" r="2.8" fill="${color}"/>
          <circle cx="20" cy="24" r="4.2" fill="${color}"/>
        </svg>`;
      case 'MOD':
        // Icono dos círculos entrelazados (Chorus / Flanger)
        return `<svg viewBox="0 0 40 40" class="chain-icon-svg" stroke="${color}" fill="none" stroke-width="2">
          <circle cx="16" cy="20" r="8"/>
          <circle cx="24" cy="20" r="8"/>
        </svg>`;
      case 'REV':
        // Icono círculos concéntricos punteados (Reverb)
        return `<svg viewBox="0 0 40 40" class="chain-icon-svg" stroke="${color}" fill="none" stroke-width="2">
          <circle cx="20" cy="20" r="3" fill="${color}"/>
          <circle cx="20" cy="20" r="6.5" stroke-dasharray="2 2"/>
          <circle cx="20" cy="20" r="10.5" stroke-dasharray="2 3"/>
        </svg>`;
      case 'DLY':
        // Icono repeticiones consecutivas punteadas (Delay)
        return `<svg viewBox="0 0 40 40" class="chain-icon-svg" stroke="${color}" fill="none" stroke-width="2">
          <circle cx="13" cy="20" r="7"/>
          <circle cx="21" cy="20" r="5.5" stroke-dasharray="2 2"/>
          <circle cx="27" cy="20" r="4" stroke-dasharray="1.5 2"/>
        </svg>`;
      default:
        return '';
    }
  },

  /**
   * Renderiza la barra visual horizontal idéntica a la app M-VAVE
   * con flechas indicando el flujo de la señal de izquierda a derecha.
   */
  renderSignalChainBar(chain, preset) {
    const barEl = document.getElementById('signal-chain-bar');
    if (!barEl) return;

    const html = chain.map((blockName, idx) => {
      const color    = MVave.BLOCK_COLORS[blockName];
      const isActive = preset[blockName]?.status === 'active';
      const arrowSvg = idx < chain.length - 1
        ? `<div class="chain-arrow">
            <svg viewBox="0 0 16 16" fill="currentColor"><path d="M6 3l5 5-5 5z"/></svg>
           </div>`
        : '';

      return `
        <div class="chain-node ${isActive ? 'chain-node--active' : 'chain-node--bypass'}"
             data-block="${blockName}"
             style="--node-color:${color}"
             title="${blockName}: ${isActive ? 'Activo' : 'Bypass'} (clic para alternar)">
          <div class="chain-node-box">
            <img src="ICONOS/${blockName}.svg" class="chain-icon-svg" alt="${blockName}">
          </div>
          <span class="chain-node-label">${blockName}</span>
        </div>
        ${arrowSvg}
      `;
    }).join('');

    barEl.innerHTML = html;
  },

  /* ── Rig completo ───────────────────────────────────── */

  renderRig(preset) {
    const chain = Array.isArray(preset.signal_chain) && preset.signal_chain.length === 6
      ? preset.signal_chain
      : MVave.DEFAULT_SIGNAL_CHAIN;

    // Actualizar barra de iconos de señal
    this.renderSignalChainBar(chain, preset);

    // Renderizar los 6 bloques en el orden exacto de la cadena
    return chain
      .map((b, idx) => this.renderBlock(b, preset[b], idx))
      .join('');
  },

  /* ── Actualizar arco de una perilla en DOM ──────────── */

  /**
   * Actualiza visualmente el arco y texto de una perilla SVG.
   * @param {SVGElement} svgEl   El elemento <svg class="knob">
   * @param {number}     newVal  Nuevo valor
   * @returns {number}           Valor clampeado efectivo
   */
  updateKnobArc(svgEl, newVal) {
    const min = parseInt(svgEl.dataset.min, 10);
    const max = parseInt(svgEl.dataset.max, 10);
    const v   = Math.max(min, Math.min(max, Math.round(newVal)));
    const pct = (v - min) / (max - min);

    const arcEl  = svgEl.querySelector('.knob-value-arc');
    const textEl = svgEl.querySelector('.knob-value-text');
    const blockName = svgEl.dataset.block;
    const controlName = svgEl.dataset.control;
    const displayText = this._formatKnobDisplay(blockName, controlName, v);

    if (arcEl)  arcEl.setAttribute('d', this.buildArcPath(40, 40, 27, 225, pct * 270));
    if (textEl) {
      textEl.textContent = displayText;
      const fontSize = displayText.length >= 5 ? '11' : (displayText.length >= 4 ? '12.5' : '14');
      textEl.setAttribute('font-size', fontSize);
    }

    svgEl.dataset.value = v;
    const wrapper = svgEl.closest('.knob-wrapper');
    if (wrapper) wrapper.title = `${controlName}: ${displayText} (${v}%)`;

    return v;
  },

  /**
   * Re-renderiza solo la fila de perillas de un bloque tras cambiar algoritmo.
   */
  rerenderKnobs(blockName, algorithm, controls) {
    const blockEl   = document.querySelector(`.rig-block[data-block="${blockName}"]`);
    const knobsArea = blockEl?.querySelector('.block-knobs-area');
    if (!knobsArea) return;

    const hw  = MVave.HARDWARE.mVavePocketAmp.dsp_architecture.blocks[blockName];
    const schemaCtrls = (blockName === 'AMP')
      ? hw.controls
      : (blockName === 'CAB')
        ? hw.controls
        : (MVave.getAlgorithmControls(blockName, algorithm) || {});

    knobsArea.innerHTML = this._knobsRow(blockName, controls, schemaCtrls);
  },

  _esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  },
};
