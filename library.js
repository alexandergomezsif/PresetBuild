'use strict';

/**
 * library.js — Biblioteca de Presets
 * Gestiona localStorage, exportación/importación de archivos .json
 * y renderizado de tarjetas de presets en la UI.
 */

window.MVave = window.MVave || {};
var MVave = window.MVave;

MVave.Library = {
  STORAGE_KEY: 'mvave_presets_v1',

  /* ── CRUD localStorage ──────────────────────────────── */

  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  },

  getById(id) {
    return this.getAll().find(p => p.id === id) || null;
  },

  save(name, presetData) {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    const entry = {
      id,
      name:    name.trim() || 'Sin nombre',
      savedAt: new Date().toISOString(),
      data:    JSON.parse(JSON.stringify(presetData)), // deep clone
    };
    const all = this.getAll();
    all.unshift(entry); // más reciente primero
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
    return entry;
  },

  delete(id) {
    const filtered = this.getAll().filter(p => p.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  },

  /* ── Exportar / Importar ────────────────────────────── */

  exportAsFile(presetData, filename) {
    const payload = {
      _format:  'mvave-pocket-amp-preset',
      _version: '1.0',
      _exported: new Date().toISOString(),
      ...presetData,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = (filename || 'mvave_preset').replace(/[^\w\s\-]/g, '').replace(/\s+/g, '_') + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  importFromFile(file, callback) {
    const isBkx = file.name.toLowerCase().endsWith('.bkx');

    if (isBkx) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const bytes = new Uint8Array(e.target.result);
          const preset = MVave.BKX.parseBkxBuffer(bytes);
          // Nombre desde el archivo
          preset.preset_meta.song = file.name.replace(/\.bkx$/i, '');
          callback(null, preset);
        } catch (err) {
          callback(new Error(`Error al leer archivo .bkx: ${err.message}`));
        }
      };
      reader.onerror = () => callback(new Error('No se pudo leer el archivo .bkx.'));
      reader.readAsArrayBuffer(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const raw  = JSON.parse(e.target.result);
        // Soporta tanto el formato de biblioteca (con campo .data) como JSON crudo de IA
        const data = raw.data ? raw.data : raw;
        const sanitized = MVave.Parser.sanitizePreset(data);
        callback(null, sanitized);
      } catch (err) {
        callback(new Error(`Archivo JSON inválido: ${err.message}`));
      }
    };
    reader.onerror = () => callback(new Error('No se pudo leer el archivo.'));
    reader.readAsText(file);
  },

  /* ── Renderizado de la Biblioteca ───────────────────── */

  render() {
    const presets   = this.getAll();
    const grid      = document.getElementById('preset-grid');
    const emptyEl   = document.getElementById('library-empty');
    const countEl   = document.getElementById('preset-count');
    if (!grid) return;

    const label = `${presets.length} preset${presets.length !== 1 ? 's' : ''}`;
    if (countEl) countEl.textContent = label;

    if (presets.length === 0) {
      grid.innerHTML = '';
      if (emptyEl) grid.appendChild(emptyEl);
      if (emptyEl) emptyEl.style.display = 'flex';
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    grid.innerHTML = presets.map(p => this._card(p)).join('');
  },

  _card(preset) {
    const blocks   = ['FX', 'AMP', 'CAB', 'MOD', 'REV', 'DLY'];
    const dots     = blocks.map(b => {
      const active = preset.data?.[b]?.status === 'active';
      const color  = MVave.BLOCK_COLORS[b];
      return `<span class="dot${active ? ' dot--on' : ''}" style="${active ? `background:${color}` : ''}" title="${b}"></span>`;
    }).join('');

    const meta     = preset.data?.preset_meta || {};
    const ampLabel = preset.data?.AMP?.gui_label || '—';
    const cabLabel = preset.data?.CAB?.gui_label || '—';
    const ampType  = preset.data?.AMP?.type || '';

    const d = new Date(preset.savedAt);
    const dateStr = isNaN(d) ? '' :
      d.toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' });

    return `<div class="preset-card" data-preset-id="${preset.id}">
      <div class="preset-card-top">
        <div class="preset-name">${this._e(preset.name)}</div>
        <div class="preset-dots">${dots}</div>
      </div>
      <div class="preset-card-body">
        <div class="preset-row"><span class="preset-key">Artista</span><span class="preset-val">${this._e(meta.artist || '—')}</span></div>
        <div class="preset-row"><span class="preset-key">Canción</span><span class="preset-val">${this._e(meta.song   || '—')}</span></div>
        <div class="preset-row">
          <span class="preset-key">AMP</span>
          <span class="preset-val" style="color:${MVave.BLOCK_COLORS.AMP}">${this._e(ampLabel)}</span>
        </div>
        <div class="preset-row">
          <span class="preset-key">CAB</span>
          <span class="preset-val">${this._e(cabLabel)}</span>
        </div>
        ${meta.notes ? `<div class="preset-notes">${this._e(meta.notes)}</div>` : ''}
      </div>
      <div class="preset-card-footer">
        <span class="preset-date">${dateStr}</span>
        <div class="preset-card-btns">
          <button class="btn btn-primary btn-xs preset-load-btn"   data-id="${preset.id}">Cargar</button>
          <button class="btn btn-secondary btn-xs preset-export-bkx-btn" data-id="${preset.id}" title="Exportar como .bkx (M-VAVE)">.BKX</button>
          <button class="btn btn-danger btn-xs preset-delete-btn"  data-id="${preset.id}" title="Eliminar preset">✕</button>
        </div>
      </div>
    </div>`;
  },

  _e(s) {
    const d = document.createElement('span');
    d.textContent = String(s);
    return d.innerHTML;
  },
};
