'use strict';

/**
 * bkx.js — Generador y Parser Binario .bkx para M-VAVE Pocket Amp
 * 
 * Basado en la ingeniería inversa del archivo binario nativo de 92 bytes:
 * - 0x00..0x01: Magic Header [0x3C, 0x00]
 * - 0x02..0x07: Orden de la cadena [0, 1, 2, 3, 4, 5] (o posición personalizada)
 * - 0x08..0x0D: Flags de Bypass/Active [FX, AMP, MOD, DLY, REV, CAB] (1=Active, 0=Bypass)
 * - 0x0E..0x13: ID de Algoritmo/Modelo [FX, AMP, MOD, DLY, REV, CAB] (0-indexados)
 * - 0x14..0x1F: Parámetros FX (6 x uint16 LE)
 * - 0x20..0x2B: Parámetros AMP (6 x uint16 LE -> Gain, Level, Bass, Mid, Treble, 0)
 * - 0x2C..0x37: Parámetros MOD (6 x uint16 LE)
 * - 0x38..0x43: Parámetros DLY (6 x uint16 LE)
 * - 0x44..0x4F: Parámetros REV (6 x uint16 LE -> Decay, Mix, HPass, LPass, Depth, 0)
 * - 0x50..0x5B: Parámetros CAB (6 x uint16 LE -> Level, LowCut, HighCut, 0, 0, 0)
 */

window.MVave = window.MVave || {};
var MVave = window.MVave;

MVave.BKX = {
  // Índices mapeados por algoritmo (0-indexados para M-VAVE)
  ALGO_MAP: {
    FX: {
      'Noise Gate': 0,
      'Boost': 1,
      'Compress': 2,
      'AI Ms Gate': 3
    },
    MOD: {
      'Chorus': 0,
      'Phaser': 1,
      'Tremolo': 2,
      'Flanger': 3,
      'Vibrato': 4,
      'Univibe': 5,
      'Autofilter': 6
    },
    DLY: {
      'Analog': 0,
      'Duck': 1,
      'Dtape': 2,
      'Dual': 3,
      'Lofi': 4
    },
    REV: {
      'Room': 0,
      'Hall': 1,
      'Swell': 2,
      'Spring': 3,
      'Shimmer': 4,
      'Cloud': 5
    }
  },

  /**
   * Convierte un objeto preset estándar de la aplicación a un Uint8Array de 92 bytes.
   * @param {Object} preset 
   * @returns {Uint8Array}
   */
  buildBkxBuffer(preset) {
    const buffer = new ArrayBuffer(92);
    const view = new DataView(buffer);
    const bytes = new Uint8Array(buffer);

    // 1. Magic Header [3C, 00]
    bytes[0] = 0x3C;
    bytes[1] = 0x00;

    // 2. Orden de Cadena de Señal dinámica (bytes 2..7)
    const defaultChain = ['FX', 'AMP', 'CAB', 'MOD', 'REV', 'DLY'];
    const chain = Array.isArray(preset.signal_chain) && preset.signal_chain.length === 6
      ? preset.signal_chain
      : defaultChain;

    for (let i = 0; i < 6; i++) {
      const blockName = chain[i];
      bytes[2 + i] = MVave.BLOCK_ID_MAP[blockName] ?? i;
    }

    // 3. Status Active (1) o Bypass (0)
    bytes[8]  = preset.FX?.status  === 'active' ? 1 : 0;
    bytes[9]  = preset.AMP?.status === 'active' ? 1 : 0;
    bytes[10] = preset.MOD?.status === 'active' ? 1 : 0;
    bytes[11] = preset.DLY?.status === 'active' ? 1 : 0;
    bytes[12] = preset.REV?.status === 'active' ? 1 : 0;
    bytes[13] = preset.CAB?.status === 'active' ? 1 : 0;

    // 4. Índices de Algoritmos / Modelos (0-indexados)
    bytes[14] = this.ALGO_MAP.FX[preset.FX?.algorithm] ?? 0;
    bytes[15] = Math.max(0, Math.min(19, (preset.AMP?.model_index ?? 1) - 1));
    bytes[16] = this.ALGO_MAP.MOD[preset.MOD?.algorithm] ?? 0;
    bytes[17] = this.ALGO_MAP.DLY[preset.DLY?.algorithm] ?? 0;
    bytes[18] = this.ALGO_MAP.REV[preset.REV?.algorithm] ?? 0;
    bytes[19] = Math.max(0, Math.min(19, (preset.CAB?.model_index ?? 1) - 1));

    // Helper para escribir hasta 6 uint16 LE por bloque
    const writeSlotValues = (byteOffset, values) => {
      for (let i = 0; i < 6; i++) {
        const val = Math.max(0, Math.min(100, Math.round(values[i] ?? 0)));
        view.setUint16(byteOffset + (i * 2), val, true); // true = Little-Endian
      }
    };

    // 5. Parámetros FX (offset 20)
    // Map dinámico según algoritmo
    const fxAlgo = preset.FX?.algorithm;
    const fxC = preset.FX?.controls || {};
    let fxVals = [50, 0, 0, 0, 0, 0];
    if (fxAlgo === 'Noise Gate') {
      fxVals = [fxC['Gate'] ?? 50, 0, 0, 0, 0, 0];
    } else if (fxAlgo === 'Boost') {
      fxVals = [fxC['Gate'] ?? 50, fxC['Gain'] ?? 50, 0, 0, 0, 0];
    } else if (fxAlgo === 'Compress') {
      fxVals = [fxC['Gate'] ?? 50, fxC['Sustain'] ?? 50, fxC['Attack'] ?? 50, fxC['Level'] ?? 50, 0, 0];
    } else if (fxAlgo === 'AI Ms Gate') {
      fxVals = [fxC['Gate'] ?? 50, fxC['Bias'] ?? 50, 0, 0, 0, 0];
    }
    writeSlotValues(20, fxVals);

    // 6. Parámetros AMP (offset 32) -> Gain, Level, Bass, Mid, Treble, 0
    const ampC = preset.AMP?.controls || {};
    writeSlotValues(32, [
      ampC['Gain'] ?? 50,
      ampC['Level'] ?? 70,
      ampC['Bass'] ?? 50,
      ampC['Mid'] ?? 50,
      ampC['Treble'] ?? 50,
      0
    ]);

    // 7. Parámetros MOD (offset 44)
    const modAlgo = preset.MOD?.algorithm;
    const modC = preset.MOD?.controls || {};
    let modVals = [50, 50, 50, 0, 0, 0];
    if (modAlgo === 'Chorus' || modAlgo === 'Univibe') {
      modVals = [modC['Speed'] ?? 25, modC['Depth'] ?? 45, modC['Mix'] ?? 40, 0, 0, 0];
    } else if (modAlgo === 'Phaser') {
      modVals = [modC['Speed'] ?? 50, modC['ParamA'] ?? 50, modC['ParamB'] ?? 50, modC['Fb'] ?? 50, 0, 0];
    } else if (modAlgo === 'Tremolo') {
      modVals = [modC['Speed'] ?? 50, modC['Depth'] ?? 50, modC['Level'] ?? 50, 0, 0, 0];
    } else if (modAlgo === 'Flanger') {
      modVals = [modC['Speed'] ?? 50, modC['Depth'] ?? 50, modC['Fb'] ?? 50, modC['Mix'] ?? 50, 0, 0];
    } else if (modAlgo === 'Vibrato') {
      modVals = [modC['Speed'] ?? 50, modC['Depth'] ?? 50, 0, 0, 0, 0];
    } else if (modAlgo === 'Autofilter') {
      modVals = [modC['Speed'] ?? 50, modC['Min'] ?? 20, modC['Max'] ?? 80, modC['Mix'] ?? 50, modC['Fb'] ?? 20, 0];
    }
    writeSlotValues(44, modVals);

    // 8. Parámetros DLY (offset 56)
    const dlyAlgo = preset.DLY?.algorithm;
    const dlyC = preset.DLY?.controls || {};
    let dlyVals = [43, 20, 12, 0, 0, 0];
    if (dlyAlgo === 'Analog') {
      dlyVals = [dlyC['Time'] ?? 43, dlyC['Fb'] ?? 20, dlyC['Mix'] ?? 12, dlyC['Phaser'] ?? 0, dlyC['Pitch'] ?? 0, 0];
    } else {
      dlyVals = [dlyC['Time'] ?? 43, dlyC['Fb'] ?? 20, dlyC['Mix'] ?? 12, dlyC['Grit'] ?? dlyC['Unpack'] ?? 0, dlyC['Speed'] ?? 0, dlyC['Depth'] ?? 0];
    }
    writeSlotValues(56, dlyVals);

    // 9. Parámetros REV (offset 68) -> Decay, Mix, HPass, LPass, Depth, 0
    const revC = preset.REV?.controls || {};
    writeSlotValues(68, [
      revC['Decay'] ?? 30,
      revC['Mix'] ?? 20,
      revC['HPass'] ?? 80,
      revC['LPass'] ?? 80,
      revC['Depth'] ?? 40,
      0
    ]);

    // 10. Parámetros CAB (offset 80) -> Level, LowCut, HighCut, 0, 0, 0
    const cabC = preset.CAB?.controls || {};
    writeSlotValues(80, [
      cabC['Level'] ?? 75,
      cabC['Low Cut'] ?? 20,
      cabC['High Cut'] ?? 100,
      0, 0, 0
    ]);

    return bytes;
  },

  /**
   * Decodifica un Uint8Array de 92 bytes nativo de M-VAVE a un objeto preset de la app.
   * @param {Uint8Array} bytes 
   * @returns {Object}
   */
  parseBkxBuffer(bytes) {
    if (!bytes || bytes.length < 92) {
      throw new Error('El archivo .bkx debe tener exactamente 92 bytes.');
    }
    if (bytes[0] !== 0x3C || bytes[1] !== 0x00) {
      throw new Error('Cabecera inválida. No parece ser un preset de M-VAVE Pocket Amp.');
    }

    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

    // 1. Decodificar orden de la cadena de señal (bytes 2..7)
    const chain = [];
    for (let i = 0; i < 6; i++) {
      const blockId = bytes[2 + i];
      const blockName = MVave.BLOCK_ID_REVERSE[blockId] || MVave.DEFAULT_SIGNAL_CHAIN[i];
      chain.push(blockName);
    }

    // 2. Flags de Bypass (bytes 8..13) -> [FX, AMP, MOD, DLY, REV, CAB]
    const fxStatus  = bytes[8]  === 1 ? 'active' : 'bypass';
    const ampStatus = bytes[9]  === 1 ? 'active' : 'bypass';
    const modStatus = bytes[10] === 1 ? 'active' : 'bypass';
    const dlyStatus = bytes[11] === 1 ? 'active' : 'bypass';
    const revStatus = bytes[12] === 1 ? 'active' : 'bypass';
    const cabStatus = bytes[13] === 1 ? 'active' : 'bypass';

    // 3. Algoritmos / Modelos (bytes 14..19) -> [FX, AMP, MOD, DLY, REV, CAB]
    const fxIdx  = bytes[14];
    const ampIdx = (bytes[15] ?? 0) + 1; // 1-based
    const modIdx = bytes[16];
    const dlyIdx = bytes[17];
    const revIdx = bytes[18];
    const cabIdx = (bytes[19] ?? 0) + 1; // 1-based

    // Mapas inversos de algoritmos
    const fxAlgos  = ['Noise Gate', 'Boost', 'Compress', 'AI Ms Gate'];
    const modAlgos = ['Chorus', 'Phaser', 'Tremolo', 'Flanger', 'Vibrato', 'Univibe', 'Autofilter'];
    const dlyAlgos = ['Analog', 'Duck', 'Dtape', 'Dual', 'Lofi'];
    const revAlgos = ['Room', 'Hall', 'Swell', 'Spring', 'Shimmer', 'Cloud'];

    const fxAlgo  = fxAlgos[fxIdx]  || 'Noise Gate';
    const modAlgo = modAlgos[modIdx] || 'Chorus';
    const dlyAlgo = dlyAlgos[dlyIdx] || 'Analog';
    const revAlgo = revAlgos[revIdx] || 'Room';

    // Helper para leer 6 uint16 LE
    const readSlot = (byteOffset) => {
      const vals = [];
      for (let i = 0; i < 6; i++) {
        vals.push(view.getUint16(byteOffset + i * 2, true));
      }
      return vals;
    };

    // 4. Parámetros FX (offset 20)
    const fxVals = readSlot(20);
    const fxControls = {};
    if (fxAlgo === 'Noise Gate') {
      fxControls['Gate'] = fxVals[0];
    } else if (fxAlgo === 'Boost') {
      fxControls['Gate'] = fxVals[0];
      fxControls['Gain'] = fxVals[1];
    } else if (fxAlgo === 'Compress') {
      fxControls['Gate'] = fxVals[0];
      fxControls['Sustain'] = fxVals[1];
      fxControls['Attack'] = fxVals[2];
      fxControls['Level'] = fxVals[3];
    } else if (fxAlgo === 'AI Ms Gate') {
      fxControls['Gate'] = fxVals[0];
      fxControls['Bias'] = fxVals[1];
    }

    // 5. Parámetros AMP (offset 32) -> Gain, Level, Bass, Mid, Treble, 0
    const ampVals = readSlot(32);
    const ampModel = MVave.getAmpModel(ampIdx) || { gui_label: `${ampIdx}`, emulation: '' };

    // 6. Parámetros MOD (offset 44)
    const modVals = readSlot(44);
    const modControls = {};
    if (modAlgo === 'Chorus' || modAlgo === 'Univibe') {
      modControls['Speed'] = modVals[0];
      modControls['Depth'] = modVals[1];
      modControls['Mix']   = modVals[2];
    } else if (modAlgo === 'Phaser') {
      modControls['Speed']  = modVals[0];
      modControls['ParamA'] = modVals[1];
      modControls['ParamB'] = modVals[2];
      modControls['Fb']     = modVals[3];
    } else if (modAlgo === 'Tremolo') {
      modControls['Speed'] = modVals[0];
      modControls['Depth'] = modVals[1];
      modControls['Level'] = modVals[2];
    } else if (modAlgo === 'Flanger') {
      modControls['Speed'] = modVals[0];
      modControls['Depth'] = modVals[1];
      modControls['Fb']    = modVals[2];
      modControls['Mix']   = modVals[3];
    } else if (modAlgo === 'Vibrato') {
      modControls['Speed'] = modVals[0];
      modControls['Depth'] = modVals[1];
    } else if (modAlgo === 'Autofilter') {
      modControls['Speed'] = modVals[0];
      modControls['Min']   = modVals[1];
      modControls['Max']   = modVals[2];
      modControls['Mix']   = modVals[3];
      modControls['Fb']    = modVals[4];
    }

    // 7. Parámetros DLY (offset 56)
    const dlyVals = readSlot(56);
    const dlyControls = {
      Time: dlyVals[0],
      Fb:   dlyVals[1],
      Mix:  dlyVals[2]
    };
    if (dlyAlgo === 'Analog') {
      dlyControls['Phaser'] = dlyVals[3];
      dlyControls['Pitch']  = dlyVals[4];
    } else {
      dlyControls['Grit']  = dlyVals[3];
      dlyControls['Speed'] = dlyVals[4];
      dlyControls['Depth'] = dlyVals[5];
    }

    // 8. Parámetros REV (offset 68) -> Decay, Mix, HPass, LPass, Depth, 0
    const revVals = readSlot(68);

    // 9. Parámetros CAB (offset 80) -> Level, LowCut, HighCut, 0, 0, 0
    const cabVals = readSlot(80);
    const cabModel = MVave.getCabModel(cabIdx) || { gui_label: `${cabIdx}`, emulation: '', specs: '' };

    return {
      preset_meta: {
        artist: 'M-VAVE',
        song: 'Importado de Hardware',
        notes: `Cargado desde archivo .bkx nativo`
      },
      signal_chain: chain,
      FX: {
        status: fxStatus,
        algorithm: fxAlgo,
        controls: fxControls
      },
      AMP: {
        status: ampStatus,
        model_index: ampIdx,
        gui_label: ampModel.gui_label,
        emulation: ampModel.emulation,
        controls: {
          Gain: ampVals[0],
          Level: ampVals[1],
          Bass: ampVals[2],
          Mid: ampVals[3],
          Treble: ampVals[4]
        }
      },
      CAB: {
        status: cabStatus,
        model_index: cabIdx,
        gui_label: cabModel.gui_label,
        emulation: cabModel.emulation,
        specs: cabModel.specs,
        controls: {
          Level: cabVals[0],
          'Low Cut': cabVals[1],
          'High Cut': cabVals[2]
        }
      },
      MOD: {
        status: modStatus,
        algorithm: modAlgo,
        controls: modControls
      },
      REV: {
        status: revStatus,
        algorithm: revAlgo,
        controls: {
          Decay: revVals[0],
          Mix: revVals[1],
          HPass: revVals[2],
          LPass: revVals[3],
          Depth: revVals[4]
        }
      },
      DLY: {
        status: dlyStatus,
        algorithm: dlyAlgo,
        controls: dlyControls
      }
    };
  },

  /**
   * Dispara la descarga del archivo .bkx nativo en el navegador.
   * @param {Object} preset 
   * @param {string} filename 
   */
  downloadBkx(preset, filename) {
    const bytes = this.buildBkxBuffer(preset);
    const blob = new Blob([bytes], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (filename || 'Pocket AMP_Preset').replace(/[^\w\s\-]/g, '').trim() + '.bkx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};
