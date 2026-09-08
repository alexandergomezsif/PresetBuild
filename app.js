'use strict';

/**
 * app.js — Orquestador principal de la SPA
 * Inicializa todos los módulos, maneja las pestañas, el flujo
 * del generador de prompts, el simulador visual, el modal de guardado
 * y las acciones de la biblioteca de presets.
 */

window.MVave = window.MVave || {};
var MVave = window.MVave;

MVave.App = {
  /** Preset actualmente cargado en el simulador (objeto mutable en memoria) */
  currentPreset: null,

  /* ── Bootstrap ──────────────────────────────────────── */

  init() {
    this._bindTabs();
    this._bindGenerator();
    this._bindSimulator();
    this._bindModal();
    this._bindLibraryGrid();
    MVave.Editor.init();
    MVave.Library.render();
  },

  /* ── Pestañas ───────────────────────────────────────── */

  _bindTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.tab === target);
          b.setAttribute('aria-selected', String(b.dataset.tab === target));
        });
        document.querySelectorAll('.tab-content').forEach(c => {
          c.classList.toggle('active', c.id === `tab-${target}`);
        });
      });
    });
  },

  /* ── Pestaña 1: ¿Cómo quieres Sonar? ────────────────── */

  _lastGeneratedPrompt: '',
  _selectedSongDetails: null,

  _bindGenerator() {
    const form          = document.getElementById('prompt-form');
    const artistInp     = document.getElementById('artist-input');
    const songInp       = document.getElementById('song-input');
    const genreInp      = document.getElementById('genre-input');
    const guitarInp     = document.getElementById('guitar-input');
    const output        = document.getElementById('prompt-output');
    const vaultSection  = document.getElementById('prompt-vault-section');
    const copyVaultBtn  = document.getElementById('btn-copy-vault');
    const copyLabel     = document.getElementById('vault-copy-label');
    const goToSimBtn    = document.getElementById('btn-go-to-simulator');
    const feedback      = document.getElementById('gen-feedback');
    const generateBtn   = document.getElementById('btn-generate');
    const metaCard      = document.getElementById('selected-song-meta');
    const metaDetails   = document.getElementById('selected-song-details');
    const guitarCard    = document.getElementById('selected-guitar-meta');
    const guitarDetails = document.getElementById('selected-guitar-details');

    let copyTimer;

    const showFb = (msg, type = 'info') => {
      if (!feedback) return;
      feedback.textContent = msg;
      feedback.className = `feedback-msg ${type}`;
    };

    const clearErr = () => {
      artistInp?.classList.remove('is-invalid');
      songInp?.classList.remove('is-invalid');
      genreInp?.classList.remove('is-invalid');
      guitarInp?.classList.remove('is-invalid');
    };

    artistInp?.addEventListener('input', clearErr);
    songInp?.addEventListener('input', clearErr);
    genreInp?.addEventListener('input', clearErr);
    guitarInp?.addEventListener('input', clearErr);

    // Inicializar autocompletado predictivo inteligente
    this._bindPredictiveAutocomplete({
      artistInp,
      songInp,
      genreInp,
      guitarInp,
      metaCard,
      metaDetails,
      guitarCard,
      guitarDetails
    });

    const copyToClipboard = async (text) => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          return true;
        } else if (output) {
          output.select();
          const ok = document.execCommand('copy');
          return ok;
        }
      } catch (e) {
        console.warn('Clipboard write failed:', e);
      }
      return false;
    };

    const handleGenerate = async (e) => {
      if (e) e.preventDefault();
      const artist = artistInp?.value.trim();
      const song   = songInp?.value.trim();
      const genre  = genreInp?.value.trim();
      const guitar = guitarInp?.value.trim();

      clearErr();
      
      const hasArtistAndSong = Boolean(artist && song);
      const hasGenre = Boolean(genre);
      const hasGuitar = Boolean(guitar);

      if (!hasArtistAndSong && !hasGenre && !hasGuitar) {
        if (!artist) artistInp?.classList.add('is-invalid');
        if (!song) songInp?.classList.add('is-invalid');
        if (!genre) genreInp?.classList.add('is-invalid');
        if (!guitar) guitarInp?.classList.add('is-invalid');
        showFb('Ingresa Banda y Canción, selecciona un Género, o elige/escribe un Modelo de Guitarra.', 'error');
        return;
      }

      // Si comenzó a escribir sólo canción o sólo artista sin haber completado ambos, y no hay género ni guitarra solitaria
      if (!hasGenre && !hasGuitar && (Boolean(artist) !== Boolean(song))) {
        if (!artist) artistInp?.classList.add('is-invalid');
        if (!song) songInp?.classList.add('is-invalid');
        showFb('Para buscar por canción debes completar tanto la Banda/Artista como el Título.', 'error');
        return;
      }

      try {
        const promptText = MVave.Prompt.assemble(artist, song, genre, guitar, this._selectedSongDetails);
        this._lastGeneratedPrompt = promptText;
        if (output) output.value = promptText;

        // Mostrar sección de instrucción protegida
        if (vaultSection) vaultSection.classList.remove('hidden');

        // Intentar copiar automáticamente al portapapeles
        const copied = await copyToClipboard(promptText);
        if (copied) {
          showFb('✓ Instrucción acústica copiada al portapapeles. Pégala (Ctrl + V) en tu IA preferida.', 'success');
        } else {
          showFb('Instrucción lista. Haz clic en "Copiar Instrucción Nuevamente" para transferirla.', 'info');
        }

        // Scroll suave hacia la tarjeta de confirmación
        setTimeout(() => vaultSection?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);

      } catch (ex) {
        showFb(`Error al generar: ${ex.message}`, 'error');
        console.error('Error in assemble:', ex);
      }
    };

    form?.addEventListener('submit', handleGenerate);
    generateBtn?.addEventListener('click', handleGenerate);

    copyVaultBtn?.addEventListener('click', async () => {
      if (!this._lastGeneratedPrompt) return;
      const ok = await copyToClipboard(this._lastGeneratedPrompt);
      if (ok) {
        copyVaultBtn.classList.add('copied');
        if (copyLabel) copyLabel.textContent = '¡Copiado al Portapapeles!';
        clearTimeout(copyTimer);
        copyTimer = setTimeout(() => {
          copyVaultBtn.classList.remove('copied');
          if (copyLabel) copyLabel.textContent = 'Copiar Instrucción Nuevamente';
        }, 2500);
      } else {
        showFb('No se pudo copiar automáticamente. Despliega opciones avanzadas y usa Ctrl+C.', 'error');
      }
    });

    goToSimBtn?.addEventListener('click', () => {
      document.querySelector('[data-tab="simulator"]')?.click();
    });
  },

  /* ── Motor de Autocompletado Predictivo ──────────────── */

  _bindPredictiveAutocomplete({ artistInp, songInp, genreInp, guitarInp, metaCard, metaDetails, guitarCard, guitarDetails }) {
    if (!MVave.Database) return;

    const artistDrop       = document.getElementById('artist-suggestions');
    const songDrop         = document.getElementById('song-suggestions');
    const genreDrop        = document.getElementById('genre-suggestions');
    const guitarDrop       = document.getElementById('guitar-suggestions');
    const toggleGenreBtn   = document.getElementById('btn-toggle-genres');
    const toggleGuitarBtn  = document.getElementById('btn-toggle-guitars');

    const clearArtistBtn   = document.getElementById('btn-clear-artist');
    const clearSongBtn     = document.getElementById('btn-clear-song');
    const clearGenreBtn    = document.getElementById('btn-clear-genre');
    const clearGuitarBtn   = document.getElementById('btn-clear-guitar');

    const setupClearBtn = (inputEl, clearBtn, onClear) => {
      if (!inputEl || !clearBtn) return;
      const toggle = () => {
        if (inputEl.value.trim().length > 0) {
          clearBtn.classList.remove('hidden');
        } else {
          clearBtn.classList.add('hidden');
        }
      };
      inputEl.addEventListener('input', toggle);
      clearBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        inputEl.value = '';
        toggle();
        if (typeof onClear === 'function') onClear();
        inputEl.dispatchEvent(new Event('input', { bubbles: true }));
        inputEl.focus();
      });
      toggle();
    };

    setupClearBtn(artistInp, clearArtistBtn, () => {
      artistDrop?.classList.add('hidden');
      updateMetaBadge(null);
    });

    setupClearBtn(songInp, clearSongBtn, () => {
      songDrop?.classList.add('hidden');
      updateMetaBadge(null);
    });

    setupClearBtn(genreInp, clearGenreBtn, () => {
      genreDrop?.classList.add('hidden');
    });

    setupClearBtn(guitarInp, clearGuitarBtn, () => {
      guitarDrop?.classList.add('hidden');
      updateGuitarMetaBadge(null);
    });

    const hideAll = () => {
      artistDrop?.classList.add('hidden');
      songDrop?.classList.add('hidden');
      genreDrop?.classList.add('hidden');
      guitarDrop?.classList.add('hidden');
    };

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.predictive-field-wrap') &&
          !e.target.closest('#btn-toggle-genres') &&
          !e.target.closest('#btn-toggle-guitars')) {
        hideAll();
      }
    });

    const updateMetaBadge = (songData) => {
      if (!metaCard || !metaDetails) return;
      if (!songData) {
        metaCard.classList.add('hidden');
        metaDetails.innerHTML = '';
        return;
      }
      this._selectedSongDetails = songData;
      const parts = [];
      if (songData.guitarist) parts.push(`<strong>Guitarrista:</strong> ${songData.guitarist}`);
      if (songData.sound) parts.push(`<strong>Tono:</strong> ${songData.sound}`);
      if (songData.technique) parts.push(`<strong>Efectos:</strong> ${songData.technique}`);
      if (songData.era) parts.push(`<strong>Época:</strong> ${songData.era}`);
      metaDetails.innerHTML = parts.join(' &bull; ');
      metaCard.classList.remove('hidden');
    };

    const updateGuitarMetaBadge = (guitarData) => {
      if (!guitarCard || !guitarDetails) return;
      if (!guitarData) {
        guitarCard.classList.add('hidden');
        guitarDetails.innerHTML = '';
        return;
      }
      const parts = [];
      if (guitarData.pickups) parts.push(`<strong>Pastillas:</strong> ${guitarData.pickups}`);
      if (guitarData.tonalProfile) parts.push(`<strong>Perfil Tonal:</strong> ${guitarData.tonalProfile}`);
      if (guitarData.context) parts.push(`<strong>Contexto / Historia:</strong> ${guitarData.context}`);
      guitarDetails.innerHTML = parts.join(' &bull; ');
      guitarCard.classList.remove('hidden');
    };

    // 1. Artistas
    const renderArtists = (query = '') => {
      if (!artistDrop) return;
      const matches = MVave.Database.searchArtists(query, 8);
      if (!matches.length) {
        artistDrop.innerHTML = '<div class="suggestion-empty">Sin coincidencias en la base de datos</div>';
        artistDrop.classList.remove('hidden');
        return;
      }
      artistDrop.innerHTML = matches.map(a => `
        <div class="suggestion-item" data-artist="${a.name}" data-genre="${a.genre || ''}">
          <div>
            <div class="suggestion-main">${a.name}</div>
            <div class="suggestion-sub">${a.songCount} canción${a.songCount > 1 ? 'es' : ''} registrada${a.songCount > 1 ? 's' : ''}</div>
          </div>
          ${a.genre ? `<span class="suggestion-badge">${a.genre}</span>` : ''}
        </div>
      `).join('');
      artistDrop.classList.remove('hidden');
    };

    artistInp?.addEventListener('input', () => {
      updateMetaBadge(null);
      renderArtists(artistInp.value);
    });

    artistInp?.addEventListener('focus', () => {
      if (artistInp.value.trim().length >= 1) {
        renderArtists(artistInp.value);
      }
    });

    artistDrop?.addEventListener('click', (e) => {
      const item = e.target.closest('.suggestion-item');
      if (!item) return;
      const name = item.dataset.artist;
      const genre = item.dataset.genre;
      if (artistInp) {
        artistInp.value = name;
        artistInp.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (genreInp && !genreInp.value && genre) {
        genreInp.value = genre;
        genreInp.dispatchEvent(new Event('input', { bubbles: true }));
      }
      artistDrop.classList.add('hidden');
      songInp?.focus();
      renderSongs('', name);
    });

    // 2. Canciones
    const renderSongs = (query = '', artistFilter = '') => {
      if (!songDrop) return;
      const af = artistFilter || artistInp?.value || '';
      const matches = MVave.Database.searchSongs(query, af, 8);
      if (!matches.length) {
        songDrop.innerHTML = '<div class="suggestion-empty">Sin coincidencias en la base de datos</div>';
        songDrop.classList.remove('hidden');
        return;
      }
      songDrop.innerHTML = matches.map(s => `
        <div class="suggestion-item" data-id="${s.id}">
          <div>
            <div class="suggestion-main">${s.song}</div>
            <div class="suggestion-sub">${s.artist} ${s.guitarist ? `&bull; ${s.guitarist}` : ''}</div>
          </div>
          ${s.genre ? `<span class="suggestion-badge">${s.genre}</span>` : ''}
        </div>
      `).join('');
      songDrop.classList.remove('hidden');
    };

    songInp?.addEventListener('input', () => {
      updateMetaBadge(null);
      renderSongs(songInp.value, artistInp?.value);
    });

    songInp?.addEventListener('focus', () => {
      renderSongs(songInp.value, artistInp?.value);
    });

    songDrop?.addEventListener('click', (e) => {
      const item = e.target.closest('.suggestion-item');
      if (!item) return;
      const id = parseInt(item.dataset.id, 10);
      const songData = MVave.Database.songs.find(s => s.id === id);
      if (songData) {
        if (songInp) {
          songInp.value = songData.song;
          songInp.dispatchEvent(new Event('input', { bubbles: true }));
        }
        if (artistInp) {
          artistInp.value = songData.artist;
          artistInp.dispatchEvent(new Event('input', { bubbles: true }));
        }
        if (genreInp && songData.genre) {
          genreInp.value = songData.genre;
          genreInp.dispatchEvent(new Event('input', { bubbles: true }));
        }
        updateMetaBadge(songData);
      }
      songDrop.classList.add('hidden');
    });

    // 3. Géneros
    const renderGenres = (query = '') => {
      if (!genreDrop) return;
      const matches = MVave.Database.searchGenres(query, 12);
      if (!matches.length) {
        genreDrop.innerHTML = '<div class="suggestion-empty">No se encontraron géneros coincidentes</div>';
        genreDrop.classList.remove('hidden');
        return;
      }
      genreDrop.innerHTML = matches.map(g => `
        <div class="suggestion-item" data-genre="${g.name}">
          <div>
            <div class="suggestion-main">${g.name}</div>
            <div class="suggestion-sub">${g.desc ? g.desc.slice(0, 80) + '...' : (g.subgenres || []).join(', ')}</div>
          </div>
          <span class="suggestion-badge">${g.amp || 'Arquetipo'}</span>
        </div>
      `).join('');
      genreDrop.classList.remove('hidden');
    };

    genreInp?.addEventListener('input', () => {
      renderGenres(genreInp.value);
    });

    genreInp?.addEventListener('focus', () => {
      renderGenres(genreInp.value);
    });

    toggleGenreBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (genreDrop.classList.contains('hidden')) {
        renderGenres('');
      } else {
        genreDrop.classList.add('hidden');
      }
    });

    genreDrop?.addEventListener('click', (e) => {
      const item = e.target.closest('.suggestion-item');
      if (!item) return;
      const gName = item.dataset.genre;
      if (genreInp) {
        genreInp.value = gName;
        genreInp.dispatchEvent(new Event('input', { bubbles: true }));
      }
      genreDrop.classList.add('hidden');
    });

    // 4. Modelos de Guitarra
    const renderGuitars = (query = '') => {
      if (!guitarDrop) return;
      const matches = MVave.Database.searchGuitars(query, query ? 35 : 150);
      if (!matches.length) {
        guitarDrop.innerHTML = '<div class="suggestion-empty">Escribe libremente cualquier modelo (se adaptará en el prompt de la IA)</div>';
        guitarDrop.classList.remove('hidden');
        return;
      }
      guitarDrop.innerHTML = matches.map(g => `
        <div class="suggestion-item" data-guitar="${g.name}">
          <div>
            <div class="suggestion-main">${g.name}</div>
            <div class="suggestion-sub">${g.context ? g.context.slice(0, 95) + '...' : (g.tonalProfile ? g.tonalProfile.slice(0, 95) + '...' : '')}</div>
          </div>
          <span class="suggestion-badge suggestion-badge--guitar">${g.category || 'Guitarra'}</span>
        </div>
      `).join('');
      guitarDrop.classList.remove('hidden');
    };

    guitarInp?.addEventListener('input', () => {
      const typed = guitarInp.value.trim();
      const match = MVave.Database.findGuitar(typed);
      updateGuitarMetaBadge(match);
      renderGuitars(typed);
    });

    guitarInp?.addEventListener('focus', () => {
      renderGuitars(guitarInp.value);
    });

    toggleGuitarBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (guitarDrop.classList.contains('hidden')) {
        renderGuitars('');
      } else {
        guitarDrop.classList.add('hidden');
      }
    });

    guitarDrop?.addEventListener('click', (e) => {
      const item = e.target.closest('.suggestion-item');
      if (!item) return;
      const gName = item.dataset.guitar;
      if (guitarInp && gName) {
        guitarInp.value = gName;
        guitarInp.dispatchEvent(new Event('input', { bubbles: true }));
        const gData = MVave.Database.findGuitar(gName);
        updateGuitarMetaBadge(gData);
      }
      guitarDrop.classList.add('hidden');
    });
  },

  /* ── Pestaña 2: Cabina de Tono (Simulador) ───────────── */

  _bindSimulator() {
    const pasteAiBtn   = document.getElementById('btn-paste-ai');
    const importBtn    = document.getElementById('btn-import-file');
    const fileInput    = document.getElementById('file-import-input');
    const parserFb     = document.getElementById('parser-feedback');
    const exportBkxBtn = document.getElementById('btn-export-bkx');
    const saveBtn      = document.getElementById('btn-save-preset');

    const showFb = (msg, type = 'info') => {
      if (!parserFb) return;
      parserFb.textContent = msg;
      parserFb.className   = `feedback-msg ${type}`;
    };

    // Botón principal: Pegar Tono de la IA
    pasteAiBtn?.addEventListener('click', async () => {
      let text = '';
      try {
        if (navigator.clipboard && navigator.clipboard.readText) {
          text = await navigator.clipboard.readText();
        }
      } catch (err) {
        console.warn('Lectura de portapapeles bloqueada por el navegador:', err);
      }

      if (text && text.trim()) {
        this._processAIText(text, showFb);
      } else {
        // Si el navegador bloqueó la lectura directa, abrir modal de pegado rápido
        this._openPasteModal(showFb);
      }
    });

    // Importar archivo binario .bkx de M-VAVE
    importBtn?.addEventListener('click', () => fileInput?.click());

    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      MVave.Library.importFromFile(file, (err, preset) => {
        if (err) { showFb(err.message, 'error'); return; }
        this.loadPreset(preset);
        showFb(`✓ Archivo .bkx cargado — ${preset.preset_meta.artist} · ${preset.preset_meta.song}`, 'success');
      });
      fileInput.value = '';
    });

    // Exportar archivo .bkx nativo
    exportBkxBtn?.addEventListener('click', () => {
      if (!this.currentPreset) return;
      const m = this.currentPreset.preset_meta;
      const filename = `${m.artist} - ${m.song}`;
      MVave.BKX.downloadBkx(this.currentPreset, filename);
      showFb(`✓ Archivo "${filename}.bkx" generado con éxito. Listo para la app M-VAVE.`, 'success');
    });

    // Guardar en biblioteca local
    saveBtn?.addEventListener('click', () => {
      if (!this.currentPreset) return;
      this._openModal();
    });

    // Inicializar modal de pegado alternativo
    this._bindPasteModal(showFb);
  },

  /** Procesa la respuesta de la IA (JSON o texto estructurado) */
  _processAIText(text, showFb) {
    if (!text || !text.trim()) {
      if (showFb) showFb('El texto está vacío. Pega la respuesta completa de la IA.', 'error');
      return;
    }
    try {
      const preset = MVave.Parser.parseAIResponse(text);
      this.loadPreset(preset);
      if (showFb) {
        showFb(`✓ Tono cargado con éxito — ${preset.preset_meta.artist} · ${preset.preset_meta.song}`, 'success');
      }
    } catch (err) {
      if (showFb) showFb(err.message, 'error');
    }
  },

  /* ── Modal de Pegado Manual de Respaldo ─────────────── */

  _openPasteModal(showFb) {
    const modal    = document.getElementById('paste-modal');
    const input    = document.getElementById('paste-modal-input');
    const clearBtn = document.getElementById('btn-clear-paste');
    if (!modal) return;
    if (input) input.value = '';
    if (clearBtn) clearBtn.classList.add('hidden');
    modal.classList.remove('hidden');
    setTimeout(() => input?.focus(), 60);
  },

  _bindPasteModal(showFb) {
    const modal      = document.getElementById('paste-modal');
    const input      = document.getElementById('paste-modal-input');
    const clearBtn   = document.getElementById('btn-clear-paste');
    const confirmBtn = document.getElementById('paste-modal-confirm');
    const cancelBtn  = document.getElementById('paste-modal-cancel');
    if (!modal) return;

    const toggleClear = () => {
      if (input && clearBtn) {
        if (input.value.trim().length > 0) {
          clearBtn.classList.remove('hidden');
        } else {
          clearBtn.classList.add('hidden');
        }
      }
    };

    input?.addEventListener('input', toggleClear);
    clearBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (input) input.value = '';
      toggleClear();
      input?.focus();
    });

    const close = () => {
      modal.classList.add('hidden');
      if (input) input.value = '';
      toggleClear();
    };

    confirmBtn?.addEventListener('click', () => {
      const text = input?.value.trim();
      if (!text) return;
      close();
      this._processAIText(text, showFb);
    });

    cancelBtn?.addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  },

  /* ── Cargar preset en el simulador ──────────────────── */

  loadPreset(presetData) {
    this.currentPreset = JSON.parse(JSON.stringify(presetData));

    // Metadata header
    const m = presetData.preset_meta;
    const artistEl = document.getElementById('meta-artist');
    const songEl   = document.getElementById('meta-song');
    const notesEl  = document.getElementById('meta-notes');
    if (artistEl) artistEl.textContent = m.artist;
    if (songEl)   songEl.textContent   = `· ${m.song}`;
    if (notesEl)  notesEl.textContent  = m.notes || '';

    // Renderizar bloques dinámicamente en orden del flujo
    const rigBlocks = document.getElementById('rig-blocks');
    if (rigBlocks) rigBlocks.innerHTML = MVave.Renderer.renderRig(presetData);

    // Mostrar visualizador
    const viz = document.getElementById('rig-visualizer');
    if (viz) viz.classList.remove('hidden');

    // JSON en vivo (safe no-op si el elemento no existe)
    this.updateLiveJson();

    // Scroll al visualizador
    setTimeout(() => viz?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  },

  /** Safe no-op / compatibilidad con editor.js */
  updateLiveJson() {
    const ta = document.getElementById('live-json-output');
    if (ta && this.currentPreset) {
      ta.value = JSON.stringify(this.currentPreset, null, 2);
    }
  },

  /* ── Modal de guardado ───────────────────────────────── */

  _openModal() {
    const modal    = document.getElementById('save-modal');
    const nameInp  = document.getElementById('preset-name-input');
    const clearBtn = document.getElementById('btn-clear-preset-name');
    const m        = this.currentPreset?.preset_meta;
    nameInp.value  = (m?.artist && m?.song) ? `${m.artist} — ${m.song}` : '';
    nameInp.classList.remove('is-invalid');
    if (clearBtn) {
      if (nameInp.value.trim().length > 0) {
        clearBtn.classList.remove('hidden');
      } else {
        clearBtn.classList.add('hidden');
      }
    }
    modal.classList.remove('hidden');
    setTimeout(() => nameInp.focus(), 50);
  },

  _bindModal() {
    const modal      = document.getElementById('save-modal');
    const nameInp    = document.getElementById('preset-name-input');
    const clearBtn   = document.getElementById('btn-clear-preset-name');
    const confirmBtn = document.getElementById('modal-confirm');
    const cancelBtn  = document.getElementById('modal-cancel');

    const toggleClear = () => {
      if (nameInp && clearBtn) {
        if (nameInp.value.trim().length > 0) {
          clearBtn.classList.remove('hidden');
        } else {
          clearBtn.classList.add('hidden');
        }
      }
    };

    nameInp?.addEventListener('input', toggleClear);
    clearBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (nameInp) {
        nameInp.value = '';
        nameInp.classList.remove('is-invalid');
        toggleClear();
        nameInp.focus();
      }
    });

    const close = () => modal.classList.add('hidden');

    confirmBtn.addEventListener('click', () => {
      const name = nameInp.value.trim();
      if (!name) { nameInp.classList.add('is-invalid'); return; }
      nameInp.classList.remove('is-invalid');
      MVave.Library.save(name, this.currentPreset);
      MVave.Library.render();
      close();
      // Feedback visual
      const fb = document.getElementById('parser-feedback');
      if (fb) { fb.textContent = `✓ Preset "${name}" guardado en la biblioteca.`; fb.className = 'feedback-msg success'; }
    });

    cancelBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    nameInp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter')  confirmBtn.click();
      if (e.key === 'Escape') close();
    });
  },

  /* ── Acciones de la biblioteca (delegación de eventos) ─ */

  _bindLibraryGrid() {
    const grid = document.getElementById('preset-grid');
    if (!grid) return;

    grid.addEventListener('click', (e) => {
      const loadBtn      = e.target.closest('.preset-load-btn');
      const exportBkxBtn = e.target.closest('.preset-export-bkx-btn');
      const deleteBtn    = e.target.closest('.preset-delete-btn');

      if (loadBtn) {
        const entry = MVave.Library.getById(loadBtn.dataset.id);
        if (!entry?.data) return;
        this.loadPreset(entry.data);
        // Cambiar a pestaña Cabina de Tono (Simulador)
        document.querySelector('[data-tab="simulator"]')?.click();
        const fb = document.getElementById('parser-feedback');
        if (fb) { fb.textContent = `✓ Preset "${entry.name}" cargado.`; fb.className = 'feedback-msg success'; }
        return;
      }

      if (exportBkxBtn) {
        const entry = MVave.Library.getById(exportBkxBtn.dataset.id);
        if (entry?.data) {
          MVave.BKX.downloadBkx(entry.data, entry.name);
        }
        return;
      }

      if (deleteBtn) {
        const card = deleteBtn.closest('.preset-card');
        const name = card?.querySelector('.preset-name')?.textContent || 'este preset';
        if (confirm(`¿Eliminar "${name}"?\nEsta acción no se puede deshacer.`)) {
          MVave.Library.delete(deleteBtn.dataset.id);
          MVave.Library.render();
        }
        return;
      }
    });
  },
};

/* ── Arranque ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => MVave.App.init());
