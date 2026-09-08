'use strict';

/**
 * editor.js — Interactividad del Rig Visual
 * Gestiona drag de perillas (mouse + touch), toggle bypass/active
 * y cambio de algoritmos/modelos con re-renderizado de perillas.
 */

window.MVave = window.MVave || {};
var MVave = window.MVave;

MVave.Editor = {
  _dragging:    null,
  _startY:      0,
  _startVal:    0,
  _sensitivity: 0.55, // unidades por píxel de drag

  init() {
    this._bindGlobalDrag();
    this._bindBlockControls();
    this._bindChainBarNodes();
  },

  /* ── Clic en nodos de la barra de señal para alternar Bypass ── */
  _bindChainBarNodes() {
    const barEl = document.getElementById('signal-chain-bar');
    if (!barEl) return;

    barEl.addEventListener('click', (e) => {
      const node = e.target.closest('.chain-node');
      if (!node) return;
      const blockName = node.dataset.block;
      const toggle = document.querySelector(`.block-toggle-input[data-block="${blockName}"]`);
      if (toggle) {
        toggle.checked = !toggle.checked;
        this._handleToggle(toggle);
      }
    });
  },

  /* ── Drag de perillas ─────────────────────────────── */

  _bindGlobalDrag() {
    const rigEl = document.getElementById('rig-blocks');
    if (!rigEl) return;

    // ─ Mouse ─
    rigEl.addEventListener('mousedown', (e) => {
      const knob = e.target.closest('.knob');
      if (!knob) return;
      this._startDrag(knob, e.clientY);
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!this._dragging) return;
      this._doDrag(e.clientY);
      e.preventDefault();
    });

    document.addEventListener('mouseup', () => this._endDrag());

    // ─ Touch ─
    rigEl.addEventListener('touchstart', (e) => {
      const knob = e.target.closest('.knob');
      if (!knob) return;
      this._startDrag(knob, e.touches[0].clientY);
      // no preventDefault para no bloquear scroll
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (!this._dragging) return;
      this._doDrag(e.touches[0].clientY);
      e.preventDefault(); // evitar scroll mientras se edita perilla
    }, { passive: false });

    document.addEventListener('touchend', () => this._endDrag());
  },

  _startDrag(knob, clientY) {
    this._dragging  = knob;
    this._startY    = clientY;
    this._startVal  = parseInt(knob.dataset.value, 10);
    document.body.style.userSelect = 'none';
    document.body.style.cursor    = 'ns-resize';
    knob.classList.add('knob--active');
  },

  _doDrag(clientY) {
    if (!this._dragging) return;
    const delta  = this._startY - clientY; // positivo = arrastrar hacia arriba = aumentar
    const min    = parseInt(this._dragging.dataset.min, 10);
    const max    = parseInt(this._dragging.dataset.max, 10);
    const newVal = this._startVal + delta * this._sensitivity;
    const clamped = Math.round(Math.max(min, Math.min(max, newVal)));
    this._applyKnobValue(this._dragging, clamped);
  },

  _endDrag() {
    if (this._dragging) {
      this._dragging.classList.remove('knob--active');
      this._dragging = null;
      MVave.App.updateLiveJson();
    }
    document.body.style.userSelect = '';
    document.body.style.cursor    = '';
  },

  _applyKnobValue(svgEl, newVal) {
    const clamped = MVave.Renderer.updateKnobArc(svgEl, newVal);
    const block   = svgEl.dataset.block;
    const ctrl    = svgEl.dataset.control;
    if (MVave.App.currentPreset?.[block]?.controls) {
      MVave.App.currentPreset[block].controls[ctrl] = clamped;
    }
  },

  /* ── Toggle Bypass y Cambio de Algoritmo ─────────── */

  _bindBlockControls() {
    const rigEl = document.getElementById('rig-blocks');
    if (!rigEl) return;

    rigEl.addEventListener('change', (e) => {
      const toggle = e.target.closest('.block-toggle-input');
      if (toggle) { this._handleToggle(toggle); return; }

      const sel = e.target.closest('.block-algo-select');
      if (sel)    { this._handleAlgoChange(sel); return; }
    });
  },

  _handleToggle(toggleEl) {
    const blockName = toggleEl.dataset.block;
    const isActive  = toggleEl.checked;
    const blockEl   = document.querySelector(`.rig-block[data-block="${blockName}"]`);
    if (!blockEl) return;

    blockEl.classList.toggle('block-bypass', !isActive);

    // Toggle indicador visual BYPASS
    const indicator = blockEl.querySelector('.bypass-indicator');
    if (indicator) indicator.classList.toggle('hidden', isActive);

    // Color del toggle
    const track = toggleEl.nextElementSibling;
    if (isActive) {
      track.style.setProperty('--toggle-color', MVave.BLOCK_COLORS[blockName]);
    } else {
      track.style.removeProperty('--toggle-color');
    }

    // Actualizar preset en memoria
    if (MVave.App.currentPreset?.[blockName]) {
      MVave.App.currentPreset[blockName].status = isActive ? 'active' : 'bypass';
    }

    // Sincronizar nodo de la barra visual de cadena
    const nodeEl = document.querySelector(`.chain-node[data-block="${blockName}"]`);
    if (nodeEl) {
      nodeEl.classList.toggle('chain-node--active', isActive);
      nodeEl.classList.toggle('chain-node--bypass', !isActive);
      nodeEl.title = `${blockName}: ${isActive ? 'Activo' : 'Bypass'} (clic para alternar)`;
    }

    MVave.App.updateLiveJson();
  },

  _handleAlgoChange(selectEl) {
    const blockName = selectEl.dataset.block;
    if (!MVave.App.currentPreset?.[blockName]) return;

    if (blockName === 'AMP') {
      const idx   = parseInt(selectEl.value, 10);
      const model = MVave.getAmpModel(idx);
      if (!model) return;

      MVave.App.currentPreset.AMP.model_index = model.index;
      MVave.App.currentPreset.AMP.gui_label   = model.gui_label;
      MVave.App.currentPreset.AMP.emulation   = model.emulation;
      MVave.App.currentPreset.AMP.type        = model.type;

      // Actualizar texto de subtítulo
      const sub = document.querySelector('.rig-block[data-block="AMP"] .block-subtitle');
      if (sub) sub.textContent = model.emulation;

    } else if (blockName === 'CAB') {
      const idx   = parseInt(selectEl.value, 10);
      const model = MVave.getCabModel(idx);
      if (!model) return;

      MVave.App.currentPreset.CAB.model_index = model.index;
      MVave.App.currentPreset.CAB.gui_label   = model.gui_label;
      MVave.App.currentPreset.CAB.emulation   = model.emulation;
      MVave.App.currentPreset.CAB.specs       = model.specs;

      const sub = document.querySelector('.rig-block[data-block="CAB"] .block-subtitle');
      if (sub) sub.textContent = `${model.emulation} · ${model.specs}`;

    } else {
      // FX / MOD / REV / DLY — cambio de algoritmo
      const algorithm = selectEl.value;
      const schemaCtrls = MVave.getAlgorithmControls(blockName, algorithm);
      if (!schemaCtrls) return;

      // Valores por defecto al 50% (o conservar valores si el parámetro existe en ambos algoritmos)
      const old = MVave.App.currentPreset[blockName].controls || {};
      const defaults = {};
      for (const key of Object.keys(schemaCtrls)) {
        defaults[key] = (key in old) ? old[key] : 50;
      }

      MVave.App.currentPreset[blockName].algorithm = algorithm;
      MVave.App.currentPreset[blockName].controls  = defaults;

      MVave.Renderer.rerenderKnobs(blockName, algorithm, defaults);
    }

    MVave.App.updateLiveJson();
  },
};
