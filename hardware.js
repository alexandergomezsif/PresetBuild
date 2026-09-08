'use strict';

/**
 * hardware.js — Esquema de Hardware Inmutable del DSP M-VAVE Pocket Amp
 * Define colores, orden de cadena de señal y parámetros exactos de cada bloque.
 * Todos los demás módulos consumen este archivo como fuente única de verdad.
 */

window.MVave = window.MVave || {};
var MVave = window.MVave;

/** Colores exactos de la interfaz M-VAVE EFCS por bloque */
MVave.BLOCK_COLORS = Object.freeze({
  FX:  '#d946ef',
  AMP: '#10b981',
  CAB: '#3b82f6',
  MOD: '#a855f7',
  REV: '#06b6d4',
  DLY: '#eab308',
});

/** Mapeo numérico nativo de M-VAVE para cada bloque en la cadena de señal */
MVave.BLOCK_ID_MAP = Object.freeze({
  FX:  0,
  AMP: 1,
  MOD: 2,
  DLY: 3,
  REV: 4,
  CAB: 5
});

MVave.BLOCK_ID_REVERSE = Object.freeze({
  0: 'FX',
  1: 'AMP',
  2: 'MOD',
  3: 'DLY',
  4: 'REV',
  5: 'CAB'
});

/** Orden de renderizado de bloques (cadena de señal por defecto) */
MVave.DEFAULT_SIGNAL_CHAIN = Object.freeze(['FX', 'AMP', 'CAB', 'MOD', 'REV', 'DLY']);
MVave.SIGNAL_CHAIN = MVave.DEFAULT_SIGNAL_CHAIN;

/** Esquema completo e inmutable del hardware DSP */
MVave.HARDWARE = Object.freeze({
  mVavePocketAmp: {
    version_esquema: '5.0.0_definitive',
    dsp_architecture: {
      blocks: {
        FX: {
          algorithms: {
            'Noise Gate': {
              controls: { Gate: { range: [0, 100] } },
            },
            Boost: {
              controls: { Gate: { range: [0, 100] }, Gain: { range: [0, 100] } },
            },
            Compress: {
              controls: {
                Gate:    { range: [0, 100] },
                Sustain: { range: [0, 100] },
                Attack:  { range: [0, 100] },
                Level:   { range: [0, 100] },
              },
            },
            'AI Ms Gate': {
              controls: { Gate: { range: [0, 100] }, Bias: { range: [0, 100] } },
            },
          },
        },
        AMP: {
          controls: {
            Gain:   { range: [0, 100] },
            Level:  { range: [0, 100] },
            Bass:   { range: [0, 100] },
            Mid:    { range: [0, 100] },
            Treble: { range: [0, 100] },
          },
          models: [
            { index: 1,  gui_label: '1J900 CL',     type: 'Clean',      emulation: 'Marshall JCM900' },
            { index: 2,  gui_label: '2FD CL',        type: 'Clean',      emulation: 'Fender 65 Deluxe Reverb' },
            { index: 3,  gui_label: '3JC120 CL',     type: 'Clean',      emulation: 'Roland JC-120 Jazz Chorus' },
            { index: 4,  gui_label: '4BLUE OD',      type: 'Overdrive',  emulation: 'BJFe Baby Blue OD Deluxe' },
            { index: 5,  gui_label: '5RAT OD',       type: 'Overdrive',  emulation: 'Pro Co RAT' },
            { index: 6,  gui_label: '6M-VAVE OD',    type: 'Overdrive',  emulation: 'M-VAVE OD' },
            { index: 7,  gui_label: '7SUPA OD',      type: 'Overdrive',  emulation: 'Xotic EP' },
            { index: 8,  gui_label: '8DARKS DS',     type: 'Distortion', emulation: 'TC Electronic Dark Matter' },
            { index: 9,  gui_label: '9J900 DS',      type: 'Distortion', emulation: 'Marshall JCM900 Distortion' },
            { index: 10, gui_label: '10JHS DS',      type: 'Distortion', emulation: "JHS 'Loud Is More Good'" },
            { index: 11, gui_label: '11EVH 5150',    type: 'Distortion', emulation: 'EVH 5150III 100W' },
            { index: 12, gui_label: '12FRIMAN',      type: 'Distortion', emulation: 'Friedman JJ-100' },
            { index: 13, gui_label: '13XC DS',       type: 'Distortion', emulation: 'Rocktron XDC' },
            { index: 14, gui_label: '14ROOM40',      type: 'Distortion', emulation: 'MPF Sounds Room' },
            { index: 15, gui_label: '15JVM',         type: 'Distortion', emulation: 'Marshall JVM410H' },
            { index: 16, gui_label: '16AgDb750 BS',  type: 'Bass',       emulation: 'Aguilar DB750' },
            { index: 17, gui_label: '17ApSVT BS',    type: 'Bass',       emulation: 'Ampeg SVT-CL' },
            { index: 18, gui_label: '18PjBuddy BS',  type: 'Bass',       emulation: 'Phil Jones Bass Buddy' },
            { index: 19, gui_label: '19DgXu BS',     type: 'Bass',       emulation: 'Darkglass Microtubes X Ultra' },
            { index: 20, gui_label: '20MarkLm BS',   type: 'Bass',       emulation: 'Markbass Little Mark 250' },
          ],
        },
        CAB: {
          controls: {
            Level:      { range: [0, 100] },
            'Low Cut':  { range: [0, 100] },
            'High Cut': { range: [0, 100] },
          },
          models: [
            { index: 1,  gui_label: '1AC-SeVin',      specs: '1x12', emulation: 'AC SEVIN with SM57' },
            { index: 2,  gui_label: '2JVM 1960 57',   specs: '4x12', emulation: 'Marshall 1960A 412 with SM57' },
            { index: 3,  gui_label: '3V30 MD421',     specs: '4x12', emulation: 'Orange PPC with MD421' },
            { index: 4,  gui_label: '4G12-EVH CT',    specs: '4x12', emulation: 'EVH 412 Straight with U87' },
            { index: 5,  gui_label: '5HIFI OK',       specs: '1x12', emulation: 'HIFI Full Frequency with MD421' },
            { index: 6,  gui_label: '6WANGS212 ECM',  specs: '2x12', emulation: 'Wangs GS212 G12 with U87' },
            { index: 7,  gui_label: '7VOX AC30',      specs: '2x12', emulation: 'VOX AC30 212 with U87' },
            { index: 8,  gui_label: '8FRMAN112',      specs: '1x12', emulation: 'Friedman Vintage 112 with MD421' },
            { index: 9,  gui_label: '9MeOSick-III',   specs: '4x12', emulation: 'Mesa Boogie Standard Oversized with MD421' },
            { index: 10, gui_label: '10SoldSC412',    specs: '4x12', emulation: 'Soldano Straight Classic with MD421' },
            { index: 11, gui_label: '11FD TW1980',    specs: '2x12', emulation: 'Fender 65 Deluxe Reverb with SM57' },
            { index: 12, gui_label: '12MESA 412',     specs: '4x12', emulation: 'Mesa Boogie Rectifier Traditional Straight with MD421' },
            { index: 13, gui_label: '13HIW412SWF',    specs: '4x12', emulation: 'Hiwatt SE 412 with U87' },
            { index: 14, gui_label: '14Recto 112',    specs: '1x12', emulation: 'Mesa Boogie Rectifier 112 with SM57' },
            { index: 15, gui_label: '15JC120 BOX',    specs: '2x12', emulation: 'Roland JC-120 Jazz Chorus 212 with SM57' },
            { index: 16, gui_label: '16Agula410',     specs: '4x10', emulation: 'Aguilar DB 410 with SM57' },
            { index: 17, gui_label: '17AgSVT410',     specs: '4x10', emulation: 'Ampeg Heritage SVT-410 HLF with MD421' },
            { index: 18, gui_label: '18DgDG212N',     specs: '2x12', emulation: 'Darkglass DG212N with MD421' },
            { index: 19, gui_label: '19MbSway210',    specs: '2x10', emulation: 'Mesa Boogie Subway 210 with MD421' },
            { index: 20, gui_label: '20TAce412',      specs: '4x12', emulation: 'Trace Elliot 412 with SM57' },
          ],
        },
        MOD: {
          algorithms: {
            Chorus:     { controls: { Speed: { range: [0,100] }, Depth: { range: [0,100] }, Mix:    { range: [0,100] } } },
            Phaser:     { controls: { Speed: { range: [0,100] }, ParamA:{ range: [0,100] }, ParamB: { range: [0,100] }, Fb: { range: [0,100] } } },
            Tremolo:    { controls: { Speed: { range: [0,100] }, Depth: { range: [0,100] }, Level:  { range: [0,100] } } },
            Flanger:    { controls: { Speed: { range: [0,100] }, Depth: { range: [0,100] }, Fb:     { range: [0,100] }, Mix: { range: [0,100] } } },
            Vibrato:    { controls: { Speed: { range: [0,100] }, Depth: { range: [0,100] } } },
            Univibe:    { controls: { Speed: { range: [0,100] }, Depth: { range: [0,100] }, Mix:    { range: [0,100] } } },
            Autofilter: { controls: { Speed: { range: [0,100] }, Min:   { range: [0,100] }, Max:    { range: [0,100] }, Mix: { range: [0,100] }, Fb: { range: [0,100] } } },
          },
        },
        REV: {
          algorithms: {
            Room:    { controls: { Decay: { range:[0,100] }, Mix: { range:[0,100] }, HPass: { range:[0,100] }, LPass: { range:[0,100] }, Depth: { range:[0,100] } } },
            Hall:    { controls: { Decay: { range:[0,100] }, Mix: { range:[0,100] }, HPass: { range:[0,100] }, LPass: { range:[0,100] }, Depth: { range:[0,100] } } },
            Swell:   { controls: { Decay: { range:[0,100] }, Mix: { range:[0,100] }, HPass: { range:[0,100] }, LPass: { range:[0,100] }, Depth: { range:[0,100] } } },
            Spring:  { controls: { Decay: { range:[0,100] }, Mix: { range:[0,100] }, HPass: { range:[0,100] }, LPass: { range:[0,100] }, Depth: { range:[0,100] } } },
            Shimmer: { controls: { Decay: { range:[0,100] }, Mix: { range:[0,100] }, HPass: { range:[0,100] }, LPass: { range:[0,100] }, Depth: { range:[0,100] } } },
            Cloud:   { controls: { Decay: { range:[0,100] }, Mix: { range:[0,100] }, HPass: { range:[0,100] }, LPass: { range:[0,100] }, Depth: { range:[0,100] } } },
          },
        },
        DLY: {
          algorithms: {
            Analog: { controls: { Time: { range:[0,100] }, Fb: { range:[0,100] }, Mix: { range:[0,100] }, Phaser: { range:[0,100] }, Pitch:  { range:[0,100] } } },
            Duck:   { controls: { Time: { range:[0,100] }, Fb: { range:[0,100] }, Mix: { range:[0,100] }, Unpack: { range:[0,100] }, Speed:  { range:[0,100] }, Depth: { range:[0,100] } } },
            Dtape:  { controls: { Time: { range:[0,100] }, Fb: { range:[0,100] }, Mix: { range:[0,100] }, Grit:   { range:[0,100] }, Speed:  { range:[0,100] }, Depth: { range:[0,100] } } },
            Dual:   { controls: { Time: { range:[0,100] }, Fb: { range:[0,100] }, Mix: { range:[0,100] }, Grit:   { range:[0,100] }, Speed:  { range:[0,100] }, Depth: { range:[0,100] } } },
            Lofi:   { controls: { Time: { range:[0,100] }, Fb: { range:[0,100] }, Mix: { range:[0,100] }, Grit:   { range:[0,100] }, Speed:  { range:[0,100] }, Depth: { range:[0,100] } } },
          },
        },
      },
    },
  },
});

/* ─── Utility Accessors ─────────────────────────────────── */

/** Devuelve el objeto de modelo AMP por índice (1-20) */
MVave.getAmpModel = (index) =>
  MVave.HARDWARE.mVavePocketAmp.dsp_architecture.blocks.AMP.models
    .find(m => m.index === index);

/** Devuelve el objeto de modelo CAB por índice (1-20) */
MVave.getCabModel = (index) =>
  MVave.HARDWARE.mVavePocketAmp.dsp_architecture.blocks.CAB.models
    .find(m => m.index === index);

/** Devuelve los controles de un algoritmo (FX, MOD, REV, DLY) */
MVave.getAlgorithmControls = (blockName, algoName) => {
  const block = MVave.HARDWARE.mVavePocketAmp.dsp_architecture.blocks[blockName];
  return block?.algorithms?.[algoName]?.controls || null;
};

/** Devuelve los controles fijos del bloque AMP */
MVave.getAmpControls = () =>
  MVave.HARDWARE.mVavePocketAmp.dsp_architecture.blocks.AMP.controls;

/** Devuelve los controles fijos del bloque CAB */
MVave.getCabControls = () =>
  MVave.HARDWARE.mVavePocketAmp.dsp_architecture.blocks.CAB.controls;
