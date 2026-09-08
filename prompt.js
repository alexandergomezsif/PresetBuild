'use strict';

/**
 * prompt.js — Generador de prompts para la IA
 * Ensambla un prompt completo que incluye el esquema de hardware
 * y solicita una respuesta JSON estricta y parseable.
 */

window.MVave = window.MVave || {};
var MVave = window.MVave;

MVave.Prompt = {
  assemble(artist, song, genre = '', guitar = '', details = null) {
    const hw = MVave.HARDWARE.mVavePocketAmp.dsp_architecture.blocks;

    const fxAlgos  = Object.keys(hw.FX.algorithms).join(' | ');
    const modAlgos = Object.keys(hw.MOD.algorithms).join(' | ');
    const revAlgos = Object.keys(hw.REV.algorithms).join(' | ');
    const dlyAlgos = Object.keys(hw.DLY.algorithms).join(' | ');
    const ampModels = hw.AMP.models.map(m => `${m.index}:"${m.gui_label}" (${m.emulation})`).join(', ');
    const cabModels = hw.CAB.models.map(m => `${m.index}:"${m.gui_label}" (${m.emulation})`).join(', ');

    const modControls = Object.entries(hw.MOD.algorithms)
      .map(([algo, d]) => `  "${algo}": { ${Object.keys(d.controls).map(k => `"${k}": 0-100`).join(', ')} }`)
      .join('\n');

    const dlyControls = Object.entries(hw.DLY.algorithms)
      .map(([algo, d]) => `  "${algo}": { ${Object.keys(d.controls).map(k => `"${k}": 0-100`).join(', ')} }`)
      .join('\n');

    const fxControls = Object.entries(hw.FX.algorithms)
      .map(([algo, d]) => `  "${algo}": { ${Object.keys(d.controls).map(k => `"${k}": 0-100`).join(', ')} }`)
      .join('\n');

    // Determinamos el modo de generación
    const hasArtistOrSong = Boolean((artist && artist.trim()) || (song && song.trim()));
    const hasGenre = Boolean(genre && genre.trim());
    const hasGuitar = Boolean(guitar && guitar.trim());

    // Búsqueda en base de datos
    const dbSong = (MVave.Database && hasArtistOrSong) ? MVave.Database.findSong(artist, song) : null;
    const dbGenre = (MVave.Database && hasGenre) ? MVave.Database.findGenre(genre) : null;
    const dbGuitar = (MVave.Database && hasGuitar) ? MVave.Database.findGuitar(guitar) : null;

    let finalArtist = 'Varios';
    let finalSong   = 'Tono Característico';

    if (hasArtistOrSong) {
      finalArtist = (artist || 'Varios').trim();
      finalSong   = (song || 'Tono Característico').trim();
    } else if (hasGuitar && !hasGenre) {
      finalArtist = 'Tono de Guitarra';
      finalSong   = guitar.trim();
    } else if (hasGenre) {
      finalArtist = `Género: ${genre.trim()}`;
      finalSong   = hasGuitar ? `${guitar.trim()}` : 'Arquetipo Esencial';
    }

    const metaInfo = details || dbSong || {};
    const finalGenre = genre || metaInfo.genre || dbGenre?.name || '';

    // Bloque de guitarra si aplica
    let guitarSection = '';
    if (hasGuitar) {
      const gLines = [
        `- Modelo de guitarra a emular: ${guitar.trim()}`,
        dbGuitar?.pickups ? `- Pastillas: ${dbGuitar.pickups}` : '',
        dbGuitar?.body ? `- Cuerpo y maderas: ${dbGuitar.body}` : '',
        dbGuitar?.context ? `- Contexto / Referencia histórica: ${dbGuitar.context}` : '',
        dbGuitar?.tonalProfile ? `- Perfil acústico característico: ${dbGuitar.tonalProfile}` : '',
        dbGuitar?.dspRecommendations ? `- Recomendación de calibración DSP: ${dbGuitar.dspRecommendations}` : '',
        `* INSTRUCCIÓN DE ADAPTACIÓN: Modela la ganancia de entrada, el preamplificador, la presencia y el filtro de cabina (Low/High Cut) de la M-VAVE para reproducir fielmente la respuesta en frecuencia, el ataque y el timbre característico de esta guitarra.`
      ].filter(Boolean);

      guitarSection = `\nCONFIGURACIÓN Y EMULACIÓN DE GUITARRA\n${gLines.join('\n')}\n`;
    }

    let objetivoMusical = '';
    if (!hasArtistOrSong && !hasGenre && hasGuitar) {
      // Modo: Solo Guitarra
      objetivoMusical = `OBJETIVO MUSICAL (EMULACIÓN PURA DE INSTRUMENTO)
- Instrumento objetivo: ${guitar.trim()}
- Concepto: Diseñar un preset definitivo en M-VAVE Pocket Amp que capture la identidad sónica y personalidad tonal de este modelo específico de guitarra.
${guitarSection}`;
    } else if (!hasArtistOrSong && hasGenre) {
      // Modo: Género (+ Guitarra opcional)
      objetivoMusical = `OBJETIVO MUSICAL (TONO ARQUETÍPICO DE GÉNERO)
- Género Musical: ${genre.trim()}
- Concepto: Diseñar el tono definitivo y más representativo para tocar ${genre.trim()} en directo y grabación.
${dbGenre?.desc ? `- Carácter acústico del género: ${dbGenre.desc}` : ''}
${dbGenre?.amp ? `- Amplificador sugerido: ${dbGenre.amp}` : ''}
${dbGenre?.pedals ? `- Efectos / dinámica típicos: ${dbGenre.pedals}` : ''}
${dbGenre?.cab ? `- Gabinete recomendado: ${dbGenre.cab}` : ''}
${guitarSection}`;
    } else {
      // Modo: Artista y Canción (+ Guitarra opcional)
      const detailsList = [];
      if (finalGenre) detailsList.push(`- Género: ${finalGenre}`);
      if (metaInfo.guitarist) detailsList.push(`- Guitarrista referente: ${metaInfo.guitarist}`);
      if (metaInfo.sound) detailsList.push(`- Sonido y seteo deseado: ${metaInfo.sound}`);
      if (metaInfo.technique) detailsList.push(`- Técnica y efectos clave: ${metaInfo.technique}`);
      if (metaInfo.style) detailsList.push(`- Estilo: ${metaInfo.style}`);
      if (metaInfo.era) detailsList.push(`- Época: ${metaInfo.era}`);

      objetivoMusical = `OBJETIVO MUSICAL
- Artista/Banda: ${finalArtist}
- Canción: ${finalSong}
${detailsList.join('\n')}
${guitarSection}`;
    }

    return `Eres un ingeniero de sonido de nivel experto especializado en procesadores DSP de guitarra eléctrica.

${objetivoMusical.trim()}

TAREA
Devuélveme ÚNICAMENTE el siguiente objeto JSON con la configuración exacta para mi pedalera M-VAVE Pocket Amp.
Sin texto introductorio. Sin explicaciones fuera del JSON. Puedes agregar notas breves en el campo "notes".

ESTRUCTURA JSON REQUERIDA (copia y rellena con los valores apropiados):
{
  "preset_meta": {
    "artist": "${finalArtist}",
    "song": "${finalSong}",
    "notes": "<descripción breve del tono>"
  },
  "signal_chain": ["FX", "AMP", "CAB", "MOD", "REV", "DLY"],
  "FX": {
    "status": "active",
    "algorithm": "<elige uno: ${fxAlgos}>",
    "controls": { "<perillas exactas del algoritmo elegido>": "<0-100>" }
  },
  "AMP": {
    "status": "active",
    "model_index": "<entero 1-20>",
    "gui_label": "<etiqueta exacta del modelo>",
    "controls": { "Gain": 0, "Level": 0, "Bass": 0, "Mid": 0, "Treble": 0 }
  },
  "CAB": {
    "status": "active",
    "model_index": "<entero 1-20>",
    "gui_label": "<etiqueta exacta del modelo>",
    "controls": { "Level": 0, "Low Cut": 0, "High Cut": 0 }
  },
  "MOD": {
    "status": "active",
    "algorithm": "<elige uno: ${modAlgos}>",
    "controls": { "<perillas exactas del algoritmo elegido>": "<0-100>" }
  },
  "REV": {
    "status": "active",
    "algorithm": "<elige uno: ${revAlgos}>",
    "controls": { "Decay": 0, "Mix": 0, "HPass": 0, "LPass": 0, "Depth": 0 }
  },
  "DLY": {
    "status": "bypass",
    "algorithm": "<elige uno: ${dlyAlgos}>",
    "controls": { "<perillas exactas del algoritmo elegido>": "<0-100>" }
  }
}

REGLAS ESTRICTAS
1. "signal_chain": Es un arreglo con los 6 bloques exactos ['FX', 'AMP', 'CAB', 'MOD', 'REV', 'DLY'] ordenados en la secuencia acústica ideal para esta canción. El orden altera radicalmente la respuesta sonora (ej: Reverb antes o después del Delay, o Modulación antes del Amp para tono vintage).
2. Todos los valores de "controls" son enteros entre 0 y 100 (posición de potenciómetro virtual).
3. Si un bloque no es necesario para el tono, usa "status": "bypass" (pero incluye igualmente el objeto).
4. Para FX, MOD, DLY: elige el "algorithm" y provee SOLO las perillas de ese algoritmo específico.
5. Para AMP y CAB: elige el model_index (entero 1-20) más apropiado según la siguiente lista.
6. Asume guitarra eléctrica estándar de principiante con pastillas de rango medio.
7. La respuesta completa debe ser JSON válido, parseable directamente con JSON.parse().

PERILLAS POR ALGORITMO FX (elige uno y usa solo sus perillas):
${fxControls}

MODELOS DE AMP DISPONIBLES (20 modelos):
${ampModels}

MODELOS DE CAB DISPONIBLES (20 gabinetes):
${cabModels}
PERILLAS CAB:
- "Level": 0-100 (volumen del gabinete)
- "Low Cut": 0-100 (corte de graves: 0 = 20 Hz sin corte, 100 = 300 Hz corte agresivo)
- "High Cut": 0-100 (corte de agudos: 100 = 18.0 kHz abierto brillante, 0 = 5.0 kHz corte oscuro vintage)

PERILLAS POR ALGORITMO MOD (elige uno y usa solo sus perillas):
${modControls}

ALGORITMOS REV (todos comparten las mismas 5 perillas):
Tipos: ${revAlgos}
Perillas: "Decay": 0-100, "Mix": 0-100, "HPass": 0-100, "LPass": 0-100, "Depth": 0-100

PERILLAS POR ALGORITMO DLY (elige uno y usa solo sus perillas):
${dlyControls}`;
  },
};
