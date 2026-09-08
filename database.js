'use strict';

/**
 * database.js — Base de datos acústica y musical para M-VAVE Preset Build
 * Contiene 326+ canciones icónicas catalogadas con sus perfiles tonales
 * y un catálogo de géneros musicales estándar con recomendaciones acústicas.
 */

window.MVave = window.MVave || {};
window.MVave.Database = (function() {
  const data = {
    "genres":  [
                   {
                       "name":  "Rock Clásico",
                       "subgenres":  [
                                         "Hard Rock",
                                         "British Rock",
                                         "Southern Rock"
                                     ],
                       "pedals":  "Overdrive suave o Boost, Spring Reverb",
                       "cab":  "4x12 Greenback",
                       "amp":  "UK 800 o PLEXI",
                       "desc":  "Crunch orgánico de amplificador a válvulas británico (estilo Marshall Plexi) con agudos definidos y medios presentes."
                   },
                   {
                       "name":  "Blues",
                       "subgenres":  [
                                         "Texas Blues",
                                         "Chicago Blues",
                                         "Slow Blues",
                                         "Delta Blues"
                                     ],
                       "pedals":  "Tube Overdrive (TS9), Spring Reverb",
                       "cab":  "1x12 o 2x12 US",
                       "amp":  "US DLX o TWEED",
                       "desc":  "Tono cálido al borde de la ruptura (edge of breakup), dinámico al toque de púa con medios dulces."
                   },
                   {
                       "name":  "Reggae",
                       "subgenres":  [
                                         "Roots Reggae",
                                         "Dub",
                                         "Reggae Rock",
                                         "Ska"
                                     ],
                       "pedals":  "Compresor de ataque rápido, Chorus sutil, Spring Reverb corta",
                       "cab":  "2x12 Open Back",
                       "amp":  "JAZZ 120 o US TWIN",
                       "desc":  "Clean rítmico muy percusivo en contratiempo (skank) con ataque seco, pastilla de puente y poco sustain."
                   },
                   {
                       "name":  "Jazz",
                       "subgenres":  [
                                         "Bebop",
                                         "Cool Jazz",
                                         "Jazz Fusion",
                                         "Soul Jazz"
                                     ],
                       "pedals":  "Compresor suave, Room Reverb o Plate ligera",
                       "cab":  "1x12 o 2x12 Clean",
                       "amp":  "JAZZ 120 o US DLX",
                       "desc":  "Tono limpio redondo, oscuro y aterciopelado. Pastilla de mástil con tono recortado y sin saturación."
                   },
                   {
                       "name":  "Heavy Metal",
                       "subgenres":  [
                                         "Traditional Metal",
                                         "NWOBHM",
                                         "80s Metal"
                                     ],
                       "pedals":  "Overdrive como boost de señal, Delay corto para solo, Reverb Hall",
                       "cab":  "4x12 V30",
                       "amp":  "UK 800 o CALI DUAL",
                       "desc":  "Distorsión sólida y compacta con medios altos mordientes para palm-mutes definidos y solos con sustain."
                   },
                   {
                       "name":  "Thrash Metal",
                       "subgenres":  [
                                         "Speed Metal",
                                         "Bay Area Thrash"
                                     ],
                       "pedals":  "Noise Gate / Comp, Tube Boost",
                       "cab":  "4x12 Recto",
                       "amp":  "CALI DUAL o GERMAN HIGH GAIN",
                       "desc":  "Alta ganancia agresiva, graves apretados con ecualización de medios perfilada y ataque punzante."
                   },
                   {
                       "name":  "Funk",
                       "subgenres":  [
                                         "Funk Rock",
                                         "P-Funk",
                                         "Disco Funk"
                                     ],
                       "pedals":  "Compresor dinámico (Dynacomp), Auto-Wah o Envelope Filter",
                       "cab":  "2x12 US",
                       "amp":  "US TWIN o JAZZ 120",
                       "desc":  "Clean ultra brillante y comprimido con ataque chasqueante para rasgueos rápidos en semicorcheas."
                   },
                   {
                       "name":  "Alternative Rock",
                       "subgenres":  [
                                         "Indie Rock",
                                         "Post-Punk",
                                         "College Rock"
                                     ],
                       "pedals":  "Chorus analógico, Overdrive + Fuzz, Plate Reverb",
                       "cab":  "2x12 UK",
                       "amp":  "UK 30 o UK 800",
                       "desc":  "Mezcla de cleans dinámicos y explosiones de distorsión con modulaciones espaciales."
                   },
                   {
                       "name":  "Grunge",
                       "subgenres":  [
                                         "90s Seattle Sound",
                                         "Post-Grunge"
                                     ],
                       "pedals":  "Distortion / Fuzz denso, Small Clone Chorus",
                       "cab":  "4x12 British",
                       "amp":  "UK 800 o CALI",
                       "desc":  "Guitarras crudas, graves pesados y distorsión tipo pedal Boss DS-1 o Big Muff sobre ampli valvular."
                   },
                   {
                       "name":  "Pop Rock",
                       "subgenres":  [
                                         "Power Pop",
                                         "80s Pop Rock",
                                         "Modern Pop"
                                     ],
                       "pedals":  "Compresor cristalino, Delay rítmico, Chorus estereofónico",
                       "cab":  "2x12 Alnico",
                       "amp":  "UK 30 o US DLX",
                       "desc":  "Sonido pulido de estudio, balance perfecto entre frecuencias, presencia y delay sincronizado."
                   },
                   {
                       "name":  "Ambient / Post-Rock",
                       "subgenres":  [
                                         "Shoegaze",
                                         "Dream Pop",
                                         "Cinematic"
                                     ],
                       "pedals":  "Shimmer Reverb o Hall al 70%, Delay analógico con feedback largo, Modulation",
                       "cab":  "2x12 Open",
                       "amp":  "US DLX o UK 30",
                       "desc":  "Capas envolventes y etéreas donde la guitarra se convierte en un sintetizador o colchón orquestal."
                   },
                   {
                       "name":  "Country",
                       "subgenres":  [
                                         "Chicken Pickin\u0027",
                                         "Americana",
                                         "Outlaw Country"
                                     ],
                       "pedals":  "Compresor óptico, Slapback Delay (120ms), Boost limpio",
                       "cab":  "1x15 o 2x12",
                       "amp":  "US TWIN o US TWEED",
                       "desc":  "Sonido \u0027twang\u0027 agudo y percusivo de Telecaster con compresión marcada y slapback echo."
                   },
                   {
                       "name":  "Punk Rock",
                       "subgenres":  [
                                         "Pop Punk",
                                         "Hardcore Punk",
                                         "70s Punk"
                                     ],
                       "pedals":  "Distortion / Overdrive directo, Reverb mínima",
                       "cab":  "4x12 Marshall",
                       "amp":  "UK 800 o PLEXI",
                       "desc":  "Distorsión directa y sin rodeos, medios crudos y directos, sin efectos innecesarios."
                   },
                   {
                       "name":  "Acústico / Simulación",
                       "subgenres":  [
                                         "Electroacústica",
                                         "Fingerstyle"
                                     ],
                       "pedals":  "Compresor transparente, Reverb Room, Chorus suave",
                       "cab":  "Acoustic IR / Cab Bypass",
                       "amp":  "ACOUSTIC o JAZZ 120",
                       "desc":  "Simulación de respuesta acústica plana y natural con alta definición en agudos y cuerpo cálido."
                   }
               ],
    "songs":  [
                  {
                      "id":  1,
                      "artist":  "The Jimi Hendrix Experience",
                      "song":  "Voodoo Child (Slight Return)",
                      "genre":  "Rock / Psychedelic",
                      "guitarist":  "Jimi Hendrix",
                      "style":  "Blues-rock experimental",
                      "sound":  "Fuzz-heavy, bright mids, biting highs",
                      "technique":  "Wah + fuzz + octave-like feedback",
                      "era":  "1960s"
                  },
                  {
                      "id":  2,
                      "artist":  "The Jimi Hendrix Experience",
                      "song":  "Little Wing",
                      "genre":  "Rock / Psychedelic",
                      "guitarist":  "Jimi Hendrix",
                      "style":  "Chord-melody virtuosity",
                      "sound":  "Clean-to-edge, glassy and spacious",
                      "technique":  "Univibe-like modulation + reverb",
                      "era":  "1960s"
                  },
                  {
                      "id":  3,
                      "artist":  "The Jimi Hendrix Experience",
                      "song":  "Purple Haze",
                      "genre":  "Rock / Psychedelic",
                      "guitarist":  "Jimi Hendrix",
                      "style":  "Psychedelic riffing",
                      "sound":  "Saturated fuzz, scooped-ish lows, strong mids",
                      "technique":  "Fuzz + wah",
                      "era":  "1960s"
                  },
                  {
                      "id":  4,
                      "artist":  "Cream",
                      "song":  "Sunshine of Your Love",
                      "genre":  "Blues Rock",
                      "guitarist":  "Eric Clapton",
                      "style":  "Woman-tone lead",
                      "sound":  "Thick, mid-forward, dark lead",
                      "technique":  "Wah parked / tone rolled back",
                      "era":  "1960s"
                  },
                  {
                      "id":  5,
                      "artist":  "Cream",
                      "song":  "White Room",
                      "genre":  "Psychedelic Rock",
                      "guitarist":  "Eric Clapton",
                      "style":  "Expressive blues-rock",
                      "sound":  "Thick overdrive with vocal mids",
                      "technique":  "Wah + heavy vibrato",
                      "era":  "1960s"
                  },
                  {
                      "id":  6,
                      "artist":  "Derek and the Dominos",
                      "song":  "Layla",
                      "genre":  "Blues Rock",
                      "guitarist":  "Eric Clapton / Duane Allman",
                      "style":  "Dual-guitar blues rock",
                      "sound":  "Overdriven rhythm + singing slide",
                      "technique":  "Slide + double-guitar layering",
                      "era":  "1970s"
                  },
                  {
                      "id":  7,
                      "artist":  "Eric Clapton",
                      "song":  "Cocaine",
                      "genre":  "Blues Rock",
                      "guitarist":  "Eric Clapton",
                      "style":  "Strat lead phrasing",
                      "sound":  "Dry, biting, moderately driven",
                      "technique":  "Strat quack + tight vibrato",
                      "era":  "1970s"
                  },
                  {
                      "id":  8,
                      "artist":  "Jeff Beck",
                      "song":  "Cause We\u0027ve Ended as Lovers",
                      "genre":  "Rock / Fusion",
                      "guitarist":  "Jeff Beck",
                      "style":  "Touch-sensitive lead",
                      "sound":  "Smooth, singing, dynamic",
                      "technique":  "Whammy bar + volume control",
                      "era":  "1970s"
                  },
                  {
                      "id":  9,
                      "artist":  "Jeff Beck",
                      "song":  "Beck\u0027s Bolero",
                      "genre":  "Rock",
                      "guitarist":  "Jeff Beck",
                      "style":  "Instrumental rock",
                      "sound":  "Crunchy, harmonically rich",
                      "technique":  "Bigsby/whammy expression",
                      "era":  "1960s"
                  },
                  {
                      "id":  10,
                      "artist":  "Led Zeppelin",
                      "song":  "Whole Lotta Love",
                      "genre":  "Hard Rock",
                      "guitarist":  "Jimmy Page",
                      "style":  "Riff-centric heavy rock",
                      "sound":  "Thick Marshall crunch, pronounced mids",
                      "technique":  "Tape echo + theremin textures",
                      "era":  "1970s"
                  },
                  {
                      "id":  11,
                      "artist":  "Led Zeppelin",
                      "song":  "Since I\u0027ve Been Loving You",
                      "genre":  "Blues Rock",
                      "guitarist":  "Jimmy Page",
                      "style":  "Slow blues expression",
                      "sound":  "Hot, woody, saturated lead",
                      "technique":  "Les Paul + Marshall + room ambience",
                      "era":  "1970s"
                  },
                  {
                      "id":  12,
                      "artist":  "Led Zeppelin",
                      "song":  "Black Dog",
                      "genre":  "Hard Rock",
                      "guitarist":  "Jimmy Page",
                      "style":  "Riff complexity",
                      "sound":  "Crunchy, compressed, articulate mids",
                      "technique":  "Multitrack overdubs",
                      "era":  "1970s"
                  },
                  {
                      "id":  13,
                      "artist":  "Led Zeppelin",
                      "song":  "The Ocean",
                      "genre":  "Hard Rock",
                      "guitarist":  "Jimmy Page",
                      "style":  "Riff orchestration",
                      "sound":  "Aggressive British crunch",
                      "technique":  "Les Paul + phase/room textures",
                      "era":  "1970s"
                  },
                  {
                      "id":  14,
                      "artist":  "Led Zeppelin",
                      "song":  "Kashmir",
                      "genre":  "Hard Rock / Prog",
                      "guitarist":  "Jimmy Page",
                      "style":  "Orchestral riffing",
                      "sound":  "Huge, focused, layered",
                      "technique":  "Alternate tunings + overdubs",
                      "era":  "1970s"
                  },
                  {
                      "id":  15,
                      "artist":  "Led Zeppelin",
                      "song":  "Heartbreaker",
                      "genre":  "Hard Rock",
                      "guitarist":  "Jimmy Page",
                      "style":  "Classic solo phrasing",
                      "sound":  "Raw Marshall distortion",
                      "technique":  "Les Paul + close-mic attack",
                      "era":  "1970s"
                  },
                  {
                      "id":  16,
                      "artist":  "Deep Purple",
                      "song":  "Smoke on the Water",
                      "genre":  "Hard Rock",
                      "guitarist":  "Ritchie Blackmore",
                      "style":  "Blues/classical hybrid",
                      "sound":  "Bright Marshall crunch",
                      "technique":  "Strat/bridge pickup + harmonic phrasing",
                      "era":  "1970s"
                  },
                  {
                      "id":  17,
                      "artist":  "Deep Purple",
                      "song":  "Highway Star",
                      "genre":  "Hard Rock",
                      "guitarist":  "Ritchie Blackmore",
                      "style":  "Classical-speed soloing",
                      "sound":  "Aggressive high-mid gain",
                      "technique":  "Harmonic minor + fast alternate picking",
                      "era":  "1970s"
                  },
                  {
                      "id":  18,
                      "artist":  "Deep Purple",
                      "song":  "Burn",
                      "genre":  "Hard Rock",
                      "guitarist":  "Ritchie Blackmore",
                      "style":  "Neoclassical rock",
                      "sound":  "Tight gain, glassy highs",
                      "technique":  "Fast legato + bends",
                      "era":  "1970s"
                  },
                  {
                      "id":  19,
                      "artist":  "Black Sabbath",
                      "song":  "Iron Man",
                      "genre":  "Heavy Rock",
                      "guitarist":  "Tony Iommi",
                      "style":  "Doom riffing",
                      "sound":  "Dark, thick, low-mid heavy",
                      "technique":  "Down-tuned riffing",
                      "era":  "1970s"
                  },
                  {
                      "id":  20,
                      "artist":  "Black Sabbath",
                      "song":  "Paranoid",
                      "genre":  "Heavy Rock",
                      "guitarist":  "Tony Iommi",
                      "style":  "Fast riff rock",
                      "sound":  "Dry, gritty, focused",
                      "technique":  "Down-tuned power chords",
                      "era":  "1970s"
                  },
                  {
                      "id":  21,
                      "artist":  "Black Sabbath",
                      "song":  "War Pigs",
                      "genre":  "Heavy Rock",
                      "guitarist":  "Tony Iommi",
                      "style":  "Doom/blues phrasing",
                      "sound":  "Dark, thick, saturated",
                      "technique":  "Hum-bucker lead + vibrato",
                      "era":  "1970s"
                  },
                  {
                      "id":  22,
                      "artist":  "AC/DC",
                      "song":  "Back in Black",
                      "genre":  "Hard Rock",
                      "guitarist":  "Angus Young",
                      "style":  "Minimalist hard-rock attack",
                      "sound":  "Dry Marshall crunch, strong upper mids",
                      "technique":  "Bridge humbucker + wide vibrato",
                      "era":  "1980s"
                  },
                  {
                      "id":  23,
                      "artist":  "AC/DC",
                      "song":  "Highway to Hell",
                      "genre":  "Hard Rock",
                      "guitarist":  "Angus Young",
                      "style":  "Riff-and-solo rock",
                      "sound":  "Raw, punchy, mid-forward",
                      "technique":  "SG + Marshall",
                      "era":  "1970s"
                  },
                  {
                      "id":  24,
                      "artist":  "AC/DC",
                      "song":  "Thunderstruck",
                      "genre":  "Hard Rock",
                      "guitarist":  "Angus Young",
                      "style":  "Repetitive high-energy riffing",
                      "sound":  "Bright, compressed crunch",
                      "technique":  "Pick-driven repeated figures",
                      "era":  "1990s"
                  },
                  {
                      "id":  25,
                      "artist":  "Aerosmith",
                      "song":  "Walk This Way",
                      "genre":  "Hard Rock",
                      "guitarist":  "Joe Perry / Brad Whitford",
                      "style":  "Groove riffing",
                      "sound":  "Dry, greasy overdrive",
                      "technique":  "Double-guitar panning",
                      "era":  "1970s"
                  },
                  {
                      "id":  26,
                      "artist":  "Aerosmith",
                      "song":  "Sweet Emotion",
                      "genre":  "Hard Rock",
                      "guitarist":  "Joe Perry",
                      "style":  "Textural riff rock",
                      "sound":  "Fuzzy, thick, slightly phasey",
                      "technique":  "Talk box + wah",
                      "era":  "1970s"
                  },
                  {
                      "id":  27,
                      "artist":  "Queen",
                      "song":  "Bohemian Rhapsody",
                      "genre":  "Rock",
                      "guitarist":  "Brian May",
                      "style":  "Orchestral guitar layering",
                      "sound":  "Smooth, sustained, harmonized",
                      "technique":  "Treble booster + AC30 + layered harmonies",
                      "era":  "1970s"
                  },
                  {
                      "id":  28,
                      "artist":  "Queen",
                      "song":  "Brighton Rock",
                      "genre":  "Rock",
                      "guitarist":  "Brian May",
                      "style":  "Multi-tracked lead guitar",
                      "sound":  "Singing, mid-forward, harmonized",
                      "technique":  "Treble booster + delay",
                      "era":  "1970s"
                  },
                  {
                      "id":  29,
                      "artist":  "Queen",
                      "song":  "We Will Rock You",
                      "genre":  "Arena Rock",
                      "guitarist":  "Brian May",
                      "style":  "Stadium riff economy",
                      "sound":  "Dry, punchy, bright crunch",
                      "technique":  "Layered handclaps + guitar stacks",
                      "era":  "1970s"
                  },
                  {
                      "id":  30,
                      "artist":  "Pink Floyd",
                      "song":  "Comfortably Numb",
                      "genre":  "Progressive Rock",
                      "guitarist":  "David Gilmour",
                      "style":  "Melodic sustain",
                      "sound":  "Smooth, singing, saturated but clear",
                      "technique":  "Big Muff + delay + reverb",
                      "era":  "1970s"
                  },
                  {
                      "id":  31,
                      "artist":  "Pink Floyd",
                      "song":  "Time",
                      "genre":  "Progressive Rock",
                      "guitarist":  "David Gilmour",
                      "style":  "Expressive lead phrasing",
                      "sound":  "Dark clean/edge with spatial effects",
                      "technique":  "Delay + reverb + bends",
                      "era":  "1970s"
                  },
                  {
                      "id":  32,
                      "artist":  "Pink Floyd",
                      "song":  "Money",
                      "genre":  "Progressive Rock",
                      "guitarist":  "David Gilmour",
                      "style":  "Blues-rock lead",
                      "sound":  "Focused overdrive, vocal mids",
                      "technique":  "Fuzz/overdrive + delay",
                      "era":  "1970s"
                  },
                  {
                      "id":  33,
                      "artist":  "Pink Floyd",
                      "song":  "Shine On You Crazy Diamond",
                      "genre":  "Progressive Rock",
                      "guitarist":  "David Gilmour",
                      "style":  "Atmospheric lead",
                      "sound":  "Clean ambient with sustained mids",
                      "technique":  "Big Muff + delay + modulation",
                      "era":  "1970s"
                  },
                  {
                      "id":  34,
                      "artist":  "Pink Floyd",
                      "song":  "Dogs",
                      "genre":  "Progressive Rock",
                      "guitarist":  "David Gilmour",
                      "style":  "Long-form textural soloing",
                      "sound":  "Compressed clean to overdrive",
                      "technique":  "Delay + phaser + slide",
                      "era":  "1970s"
                  },
                  {
                      "id":  35,
                      "artist":  "Dire Straits",
                      "song":  "Sultans of Swing",
                      "genre":  "Roots Rock",
                      "guitarist":  "Mark Knopfler",
                      "style":  "Fingerstyle electric",
                      "sound":  "Clean, crisp, woody",
                      "technique":  "Fingerpicking + Strat in-between pickup",
                      "era":  "1970s"
                  },
                  {
                      "id":  36,
                      "artist":  "Dire Straits",
                      "song":  "Money for Nothing",
                      "genre":  "Rock",
                      "guitarist":  "Mark Knopfler",
                      "style":  "Huge riff tone",
                      "sound":  "Thick, gated, punchy",
                      "technique":  "Wah parked + stacked amps",
                      "era":  "1980s"
                  },
                  {
                      "id":  37,
                      "artist":  "Dire Straits",
                      "song":  "Tunnel of Love",
                      "genre":  "Rock",
                      "guitarist":  "Mark Knopfler",
                      "style":  "Fingerstyle melodic lead",
                      "sound":  "Clean with singing sustain",
                      "technique":  "Fingerstyle + delay",
                      "era":  "1980s"
                  },
                  {
                      "id":  38,
                      "artist":  "The Rolling Stones",
                      "song":  "Can\u0027t You Hear Me Knocking",
                      "genre":  "Rock / Blues",
                      "guitarist":  "Mick Taylor",
                      "style":  "Loose blues-rock improvisation",
                      "sound":  "Warm, gritty, open",
                      "technique":  "Slide touches + Leslie-like ambience",
                      "era":  "1970s"
                  },
                  {
                      "id":  39,
                      "artist":  "The Rolling Stones",
                      "song":  "Gimme Shelter",
                      "genre":  "Rock",
                      "guitarist":  "Keith Richards",
                      "style":  "Open-tuned riff craft",
                      "sound":  "Gritty, compressed, mid-rich",
                      "technique":  "Open G tuning",
                      "era":  "1960s"
                  },
                  {
                      "id":  40,
                      "artist":  "The Rolling Stones",
                      "song":  "Brown Sugar",
                      "genre":  "Rock",
                      "guitarist":  "Keith Richards",
                      "style":  "Riff-driven roots rock",
                      "sound":  "Dry, raw crunch",
                      "technique":  "Open G + Tele/Les Paul",
                      "era":  "1970s"
                  },
                  {
                      "id":  41,
                      "artist":  "The Rolling Stones",
                      "song":  "Start Me Up",
                      "genre":  "Rock",
                      "guitarist":  "Keith Richards",
                      "style":  "Open-tuning rhythm",
                      "sound":  "Tight, biting, dry",
                      "technique":  "Open G + 5-string chord voicings",
                      "era":  "1980s"
                  },
                  {
                      "id":  42,
                      "artist":  "The Beatles",
                      "song":  "While My Guitar Gently Weeps",
                      "genre":  "Rock",
                      "guitarist":  "George Harrison / Eric Clapton",
                      "style":  "Emotive lead guitar",
                      "sound":  "Singing, compressed, warm",
                      "technique":  "Les Paul + overdrive",
                      "era":  "1960s"
                  },
                  {
                      "id":  43,
                      "artist":  "The Beatles",
                      "song":  "Taxman",
                      "genre":  "Rock",
                      "guitarist":  "George Harrison / Paul McCartney",
                      "style":  "Fuzzed-out melodic rock",
                      "sound":  "Bright fuzz, focused mids",
                      "technique":  "Fuzz + tremolo-like textures",
                      "era":  "1960s"
                  },
                  {
                      "id":  44,
                      "artist":  "The Beatles",
                      "song":  "And Your Bird Can Sing",
                      "genre":  "Rock",
                      "guitarist":  "George Harrison / Paul McCartney",
                      "style":  "Twin-guitar harmony",
                      "sound":  "Clean-to-edge, jangly",
                      "technique":  "Harmonized lead lines",
                      "era":  "1960s"
                  },
                  {
                      "id":  45,
                      "artist":  "The Who",
                      "song":  "Won\u0027t Get Fooled Again",
                      "genre":  "Rock",
                      "guitarist":  "Pete Townshend",
                      "style":  "Power-chord architecture",
                      "sound":  "Bright, aggressive rhythm",
                      "technique":  "Humbucker + high-volume amp",
                      "era":  "1970s"
                  },
                  {
                      "id":  46,
                      "artist":  "The Who",
                      "song":  "Baba O\u0027Riley",
                      "genre":  "Rock",
                      "guitarist":  "Pete Townshend",
                      "style":  "Open-chord power rock",
                      "sound":  "Crunchy, broad, dry",
                      "technique":  "ARP synth backdrop + rhythm guitar",
                      "era":  "1970s"
                  },
                  {
                      "id":  47,
                      "artist":  "Rush",
                      "song":  "Tom Sawyer",
                      "genre":  "Progressive Rock",
                      "guitarist":  "Alex Lifeson",
                      "style":  "Textural progressive riffing",
                      "sound":  "Bright, dense, layered",
                      "technique":  "Chorus + delay + overdrive",
                      "era":  "1980s"
                  },
                  {
                      "id":  48,
                      "artist":  "Rush",
                      "song":  "Limelight",
                      "genre":  "Progressive Rock",
                      "guitarist":  "Alex Lifeson",
                      "style":  "Melodic progressive lead",
                      "sound":  "Sustained, crisp, mid-rich",
                      "technique":  "Chorus + delay",
                      "era":  "1980s"
                  },
                  {
                      "id":  49,
                      "artist":  "Rush",
                      "song":  "La Villa Strangiato",
                      "genre":  "Progressive Rock",
                      "guitarist":  "Alex Lifeson",
                      "style":  "Instrumental virtuosity",
                      "sound":  "Clear high-gain with articulate mids",
                      "technique":  "Delay + harmonized sections",
                      "era":  "1970s"
                  },
                  {
                      "id":  50,
                      "artist":  "Van Halen",
                      "song":  "Eruption",
                      "genre":  "Hard Rock / Glam",
                      "guitarist":  "Eddie Van Halen",
                      "style":  "Two-hand tapping innovation",
                      "sound":  "Hot, bright, compressed high gain",
                      "technique":  "Tapping + tremolo bar",
                      "era":  "1970s"
                  },
                  {
                      "id":  51,
                      "artist":  "Van Halen",
                      "song":  "Ain\u0027t Talkin\u0027 \u0027Bout Love",
                      "genre":  "Hard Rock",
                      "guitarist":  "Eddie Van Halen",
                      "style":  "Groove riff + lead",
                      "sound":  "Brown sound, thick mids",
                      "technique":  "Phase/echo + humbucker",
                      "era":  "1970s"
                  },
                  {
                      "id":  52,
                      "artist":  "Van Halen",
                      "song":  "Unchained",
                      "genre":  "Hard Rock",
                      "guitarist":  "Eddie Van Halen",
                      "style":  "Rhythmic syncopation",
                      "sound":  "Aggressive, punchy, articulate",
                      "technique":  "Detune + flanger-like modulation",
                      "era":  "1980s"
                  },
                  {
                      "id":  53,
                      "artist":  "Guns N\u0027 Roses",
                      "song":  "Sweet Child o\u0027 Mine",
                      "genre":  "Hard Rock",
                      "guitarist":  "Slash",
                      "style":  "Singing Les Paul lead",
                      "sound":  "Warm, saturated, vocal mids",
                      "technique":  "Les Paul + Marshall + delay",
                      "era":  "1980s"
                  },
                  {
                      "id":  54,
                      "artist":  "Guns N\u0027 Roses",
                      "song":  "Welcome to the Jungle",
                      "genre":  "Hard Rock",
                      "guitarist":  "Slash",
                      "style":  "Riff + lead rock",
                      "sound":  "Crunchy, aggressive, bright",
                      "technique":  "Wah + high-gain Marshall",
                      "era":  "1980s"
                  },
                  {
                      "id":  55,
                      "artist":  "Guns N\u0027 Roses",
                      "song":  "November Rain",
                      "genre":  "Rock",
                      "guitarist":  "Slash",
                      "style":  "Orchestral power-ballad lead",
                      "sound":  "Sustained, smooth, wide",
                      "technique":  "Delay + reverb",
                      "era":  "1990s"
                  },
                  {
                      "id":  56,
                      "artist":  "Metallica",
                      "song":  "Nothing Else Matters",
                      "genre":  "Metal / Rock",
                      "guitarist":  "James Hetfield / Kirk Hammett",
                      "style":  "Clean arpeggiation to lead",
                      "sound":  "Clean glassy intro; singing lead",
                      "technique":  "Clean ambience + gain transition",
                      "era":  "1990s"
                  },
                  {
                      "id":  57,
                      "artist":  "Metallica",
                      "song":  "Enter Sandman",
                      "genre":  "Metal",
                      "guitarist":  "Kirk Hammett / James Hetfield",
                      "style":  "Modern riff metal",
                      "sound":  "Tight, scooped, aggressive",
                      "technique":  "Down-tuning + noise gate",
                      "era":  "1990s"
                  },
                  {
                      "id":  58,
                      "artist":  "Metallica",
                      "song":  "Master of Puppets",
                      "genre":  "Thrash Metal",
                      "guitarist":  "James Hetfield / Kirk Hammett",
                      "style":  "Precise palm-muted riffing",
                      "sound":  "Tight, percussive high gain",
                      "technique":  "High-gain + palm mute",
                      "era":  "1980s"
                  },
                  {
                      "id":  59,
                      "artist":  "Megadeth",
                      "song":  "Holy Wars... The Punishment Due",
                      "genre":  "Thrash Metal",
                      "guitarist":  "Marty Friedman / Dave Mustaine",
                      "style":  "Exotic lead/riff fusion",
                      "sound":  "Aggressive, articulate high gain",
                      "technique":  "Alternate picking + exotic scales",
                      "era":  "1990s"
                  },
                  {
                      "id":  60,
                      "artist":  "Megadeth",
                      "song":  "Tornado of Souls",
                      "genre":  "Thrash Metal",
                      "guitarist":  "Marty Friedman",
                      "style":  "Expressive melodic shredding",
                      "sound":  "Singing lead over tight rhythm",
                      "technique":  "Dime-like gain + melodic bends",
                      "era":  "1990s"
                  },
                  {
                      "id":  61,
                      "artist":  "Iron Maiden",
                      "song":  "The Trooper",
                      "genre":  "Heavy Metal",
                      "guitarist":  "Adrian Smith / Dave Murray",
                      "style":  "Twin-guitar harmonies",
                      "sound":  "Mid-forward British high gain",
                      "technique":  "Harmonized leads",
                      "era":  "1980s"
                  },
                  {
                      "id":  62,
                      "artist":  "Iron Maiden",
                      "song":  "Aces High",
                      "genre":  "Heavy Metal",
                      "guitarist":  "Adrian Smith / Dave Murray",
                      "style":  "Fast twin-lead metal",
                      "sound":  "Bright, tight gain",
                      "technique":  "Gallop picking + harmonies",
                      "era":  "1980s"
                  },
                  {
                      "id":  63,
                      "artist":  "Judas Priest",
                      "song":  "Breaking the Law",
                      "genre":  "Heavy Metal",
                      "guitarist":  "Glenn Tipton / K.K. Downing",
                      "style":  "Classic metal riffing",
                      "sound":  "Crunchy, bright, compact",
                      "technique":  "Palm mute + harmonized leads",
                      "era":  "1980s"
                  },
                  {
                      "id":  64,
                      "artist":  "Judas Priest",
                      "song":  "Painkiller",
                      "genre":  "Heavy Metal",
                      "guitarist":  "Glenn Tipton / K.K. Downing",
                      "style":  "Virtuosic metal lead",
                      "sound":  "High-gain, cutting mids",
                      "technique":  "Fast alternate picking + harmonies",
                      "era":  "1990s"
                  },
                  {
                      "id":  65,
                      "artist":  "Ozzy Osbourne",
                      "song":  "Crazy Train",
                      "genre":  "Heavy Metal",
                      "guitarist":  "Randy Rhoads",
                      "style":  "Classical metal vocabulary",
                      "sound":  "Bright, thick, precise",
                      "technique":  "Harmonic minor + high gain",
                      "era":  "1980s"
                  },
                  {
                      "id":  66,
                      "artist":  "Ozzy Osbourne",
                      "song":  "Mr. Crowley",
                      "genre":  "Heavy Metal",
                      "guitarist":  "Randy Rhoads",
                      "style":  "Neoclassical expression",
                      "sound":  "Singing, articulate lead",
                      "technique":  "Phaser + delay + vibrato",
                      "era":  "1980s"
                  },
                  {
                      "id":  67,
                      "artist":  "Motörhead",
                      "song":  "Ace of Spades",
                      "genre":  "Speed Rock / Metal",
                      "guitarist":  "Eddie Clarke",
                      "style":  "Raw speed-rock attack",
                      "sound":  "Dirty, compressed, mid-heavy",
                      "technique":  "Overdrive into loud amp",
                      "era":  "1980s"
                  },
                  {
                      "id":  68,
                      "artist":  "Ratt",
                      "song":  "Round and Round",
                      "genre":  "Glam Metal",
                      "guitarist":  "Warren DeMartini",
                      "style":  "Polished 80s lead tone",
                      "sound":  "Saturated, smooth, bright",
                      "technique":  "Chorus/delay + gain",
                      "era":  "1980s"
                  },
                  {
                      "id":  69,
                      "artist":  "Mötley Crüe",
                      "song":  "Kickstart My Heart",
                      "genre":  "Glam Metal",
                      "guitarist":  "Mick Mars",
                      "style":  "High-energy riffing",
                      "sound":  "Dense high gain, punchy mids",
                      "technique":  "Whammy + chorus/delay",
                      "era":  "1980s"
                  },
                  {
                      "id":  70,
                      "artist":  "Scorpions",
                      "song":  "Rock You Like a Hurricane",
                      "genre":  "Hard Rock",
                      "guitarist":  "Matthias Jabs / Rudolf Schenker",
                      "style":  "Melodic twin-guitar rock",
                      "sound":  "Bright, saturated, wide",
                      "technique":  "Harmonies + delay",
                      "era":  "1980s"
                  },
                  {
                      "id":  71,
                      "artist":  "Def Leppard",
                      "song":  "Photograph",
                      "genre":  "Hard Rock",
                      "guitarist":  "Phil Collen / Steve Clark",
                      "style":  "Layered studio guitar",
                      "sound":  "Polished, compressed, wide",
                      "technique":  "Multitracking + chorus",
                      "era":  "1980s"
                  },
                  {
                      "id":  72,
                      "artist":  "Dio",
                      "song":  "Holy Diver",
                      "genre":  "Heavy Metal",
                      "guitarist":  "Vivian Campbell",
                      "style":  "Melodic metal riffing",
                      "sound":  "Focused gain, strong mids",
                      "technique":  "Lead/rhythm layering",
                      "era":  "1980s"
                  },
                  {
                      "id":  73,
                      "artist":  "Rainbow",
                      "song":  "Stargazer",
                      "genre":  "Hard Rock / Metal",
                      "guitarist":  "Ritchie Blackmore",
                      "style":  "Epic riff + lead",
                      "sound":  "Warm Marshall saturation",
                      "technique":  "Minor-scale phrasing",
                      "era":  "1970s"
                  },
                  {
                      "id":  74,
                      "artist":  "Thin Lizzy",
                      "song":  "The Boys Are Back in Town",
                      "genre":  "Hard Rock",
                      "guitarist":  "Brian Robertson / Scott Gorham",
                      "style":  "Twin-guitar harmonization",
                      "sound":  "Crunchy, warm, singing",
                      "technique":  "Harmonized leads",
                      "era":  "1970s"
                  },
                  {
                      "id":  75,
                      "artist":  "Free",
                      "song":  "All Right Now",
                      "genre":  "Rock",
                      "guitarist":  "Paul Kossoff",
                      "style":  "Wide-vibrato blues rock",
                      "sound":  "Dry, warm, mid-forward",
                      "technique":  "Heavy vibrato + Les Paul",
                      "era":  "1970s"
                  },
                  {
                      "id":  76,
                      "artist":  "Bad Company",
                      "song":  "Can\u0027t Get Enough",
                      "genre":  "Rock",
                      "guitarist":  "Mick Ralphs",
                      "style":  "Simple crunchy rhythm",
                      "sound":  "Open, dry, muscular",
                      "technique":  "Les Paul/Tele + loud amp",
                      "era":  "1970s"
                  },
                  {
                      "id":  77,
                      "artist":  "Lynyrd Skynyrd",
                      "song":  "Free Bird",
                      "genre":  "Southern Rock",
                      "guitarist":  "Allen Collins / Gary Rossington",
                      "style":  "Multi-solo Southern rock",
                      "sound":  "Warm, sustaining overdrive",
                      "technique":  "Harmonized solos + slide",
                      "era":  "1970s"
                  },
                  {
                      "id":  78,
                      "artist":  "Lynyrd Skynyrd",
                      "song":  "Sweet Home Alabama",
                      "genre":  "Southern Rock",
                      "guitarist":  "Ed King / Gary Rossington",
                      "style":  "Country-rock riffing",
                      "sound":  "Clean-ish crunch, bright",
                      "technique":  "Strat/Les Paul blend",
                      "era":  "1970s"
                  },
                  {
                      "id":  79,
                      "artist":  "The Allman Brothers Band",
                      "song":  "Statesboro Blues",
                      "genre":  "Southern Rock / Blues",
                      "guitarist":  "Duane Allman / Dickey Betts",
                      "style":  "Slide and dual-lead blues",
                      "sound":  "Warm, singing, open",
                      "technique":  "Slide + dual guitar harmonies",
                      "era":  "1970s"
                  },
                  {
                      "id":  80,
                      "artist":  "The Allman Brothers Band",
                      "song":  "Jessica",
                      "genre":  "Southern Rock",
                      "guitarist":  "Dickey Betts",
                      "style":  "Instrumental country-rock melody",
                      "sound":  "Clean-to-edge, bright",
                      "technique":  "Major pentatonic phrasing",
                      "era":  "1970s"
                  },
                  {
                      "id":  81,
                      "artist":  "Steely Dan",
                      "song":  "Reelin\u0027 in the Years",
                      "genre":  "Rock / Jazz Rock",
                      "guitarist":  "Elliott Randall",
                      "style":  "Studio-fusion soloing",
                      "sound":  "Precise, compressed, bright",
                      "technique":  "Studio compression + overdrive",
                      "era":  "1970s"
                  },
                  {
                      "id":  82,
                      "artist":  "Steely Dan",
                      "song":  "Peg",
                      "genre":  "Rock / Jazz Rock",
                      "guitarist":  "Jay Graydon",
                      "style":  "Studio perfectionism",
                      "sound":  "Smooth, compressed, fluid",
                      "technique":  "Chorus-like width + compression",
                      "era":  "1970s"
                  },
                  {
                      "id":  83,
                      "artist":  "Santana",
                      "song":  "Black Magic Woman",
                      "genre":  "Latin Rock",
                      "guitarist":  "Carlos Santana",
                      "style":  "Sustain-heavy melodic lead",
                      "sound":  "Thick, smooth, vocal mids",
                      "technique":  "Neck humbucker + sustain",
                      "era":  "1970s"
                  },
                  {
                      "id":  84,
                      "artist":  "Santana",
                      "song":  "Europa",
                      "genre":  "Latin Rock",
                      "guitarist":  "Carlos Santana",
                      "style":  "Singing lyrical lead",
                      "sound":  "Warm, saturated, rounded highs",
                      "technique":  "Long sustain + vibrato",
                      "era":  "1970s"
                  },
                  {
                      "id":  85,
                      "artist":  "Santana",
                      "song":  "Oye Como Va",
                      "genre":  "Latin Rock",
                      "guitarist":  "Carlos Santana",
                      "style":  "Groove-oriented lead",
                      "sound":  "Mid-rich, fluid overdrive",
                      "technique":  "Latin rhythm + sustain",
                      "era":  "1970s"
                  },
                  {
                      "id":  86,
                      "artist":  "Boston",
                      "song":  "More Than a Feeling",
                      "genre":  "Arena Rock",
                      "guitarist":  "Tom Scholz",
                      "style":  "Layered melodic rock",
                      "sound":  "Bright, compressed, harmonized",
                      "technique":  "Multitracked guitars + chamber reverb",
                      "era":  "1970s"
                  },
                  {
                      "id":  87,
                      "artist":  "Boston",
                      "song":  "Foreplay/Long Time",
                      "genre":  "Arena Rock",
                      "guitarist":  "Tom Scholz",
                      "style":  "Dense layered guitar architecture",
                      "sound":  "Sustained, bright, wall-of-guitars",
                      "technique":  "Multitracking + delay",
                      "era":  "1970s"
                  },
                  {
                      "id":  88,
                      "artist":  "Foreigner",
                      "song":  "Juke Box Hero",
                      "genre":  "Arena Rock",
                      "guitarist":  "Mick Jones",
                      "style":  "Big-riff rock",
                      "sound":  "Crunchy, focused mids",
                      "technique":  "Overdrive + doubled rhythm",
                      "era":  "1980s"
                  },
                  {
                      "id":  89,
                      "artist":  "REO Speedwagon",
                      "song":  "Take It on the Run",
                      "genre":  "Arena Rock",
                      "guitarist":  "Gary Richrath",
                      "style":  "Melodic power-rock lead",
                      "sound":  "Smooth, singing overdrive",
                      "technique":  "Delay + chorus",
                      "era":  "1980s"
                  },
                  {
                      "id":  90,
                      "artist":  "Journey",
                      "song":  "Separate Ways",
                      "genre":  "Arena Rock",
                      "guitarist":  "Neal Schon",
                      "style":  "Melodic hard-rock lead",
                      "sound":  "Polished, saturated, singing",
                      "technique":  "Chorus + delay",
                      "era":  "1980s"
                  },
                  {
                      "id":  91,
                      "artist":  "Journey",
                      "song":  "Any Way You Want It",
                      "genre":  "Arena Rock",
                      "guitarist":  "Neal Schon",
                      "style":  "Aggressive melodic rock",
                      "sound":  "Bright, compressed crunch",
                      "technique":  "Humbucker + harmonized lead",
                      "era":  "1980s"
                  },
                  {
                      "id":  92,
                      "artist":  "Steve Miller Band",
                      "song":  "The Joker",
                      "genre":  "Rock / Blues",
                      "guitarist":  "Steve Miller",
                      "style":  "Simple blues groove",
                      "sound":  "Warm, dry, lightly driven",
                      "technique":  "Neck pickup + clean amp",
                      "era":  "1970s"
                  },
                  {
                      "id":  93,
                      "artist":  "ZZ Top",
                      "song":  "La Grange",
                      "genre":  "Blues Rock",
                      "guitarist":  "Billy Gibbons",
                      "style":  "Texas boogie minimalism",
                      "sound":  "Thick, fuzzy, mid-forward",
                      "technique":  "Les Paul/Marshall + pinch harmonics",
                      "era":  "1970s"
                  },
                  {
                      "id":  94,
                      "artist":  "ZZ Top",
                      "song":  "Sharp Dressed Man",
                      "genre":  "Blues Rock",
                      "guitarist":  "Billy Gibbons",
                      "style":  "Tight blues-rock riffing",
                      "sound":  "Processed, compressed, punchy",
                      "technique":  "Modern gain + chorus",
                      "era":  "1980s"
                  },
                  {
                      "id":  95,
                      "artist":  "George Thorogood",
                      "song":  "Bad to the Bone",
                      "genre":  "Blues Rock",
                      "guitarist":  "George Thorogood",
                      "style":  "Raw slide/bar-band blues",
                      "sound":  "Harsh, dry, gritty",
                      "technique":  "Slide + overdrive",
                      "era":  "1980s"
                  },
                  {
                      "id":  96,
                      "artist":  "The Doors",
                      "song":  "Roadhouse Blues",
                      "genre":  "Blues Rock",
                      "guitarist":  "Robby Krieger",
                      "style":  "Flamenco-influenced blues",
                      "sound":  "Dry, warm, rootsy",
                      "technique":  "Open chord voicings + blues phrasing",
                      "era":  "1970s"
                  },
                  {
                      "id":  97,
                      "artist":  "The Doors",
                      "song":  "Light My Fire",
                      "genre":  "Psychedelic Rock",
                      "guitarist":  "Robby Krieger",
                      "style":  "Modal improvisation",
                      "sound":  "Clean/edge, mid-rich",
                      "technique":  "Jazz/flamenco chord vocabulary",
                      "era":  "1960s"
                  },
                  {
                      "id":  98,
                      "artist":  "The Kinks",
                      "song":  "You Really Got Me",
                      "genre":  "Rock",
                      "guitarist":  "Dave Davies",
                      "style":  "Proto-metal distortion",
                      "sound":  "Raw, fuzzy, aggressive",
                      "technique":  "Fuzzed amp / speaker damage lore",
                      "era":  "1960s"
                  },
                  {
                      "id":  99,
                      "artist":  "The Animals",
                      "song":  "House of the Rising Sun",
                      "genre":  "Rock",
                      "guitarist":  "Hilton Valentine",
                      "style":  "Arpeggiated electric rock",
                      "sound":  "Clean, dramatic, bright",
                      "technique":  "Arpeggios + room ambience",
                      "era":  "1960s"
                  },
                  {
                      "id":  100,
                      "artist":  "The Byrds",
                      "song":  "Mr. Tambourine Man",
                      "genre":  "Folk Rock",
                      "guitarist":  "Roger McGuinn",
                      "style":  "Jangly electric 12-string",
                      "sound":  "Bright, compressed, chiming",
                      "technique":  "Rickenbacker 12-string + compressor",
                      "era":  "1960s"
                  },
                  {
                      "id":  101,
                      "artist":  "The Byrds",
                      "song":  "Eight Miles High",
                      "genre":  "Psychedelic Rock",
                      "guitarist":  "Roger McGuinn",
                      "style":  "Jazz-inflected jangle",
                      "sound":  "Bright, compressed, swirling",
                      "technique":  "12-string + alternate picking",
                      "era":  "1960s"
                  },
                  {
                      "id":  102,
                      "artist":  "The Velvet Underground",
                      "song":  "I\u0027m Waiting for the Man",
                      "genre":  "Proto-Punk / Art Rock",
                      "guitarist":  "Lou Reed",
                      "style":  "Minimalist riffing",
                      "sound":  "Dry, raw, gritty",
                      "technique":  "Simple barre chords + amp breakup",
                      "era":  "1960s"
                  },
                  {
                      "id":  103,
                      "artist":  "The Stooges",
                      "song":  "Search and Destroy",
                      "genre":  "Proto-Punk",
                      "guitarist":  "Ron Asheton",
                      "style":  "Aggressive riff rock",
                      "sound":  "Fuzzy, abrasive, mid-heavy",
                      "technique":  "Fuzz/overdrive",
                      "era":  "1970s"
                  },
                  {
                      "id":  104,
                      "artist":  "Television",
                      "song":  "Marquee Moon",
                      "genre":  "Art Rock",
                      "guitarist":  "Tom Verlaine / Richard Lloyd",
                      "style":  "Interlocking twin guitars",
                      "sound":  "Clean, wiry, spacious",
                      "technique":  "Delay + extended improvisation",
                      "era":  "1970s"
                  },
                  {
                      "id":  105,
                      "artist":  "Talking Heads",
                      "song":  "Psycho Killer",
                      "genre":  "New Wave",
                      "guitarist":  "David Byrne",
                      "style":  "Angular minimalism",
                      "sound":  "Clean, tight, percussive",
                      "technique":  "Staccato picking",
                      "era":  "1970s"
                  },
                  {
                      "id":  106,
                      "artist":  "The Police",
                      "song":  "Message in a Bottle",
                      "genre":  "New Wave / Reggae Rock",
                      "guitarist":  "Andy Summers",
                      "style":  "Reggae-jazz chordal guitar",
                      "sound":  "Bright, compressed, spacious",
                      "technique":  "Chorus + delay + triads",
                      "era":  "1970s"
                  },
                  {
                      "id":  107,
                      "artist":  "The Police",
                      "song":  "Every Breath You Take",
                      "genre":  "New Wave",
                      "guitarist":  "Andy Summers",
                      "style":  "Chordal arpeggio texture",
                      "sound":  "Clean, glassy, chorus-rich",
                      "technique":  "Chorus + delay",
                      "era":  "1980s"
                  },
                  {
                      "id":  108,
                      "artist":  "U2",
                      "song":  "Where the Streets Have No Name",
                      "genre":  "Rock",
                      "guitarist":  "The Edge",
                      "style":  "Ambient repetition",
                      "sound":  "Clean, shimmering, dotted-eighth ambience",
                      "technique":  "Delay + chorus",
                      "era":  "1980s"
                  },
                  {
                      "id":  109,
                      "artist":  "U2",
                      "song":  "Pride (In the Name of Love)",
                      "genre":  "Rock",
                      "guitarist":  "The Edge",
                      "style":  "Textural rhythmic guitar",
                      "sound":  "Bright, compressed, repeating",
                      "technique":  "Delay + compression",
                      "era":  "1980s"
                  },
                  {
                      "id":  110,
                      "artist":  "U2",
                      "song":  "With or Without You",
                      "genre":  "Rock",
                      "guitarist":  "The Edge",
                      "style":  "Minimalist sustain",
                      "sound":  "Clean to edge, wide ambience",
                      "technique":  "Delay + ebow-like sustain",
                      "era":  "1980s"
                  },
                  {
                      "id":  111,
                      "artist":  "R.E.M.",
                      "song":  "What\u0027s the Frequency, Kenneth?",
                      "genre":  "Alternative Rock",
                      "guitarist":  "Peter Buck",
                      "style":  "Jangly textured rock",
                      "sound":  "Bright, crunchy, open",
                      "technique":  "Rickenbacker/12-string texture",
                      "era":  "1990s"
                  },
                  {
                      "id":  112,
                      "artist":  "R.E.M.",
                      "song":  "Losing My Religion",
                      "genre":  "Alternative Rock",
                      "guitarist":  "Peter Buck",
                      "style":  "Mandolin-led string arrangement",
                      "sound":  "Clean, woody, percussive",
                      "technique":  "Mandolin / octave-string textures",
                      "era":  "1990s"
                  },
                  {
                      "id":  113,
                      "artist":  "Pearl Jam",
                      "song":  "Alive",
                      "genre":  "Alternative Rock / Grunge",
                      "guitarist":  "Stone Gossard / Mike McCready",
                      "style":  "Classic 90s rock lead",
                      "sound":  "Warm Marshall-like crunch, singing lead",
                      "technique":  "Pentatonic bends + layered guitars",
                      "era":  "1990s"
                  },
                  {
                      "id":  114,
                      "artist":  "Pearl Jam",
                      "song":  "Yellow Ledbetter",
                      "genre":  "Alternative Rock",
                      "guitarist":  "Mike McCready",
                      "style":  "Improvised melodic guitar",
                      "sound":  "Warm, open, bluesy",
                      "technique":  "Delay + expressive bends",
                      "era":  "1990s"
                  },
                  {
                      "id":  115,
                      "artist":  "Pearl Jam",
                      "song":  "Even Flow",
                      "genre":  "Grunge",
                      "guitarist":  "Mike McCready / Stone Gossard",
                      "style":  "Blues-metal fusion",
                      "sound":  "Crunchy, saturated, articulate",
                      "technique":  "Wah + expressive vibrato",
                      "era":  "1990s"
                  },
                  {
                      "id":  116,
                      "artist":  "Soundgarden",
                      "song":  "Black Hole Sun",
                      "genre":  "Grunge",
                      "guitarist":  "Kim Thayil",
                      "style":  "Unorthodox riffing",
                      "sound":  "Dark, saturated, eerie",
                      "technique":  "Alternate tunings + modulation",
                      "era":  "1990s"
                  },
                  {
                      "id":  117,
                      "artist":  "Alice in Chains",
                      "song":  "Man in the Box",
                      "genre":  "Grunge / Metal",
                      "guitarist":  "Jerry Cantrell",
                      "style":  "Heavy riff blues",
                      "sound":  "Dark, thick, compressed",
                      "technique":  "Talk box / wah-like vocal-guitar effect",
                      "era":  "1990s"
                  },
                  {
                      "id":  118,
                      "artist":  "Nirvana",
                      "song":  "Come as You Are",
                      "genre":  "Grunge",
                      "guitarist":  "Kurt Cobain",
                      "style":  "Simple atmospheric riff",
                      "sound":  "Clean, chorusy, dark",
                      "technique":  "Chorus + mild overdrive",
                      "era":  "1990s"
                  },
                  {
                      "id":  119,
                      "artist":  "Nirvana",
                      "song":  "Smells Like Teen Spirit",
                      "genre":  "Grunge",
                      "guitarist":  "Kurt Cobain",
                      "style":  "Power-chord grunge",
                      "sound":  "Fuzzy, compressed, aggressive",
                      "technique":  "Distortion + layered guitars",
                      "era":  "1990s"
                  },
                  {
                      "id":  120,
                      "artist":  "Foo Fighters",
                      "song":  "Everlong",
                      "genre":  "Alternative Rock",
                      "guitarist":  "Dave Grohl",
                      "style":  "Driving layered rock",
                      "sound":  "Dense, bright, compressed",
                      "technique":  "Tuned-down rhythm + doubled guitars",
                      "era":  "1990s"
                  },
                  {
                      "id":  121,
                      "artist":  "The Smashing Pumpkins",
                      "song":  "Cherub Rock",
                      "genre":  "Alternative Rock",
                      "guitarist":  "Billy Corgan / James Iha",
                      "style":  "Layered fuzz rock",
                      "sound":  "Huge, scooped, saturated",
                      "technique":  "Fuzz + layered overdubs",
                      "era":  "1990s"
                  },
                  {
                      "id":  122,
                      "artist":  "The Smashing Pumpkins",
                      "song":  "1979",
                      "genre":  "Alternative Rock",
                      "guitarist":  "Billy Corgan",
                      "style":  "Textural alternative pop",
                      "sound":  "Clean/processed, compressed",
                      "technique":  "Flanger/chorus-like processing",
                      "era":  "1990s"
                  },
                  {
                      "id":  123,
                      "artist":  "Radiohead",
                      "song":  "Paranoid Android",
                      "genre":  "Alternative Rock",
                      "guitarist":  "Jonny Greenwood / Ed O\u0027Brien",
                      "style":  "Art-rock textural guitar",
                      "sound":  "Multiple gain stages, gritty to ambient",
                      "technique":  "Delay + fuzz + dynamics",
                      "era":  "1990s"
                  },
                  {
                      "id":  124,
                      "artist":  "Radiohead",
                      "song":  "Street Spirit (Fade Out)",
                      "genre":  "Alternative Rock",
                      "guitarist":  "Jonny Greenwood",
                      "style":  "Arpeggiated minimalist guitar",
                      "sound":  "Bright, clean, hypnotic",
                      "technique":  "Arpeggios + compression",
                      "era":  "1990s"
                  },
                  {
                      "id":  125,
                      "artist":  "The White Stripes",
                      "song":  "Seven Nation Army",
                      "genre":  "Garage Rock",
                      "guitarist":  "Jack White",
                      "style":  "Octave-riff guitar/bass imitation",
                      "sound":  "Raw, mid-heavy, compressed",
                      "technique":  "Pitch octave effect",
                      "era":  "2000s"
                  },
                  {
                      "id":  126,
                      "artist":  "The White Stripes",
                      "song":  "Ball and Biscuit",
                      "genre":  "Blues Rock / Garage",
                      "guitarist":  "Jack White",
                      "style":  "Raw blues improvisation",
                      "sound":  "Fuzzy, spitty, dynamic",
                      "technique":  "Octafuzz-like tones + slide",
                      "era":  "2000s"
                  },
                  {
                      "id":  127,
                      "artist":  "The Black Keys",
                      "song":  "Lonely Boy",
                      "genre":  "Blues Rock",
                      "guitarist":  "Dan Auerbach",
                      "style":  "Garage-blues riffing",
                      "sound":  "Fuzzy, compressed, mid-forward",
                      "technique":  "Fuzz + amp breakup",
                      "era":  "2010s"
                  },
                  {
                      "id":  128,
                      "artist":  "The Black Keys",
                      "song":  "Gold on the Ceiling",
                      "genre":  "Blues Rock",
                      "guitarist":  "Dan Auerbach",
                      "style":  "Vintage garage riffing",
                      "sound":  "Thick fuzz, rolled-off highs",
                      "technique":  "Fuzz + tremolo-like modulation",
                      "era":  "2010s"
                  },
                  {
                      "id":  129,
                      "artist":  "Arctic Monkeys",
                      "song":  "Do I Wanna Know?",
                      "genre":  "Indie Rock",
                      "guitarist":  "Jamie Cook",
                      "style":  "Heavy riff minimalism",
                      "sound":  "Dark, saturated, bass-heavy",
                      "technique":  "Octave/downshifted riff feel",
                      "era":  "2010s"
                  },
                  {
                      "id":  130,
                      "artist":  "Queens of the Stone Age",
                      "song":  "No One Knows",
                      "genre":  "Stoner Rock",
                      "guitarist":  "Josh Homme",
                      "style":  "Dry, hypnotic riffing",
                      "sound":  "Dry, thick, low-mid focused",
                      "technique":  "Phaser + tuned-down attack",
                      "era":  "2000s"
                  },
                  {
                      "id":  131,
                      "artist":  "B.B. King",
                      "song":  "The Thrill Is Gone",
                      "genre":  "Blues",
                      "guitarist":  "B.B. King",
                      "style":  "Vocal-like lead phrasing",
                      "sound":  "Smooth, sustaining, treble-controlled",
                      "technique":  "Slow vibrato + minor blues scale",
                      "era":  "1960s"
                  },
                  {
                      "id":  132,
                      "artist":  "B.B. King",
                      "song":  "Every Day I Have the Blues",
                      "genre":  "Blues",
                      "guitarist":  "B.B. King",
                      "style":  "Call-and-response phrasing",
                      "sound":  "Clean-to-edge, singing mids",
                      "technique":  "Wide vibrato + dynamic picking",
                      "era":  "1960s"
                  },
                  {
                      "id":  133,
                      "artist":  "Albert King",
                      "song":  "Born Under a Bad Sign",
                      "genre":  "Blues / Soul",
                      "guitarist":  "Albert King",
                      "style":  "Left-handed string-bending style",
                      "sound":  "Thick, warm, mid-forward",
                      "technique":  "Extreme whole-step bends",
                      "era":  "1960s"
                  },
                  {
                      "id":  134,
                      "artist":  "Albert King",
                      "song":  "Crosscut Saw",
                      "genre":  "Blues",
                      "guitarist":  "Albert King",
                      "style":  "Riff-heavy Memphis blues",
                      "sound":  "Raw, punchy, thick",
                      "technique":  "String bends + thumb attack",
                      "era":  "1960s"
                  },
                  {
                      "id":  135,
                      "artist":  "Freddie King",
                      "song":  "Hide Away",
                      "genre":  "Blues",
                      "guitarist":  "Freddie King",
                      "style":  "Sharp Texas blues lead",
                      "sound":  "Bright, aggressive, articulate",
                      "technique":  "Pick attack + staccato bends",
                      "era":  "1960s"
                  },
                  {
                      "id":  136,
                      "artist":  "Freddie King",
                      "song":  "Have You Ever Loved a Woman",
                      "genre":  "Blues",
                      "guitarist":  "Freddie King",
                      "style":  "Emotive blues lead",
                      "sound":  "Warm, gritty, sustaining",
                      "technique":  "Major/minor blues interchange",
                      "era":  "1970s"
                  },
                  {
                      "id":  137,
                      "artist":  "Buddy Guy",
                      "song":  "Damn Right, I\u0027ve Got the Blues",
                      "genre":  "Blues",
                      "guitarist":  "Buddy Guy",
                      "style":  "Explosive Chicago blues",
                      "sound":  "Bright, biting, dynamic",
                      "technique":  "Volume swells + aggressive bends",
                      "era":  "1990s"
                  },
                  {
                      "id":  138,
                      "artist":  "Buddy Guy",
                      "song":  "Mary Had a Little Lamb",
                      "genre":  "Blues",
                      "guitarist":  "Buddy Guy",
                      "style":  "Rhythmic blues phrasing",
                      "sound":  "Clean-to-crunch, sharp mids",
                      "technique":  "Strat bridge pickup + bends",
                      "era":  "1960s"
                  },
                  {
                      "id":  139,
                      "artist":  "Muddy Waters",
                      "song":  "Mannish Boy",
                      "genre":  "Chicago Blues",
                      "guitarist":  "Muddy Waters",
                      "style":  "Riff-driven electric blues",
                      "sound":  "Raw, saturated, mid-heavy",
                      "technique":  "Slide touches + shuffle rhythm",
                      "era":  "1950s"
                  },
                  {
                      "id":  140,
                      "artist":  "Muddy Waters",
                      "song":  "Hoochie Coochie Man",
                      "genre":  "Chicago Blues",
                      "guitarist":  "Muddy Waters",
                      "style":  "Call-response riffing",
                      "sound":  "Dirty, dry, low-mid heavy",
                      "technique":  "Open-position riffs",
                      "era":  "1950s"
                  },
                  {
                      "id":  141,
                      "artist":  "Howlin\u0027 Wolf",
                      "song":  "Smokestack Lightnin\u0027",
                      "genre":  "Chicago Blues",
                      "guitarist":  "Hubert Sumlin",
                      "style":  "Sparse hypnotic guitar",
                      "sound":  "Dark, raw, roomy",
                      "technique":  "Minimal riffing + vibrato",
                      "era":  "1950s"
                  },
                  {
                      "id":  142,
                      "artist":  "Robert Johnson",
                      "song":  "Cross Road Blues",
                      "genre":  "Delta Blues",
                      "guitarist":  "Robert Johnson",
                      "style":  "Solo acoustic orchestration",
                      "sound":  "Dry, percussive, intimate",
                      "technique":  "Alternating bass + slide-inspired phrasing",
                      "era":  "1930s"
                  },
                  {
                      "id":  143,
                      "artist":  "Robert Johnson",
                      "song":  "Hell Hound on My Trail",
                      "genre":  "Delta Blues",
                      "guitarist":  "Robert Johnson",
                      "style":  "Acoustic rhythmic complexity",
                      "sound":  "Dark, tense, resonant",
                      "technique":  "Open/altered tuning + thumb bass",
                      "era":  "1930s"
                  },
                  {
                      "id":  144,
                      "artist":  "Elmore James",
                      "song":  "Dust My Broom",
                      "genre":  "Electric Blues",
                      "guitarist":  "Elmore James",
                      "style":  "Slide-guitar authority",
                      "sound":  "Bright, cutting, saturated",
                      "technique":  "Slide + repetitive riff",
                      "era":  "1950s"
                  },
                  {
                      "id":  145,
                      "artist":  "Son House",
                      "song":  "Death Letter",
                      "genre":  "Delta Blues",
                      "guitarist":  "Son House",
                      "style":  "Raw slide blues",
                      "sound":  "Dry, resonant, highly dynamic",
                      "technique":  "Open tuning + slide",
                      "era":  "1960s"
                  },
                  {
                      "id":  146,
                      "artist":  "T-Bone Walker",
                      "song":  "Stormy Monday",
                      "genre":  "Jump Blues",
                      "guitarist":  "T-Bone Walker",
                      "style":  "Jazz-blues chordal lead",
                      "sound":  "Smooth, clean, warm",
                      "technique":  "Chord melody + tremolo",
                      "era":  "1940s"
                  },
                  {
                      "id":  147,
                      "artist":  "John Lee Hooker",
                      "song":  "Boom Boom",
                      "genre":  "Blues",
                      "guitarist":  "John Lee Hooker",
                      "style":  "Boogie repetition",
                      "sound":  "Dry, mid-heavy, rhythmic",
                      "technique":  "Single-note boogie figures",
                      "era":  "1960s"
                  },
                  {
                      "id":  148,
                      "artist":  "Stevie Ray Vaughan",
                      "song":  "Pride and Joy",
                      "genre":  "Texas Blues",
                      "guitarist":  "Stevie Ray Vaughan",
                      "style":  "Hard-driving shuffle lead",
                      "sound":  "Thick, bright, powerful",
                      "technique":  "Strat + heavy strings + wide vibrato",
                      "era":  "1980s"
                  },
                  {
                      "id":  149,
                      "artist":  "Stevie Ray Vaughan",
                      "song":  "Texas Flood",
                      "genre":  "Texas Blues",
                      "guitarist":  "Stevie Ray Vaughan",
                      "style":  "Slow blues intensity",
                      "sound":  "Huge, warm, sustaining",
                      "technique":  "Neck pickup + dynamic volume",
                      "era":  "1980s"
                  },
                  {
                      "id":  150,
                      "artist":  "Stevie Ray Vaughan",
                      "song":  "Cold Shot",
                      "genre":  "Texas Blues",
                      "guitarist":  "Stevie Ray Vaughan",
                      "style":  "Funky minor blues",
                      "sound":  "Tight, dry, mid-forward",
                      "technique":  "Strat neck/bridge interplay",
                      "era":  "1980s"
                  },
                  {
                      "id":  151,
                      "artist":  "Stevie Ray Vaughan",
                      "song":  "Lenny",
                      "genre":  "Instrumental Blues",
                      "guitarist":  "Stevie Ray Vaughan",
                      "style":  "Clean lyrical instrumental",
                      "sound":  "Clean, glassy, warm",
                      "technique":  "Volume/tone control + fingerstyle touches",
                      "era":  "1980s"
                  },
                  {
                      "id":  152,
                      "artist":  "Gary Moore",
                      "song":  "Parisienne Walkways",
                      "genre":  "Blues Rock",
                      "guitarist":  "Gary Moore",
                      "style":  "Sustained melodic blues",
                      "sound":  "Thick, singing, very sustaining",
                      "technique":  "Les Paul + slow bends + delay",
                      "era":  "1970s"
                  },
                  {
                      "id":  153,
                      "artist":  "Gary Moore",
                      "song":  "Still Got the Blues",
                      "genre":  "Blues Rock",
                      "guitarist":  "Gary Moore",
                      "style":  "Power-ballad blues lead",
                      "sound":  "Mid-rich, smooth, sustaining",
                      "technique":  "Neck humbucker + long vibrato",
                      "era":  "1990s"
                  },
                  {
                      "id":  154,
                      "artist":  "Rory Gallagher",
                      "song":  "A Million Miles Away",
                      "genre":  "Blues Rock",
                      "guitarist":  "Rory Gallagher",
                      "style":  "Open-voiced blues rock",
                      "sound":  "Dynamic, biting, unpolished",
                      "technique":  "Strat + volume cleanup",
                      "era":  "1970s"
                  },
                  {
                      "id":  155,
                      "artist":  "Rory Gallagher",
                      "song":  "Shadow Play",
                      "genre":  "Blues Rock",
                      "guitarist":  "Rory Gallagher",
                      "style":  "Rhythmic blues-rock lead",
                      "sound":  "Bright, gritty, punchy",
                      "technique":  "Strat + overdrive",
                      "era":  "1970s"
                  },
                  {
                      "id":  156,
                      "artist":  "Peter Green",
                      "song":  "Oh Well",
                      "genre":  "Blues Rock",
                      "guitarist":  "Peter Green",
                      "style":  "Blues-rock riff/lead blend",
                      "sound":  "Warm, woody, slightly hollow",
                      "technique":  "Les Paul + restrained gain",
                      "era":  "1960s"
                  },
                  {
                      "id":  157,
                      "artist":  "Fleetwood Mac",
                      "song":  "Black Magic Woman",
                      "genre":  "Blues Rock",
                      "guitarist":  "Peter Green",
                      "style":  "Fluid melodic blues",
                      "sound":  "Warm, dark, sustaining",
                      "technique":  "Neck humbucker + vibrato",
                      "era":  "1960s"
                  },
                  {
                      "id":  158,
                      "artist":  "Taj Mahal",
                      "song":  "Statesboro Blues",
                      "genre":  "Blues",
                      "guitarist":  "Taj Mahal",
                      "style":  "Roots/blues slide",
                      "sound":  "Warm, dry, earthy",
                      "technique":  "Slide + open tuning",
                      "era":  "1960s"
                  },
                  {
                      "id":  159,
                      "artist":  "Bonnie Raitt",
                      "song":  "I Can\u0027t Make You Love Me",
                      "genre":  "Blues / Roots",
                      "guitarist":  "Bonnie Raitt",
                      "style":  "Expressive slide/roots phrasing",
                      "sound":  "Warm, clean, intimate",
                      "technique":  "Slide + restrained overdrive",
                      "era":  "1990s"
                  },
                  {
                      "id":  160,
                      "artist":  "Susan Tedeschi",
                      "song":  "It Hurt So Bad",
                      "genre":  "Blues Rock",
                      "guitarist":  "Susan Tedeschi",
                      "style":  "Modern blues-soul lead",
                      "sound":  "Thick, smooth, dynamic",
                      "technique":  "Neck pickup + soulful bends",
                      "era":  "2000s"
                  },
                  {
                      "id":  161,
                      "artist":  "Joe Bonamassa",
                      "song":  "Sloe Gin",
                      "genre":  "Blues Rock",
                      "guitarist":  "Joe Bonamassa",
                      "style":  "Modern sustaining blues lead",
                      "sound":  "Big, polished, thick",
                      "technique":  "Les Paul + high-gain overdrive",
                      "era":  "2000s"
                  },
                  {
                      "id":  162,
                      "artist":  "Joe Bonamassa",
                      "song":  "The Ballad of John Henry",
                      "genre":  "Blues Rock",
                      "guitarist":  "Joe Bonamassa",
                      "style":  "Heavy blues riffing",
                      "sound":  "Dense, mid-rich, saturated",
                      "technique":  "High-gain + delay",
                      "era":  "2000s"
                  },
                  {
                      "id":  163,
                      "artist":  "Keb\u0027 Mo\u0027",
                      "song":  "Am I Wrong",
                      "genre":  "Blues / Roots",
                      "guitarist":  "Keb\u0027 Mo\u0027",
                      "style":  "Modern Delta/roots groove",
                      "sound":  "Clean, warm, woody",
                      "technique":  "Slide + fingerstyle",
                      "era":  "1990s"
                  },
                  {
                      "id":  164,
                      "artist":  "Robben Ford",
                      "song":  "Talk to Your Daughter",
                      "genre":  "Blues / Fusion",
                      "guitarist":  "Robben Ford",
                      "style":  "Jazz-informed blues",
                      "sound":  "Clean/edge, articulate, mid-rich",
                      "technique":  "Overdrive + legato",
                      "era":  "1980s"
                  },
                  {
                      "id":  165,
                      "artist":  "Johnny Winter",
                      "song":  "Be Careful with a Fool",
                      "genre":  "Blues Rock",
                      "guitarist":  "Johnny Winter",
                      "style":  "Fast Texas slide/blues",
                      "sound":  "Bright, raw, aggressive",
                      "technique":  "Slide + high treble",
                      "era":  "1970s"
                  },
                  {
                      "id":  166,
                      "artist":  "Derek Trucks",
                      "song":  "Midnight in Harlem",
                      "genre":  "Blues / Roots",
                      "guitarist":  "Derek Trucks",
                      "style":  "Singing slide melody",
                      "sound":  "Smooth, vocal, sustaining",
                      "technique":  "Slide + open tuning",
                      "era":  "2010s"
                  },
                  {
                      "id":  167,
                      "artist":  "Susan Tedeschi / Derek Trucks",
                      "song":  "Midnight in Harlem",
                      "genre":  "Blues / Soul",
                      "guitarist":  "Derek Trucks / Susan Tedeschi",
                      "style":  "Slide + soulful rhythm",
                      "sound":  "Warm, spacious, dynamic",
                      "technique":  "Slide + Leslie-like ambience",
                      "era":  "2010s"
                  },
                  {
                      "id":  168,
                      "artist":  "Wes Montgomery",
                      "song":  "Four on Six",
                      "genre":  "Jazz",
                      "guitarist":  "Wes Montgomery",
                      "style":  "Octave melody playing",
                      "sound":  "Warm, rounded, clean",
                      "technique":  "Thumb picking + octave lines",
                      "era":  "1960s"
                  },
                  {
                      "id":  169,
                      "artist":  "Wes Montgomery",
                      "song":  "West Coast Blues",
                      "genre":  "Jazz",
                      "guitarist":  "Wes Montgomery",
                      "style":  "Hard bop chordal soloing",
                      "sound":  "Warm, articulate, woody",
                      "technique":  "Octaves + thumb attack",
                      "era":  "1960s"
                  },
                  {
                      "id":  170,
                      "artist":  "Grant Green",
                      "song":  "Idle Moments",
                      "genre":  "Jazz / Soul Jazz",
                      "guitarist":  "Grant Green",
                      "style":  "Bluesy single-note jazz",
                      "sound":  "Clean, bright, slightly dry",
                      "technique":  "Thumb/plectrum feel + blues phrasing",
                      "era":  "1960s"
                  },
                  {
                      "id":  171,
                      "artist":  "Grant Green",
                      "song":  "Green with Envy",
                      "genre":  "Jazz / Soul Jazz",
                      "guitarist":  "Grant Green",
                      "style":  "Groove-oriented jazz lead",
                      "sound":  "Clean, mid-forward, punchy",
                      "technique":  "Blues vocabulary + rhythmic accents",
                      "era":  "1960s"
                  },
                  {
                      "id":  172,
                      "artist":  "George Benson",
                      "song":  "Breezin\u0027",
                      "genre":  "Jazz / Smooth Jazz",
                      "guitarist":  "George Benson",
                      "style":  "Octave/single-note fusion",
                      "sound":  "Clean, polished, bright",
                      "technique":  "Alternate picking + octaves",
                      "era":  "1970s"
                  },
                  {
                      "id":  173,
                      "artist":  "George Benson",
                      "song":  "On Broadway",
                      "genre":  "Jazz / Soul",
                      "guitarist":  "George Benson",
                      "style":  "Virtuosic octave singing",
                      "sound":  "Warm clean with compression",
                      "technique":  "Octaves + scat/guitar unison",
                      "era":  "1970s"
                  },
                  {
                      "id":  174,
                      "artist":  "Joe Pass",
                      "song":  "For Django",
                      "genre":  "Jazz",
                      "guitarist":  "Joe Pass",
                      "style":  "Solo guitar harmony",
                      "sound":  "Dry, warm, woody",
                      "technique":  "Walking bass + chord melody",
                      "era":  "1970s"
                  },
                  {
                      "id":  175,
                      "artist":  "Jim Hall",
                      "song":  "St. Thomas",
                      "genre":  "Jazz",
                      "guitarist":  "Jim Hall",
                      "style":  "Sparse harmonic improvisation",
                      "sound":  "Warm, dry, subtle",
                      "technique":  "Chord melody + dynamics",
                      "era":  "1960s"
                  },
                  {
                      "id":  176,
                      "artist":  "Kenny Burrell",
                      "song":  "Midnight Blue",
                      "genre":  "Jazz / Soul Jazz",
                      "guitarist":  "Kenny Burrell",
                      "style":  "Blues-jazz groove",
                      "sound":  "Warm, dark, smooth",
                      "technique":  "Neck pickup + restrained attack",
                      "era":  "1960s"
                  },
                  {
                      "id":  177,
                      "artist":  "Barney Kessel",
                      "song":  "Autumn Leaves",
                      "genre":  "Jazz",
                      "guitarist":  "Barney Kessel",
                      "style":  "Chord-melody bop",
                      "sound":  "Clean, woody, articulate",
                      "technique":  "Pick + finger chord voicings",
                      "era":  "1950s"
                  },
                  {
                      "id":  178,
                      "artist":  "Johnny Smith",
                      "song":  "Moonlight in Vermont",
                      "genre":  "Jazz",
                      "guitarist":  "Johnny Smith",
                      "style":  "Lyrical chord melody",
                      "sound":  "Warm, pristine, compressed",
                      "technique":  "Jazz box + neck pickup",
                      "era":  "1950s"
                  },
                  {
                      "id":  179,
                      "artist":  "Tal Farlow",
                      "song":  "Lullaby of Birdland",
                      "genre":  "Jazz",
                      "guitarist":  "Tal Farlow",
                      "style":  "Bebop linearity",
                      "sound":  "Bright, clean, articulate",
                      "technique":  "Fast alternate picking",
                      "era":  "1950s"
                  },
                  {
                      "id":  180,
                      "artist":  "Pat Martino",
                      "song":  "Sunny",
                      "genre":  "Jazz Fusion",
                      "guitarist":  "Pat Martino",
                      "style":  "Dense single-note jazz",
                      "sound":  "Clean, focused, slightly overdriven",
                      "technique":  "Legato + alternate picking",
                      "era":  "1970s"
                  },
                  {
                      "id":  181,
                      "artist":  "John Scofield",
                      "song":  "A Go Go",
                      "genre":  "Jazz Fusion",
                      "guitarist":  "John Scofield",
                      "style":  "Funky angular jazz",
                      "sound":  "Dirty, compressed, nasal mids",
                      "technique":  "Overdrive + wah/filters",
                      "era":  "1990s"
                  },
                  {
                      "id":  182,
                      "artist":  "John Scofield",
                      "song":  "Chank",
                      "genre":  "Jazz Fusion",
                      "guitarist":  "John Scofield",
                      "style":  "Funk-jazz comping",
                      "sound":  "Dry, gritty, percussive",
                      "technique":  "Muted funk strumming",
                      "era":  "1990s"
                  },
                  {
                      "id":  183,
                      "artist":  "Pat Metheny",
                      "song":  "Last Train Home",
                      "genre":  "Jazz Fusion",
                      "guitarist":  "Pat Metheny",
                      "style":  "Lyrical ambient jazz guitar",
                      "sound":  "Clean, chorusy, spacious",
                      "technique":  "Chorus + delay + synth guitar color",
                      "era":  "1980s"
                  },
                  {
                      "id":  184,
                      "artist":  "Pat Metheny Group",
                      "song":  "Phase Dance",
                      "genre":  "Jazz Fusion",
                      "guitarist":  "Pat Metheny",
                      "style":  "Open harmonic texture",
                      "sound":  "Clean, warm, airy",
                      "technique":  "Chorus + delay",
                      "era":  "1970s"
                  },
                  {
                      "id":  185,
                      "artist":  "Allan Holdsworth",
                      "song":  "Devil Take the Hindmost",
                      "genre":  "Jazz Fusion",
                      "guitarist":  "Allan Holdsworth",
                      "style":  "Fluid legato fusion",
                      "sound":  "Saturated, smooth, endless sustain",
                      "technique":  "Legato + chorus/delay",
                      "era":  "1980s"
                  },
                  {
                      "id":  186,
                      "artist":  "Larry Carlton",
                      "song":  "Room 335",
                      "genre":  "Jazz Fusion",
                      "guitarist":  "Larry Carlton",
                      "style":  "Studio fusion lead",
                      "sound":  "Smooth, polished, mid-rich",
                      "technique":  "Overdrive + compression",
                      "era":  "1970s"
                  },
                  {
                      "id":  187,
                      "artist":  "Lee Ritenour",
                      "song":  "Rio Funk",
                      "genre":  "Jazz Fusion",
                      "guitarist":  "Lee Ritenour",
                      "style":  "Funky clean fusion",
                      "sound":  "Clean, crisp, compressed",
                      "technique":  "Funk muting + chorus",
                      "era":  "1980s"
                  },
                  {
                      "id":  188,
                      "artist":  "Larry Coryell",
                      "song":  "Spaces",
                      "genre":  "Jazz Fusion",
                      "guitarist":  "Larry Coryell",
                      "style":  "Early electric fusion",
                      "sound":  "Raw, edgy, dynamic",
                      "technique":  "Overdrive + jazz phrasing",
                      "era":  "1970s"
                  },
                  {
                      "id":  189,
                      "artist":  "John McLaughlin",
                      "song":  "Meeting of the Spirits",
                      "genre":  "Jazz Fusion",
                      "guitarist":  "John McLaughlin",
                      "style":  "High-energy fusion",
                      "sound":  "Bright, aggressive, cutting",
                      "technique":  "Fast alternate picking + gain",
                      "era":  "1970s"
                  },
                  {
                      "id":  190,
                      "artist":  "Mahavishnu Orchestra",
                      "song":  "Vital Transformation",
                      "genre":  "Jazz Fusion",
                      "guitarist":  "John McLaughlin",
                      "style":  "Virtuosic fusion riffing",
                      "sound":  "Hot, articulate, compressed",
                      "technique":  "Alternate picking + odd meters",
                      "era":  "1970s"
                  },
                  {
                      "id":  191,
                      "artist":  "Al Di Meola",
                      "song":  "Race with Devil on Spanish Highway",
                      "genre":  "Jazz Fusion",
                      "guitarist":  "Al Di Meola",
                      "style":  "Precision fusion picking",
                      "sound":  "Bright, dry, fast",
                      "technique":  "Alternate picking + sweep-like arpeggios",
                      "era":  "1970s"
                  },
                  {
                      "id":  192,
                      "artist":  "Larry Carlton",
                      "song":  "Kid Charlemagne",
                      "genre":  "Jazz Rock",
                      "guitarist":  "Larry Carlton",
                      "style":  "Iconic melodic studio solo",
                      "sound":  "Smooth, compressed, singing",
                      "technique":  "Overdrive + studio ambience",
                      "era":  "1970s"
                  },
                  {
                      "id":  193,
                      "artist":  "Steely Dan",
                      "song":  "My Old School",
                      "genre":  "Jazz Rock",
                      "guitarist":  "Denny Dias / Jeff Baxter",
                      "style":  "Studio guitar layering",
                      "sound":  "Clean/crunchy, precise",
                      "technique":  "Multiple guitar parts + compression",
                      "era":  "1970s"
                  },
                  {
                      "id":  194,
                      "artist":  "Miles Davis",
                      "song":  "Jean Pierre",
                      "genre":  "Jazz Fusion",
                      "guitarist":  "Mike Stern",
                      "style":  "Blues/fusion guitar energy",
                      "sound":  "Bright, gritty, mid-forward",
                      "technique":  "Overdrive + wah",
                      "era":  "1980s"
                  },
                  {
                      "id":  195,
                      "artist":  "Herbie Hancock",
                      "song":  "Actual Proof",
                      "genre":  "Jazz Funk",
                      "guitarist":  "Pete Cosey / Wah Wah Watson",
                      "style":  "Experimental funk guitar textures",
                      "sound":  "Clipped, processed, rhythmic",
                      "technique":  "Wah + fuzz + modulation",
                      "era":  "1970s"
                  },
                  {
                      "id":  196,
                      "artist":  "Frank Zappa",
                      "song":  "Black Napkins",
                      "genre":  "Jazz Rock / Experimental",
                      "guitarist":  "Frank Zappa",
                      "style":  "Composed-improvised lead",
                      "sound":  "Mid-rich, compressed, articulate",
                      "technique":  "Fretboard vibrato + wah",
                      "era":  "1970s"
                  },
                  {
                      "id":  197,
                      "artist":  "Bill Frisell",
                      "song":  "Throughout",
                      "genre":  "Jazz / Americana",
                      "guitarist":  "Bill Frisell",
                      "style":  "Ambient chordal guitar",
                      "sound":  "Clean, spacious, soft-edged",
                      "technique":  "Delay + volume swells",
                      "era":  "1990s"
                  },
                  {
                      "id":  198,
                      "artist":  "Emily Remler",
                      "song":  "East to Wes",
                      "genre":  "Jazz",
                      "guitarist":  "Emily Remler",
                      "style":  "Modern straight-ahead guitar",
                      "sound":  "Warm, crisp, blues-informed",
                      "technique":  "Neck pickup + articulate comping",
                      "era":  "1980s"
                  },
                  {
                      "id":  199,
                      "artist":  "Mike Stern",
                      "song":  "Chromazone",
                      "genre":  "Jazz Fusion",
                      "guitarist":  "Mike Stern",
                      "style":  "Rock-inflected fusion",
                      "sound":  "Bright, aggressive, singing",
                      "technique":  "Overdrive + delay",
                      "era":  "1980s"
                  },
                  {
                      "id":  200,
                      "artist":  "Prince",
                      "song":  "Purple Rain",
                      "genre":  "Pop Rock / Funk",
                      "guitarist":  "Prince",
                      "style":  "Expressive melodic lead",
                      "sound":  "Singing, saturated, spacious",
                      "technique":  "Compression + overdrive + reverb",
                      "era":  "1980s"
                  },
                  {
                      "id":  201,
                      "artist":  "Prince",
                      "song":  "Kiss",
                      "genre":  "Funk / Pop",
                      "guitarist":  "Prince",
                      "style":  "Minimal funk rhythm",
                      "sound":  "Dry, bright, percussive",
                      "technique":  "Muted strumming + compression",
                      "era":  "1980s"
                  },
                  {
                      "id":  202,
                      "artist":  "Prince",
                      "song":  "Bambi",
                      "genre":  "Funk Rock",
                      "guitarist":  "Prince",
                      "style":  "Fuzz-heavy guitar attack",
                      "sound":  "Aggressive, bright fuzz",
                      "technique":  "Fuzz + wah",
                      "era":  "1970s"
                  },
                  {
                      "id":  203,
                      "artist":  "Nile Rodgers / Chic",
                      "song":  "Le Freak",
                      "genre":  "Disco / Funk",
                      "guitarist":  "Nile Rodgers",
                      "style":  "Ultra-tight rhythm guitar",
                      "sound":  "Clean, dry, compressed",
                      "technique":  "16th-note funk + muting",
                      "era":  "1970s"
                  },
                  {
                      "id":  204,
                      "artist":  "Nile Rodgers / Chic",
                      "song":  "Good Times",
                      "genre":  "Disco / Funk",
                      "guitarist":  "Nile Rodgers",
                      "style":  "Rhythmic chord economy",
                      "sound":  "Clean, snappy, compressed",
                      "technique":  "Muted 16ths + single-note chords",
                      "era":  "1970s"
                  },
                  {
                      "id":  205,
                      "artist":  "Curtis Mayfield",
                      "song":  "Move On Up",
                      "genre":  "Soul / Funk",
                      "guitarist":  "Curtis Mayfield",
                      "style":  "High-register rhythm/lead hybrid",
                      "sound":  "Clean, thin, nasal, percussive",
                      "technique":  "Octave riffs + wah-like phrasing",
                      "era":  "1970s"
                  },
                  {
                      "id":  206,
                      "artist":  "Isaac Hayes",
                      "song":  "Theme from Shaft",
                      "genre":  "Soul / Funk",
                      "guitarist":  "Isaac Hayes session guitarists",
                      "style":  "Cinematic wah-funk",
                      "sound":  "Clean/fuzzy, filtered",
                      "technique":  "Wah + rhythmic stabs",
                      "era":  "1970s"
                  },
                  {
                      "id":  207,
                      "artist":  "James Brown",
                      "song":  "The Payback",
                      "genre":  "Funk",
                      "guitarist":  "Jimmy Nolen",
                      "style":  "Chicken-scratch rhythm",
                      "sound":  "Dry, bright, very percussive",
                      "technique":  "Muted scratches + single-note stabs",
                      "era":  "1970s"
                  },
                  {
                      "id":  208,
                      "artist":  "James Brown",
                      "song":  "I Feel Good",
                      "genre":  "Soul / Funk",
                      "guitarist":  "Jimmy Nolen",
                      "style":  "Tight funk rhythm",
                      "sound":  "Clean, sharp, compressed",
                      "technique":  "16th-note muted strumming",
                      "era":  "1960s"
                  },
                  {
                      "id":  209,
                      "artist":  "Sly and the Family Stone",
                      "song":  "Thank You (Falettinme Be Mice Elf Agin)",
                      "genre":  "Funk",
                      "guitarist":  "Freddie Stone",
                      "style":  "Raw rhythmic funk",
                      "sound":  "Dry, gritty, mid-forward",
                      "technique":  "Syncopated riffing",
                      "era":  "1960s"
                  },
                  {
                      "id":  210,
                      "artist":  "Earth, Wind \u0026 Fire",
                      "song":  "September",
                      "genre":  "Funk / Disco",
                      "guitarist":  "Al McKay / Johnny Graham",
                      "style":  "Polished funk rhythm",
                      "sound":  "Clean, bright, compressed",
                      "technique":  "Muted 16ths + chorus sheen",
                      "era":  "1970s"
                  },
                  {
                      "id":  211,
                      "artist":  "Marvin Gaye",
                      "song":  "What\u0027s Going On",
                      "genre":  "Soul",
                      "guitarist":  "session guitarists",
                      "style":  "Textural soul guitar",
                      "sound":  "Clean, warm, understated",
                      "technique":  "Chordal fills + tremolo ambience",
                      "era":  "1970s"
                  },
                  {
                      "id":  212,
                      "artist":  "Chet Atkins",
                      "song":  "Mr. Sandman",
                      "genre":  "Country",
                      "guitarist":  "Chet Atkins",
                      "style":  "Fingerstyle country",
                      "sound":  "Clean, warm, articulate",
                      "technique":  "Travis picking",
                      "era":  "1950s"
                  },
                  {
                      "id":  213,
                      "artist":  "Merle Travis",
                      "song":  "Cannonball Rag",
                      "genre":  "Country",
                      "guitarist":  "Merle Travis",
                      "style":  "Travis picking foundation",
                      "sound":  "Bright, dry, woody",
                      "technique":  "Thumb-bass fingerpicking",
                      "era":  "1940s"
                  },
                  {
                      "id":  214,
                      "artist":  "Clarence White",
                      "song":  "Nashville West",
                      "genre":  "Country Rock",
                      "guitarist":  "Clarence White",
                      "style":  "B-bender country lead",
                      "sound":  "Clean, twangy, compressed",
                      "technique":  "B-bender + hybrid picking",
                      "era":  "1960s"
                  },
                  {
                      "id":  215,
                      "artist":  "James Burton",
                      "song":  "Hello Mary Lou",
                      "genre":  "Rockabilly / Country",
                      "guitarist":  "James Burton",
                      "style":  "Telecaster twang",
                      "sound":  "Bright, snappy, dry",
                      "technique":  "Hybrid picking + bends",
                      "era":  "1960s"
                  },
                  {
                      "id":  216,
                      "artist":  "Don Rich",
                      "song":  "Buckaroo",
                      "genre":  "Country",
                      "guitarist":  "Don Rich",
                      "style":  "Bakersfield Tele twang",
                      "sound":  "Clean, bright, percussive",
                      "technique":  "Tele bridge + chicken picking",
                      "era":  "1960s"
                  },
                  {
                      "id":  217,
                      "artist":  "Brad Paisley",
                      "song":  "Mud on the Tires",
                      "genre":  "Country",
                      "guitarist":  "Brad Paisley",
                      "style":  "Modern Tele virtuosity",
                      "sound":  "Clean-to-edge, sparkling",
                      "technique":  "Hybrid picking + bends",
                      "era":  "2000s"
                  },
                  {
                      "id":  218,
                      "artist":  "Albert Lee",
                      "song":  "Country Boy",
                      "genre":  "Country",
                      "guitarist":  "Albert Lee",
                      "style":  "High-speed hybrid picking",
                      "sound":  "Clean, bright, punchy",
                      "technique":  "Hybrid picking",
                      "era":  "1970s"
                  },
                  {
                      "id":  219,
                      "artist":  "Molly Tuttle",
                      "song":  "White Rabbit",
                      "genre":  "Bluegrass / Americana",
                      "guitarist":  "Molly Tuttle",
                      "style":  "Modern flatpicking",
                      "sound":  "Clean, woody, articulate",
                      "technique":  "Crosspicking + flatpicking",
                      "era":  "2020s"
                  },
                  {
                      "id":  220,
                      "artist":  "Tony Rice",
                      "song":  "Church Street Blues",
                      "genre":  "Bluegrass",
                      "guitarist":  "Tony Rice",
                      "style":  "Flatpicked acoustic precision",
                      "sound":  "Warm, dry, focused",
                      "technique":  "Flatpicking + syncopation",
                      "era":  "1970s"
                  },
                  {
                      "id":  221,
                      "artist":  "Doc Watson",
                      "song":  "Deep River Blues",
                      "genre":  "Folk / Bluegrass",
                      "guitarist":  "Doc Watson",
                      "style":  "Flatpicking acoustic blues",
                      "sound":  "Dry, resonant, percussive",
                      "technique":  "Flatpicking + alternating bass",
                      "era":  "1960s"
                  },
                  {
                      "id":  222,
                      "artist":  "Dick Dale",
                      "song":  "Misirlou",
                      "genre":  "Surf Rock",
                      "guitarist":  "Dick Dale",
                      "style":  "Aggressive tremolo surf",
                      "sound":  "Bright, wet, percussive",
                      "technique":  "Tremolo picking + spring reverb",
                      "era":  "1960s"
                  },
                  {
                      "id":  223,
                      "artist":  "The Ventures",
                      "song":  "Walk Don\u0027t Run",
                      "genre":  "Surf / Instrumental Rock",
                      "guitarist":  "Don Wilson / Bob Bogle",
                      "style":  "Clean instrumental rock",
                      "sound":  "Bright, springy, twangy",
                      "technique":  "Tremolo + spring reverb",
                      "era":  "1960s"
                  },
                  {
                      "id":  224,
                      "artist":  "The Chantays",
                      "song":  "Pipeline",
                      "genre":  "Surf Rock",
                      "guitarist":  "Bob Spickard / Brian Carman",
                      "style":  "Dramatic surf instrumental",
                      "sound":  "Dark surf, spacious",
                      "technique":  "Spring reverb + tremolo",
                      "era":  "1960s"
                  },
                  {
                      "id":  225,
                      "artist":  "Link Wray",
                      "song":  "Rumble",
                      "genre":  "Rock / Proto-Punk",
                      "guitarist":  "Link Wray",
                      "style":  "Power-chord distortion pioneer",
                      "sound":  "Raw, distorted, mid-heavy",
                      "technique":  "Amp breakup + tremolo",
                      "era":  "1950s"
                  },
                  {
                      "id":  226,
                      "artist":  "Johnny Ramone",
                      "song":  "Blitzkrieg Bop",
                      "genre":  "Punk Rock",
                      "guitarist":  "Johnny Ramone",
                      "style":  "Downstroke rhythm discipline",
                      "sound":  "Dry, aggressive, mid-forward",
                      "technique":  "All-downstroke picking",
                      "era":  "1970s"
                  },
                  {
                      "id":  227,
                      "artist":  "The Clash",
                      "song":  "London Calling",
                      "genre":  "Punk / Rock",
                      "guitarist":  "Mick Jones / Joe Strummer",
                      "style":  "Punk-reggae hybrid",
                      "sound":  "Crunchy, dry, open",
                      "technique":  "Reggae skank + power chords",
                      "era":  "1970s"
                  },
                  {
                      "id":  228,
                      "artist":  "The Clash",
                      "song":  "Should I Stay or Should I Go",
                      "genre":  "Punk Rock",
                      "guitarist":  "Mick Jones",
                      "style":  "Direct riff rock",
                      "sound":  "Bright, gritty, tight",
                      "technique":  "Marshall-like crunch",
                      "era":  "1980s"
                  },
                  {
                      "id":  229,
                      "artist":  "Buzzcocks",
                      "song":  "Ever Fallen in Love",
                      "genre":  "Punk / Power Pop",
                      "guitarist":  "Steve Diggle / Pete Shelley",
                      "style":  "Jangly punk melody",
                      "sound":  "Bright, compressed, chimey",
                      "technique":  "Power-pop picking",
                      "era":  "1970s"
                  },
                  {
                      "id":  230,
                      "artist":  "Joy Division",
                      "song":  "Disorder",
                      "genre":  "Post-Punk",
                      "guitarist":  "Bernard Sumner",
                      "style":  "Minimal, angular repetition",
                      "sound":  "Clean, chorusy, dark",
                      "technique":  "Delay + chorus",
                      "era":  "1970s"
                  },
                  {
                      "id":  231,
                      "artist":  "The Cure",
                      "song":  "A Forest",
                      "genre":  "Post-Punk",
                      "guitarist":  "Robert Smith",
                      "style":  "Atmospheric arpeggiation",
                      "sound":  "Dark clean, chorus-rich",
                      "technique":  "Chorus + delay",
                      "era":  "1980s"
                  },
                  {
                      "id":  232,
                      "artist":  "The Smiths",
                      "song":  "This Charming Man",
                      "genre":  "Indie Rock",
                      "guitarist":  "Johnny Marr",
                      "style":  "Jangle/chordal sophistication",
                      "sound":  "Bright, chiming, layered",
                      "technique":  "12-string-like chorus + alternate voicings",
                      "era":  "1980s"
                  },
                  {
                      "id":  233,
                      "artist":  "The Smiths",
                      "song":  "How Soon Is Now?",
                      "genre":  "Alternative / Post-Punk",
                      "guitarist":  "Johnny Marr",
                      "style":  "Pulsing vibrato guitar",
                      "sound":  "Dark, wide, modulated",
                      "technique":  "Tremolo + reverb + flanger",
                      "era":  "1980s"
                  },
                  {
                      "id":  234,
                      "artist":  "Pixies",
                      "song":  "Where Is My Mind?",
                      "genre":  "Alternative Rock",
                      "guitarist":  "Joey Santiago",
                      "style":  "Dynamics-driven alt guitar",
                      "sound":  "Clean-to-fuzz, stark",
                      "technique":  "Stop/start dynamics + chorus",
                      "era":  "1980s"
                  },
                  {
                      "id":  235,
                      "artist":  "My Bloody Valentine",
                      "song":  "Only Shallow",
                      "genre":  "Shoegaze",
                      "guitarist":  "Kevin Shields / Bilinda Butcher",
                      "style":  "Pitch-bending wall of sound",
                      "sound":  "Massive, fuzzy, smeared",
                      "technique":  "Tremolo arm + reverse-like reverb",
                      "era":  "1990s"
                  },
                  {
                      "id":  236,
                      "artist":  "My Bloody Valentine",
                      "song":  "When You Sleep",
                      "genre":  "Shoegaze",
                      "guitarist":  "Kevin Shields",
                      "style":  "Dense pitch-warped texture",
                      "sound":  "Warm, saturated, hazy",
                      "technique":  "Tremolo arm + layers",
                      "era":  "1990s"
                  },
                  {
                      "id":  237,
                      "artist":  "The Stone Roses",
                      "song":  "I Am the Resurrection",
                      "genre":  "Alternative Rock",
                      "guitarist":  "John Squire",
                      "style":  "Extended blues/psychedelic lead",
                      "sound":  "Bright, articulate, sustaining",
                      "technique":  "Wah + delay",
                      "era":  "1980s"
                  },
                  {
                      "id":  238,
                      "artist":  "The Verve",
                      "song":  "The Drugs Don\u0027t Work",
                      "genre":  "Alternative Rock",
                      "guitarist":  "Nick McCabe",
                      "style":  "Ambient guitar texture",
                      "sound":  "Clean, warm, spacious",
                      "technique":  "Delay + reverb",
                      "era":  "1990s"
                  },
                  {
                      "id":  239,
                      "artist":  "Oasis",
                      "song":  "Live Forever",
                      "genre":  "Britpop",
                      "guitarist":  "Noel Gallagher",
                      "style":  "Layered anthem guitar",
                      "sound":  "Crunchy, bright, wide",
                      "technique":  "Multiple rhythm layers",
                      "era":  "1990s"
                  },
                  {
                      "id":  240,
                      "artist":  "Oasis",
                      "song":  "Don\u0027t Look Back in Anger",
                      "genre":  "Britpop",
                      "guitarist":  "Noel Gallagher",
                      "style":  "Classic pop-rock arpeggiation",
                      "sound":  "Clean/edge, jangly",
                      "technique":  "Delay + layered acoustics/electric",
                      "era":  "1990s"
                  },
                  {
                      "id":  241,
                      "artist":  "John Frusciante / Red Hot Chili Peppers",
                      "song":  "Under the Bridge",
                      "genre":  "Alternative / Funk Rock",
                      "guitarist":  "John Frusciante",
                      "style":  "Chordal dynamics",
                      "sound":  "Clean, compressed, bright",
                      "technique":  "Strat + chorus/reverb",
                      "era":  "1990s"
                  },
                  {
                      "id":  242,
                      "artist":  "Red Hot Chili Peppers",
                      "song":  "Scar Tissue",
                      "genre":  "Alternative Rock",
                      "guitarist":  "John Frusciante",
                      "style":  "Melodic slide/rhythm",
                      "sound":  "Clean, dry, jangly",
                      "technique":  "Slide + neck pickup",
                      "era":  "1990s"
                  },
                  {
                      "id":  243,
                      "artist":  "Red Hot Chili Peppers",
                      "song":  "Give It Away",
                      "genre":  "Funk Rock",
                      "guitarist":  "John Frusciante",
                      "style":  "Percussive funk attack",
                      "sound":  "Dry, bright, compressed",
                      "technique":  "Muted 16ths + wah",
                      "era":  "1990s"
                  },
                  {
                      "id":  244,
                      "artist":  "Rage Against the Machine",
                      "song":  "Killing in the Name",
                      "genre":  "Alternative Metal",
                      "guitarist":  "Tom Morello",
                      "style":  "Effects-as-instrument experimentation",
                      "sound":  "Dry, aggressive, mid-heavy",
                      "technique":  "Whammy + toggle switches",
                      "era":  "1990s"
                  },
                  {
                      "id":  245,
                      "artist":  "Rage Against the Machine",
                      "song":  "Bulls on Parade",
                      "genre":  "Alternative Metal",
                      "guitarist":  "Tom Morello",
                      "style":  "DJ-like guitar effects",
                      "sound":  "Aggressive, filtered, rhythmic",
                      "technique":  "Whammy + wah + pickup selector",
                      "era":  "1990s"
                  },
                  {
                      "id":  246,
                      "artist":  "Audioslave",
                      "song":  "Cochise",
                      "genre":  "Alternative Rock",
                      "guitarist":  "Tom Morello",
                      "style":  "Modern riff rock",
                      "sound":  "Dense, aggressive, focused",
                      "technique":  "Drop tuning + effects accents",
                      "era":  "2000s"
                  },
                  {
                      "id":  247,
                      "artist":  "Muse",
                      "song":  "Hysteria",
                      "genre":  "Alternative Rock",
                      "guitarist":  "Matthew Bellamy",
                      "style":  "Bass-like guitar texture",
                      "sound":  "Saturated, compressed, huge",
                      "technique":  "Fuzz + octave + delay",
                      "era":  "2000s"
                  },
                  {
                      "id":  248,
                      "artist":  "Muse",
                      "song":  "Plug In Baby",
                      "genre":  "Alternative Rock",
                      "guitarist":  "Matthew Bellamy",
                      "style":  "Octave lead riff",
                      "sound":  "Bright, saturated, articulate",
                      "technique":  "Octave fuzz + harmonized riff",
                      "era":  "2000s"
                  },
                  {
                      "id":  249,
                      "artist":  "St. Vincent",
                      "song":  "Digital Witness",
                      "genre":  "Art Rock / Alternative",
                      "guitarist":  "St. Vincent",
                      "style":  "Angular modern guitar",
                      "sound":  "Compressed, bright, synthetic",
                      "technique":  "Compression + modulation",
                      "era":  "2010s"
                  },
                  {
                      "id":  250,
                      "artist":  "St. Vincent",
                      "song":  "Birth in Reverse",
                      "genre":  "Art Rock",
                      "guitarist":  "St. Vincent",
                      "style":  "Rhythmic abrasive guitar",
                      "sound":  "Dry, fuzzy, clipped",
                      "technique":  "Fuzz + staccato picking",
                      "era":  "2010s"
                  },
                  {
                      "id":  251,
                      "artist":  "Queens of the Stone Age",
                      "song":  "Go With the Flow",
                      "genre":  "Stoner / Alternative Rock",
                      "guitarist":  "Josh Homme",
                      "style":  "Driving riff minimalism",
                      "sound":  "Dense, dry, mid-heavy",
                      "technique":  "Down-tuning + compression",
                      "era":  "2000s"
                  },
                  {
                      "id":  252,
                      "artist":  "Royal Blood",
                      "song":  "Figure It Out",
                      "genre":  "Rock",
                      "guitarist":  "Mike Kerr",
                      "style":  "Guitar processed as bass",
                      "sound":  "Low, aggressive, saturated",
                      "technique":  "Octave + bass amp processing",
                      "era":  "2010s"
                  },
                  {
                      "id":  253,
                      "artist":  "Polyphia",
                      "song":  "G.O.A.T.",
                      "genre":  "Progressive / Instrumental",
                      "guitarist":  "Tim Henson / Scott LePage",
                      "style":  "Modern hybrid picking",
                      "sound":  "Hi-fi, compressed, saturated",
                      "technique":  "Hybrid picking + tapping",
                      "era":  "2010s"
                  },
                  {
                      "id":  254,
                      "artist":  "Polyphia",
                      "song":  "Playing God",
                      "genre":  "Progressive / Fusion",
                      "guitarist":  "Tim Henson / Scott LePage",
                      "style":  "Nylon-string fusion virtuosity",
                      "sound":  "Clean, percussive, pristine",
                      "technique":  "Hybrid picking + syncopation",
                      "era":  "2020s"
                  },
                  {
                      "id":  255,
                      "artist":  "Animals as Leaders",
                      "song":  "CAFO",
                      "genre":  "Progressive Metal",
                      "guitarist":  "Tosin Abasi",
                      "style":  "Extended-range technical guitar",
                      "sound":  "Tight, hi-fi, percussive",
                      "technique":  "Tapping + djent palm mute",
                      "era":  "2010s"
                  },
                  {
                      "id":  256,
                      "artist":  "Periphery",
                      "song":  "Marigold",
                      "genre":  "Progressive Metal",
                      "guitarist":  "Jake Bowen / Misha Mansoor",
                      "style":  "Layered modern metal",
                      "sound":  "Tight, compressed, huge",
                      "technique":  "High gain + delay",
                      "era":  "2010s"
                  },
                  {
                      "id":  257,
                      "artist":  "Meshuggah",
                      "song":  "Bleed",
                      "genre":  "Djent / Metal",
                      "guitarist":  "Fredrik Thordendal / Mårten Hagström",
                      "style":  "Polyrhythmic machine riffs",
                      "sound":  "Ultra-tight, dry, low-end controlled",
                      "technique":  "8-string + palm mute",
                      "era":  "2000s"
                  },
                  {
                      "id":  258,
                      "artist":  "Tool",
                      "song":  "Schism",
                      "genre":  "Progressive Metal",
                      "guitarist":  "Adam Jones",
                      "style":  "Odd-meter riff architecture",
                      "sound":  "Dark, mid-heavy, controlled",
                      "technique":  "Delay + wah-like filter",
                      "era":  "2000s"
                  },
                  {
                      "id":  259,
                      "artist":  "Tool",
                      "song":  "Sober",
                      "genre":  "Alternative Metal",
                      "guitarist":  "Adam Jones",
                      "style":  "Textural heavy riffing",
                      "sound":  "Dark, chunky, sustained",
                      "technique":  "Flanger + distortion",
                      "era":  "1990s"
                  },
                  {
                      "id":  260,
                      "artist":  "Deftones",
                      "song":  "Be Quiet and Drive",
                      "genre":  "Alternative Metal",
                      "guitarist":  "Stephen Carpenter",
                      "style":  "Heavy/soft dynamic contrast",
                      "sound":  "Dense low-mid gain with airy highs",
                      "technique":  "Drop tuning + chorus",
                      "era":  "1990s"
                  },
                  {
                      "id":  261,
                      "artist":  "System of a Down",
                      "song":  "Aerials",
                      "genre":  "Alternative Metal",
                      "guitarist":  "Daron Malakian",
                      "style":  "Eastern melodic metal",
                      "sound":  "Dark, saturated, modal",
                      "technique":  "Phrygian-like melodies + delay",
                      "era":  "2000s"
                  },
                  {
                      "id":  262,
                      "artist":  "System of a Down",
                      "song":  "Toxicity",
                      "genre":  "Alternative Metal",
                      "guitarist":  "Daron Malakian",
                      "style":  "Angular heavy riffing",
                      "sound":  "Tight, dry, aggressive",
                      "technique":  "Alternate picking + drop tuning",
                      "era":  "2000s"
                  },
                  {
                      "id":  263,
                      "artist":  "Bob Marley \u0026 The Wailers",
                      "song":  "Stir It Up",
                      "genre":  "Reggae",
                      "guitarist":  "Junior Marvin / session players",
                      "style":  "Reggae skank and melodic fills",
                      "sound":  "Clean, warm, slightly muted",
                      "technique":  "Offbeat skank + spring/reverb space",
                      "era":  "1970s"
                  },
                  {
                      "id":  264,
                      "artist":  "Bob Marley \u0026 The Wailers",
                      "song":  "I Shot the Sheriff",
                      "genre":  "Reggae",
                      "guitarist":  "Donald Kinsey / Junior Marvin",
                      "style":  "Sparse reggae lead",
                      "sound":  "Clean, dry, mid-light",
                      "technique":  "Skank + melodic fills",
                      "era":  "1970s"
                  },
                  {
                      "id":  265,
                      "artist":  "Peter Tosh",
                      "song":  "Legalize It",
                      "genre":  "Reggae",
                      "guitarist":  "Peter Tosh / session guitarists",
                      "style":  "Roots-reggae rhythm",
                      "sound":  "Clean, percussive, warm",
                      "technique":  "Offbeat chops + muted strings",
                      "era":  "1970s"
                  },
                  {
                      "id":  266,
                      "artist":  "Ernest Ranglin",
                      "song":  "Below the Bassline",
                      "genre":  "Reggae / Jazz",
                      "guitarist":  "Ernest Ranglin",
                      "style":  "Jamaican jazz guitar",
                      "sound":  "Clean, warm, articulate",
                      "technique":  "Jazz voicings + reggae skank",
                      "era":  "1990s"
                  },
                  {
                      "id":  267,
                      "artist":  "King Sunny Adé",
                      "song":  "Ja Funmi",
                      "genre":  "Jùjú / African Pop",
                      "guitarist":  "King Sunny Adé / band guitarists",
                      "style":  "Interlocking African guitar lines",
                      "sound":  "Clean, bright, rhythmic",
                      "technique":  "Delay-like repetitions + polyrhythmic picking",
                      "era":  "1980s"
                  },
                  {
                      "id":  268,
                      "artist":  "Ali Farka Touré",
                      "song":  "Savane",
                      "genre":  "Desert Blues",
                      "guitarist":  "Ali Farka Touré",
                      "style":  "African blues minimalism",
                      "sound":  "Dry, woody, warm",
                      "technique":  "Open tunings + repetitive riffs",
                      "era":  "2000s"
                  },
                  {
                      "id":  269,
                      "artist":  "Tinariwen",
                      "song":  "Sastanàqqàm",
                      "genre":  "Tishoumaren / Desert Blues",
                      "guitarist":  "Abdallah Ag Alhousseyni / band guitarists",
                      "style":  "Hypnotic desert-blues riffing",
                      "sound":  "Dry, gritty, mid-forward",
                      "technique":  "Pentatonic riffs + repetition",
                      "era":  "2000s"
                  },
                  {
                      "id":  270,
                      "artist":  "Mdou Moctar",
                      "song":  "Chismiten",
                      "genre":  "Desert Blues / Rock",
                      "guitarist":  "Mdou Moctar",
                      "style":  "Virtuosic Saharan electric guitar",
                      "sound":  "Bright, saturated, raw",
                      "technique":  "Fast picking + microtonal bends",
                      "era":  "2010s"
                  },
                  {
                      "id":  271,
                      "artist":  "Paco de Lucía",
                      "song":  "Entre Dos Aguas",
                      "genre":  "Flamenco / Jazz",
                      "guitarist":  "Paco de Lucía",
                      "style":  "Virtuosic flamenco fusion",
                      "sound":  "Bright, percussive, acoustic",
                      "technique":  "Picado + rasgueado",
                      "era":  "1970s"
                  },
                  {
                      "id":  272,
                      "artist":  "Paco de Lucía",
                      "song":  "Almoraima",
                      "genre":  "Flamenco",
                      "guitarist":  "Paco de Lucía",
                      "style":  "Flamenco composition and technique",
                      "sound":  "Dry, woody, highly percussive",
                      "technique":  "Picado + rasgueado + golpe",
                      "era":  "1970s"
                  },
                  {
                      "id":  273,
                      "artist":  "Django Reinhardt",
                      "song":  "Minor Swing",
                      "genre":  "Gypsy Jazz",
                      "guitarist":  "Django Reinhardt",
                      "style":  "Gypsy-jazz rhythm and lead",
                      "sound":  "Acoustic, woody, mid-bright",
                      "technique":  "La Pompe + tremolo-like picking",
                      "era":  "1930s"
                  },
                  {
                      "id":  274,
                      "artist":  "Django Reinhardt",
                      "song":  "Nuages",
                      "genre":  "Gypsy Jazz",
                      "guitarist":  "Django Reinhardt",
                      "style":  "Lyrical gypsy-jazz melody",
                      "sound":  "Warm, acoustic, rounded",
                      "technique":  "Single-note melody + chord melody",
                      "era":  "1940s"
                  },
                  {
                      "id":  275,
                      "artist":  "Antonio Carlos Jobim",
                      "song":  "The Girl from Ipanema",
                      "genre":  "Bossa Nova",
                      "guitarist":  "João Gilberto",
                      "style":  "Bossa-nova nylon rhythm",
                      "sound":  "Warm, dry, intimate",
                      "technique":  "Syncopated fingerstyle + chord voicings",
                      "era":  "1960s"
                  },
                  {
                      "id":  276,
                      "artist":  "João Gilberto",
                      "song":  "Chega de Saudade",
                      "genre":  "Bossa Nova",
                      "guitarist":  "João Gilberto",
                      "style":  "Foundational bossa guitar",
                      "sound":  "Soft, warm, intimate",
                      "technique":  "Thumb bass + syncopated chords",
                      "era":  "1950s"
                  },
                  {
                      "id":  277,
                      "artist":  "Chico Pinheiro",
                      "song":  "Dúvida",
                      "genre":  "Brazilian Jazz",
                      "guitarist":  "Chico Pinheiro",
                      "style":  "Modern Brazilian chordal guitar",
                      "sound":  "Clean, warm, spacious",
                      "technique":  "Advanced chord voicings + fingerstyle",
                      "era":  "2000s"
                  },
                  {
                      "id":  278,
                      "artist":  "Joni Mitchell",
                      "song":  "Amelia",
                      "genre":  "Folk / Singer-Songwriter",
                      "guitarist":  "Joni Mitchell",
                      "style":  "Alternate-tuning acoustic composition",
                      "sound":  "Open, resonant, unusual harmonies",
                      "technique":  "Open/alternate tuning + fingerstyle",
                      "era":  "1970s"
                  },
                  {
                      "id":  279,
                      "artist":  "Joni Mitchell",
                      "song":  "Big Yellow Taxi",
                      "genre":  "Folk Rock",
                      "guitarist":  "Joni Mitchell",
                      "style":  "Bright rhythmic acoustic guitar",
                      "sound":  "Clean, jangly, percussive",
                      "technique":  "Alternate voicings + strumming",
                      "era":  "1970s"
                  },
                  {
                      "id":  280,
                      "artist":  "Neil Young",
                      "song":  "Cortez the Killer",
                      "genre":  "Rock / Folk",
                      "guitarist":  "Neil Young",
                      "style":  "Expressive sustained lead",
                      "sound":  "Fuzzy, warm, loose",
                      "technique":  "Fuzz + long vibrato",
                      "era":  "1970s"
                  },
                  {
                      "id":  281,
                      "artist":  "Neil Young",
                      "song":  "Down by the River",
                      "genre":  "Rock / Blues",
                      "guitarist":  "Neil Young",
                      "style":  "Long-form raw lead guitar",
                      "sound":  "Fuzzy, compressed, spacious",
                      "technique":  "Fuzz + repeated motifs",
                      "era":  "1960s"
                  },
                  {
                      "id":  282,
                      "artist":  "Tom Petty",
                      "song":  "Runnin\u0027 Down a Dream",
                      "genre":  "Rock",
                      "guitarist":  "Mike Campbell",
                      "style":  "Straight-ahead melodic rock",
                      "sound":  "Bright, crunchy, dry",
                      "technique":  "12-string/lead layering",
                      "era":  "1980s"
                  },
                  {
                      "id":  283,
                      "artist":  "The Cars",
                      "song":  "Just What I Needed",
                      "genre":  "New Wave Rock",
                      "guitarist":  "Elliot Easton",
                      "style":  "Melodic power-pop lead",
                      "sound":  "Bright, compressed, clean-to-crunch",
                      "technique":  "Layered guitar + chorus",
                      "era":  "1970s"
                  },
                  {
                      "id":  284,
                      "artist":  "The Strokes",
                      "song":  "Reptilia",
                      "genre":  "Garage / Indie Rock",
                      "guitarist":  "Nick Valensi / Albert Hammond Jr.",
                      "style":  "Tight modern garage rhythm",
                      "sound":  "Bright, compressed, aggressive",
                      "technique":  "Humbuckers + tight palm muting",
                      "era":  "2000s"
                  },
                  {
                      "id":  285,
                      "artist":  "The Black Crowes",
                      "song":  "She Talks to Angels",
                      "genre":  "Southern Rock",
                      "guitarist":  "Rich Robinson / Marc Ford",
                      "style":  "Roots-rock acoustic/electric blend",
                      "sound":  "Warm, woody, open",
                      "technique":  "Open-tuned/acoustic layering",
                      "era":  "1990s"
                  },
                  {
                      "id":  286,
                      "artist":  "Joe Walsh",
                      "song":  "Hotel California",
                      "genre":  "Rock",
                      "guitarist":  "Joe Walsh / Don Felder",
                      "style":  "Harmonized classic-rock lead",
                      "sound":  "Smooth, sustaining, mid-forward",
                      "technique":  "Dual-guitar harmonies + delay",
                      "era":  "1970s"
                  },
                  {
                      "id":  287,
                      "artist":  "The Eagles",
                      "song":  "Hotel California",
                      "genre":  "Rock",
                      "guitarist":  "Don Felder / Joe Walsh",
                      "style":  "Twin-guitar arrangement",
                      "sound":  "Warm, polished, sustained",
                      "technique":  "Harmonized lead guitars",
                      "era":  "1970s"
                  },
                  {
                      "id":  288,
                      "artist":  "The Eagles",
                      "song":  "Take It Easy",
                      "genre":  "Country Rock",
                      "guitarist":  "Bernie Leadon / Glenn Frey",
                      "style":  "Clean roots-rock rhythm",
                      "sound":  "Bright, twangy, open",
                      "technique":  "Hybrid country picking",
                      "era":  "1970s"
                  },
                  {
                      "id":  289,
                      "artist":  "Steve Vai",
                      "song":  "For the Love of God",
                      "genre":  "Instrumental Rock",
                      "guitarist":  "Steve Vai",
                      "style":  "Expressive shred with dynamics",
                      "sound":  "Singing, saturated, spacious",
                      "technique":  "Whammy + delay + harmonics",
                      "era":  "1990s"
                  },
                  {
                      "id":  290,
                      "artist":  "Joe Satriani",
                      "song":  "Surfing with the Alien",
                      "genre":  "Instrumental Rock",
                      "guitarist":  "Joe Satriani",
                      "style":  "Melodic shred",
                      "sound":  "Bright, saturated, compressed",
                      "technique":  "Legato + whammy",
                      "era":  "1980s"
                  },
                  {
                      "id":  291,
                      "artist":  "Yngwie Malmsteen",
                      "song":  "Far Beyond the Sun",
                      "genre":  "Neoclassical Metal",
                      "guitarist":  "Yngwie Malmsteen",
                      "style":  "Classical shred",
                      "sound":  "Bright, saturated, tight",
                      "technique":  "Harmonic minor + sweep picking",
                      "era":  "1980s"
                  },
                  {
                      "id":  292,
                      "artist":  "Randy Rhoads",
                      "song":  "Over the Mountain",
                      "genre":  "Heavy Metal",
                      "guitarist":  "Randy Rhoads",
                      "style":  "Neoclassical metal riffing",
                      "sound":  "Bright, articulate high gain",
                      "technique":  "Alternate picking + harmonics",
                      "era":  "1980s"
                  },
                  {
                      "id":  293,
                      "artist":  "Brian Setzer",
                      "song":  "Stray Cat Strut",
                      "genre":  "Rockabilly",
                      "guitarist":  "Brian Setzer",
                      "style":  "Rockabilly slapback lead",
                      "sound":  "Bright, twangy, roomy",
                      "technique":  "Slapback delay + vibrato",
                      "era":  "1980s"
                  },
                  {
                      "id":  294,
                      "artist":  "The Cramps",
                      "song":  "Human Fly",
                      "genre":  "Psychobilly / Garage",
                      "guitarist":  "Poison Ivy",
                      "style":  "Primitive noisy guitar",
                      "sound":  "Raw, dark, tremolo-like",
                      "technique":  "Fuzz + tremolo",
                      "era":  "1970s"
                  },
                  {
                      "id":  295,
                      "artist":  "Sonic Youth",
                      "song":  "Teen Age Riot",
                      "genre":  "Alternative / Noise Rock",
                      "guitarist":  "Thurston Moore / Lee Ranaldo",
                      "style":  "Alternate-tuning texture",
                      "sound":  "Bright/dissonant, sustaining",
                      "technique":  "Alternate tunings + feedback",
                      "era":  "1980s"
                  },
                  {
                      "id":  296,
                      "artist":  "God Is an Astronaut",
                      "song":  "All Is Violent, All Is Bright",
                      "genre":  "Post-Rock",
                      "guitarist":  "Guitar duo",
                      "style":  "Layered post-rock ambience",
                      "sound":  "Clean to saturated, spacious",
                      "technique":  "Delay + reverb + tremolo",
                      "era":  "2000s"
                  },
                  {
                      "id":  297,
                      "artist":  "Explosions in the Sky",
                      "song":  "Your Hand in Mine",
                      "genre":  "Post-Rock",
                      "guitarist":  "Munaf Rayani / Mark Smith",
                      "style":  "Crescendo guitar layering",
                      "sound":  "Clean, shimmering, wide",
                      "technique":  "Delay + reverb + volume swells",
                      "era":  "2000s"
                  },
                  {
                      "id":  298,
                      "artist":  "Khruangbin",
                      "song":  "Friday Morning",
                      "genre":  "Psychedelic / Funk",
                      "guitarist":  "Mark Speer",
                      "style":  "Surf/funk minimalism",
                      "sound":  "Clean, springy, slightly compressed",
                      "technique":  "Spring reverb + tremolo",
                      "era":  "2010s"
                  },
                  {
                      "id":  299,
                      "artist":  "Tame Impala",
                      "song":  "Let It Happen",
                      "genre":  "Psychedelic Pop",
                      "guitarist":  "Kevin Parker",
                      "style":  "Studio textural guitar",
                      "sound":  "Phased, compressed, hazy",
                      "technique":  "Phaser + delay + tape-like modulation",
                      "era":  "2010s"
                  },
                  {
                      "id":  300,
                      "artist":  "The Black Keys",
                      "song":  "Little Black Submarines",
                      "genre":  "Blues Rock",
                      "guitarist":  "Dan Auerbach",
                      "style":  "Acoustic-to-fuzz dynamic arc",
                      "sound":  "Warm clean to huge fuzz",
                      "technique":  "Fuzz + layered guitars",
                      "era":  "2010s"
                  },
                  {
                      "artist":  "Soda Stereo",
                      "genre":  "Rock / Post-Punk",
                      "id":  301,
                      "guitarist":  "Gustavo Cerati",
                      "sound":  "Overdrive brillante, crunch dinámico de amplificador British",
                      "technique":  "Acordes abiertos con ataque firme de púa",
                      "era":  "1990s",
                      "style":  "Power chord anthem",
                      "song":  "De Música Ligera"
                  },
                  {
                      "artist":  "Soda Stereo",
                      "genre":  "New Wave / Rock",
                      "id":  302,
                      "guitarist":  "Gustavo Cerati",
                      "sound":  "Clean cristalino con Chorus exuberante y delay rítmico",
                      "technique":  "Palm mute y arpegios con modulación",
                      "era":  "1980s",
                      "style":  "New wave rítmico",
                      "song":  "Persiana Americana"
                  },
                  {
                      "artist":  "Soda Stereo",
                      "genre":  "Alternative Rock",
                      "id":  303,
                      "guitarist":  "Gustavo Cerati",
                      "sound":  "Textura limpia etérea, chorus profundo, reverb espacial y solo con overdrive",
                      "technique":  "Arpegios con modulación y solo melódico con sustain",
                      "era":  "1980s",
                      "style":  "Atmospheric rock",
                      "song":  "En la Ciudad de la Furia"
                  },
                  {
                      "artist":  "Soda Stereo",
                      "genre":  "New Wave / Rock",
                      "id":  304,
                      "guitarist":  "Gustavo Cerati",
                      "sound":  "Clean cortante con compresión y chorus brillante",
                      "technique":  "Riff bailable en semicorcheas con acentos",
                      "era":  "1980s",
                      "style":  "Upbeat new wave",
                      "song":  "Prófugos"
                  },
                  {
                      "artist":  "Gustavo Cerati",
                      "genre":  "Pop Rock / Art Rock",
                      "id":  305,
                      "guitarist":  "Gustavo Cerati",
                      "sound":  "Clean cálido semi-acústico y solo con overdrive cremoso",
                      "technique":  "Dinámica suave y solo vocal expresivo",
                      "era":  "2000s",
                      "style":  "Melodic ballad",
                      "song":  "Crimen"
                  },
                  {
                      "artist":  "Gustavo Cerati",
                      "genre":  "Alternative Rock",
                      "id":  306,
                      "guitarist":  "Gustavo Cerati",
                      "sound":  "Capas acústicas y eléctricas con phaser sutil y saturación suave",
                      "technique":  "Rascado pop y arpegios modulados",
                      "era":  "1990s",
                      "style":  "Guitar pop",
                      "song":  "Puente"
                  },
                  {
                      "artist":  "Enanitos Verdes",
                      "genre":  "Rock en Español",
                      "id":  307,
                      "guitarist":  "Felipe Staiti",
                      "sound":  "Clean cristalino inicial y solo con overdrive cantarín, delay y wah",
                      "technique":  "Arpegio limpio y bendings expresivos con sustain",
                      "era":  "1990s",
                      "style":  "Melodic rock",
                      "song":  "Lamento Boliviano"
                  },
                  {
                      "artist":  "Enanitos Verdes",
                      "genre":  "Rock en Español",
                      "id":  308,
                      "guitarist":  "Felipe Staiti",
                      "sound":  "Crunch percusivo y riff distorsionado con buen ataque",
                      "technique":  "Riff de quinta con palm mute y solo virtuoso",
                      "era":  "1980s",
                      "style":  "Hard rock rítmico",
                      "song":  "Guitarras Blancas"
                  },
                  {
                      "artist":  "Héroes del Silencio",
                      "genre":  "Hard Rock / Gothic Rock",
                      "id":  309,
                      "guitarist":  "Juan Valdivia",
                      "sound":  "Arpegio limpio con chorus y delay largo, que estalla en distorsión Marshall",
                      "technique":  "Arpegios continuos con púa alternada y riff potente",
                      "era":  "1990s",
                      "style":  "Arpeggiated hard rock",
                      "song":  "Entre Dos Tierras"
                  },
                  {
                      "artist":  "Héroes del Silencio",
                      "genre":  "Rock en Español",
                      "id":  310,
                      "guitarist":  "Juan Valdivia",
                      "sound":  "Clean místico con reverb profunda, delay estéreo y solo envolvente",
                      "technique":  "Arpegios envolventes y ambientación sonora",
                      "era":  "1990s",
                      "style":  "Acoustic-electric ballad",
                      "song":  "La Chispa Adecuada"
                  },
                  {
                      "artist":  "Santana",
                      "genre":  "Latin Rock / Fusion",
                      "id":  311,
                      "guitarist":  "Carlos Santana",
                      "sound":  "Tono \u0027woman tone\u0027 legendario: pastilla del mástil, sustain infinito y medios suaves",
                      "technique":  "Vibrato lento de muñeca y bendings ultra expresivos",
                      "era":  "1970s",
                      "style":  "Instrumental ballad",
                      "song":  "Europa (Earth\u0027s Cry Heaven\u0027s Smile)"
                  },
                  {
                      "artist":  "Santana",
                      "genre":  "Latin Rock / Pop",
                      "id":  312,
                      "guitarist":  "Carlos Santana",
                      "sound":  "Overdrive cremoso y brillante con presencia de medios y reverb de sala",
                      "technique":  "Licks rítmicos sincopados y bends rápidos",
                      "era":  "1990s",
                      "style":  "Latin groove lead",
                      "song":  "Smooth"
                  },
                  {
                      "artist":  "Santana",
                      "genre":  "Latin Rock / Blues",
                      "id":  313,
                      "guitarist":  "Carlos Santana",
                      "sound":  "Sustain dulce y comprimido con overdrive cálido sobre amplificador Fender/Mesa",
                      "technique":  "Fraseo melódico de blues con dinámica de volumen",
                      "era":  "1970s",
                      "style":  "Slow blues-rock",
                      "song":  "Black Magic Woman"
                  },
                  {
                      "artist":  "Caifanes",
                      "genre":  "Rock en Español / Mariachi Rock",
                      "id":  314,
                      "guitarist":  "Alejandro Marcovich",
                      "sound":  "Guitarras limpias procesadas con chorus y solo de trompeta/guitarra",
                      "technique":  "Arpegios melancólicos y rasgueos rítmicos",
                      "era":  "1990s",
                      "style":  "Mexican fusion rock",
                      "song":  "La Célula Que Explota"
                  },
                  {
                      "artist":  "Caifanes",
                      "genre":  "Alternative Rock",
                      "id":  315,
                      "guitarist":  "Alejandro Marcovich",
                      "sound":  "Distorsión angular, compresión y delay percusivo",
                      "technique":  "Riff pesado con disonancias expresivas",
                      "era":  "1990s",
                      "style":  "Tribal rock",
                      "song":  "Afuera"
                  },
                  {
                      "artist":  "Maná",
                      "genre":  "Pop Rock / Latin Rock",
                      "id":  316,
                      "guitarist":  "Sergio Vallín",
                      "sound":  "Clean Funk-rock y solo con overdrive cortante",
                      "technique":  "Rascado percusivo y bendings rockeros clásicos",
                      "era":  "1990s",
                      "style":  "Pop-rock rítmico",
                      "song":  "Oye Mi Amor"
                  },
                  {
                      "artist":  "Red Hot Chili Peppers",
                      "genre":  "Alternative Rock / Funk Rock",
                      "id":  317,
                      "guitarist":  "John Frusciante",
                      "sound":  "Clean cristalino de Stratocaster (posición 4 o mástil) con compresión",
                      "technique":  "Thumb-over acordes, adornos de hammer-on y pull-off",
                      "era":  "1990s",
                      "style":  "Hendrixian chord-melody",
                      "song":  "Under the Bridge"
                  },
                  {
                      "artist":  "Red Hot Chili Peppers",
                      "genre":  "Funk Rock",
                      "id":  318,
                      "guitarist":  "John Frusciante",
                      "sound":  "Clean agresivo, seco y punzante con ecualización de medios altos",
                      "technique":  "Muting estricto de cuerdas con mano izquierda y ataque fuerte de púa",
                      "era":  "2000s",
                      "style":  "Percussive funk lead",
                      "song":  "Can\u0027t Stop"
                  },
                  {
                      "artist":  "Guns N\u0027 Roses",
                      "genre":  "Hard Rock",
                      "id":  319,
                      "guitarist":  "Slash",
                      "sound":  "Tono de mástil icónico en Les Paul con Marshall JCM800 y wah suave",
                      "technique":  "Secuencia de arpegios en cuerda al aire y bends emotivos",
                      "era":  "1980s",
                      "style":  "Hard rock lead",
                      "song":  "Sweet Child O\u0027 Mine"
                  },
                  {
                      "artist":  "Pink Floyd",
                      "genre":  "Progressive Rock",
                      "id":  320,
                      "guitarist":  "David Gilmour",
                      "sound":  "Big Muff fuzz suave + Tube Driver + flanger tenue + delay estéreo espacioso",
                      "technique":  "Bends gigantescos afinados al milímetro y vibrato ancho",
                      "era":  "1970s",
                      "style":  "Epic soaring lead",
                      "song":  "Comfortably Numb"
                  },
                  {
                      "artist":  "Pink Floyd",
                      "genre":  "Progressive Rock",
                      "id":  321,
                      "guitarist":  "David Gilmour",
                      "sound":  "Fuzz agresivo pero controlado, medios presentes y delay largo",
                      "technique":  "Dinámica de púa y vibrato de muñeca",
                      "era":  "1970s",
                      "style":  "Soulful prog lead",
                      "song":  "Time"
                  },
                  {
                      "artist":  "AC/DC",
                      "genre":  "Hard Rock",
                      "id":  322,
                      "guitarist":  "Angus Young / Malcolm Young",
                      "sound":  "Marshall Plexi al natural con volumen alto, sin pedales, ataque seco y contundente",
                      "technique":  "Power chords precisos y solo pentatónico afilado",
                      "era":  "1980s",
                      "style":  "Classic rhythm \u0026 lead",
                      "song":  "Back in Black"
                  },
                  {
                      "artist":  "Queen",
                      "genre":  "Glam Rock / Art Rock",
                      "id":  323,
                      "guitarist":  "Brian May",
                      "sound":  "Treble booster + Vox AC30 con saturación armónica cantarina",
                      "technique":  "Solo hipermelódico y armonizaciones a múltiples voces",
                      "era":  "1970s",
                      "style":  "Orchestral rock",
                      "song":  "Bohemian Rhapsody"
                  },
                  {
                      "artist":  "Bob Marley \u0026 The Wailers",
                      "genre":  "Reggae / Disco",
                      "id":  324,
                      "guitarist":  "Junior Marvin",
                      "sound":  "Clean hiper cortante y percusivo con pastilla aguda y compresión",
                      "technique":  "Chuck rítmico en contratiempo (skank) y punteo silenciado",
                      "era":  "1980s",
                      "style":  "Reggae skank \u0026 muted riffs",
                      "song":  "Could You Be Loved"
                  },
                  {
                      "artist":  "The Police",
                      "genre":  "New Wave / Pop Rock",
                      "id":  325,
                      "guitarist":  "Andy Summers",
                      "sound":  "Clean cristalino con Chorus analógico pronunciado y compresión sutil",
                      "technique":  "Arpegios con cejilla abierta y digitaciones extendidas",
                      "era":  "1980s",
                      "style":  "Stretched-chord arpeggios",
                      "song":  "Every Breath You Take"
                  },
                  {
                      "artist":  "Polyphia",
                      "genre":  "Math Rock / Trap Fusion",
                      "id":  326,
                      "guitarist":  "Tim Henson / Scott LePage",
                      "sound":  "Acoustic-electric ultra definido, ataque ultra percusivo y shimmer reverb",
                      "technique":  "Híbrido fingerstyle, thumping y barridos rápidos",
                      "era":  "2020s",
                      "style":  "Fingerstyle nylon \u0026 electric hybrid",
                      "song":  "Playing God"
                  }
              ]
};

  // Índices para búsqueda rápida en memoria
  // Catálogo detallado de guitarras, pastillas y contexto histórico
  data.guitars = [
    {
        "body":  "Caoba maciza con tapa curvada de arce flameado (Maple cap)",
        "name":  "Gibson Les Paul Standard \u002759 (Slash / Jimmy Page)",
        "pickups":  "2 Humbuckers PAF / Alnico II Pro (Slash APH-2)",
        "tonalProfile":  "Graves contundentes pero redondos, medios muy cremosos y concentrados (600-900 Hz), pastilla de mástil líquida y sustain eterno para solos cantables.",
        "context":  "El estandarte del hard rock mundial. Utilizada por Slash (Guns N\u0027 Roses en Appetite for Destruction) y Jimmy Page en directo.",
        "category":  "Solidbody Humbucker",
        "dspRecommendations":  "Marshall JCM800 o Plexi británico crujiente, ganancia media-alta, presencia calibrada al 55% para no resultar estridente."
    },
    {
        "body":  "Caoba de una pieza con repintado histórico Cherry Red de fábrica Gibson",
        "name":  "Gibson Les Paul Standard \u002757 / \u002768 \u0027Lucy\u0027 (The Beatles / Eric Clapton)",
        "pickups":  "2 Humbuckers PAF Originales de baja salida",
        "tonalProfile":  "Respuesta mucho más amaderada, oscura, dulce y vocal que una Les Paul moderna. Menor ganancia en pastillas permitiendo una dinámica orgánica y llanto expresivo.",
        "context":  "Regalada por Eric Clapton a George Harrison en 1968. Es la guitarra que llora en el solo de \u0027While My Guitar Gently Weeps\u0027 y usada en el \u0027White Album\u0027 y \u0027Abbey Road\u0027.",
        "category":  "Vintage Humbucker",
        "dspRecommendations":  "Ampli a válvulas británico o tweed saturando en el punto dulce de ruptura, boost suave de medios, compresión tenue y reverb clásica."
    },
    {
        "body":  "Caoba antigua con tapa de arce flameado y acabado desvaído",
        "name":  "Gibson Les Paul \u002759 \u0027Greeny\u0027 (Peter Green / Gary Moore / Kirk Hammett)",
        "pickups":  "2 Humbuckers PAF (pastilla de mástil con imán invertido y colocada al revés)",
        "tonalProfile":  "Posición central completamente nasal, acampanada, hueca y cortante, similar a un wah fijo o una Stratocaster pero con el cuerpo y sustain de caoba.",
        "context":  "Perteneció a Peter Green (Fleetwood Mac), luego a Gary Moore (\u0027Parisienne Walkways\u0027) y hoy a Kirk Hammett. El secreto de su sonido \u0027fuera de fase\u0027 en la posición intermedia.",
        "category":  "Out-of-Phase Vintage",
        "dspRecommendations":  "Ampli a válvulas crujiente, ecualización con agudos abiertos y medios altos presentes (2.5 kHz), excelente para blues británico desgarrador."
    },
    {
        "body":  "Caoba pesada con mástil rebajado al perfil más fino (\u0027Page Oval\u0027)",
        "name":  "Gibson Les Paul Standard \u002759 \u0027#1\u0027 (Jimmy Page - Led Zeppelin)",
        "pickups":  "PAF de mástil cubierto + Seymour Duncan / PAF puente descubierto",
        "tonalProfile":  "Ataque híper-rápido y mordiente en puente gracias a la pastilla descubierta, capaz de pasar de riffs gigantes a arpegios acústicos semi-claros.",
        "context":  "La guitarra principal de Jimmy Page en Led Zeppelin. Equipada con conmutadores push-pull para inversión de fase y serie/paralelo.",
        "category":  "Classic Rock Modified",
        "dspRecommendations":  "Marshall Super Lead 100 / Hiwatt, overdrive transparente, eco de cinta corto y respuesta muy sensible al pote de volumen."
    },
    {
        "body":  "Caoba maciza pesada con acabado Goldtop nitrocelulosa",
        "name":  "Gibson Les Paul Goldtop \u002756 (Pastillas P-90 Soapbar)",
        "pickups":  "2 P-90 Soapbar Single-Coil de bobinado clásico",
        "tonalProfile":  "El rugido inconfundible del P-90: ataque percusivo y brillante de bobina simple combinado con el espesor, medios crujientes y empuje grave de la caoba.",
        "context":  "La era dorada previa a los humbuckers. Usada por Freddie King, Mike Bloomfield, Neil Young (\u0027Old Black\u0027 modificada) y Social Distortion.",
        "category":  "Single Coil P-90",
        "dspRecommendations":  "Ampli Tweed americano o Marshall Plexi en borde de saturación, dinámicamente reactivo al toque de púa, sin compresor excesivo."
    },
    {
        "body":  "Cuerpo íntegro de caoba maciza con diapasón de ébano oscuro de alta densidad",
        "name":  "Gibson Les Paul Custom \u0027Black Beauty\u0027 (Frampton / Randy Rhoads / Page)",
        "pickups":  "2 o 3 Humbuckers PAF / 490R-498T con herrajes dorados",
        "tonalProfile":  "Ataque percusivo más veloz y agudos más brillantes y definidos que una Standard debido a la dureza del diapasón de ébano; graves muy compactos.",
        "context":  "La versión de máximo lujo de Gibson. Famosa en \u0027Frampton Comes Alive\u0027, el sonido heavy neoclásico de Randy Rhoads con Ozzy y solos de Jimmy Page.",
        "category":  "Solidbody Humbucker",
        "dspRecommendations":  "Overdrive de alta definición, crunch británico modificado, presencia equilibrada para no perder la distinción nota por nota en acordes."
    },
    {
        "body":  "Tablón sólido y plano de caoba sin tapa de arce",
        "name":  "Gibson Les Paul Junior / Special \u002758 (Leslie West / Billie Joe Armstrong)",
        "pickups":  "1 o 2 pastillas P-90 Dogear atornilladas directo a la madera",
        "tonalProfile":  "Resonancia total directa de madera a pastilla. Medios explosivos y crudos, dinámica arrolladora y sustain despojado de circuitería compleja.",
        "context":  "El espíritu más puro y directo del rock. La máquina de \u0027Mississippi Queen\u0027 (Mountain) y el punk melódico de Green Day (\u0027American Idiot\u0027).",
        "category":  "Raw Rock P-90",
        "dspRecommendations":  "Ampli a tope de volumen natural (Junior = un solo pote de tono y volumen), Tube Screamer o boost frontal."
    },
    {
        "body":  "Caoba con tapa de arce curvada en acabado Tobacco Burst desvanecido",
        "name":  "Gibson Les Paul \u0027Babe\u0027 \u002759 (Joe Perry - Aerosmith / Slash)",
        "pickups":  "2 Humbuckers PAF Alnico V",
        "tonalProfile":  "Crunch espeso y grasoso estilo Boston blues-rock, medios bajos muy carnosos y respuesta inmediata al ataque de púa.",
        "context":  "Tocada por Joe Perry en los himnos \u0027Walk This Way\u0027 y \u0027Sweet Emotion\u0027, luego propiedad de Slash durante 15 años y devuelta a Perry en su cumpleaños 50.",
        "category":  "Solidbody Humbucker",
        "dspRecommendations":  "Ampli británico crujiente empujado por un overdrive sutil, agudos recortados para evitar aspereza."
    },
    {
        "body":  "Caoba de una pieza con tapa de arce curvada",
        "name":  "Gibson Les Paul \u0027Duane Allman\u0027 \u002757 Goldtop / \u002759 Darkburst (Allman Brothers)",
        "pickups":  "2 Humbuckers PAF de imanes desmagnetizados",
        "tonalProfile":  "Sustain vocal infinito para slide con tubo Coricidin de vidrio, medios cantables y agudos dulces que emulan una voz humana.",
        "context":  "La voz legendaria del Southern Rock y del slide en \u0027At Fillmore East\u0027 (\u0027Statesboro Blues\u0027, \u0027Whipping Post\u0027) y en las grabaciones de Derek and the Dominos (\u0027Layla\u0027).",
        "category":  "Southern Rock Slide",
        "dspRecommendations":  "Marshall Plexi de 50W al punto de romper, graves moderados, compresor tenue y eco de cinta sutil."
    },
    {
        "body":  "Caoba maciza con tapa decapada a madera natural (stripped maple)",
        "name":  "Gibson Les Paul \u0027Mick Ronson\u0027 \u002768 Custom (David Bowie - Spiders from Mars)",
        "pickups":  "2 Humbuckers Gibson T-Top vintage con tapas retiradas",
        "tonalProfile":  "Sonido agresivo y cortante: combinaba las tapas abiertas con un pedal Wah Crybaby dejado fijo a mitad de recorrido para realzar medios cortantes.",
        "context":  "El arquitecto del sonido de David Bowie en la era Ziggy Stardust (\u0027Moonage Daydream\u0027, \u0027Suffragette City\u0027) y Lou Reed (\u0027Transformer\u0027).",
        "category":  "Glam Rock Icon",
        "dspRecommendations":  "Ampli Marshall Major al límite con un filtro de medios o wah en posición fija en bloque FX."
    },
    {
        "body":  "Caoba con tapa de arce flameado y desgaste natural en bordes",
        "name":  "Gibson Les Paul \u0027Mike McCready\u0027 \u002759 (Pearl Jam)",
        "pickups":  "2 Humbuckers PAF originales de baja salida",
        "tonalProfile":  "Matices blueseros dentro de la potencia del grunge de Seattle: graves compactos y agudos que muerden sin perder calidez.",
        "context":  "La guitarra principal de Mike McCready para los solos históricos de Pearl Jam (\u0027Alive\u0027, \u0027Even Flow\u0027, \u0027Yellow Ledbetter\u0027).",
        "category":  "Grunge Lead Icon",
        "dspRecommendations":  "Ampli Marshall JCM800 o Fender Bassman con Tube Screamer como boost en solos, reverb de muelles."
    },
    {
        "body":  "Caoba con pintura negra sobre el Goldtop original, golpeador de aluminio y Bigsby",
        "name":  "Gibson Les Paul \u0027Neil Young\u0027 \u0027Old Black\u0027 \u002753 Goldtop (Crazy Horse)",
        "pickups":  "Firebird Mini-Humbucker en puente + P-90 original en mástil",
        "tonalProfile":  "Furia descontrolada, graves crujientes y un acople armónico permanente gracias al golpeador de aluminio y la pastilla Firebird de alta microfonía.",
        "context":  "La guitarra más salvaje del rock. La voz distorsionada de Neil Young en \u0027Like a Hurricane\u0027, \u0027Hey Hey, My My\u0027 y \u0027Rust Never Sleeps\u0027.",
        "category":  "Apocalyptic Fuzz Rock",
        "dspRecommendations":  "Ampli Fender Deluxe Tweed al volumen 12 con pedal de distorsión/fuzz primitivo y corte de agudos."
    },
    {
        "body":  "Cuerpo de Standard con mástil injertado de Les Paul Custom con clavijero de ébano",
        "name":  "Gibson Les Paul \u0027Marc Bolan\u0027 \u002760s Chibson/Custom Hybrid (T. Rex)",
        "pickups":  "2 Humbuckers PAF descubiertos en cebra",
        "tonalProfile":  "Riffing directo y crujiente, dinámico y percusivo con un brillo metálico muy característico en medios altos.",
        "context":  "La máquina de \u002720th Century Boy\u0027, \u0027Get It On\u0027 y \u0027Children of the Revolution\u0027 de T. Rex que catapultó el glam rock británico.",
        "category":  "Glam Proto-Punk",
        "dspRecommendations":  "Overdrive Colorsound o fuzz ligero empujando un ampli a válvulas saturado."
    },
    {
        "body":  "Caoba con tapa de arce curvada",
        "name":  "Gibson Les Paul \u0027Gary Rossington\u0027 \u002759 \u0027Bernice\u0027 (Lynyrd Skynyrd)",
        "pickups":  "2 Humbuckers PAF con herrajes niquelados envejecidos",
        "tonalProfile":  "Afinada con agudos brillantes pero redondos para armonizar en terceras sin generar frecuencias disonantes.",
        "context":  "La guitarra que compuso y grabó \u0027Sweet Home Alabama\u0027, \u0027Simple Man\u0027 y el dueto de guitarras de \u0027Free Bird\u0027.",
        "category":  "Southern Classic",
        "dspRecommendations":  "Ampli Peavey Mace o Marshall vintage con ganancia limpia-crujiente y presencia controlada."
    },
    {
        "body":  "Fresno (Ash) o Aliso con mástil y diapasón de una sola pieza de arce (Maple)",
        "name":  "Fender Stratocaster \u002754 / \u002757 (Eric Johnson / Buddy Holly)",
        "pickups":  "3 Single-Coils Vintage Alnico III con bobinado bajo",
        "tonalProfile":  "Sonido acampanado (\u0027bell chime\u0027), agudos vidriosos (\u0027glassy\u0027), medios ahuecados (\u0027scooped\u0027) y ataque de púa ultra percusivo e instantáneo.",
        "context":  "La génesis de la Stratocaster. El sonido cristalino de campana de Buddy Holly y el tono violinico de Eric Johnson (\u0027Cliffs of Dover\u0027).",
        "category":  "Single Coil Maple",
        "dspRecommendations":  "Ampli Fender Twin Reverb o Deluxe Reverb limpio, compresor óptico sutil, corte en subgraves para evitar bombeo en graves."
    },
    {
        "body":  "Aliso selecto con diapasón de palisandro (Rosewood) oscuro",
        "name":  "Fender Stratocaster \u002762 / \u002769 (Jimi Hendrix / SRV / Frusciante)",
        "pickups":  "3 Single-Coil Alnico V bobinado estilo años 60",
        "tonalProfile":  "Agudos más dulces, cálidos y redondeados que el arce, con medios más presentes y el característico \u0027quack\u0027 nasal en posiciones intermedias (2 y 4).",
        "context":  "La era dorada de los 60. El tono de Jimi Hendrix en estudio, el toque blues de Stevie Ray Vaughan y las melodías de Frusciante en RHCP.",
        "category":  "Single Coil Rosewood",
        "dspRecommendations":  "Overdrive clásico estilo TS9/TS808, pedal Wah o Univibe en bloque FX, reverb Spring amplia y simulación de amplificador británico/US crujiente."
    },
    {
        "body":  "Aliso negro con golpeador negro de una capa y mini-switch de mezcla mástil+puente",
        "name":  "Fender Stratocaster \u002769 \u0027Black Strat\u0027 (David Gilmour - Pink Floyd)",
        "pickups":  "Custom Shop \u002769 en mástil, SSL-1 en centro y Seymour Duncan SSL-5 de alta salida en puente",
        "tonalProfile":  "El puente SSL-5 ofrece la pegada y grosor de un humbucker pero con claridad Strat; los solos cantan con sustain infinito y graves expansivos.",
        "context":  "La guitarra central de \u0027The Dark Side of the Moon\u0027, \u0027Wish You Were Here\u0027 y \u0027Comfortably Numb\u0027. Subastada por récord histórico.",
        "category":  "Progressive Stratocaster",
        "dspRecommendations":  "Fuzz estilo Big Muff, delay rítmico sincronizado (440ms), modulación ligera (Chorus / Uni-Vibe) y ampli limpio de gran techo como Hiwatt / Twin."
    },
    {
        "body":  "Aliso olímpico con pala grande setentera y puente invertido",
        "name":  "Fender Stratocaster \u0027Woodstock / Monterey\u0027 (Jimi Hendrix)",
        "pickups":  "3 Single-Coil Alnico V invertidas por cuerpo de zurdo tocado a derechas",
        "tonalProfile":  "Las cuerdas graves tienen un timbre más agudo y definido (pastilla más cerca del puente en bordones) y las cuerdas agudas son más cálidas y redondeadas.",
        "context":  "Jimi encordaba guitarras diestras para zurdos: la pastilla del puente quedaba inclinada al revés, alterando radicalmente el balance de cuerdas.",
        "category":  "Reverse Angle Strat",
        "dspRecommendations":  "Fuzz Face de silicio/germanio al límite, ampli Marshall Plexi 1959 Super Lead al máximo de volumen, acoples armónicos ricos."
    },
    {
        "body":  "Aliso \u002762 con mástil de arce grueso \u002759 (\u0027D\u0027 perfil) y puente de zurdo dorado",
        "name":  "Fender Stratocaster \u0027Number One\u0027 (Stevie Ray Vaughan)",
        "pickups":  "Custom overwound \u002759 con cableado grueso y gran salida",
        "tonalProfile":  "Tono monstruoso: el \u0027twang\u0027 y ataque de una Stratocaster pero con un grosor, cuerpo y garra semejante a un piano de cola con saturación valvular.",
        "context":  "El arma de SRV en \u0027Texas Flood\u0027 y \u0027Pride and Joy\u0027. Calibrada con cuerdas de calibre gigante (0.13 a 0.58) afinada medio tono abajo (Eb).",
        "category":  "Texas Blues Heavyweight",
        "dspRecommendations":  "Tube Screamer empujando la entrada, amplificador Fender Super Reverb / Vibroverb al 6 de volumen, compresión natural del altavoz."
    },
    {
        "body":  "Aliso selecto con mástil suave en \u0027V\u0027 y puente bloqueado con taco de madera",
        "name":  "Fender Stratocaster Eric Clapton \u0027Blackie\u0027 (Active Mid-Boost)",
        "pickups":  "Fender Vintage Noiseless / Lace Sensor Gold con circuito activo de 25dB",
        "tonalProfile":  "Limpio cristalino y silencioso sin zumbido a volúmenes altos; al girar el boost, se transforma en la compresión y tono gordo de un humbucker PAF.",
        "context":  "La guitarra de la era solista de Clapton (\u0027Layla\u0027 acústico/eléctrico, \u0027Journeyman\u0027). Su perilla de tono secundaria activa un boost masivo de medios.",
        "category":  "Active Boost Strat",
        "dspRecommendations":  "Ampli estilo Tweed Twin o Soldano SLO, modulación chorus sutil y dinámica abierta."
    },
    {
        "body":  "Aliso despojado del 90% de pintura por el sudor corrosivo de Rory",
        "name":  "Fender Stratocaster \u0027Rory Gallagher\u0027 \u002761 Relic (Rory Gallagher)",
        "pickups":  "3 Single-Coil \u002761 bobinadas a mano con condensadores de papel en aceite",
        "tonalProfile":  "Mordiente salvaje en agudos, ataque percusivo ultra veloz y dinámica que responde a la uña y púa con fiereza.",
        "context":  "La guitarra más fiera del blues-rock europeo. Usada en \u0027Live in Europe\u0027 e \u0027Irish Tour \u002774\u0027 con un tono crudo e incendiario.",
        "category":  "Irish Blues Rock",
        "dspRecommendations":  "Treble Booster Dallas Rangemaster virtual antes de un ampli Vox AC30 al límite de saturación."
    },
    {
        "body":  "Aliso con mástil grueso de perfil \u0027C\u0027 suave",
        "name":  "Fender Stratocaster \u0027Jeff Beck\u0027 Signature (Jeff Beck)",
        "pickups":  "Hot Noiseless Cerámicas con cejuela de rodamientos LSR y puente de 2 pivotes",
        "tonalProfile":  "Capacidad microtonal única: agudos vocales sin aspereza, medios densos y capacidad de modular notas sin desafinar.",
        "context":  "El instrumento con el que Jeff Beck cantaba sin púa usando la palanca de trémolo y el pulgar (\u0027Cause We\u0027ve Ended as Lovers\u0027).",
        "category":  "Virtuoso Nuance",
        "dspRecommendations":  "Ampli Marshall JTM45 crujiente, compresor de estudio, uso intensivo del control de volumen y tono."
    },
    {
        "body":  "Aliso Olympic White envejecido con mástil de arce escalopado (Scalloped)",
        "name":  "Fender Stratocaster \u0027Yngwie Malmsteen\u0027 \u0027The Duck\u0027 (Yngwie Malmsteen)",
        "pickups":  "Seymour Duncan YJM Fury Stacked Single-Coils (sin ruido)",
        "tonalProfile":  "Articulación cristalina a velocidades sobrehumanas; agudos definidos que nunca suenan estridentes y graves precisos.",
        "context":  "Pionera del metal neoclásico (\u0027Black Star\u0027, \u0027Far Beyond the Sun\u0027). El diapasón escalopado permite un agarre y vibrato extremo sin tocar la madera.",
        "category":  "Neoclassical Shred",
        "dspRecommendations":  "Pedal DOD 250 Overdrive / Preamp empujando un Marshall Plexi con puerta de ruido estricta."
    },
    {
        "body":  "Aliso acabado en negro con topos blancos (\u0027Polka Dot\u0027)",
        "name":  "Fender Stratocaster \u0027Buddy Guy\u0027 Polka Dot (Buddy Guy)",
        "pickups":  "3 Single-Coil Vintage Noiseless con circuito de realce de agudos",
        "tonalProfile":  "Punzante, dramático y de dinámicas explosivas: pasa de un murmullo limpio a un chasquido desgarrador en una sola nota.",
        "context":  "La voz viva del Chicago blues más agresivo y teatral. El mentor de Hendrix, Clapton y Stevie Ray Vaughan.",
        "category":  "Chicago Blues Wild",
        "dspRecommendations":  "Fender Bassman Tweed al 7, wah wah abierto y reverb de resortes profunda."
    },
    {
        "body":  "Fresno ligero con acabado Hot Rod Red y mástil de arce de los 50",
        "name":  "Fender Stratocaster \u0027Mark Knopfler\u0027 \u002761 Hot Rod Red (Dire Straits)",
        "pickups":  "3 Texas Special Single-Coils bobinado vintage",
        "tonalProfile":  "El arquetipo de la posición intermedia 2 (mástil + centro): \u0027quack\u0027 líquido, campana vidriosa y separación armónica prístina.",
        "context":  "El inconfundible tono de \u0027Sultans of Swing\u0027, \u0027Romeo and Juliet\u0027 y \u0027Tunnel of Love\u0027. Tocada exclusivamente con técnica fingerpicking sin púa.",
        "category":  "Fingerstyle Glass",
        "dspRecommendations":  "Compresor Dan Armstrong Orange Squeezer o Dynacomp, ampli limpio de alta fidelidad (JC120 o Twin)."
    },
    {
        "body":  "Aliso con puente Floyd Rose y killswitch conmutador integrado",
        "name":  "Fender Stratocaster \u0027Tom Morello\u0027 \u0027Soul Power\u0027 (Audioslave / RATM)",
        "pickups":  "Seymour Duncan Hot Rails en puente + 2 Fender Noiseless en mástil/centro",
        "tonalProfile":  "Puente demoledor de humbucker en formato single-coil; capacidad de alternar entre silencio rítmico y feedback estridente al instante.",
        "context":  "La máquina de riffs masivos de Audioslave (\u0027Cochise\u0027, \u0027Like a Stone\u0027) con el switch de corte para emular scratches de DJ hip-hop.",
        "category":  "Alternative Rock Innovation",
        "dspRecommendations":  "Marshall JCM800 2205 de ganancia alta, Whammy / Pitch Shifter en bloque FX, delay sincronizado."
    },
    {
        "body":  "Aliso macizo con puente rígido hardtail (sin trémolo) para máxima resonancia",
        "name":  "Fender Stratocaster \u0027Billy Corgan\u0027 (Smashing Pumpkins)",
        "pickups":  "DiMarzio Billy Corgan Custom Rail Pickups (alta salida y sin zumbido)",
        "tonalProfile":  "Sonido colosal y denso: agudos enfocados y graves sólidos como una roca que no pierden afinación bajo afinaciones alternativas pesadas.",
        "context":  "El muro de guitarras de \u0027Siamese Dream\u0027 y \u0027Mellon Collie and the Infinite Sadness\u0027 (\u0027Cherub Rock\u0027, \u0027Today\u0027).",
        "category":  "90s Wall of Sound",
        "dspRecommendations":  "Fuzz Electro-Harmonix Big Muff Op-Amp empujando un Marshall JCM800 de 100W."
    },
    {
        "body":  "Aliso con rebaje ergonómico moderno y electrónica split-coil",
        "name":  "Fender Stratocaster HSS (Superstrat Versátil de Estudio)",
        "pickups":  "1 Humbucker moderno en puente + 2 Single-Coil vintage en centro y mástil",
        "tonalProfile":  "Puente con pegada crujiente para solos y riffs cargados; posiciones 4 y 5 ultra limpias para funk, pop y arpegios cristalinos.",
        "context":  "El estándar moderno de músicos de sesión y grabación. Combina el ataque de un humbucker para rock pesado con la campana clásica para rítmicas.",
        "category":  "Híbrido HSS",
        "dspRecommendations":  "Excelente para rigs versátiles multicanal en la M-VAVE que cubren desde balada hasta metal."
    },
    {
        "body":  "Fresno pesado de los pantanos (Swamp Ash) con selletas de latón dobles",
        "name":  "Fender Telecaster \u002752 \u0027Blackguard\u0027 (Keith Richards / Roy Buchanan)",
        "pickups":  "2 Single-Coil Telecaster (puente con placa base de cobre/acero dulce)",
        "tonalProfile":  "Ataque percusivo demoledor con mordida metálica en agudos en la pastilla del puente; pastilla de mástil cálida, oscura y aterciopelada.",
        "context":  "El primer diseño de guitarra eléctrica de cuerpo sólido de producción masiva. El sonido \u0027twang\u0027 que construyó el country y el rock.",
        "category":  "Single Coil Twang",
        "dspRecommendations":  "Compresor de ataque rápido estilo Dynacomp, slapback delay (110-130ms), ampli Fender Tweed Bassman o Deluxe."
    },
    {
        "body":  "Fresno con acabado Butterscotch Blonde desgastado, afinada en Open G sin 6ta cuerda",
        "name":  "Fender Telecaster \u002753 \u0027Micawber\u0027 (Keith Richards - The Rolling Stones)",
        "pickups":  "Gibson PAF Humbucker en mástil (invertido) + Pastilla de Lap Steel \u002748 en puente",
        "tonalProfile":  "Rítmica indestructible: el puente ruge con la agresividad de un lap steel de los 40, mientras el humbucker del mástil aporta cuerpo ahumado.",
        "context":  "La voz de los himnos de The Rolling Stones: \u0027Brown Sugar\u0027, \u0027Honky Tonk Women\u0027, \u0027Start Me Up\u0027. 5 cuerdas (G-D-G-B-D).",
        "category":  "Open G Rock Legend",
        "dspRecommendations":  "Ampli Fender Twin o Tweed con volumen alto, saturación crujiente de previo sin llegar a distorsión pesada, tono seco y directo."
    },
    {
        "body":  "Cuerpo semi-hueco con \u0027F-hole\u0027 tallado en fresno o aliso",
        "name":  "Fender Telecaster Thinline / Custom \u002772 (Keith Richards / Radiohead)",
        "pickups":  "2 Wide Range Humbuckers con imanes de CuNiFe (diseño Seth Lover)",
        "tonalProfile":  "Resonancia semi-acústica aireada; las pastillas Wide Range tienen un espectro de agudos mucho más brillante y claro que un humbucker estándar.",
        "context":  "La respuesta de Fender a Gibson en los 70. La favorita de Jonny Greenwood (Radiohead en \u0027OK Computer\u0027) y Tab Benoit en blues.",
        "category":  "Semi-Hollow / Wide Range",
        "dspRecommendations":  "Ampli Vox AC30 o Fender Twin, overdrive abierto y orgánico con excelente definición de acordes complejos."
    },
    {
        "body":  "Fresno con binding blanco perimetral, afinada en afinación abierta menor con cejilla",
        "name":  "Fender Telecaster Custom (Albert Collins - \u0027The Master of the Telecaster\u0027)",
        "pickups":  "Gibson Humbucker en mástil + Tele Single-Coil en puente",
        "tonalProfile":  "Agudos híper-afilados y cortantes (\u0027ice pick\u0027) con pegada inmediata y ataque de dedo que saca chispas del amplificador.",
        "context":  "El \u0027Iceman\u0027 del blues de Texas. Tocaba exclusivamente con los dedos sin púa, logrando un chasquido que rompía cualquier barrera de sonido.",
        "category":  "Ice-Pick Blues",
        "dspRecommendations":  "Fender Twin Reverb al máximo de brillo, reverb Spring mojada, amplificador limpio con agudos muy desinhibidos."
    },
    {
        "body":  "Arce flameado con veta central de nogal y golpeador tortoiseshell",
        "name":  "Hohner Prinz / The MadCat Telecaster (Prince - \u0027Purple Rain\u0027)",
        "pickups":  "2 Pastillas Single-Coil tipo Stratocaster bobinadas sobre base Tele",
        "tonalProfile":  "El chasquido funk definitivo: ataque cortante y percusivo para rítmicas muteadas, pero capaz de rugir con distorsión furiosa en solos.",
        "context":  "La guitarra inseparable de Prince. Con ella grabó y tocó en directo \u0027Purple Rain\u0027, \u0027Kiss\u0027, \u0027Let\u0027s Go Crazy\u0027 y el solo histórico de \u0027While My Guitar Gently Weeps\u0027.",
        "category":  "Funk \u0026 Rock Icon",
        "dspRecommendations":  "Compresor marcado para funk rítmico, pedal Boss DS-1 o overdrive brillante para solos, modulación Flanger sutil."
    },
    {
        "body":  "Aliso con recubrimiento de papel floral paisley y laca nitrocelulosa",
        "name":  "Fender Telecaster \u002768 Paisley Pink (James Burton / Brad Paisley)",
        "pickups":  "Single-Coils bobinado vintage con imanes escalonados",
        "tonalProfile":  "Snap percusivo insuperable, dinámica de cuerdas estiradas y respuesta ultra elástica para técnicas híbridas de púa y dedos.",
        "context":  "Pionera en las manos de James Burton con Elvis Presley y llevada al límite del virtuosismo chicken-pickin\u0027 moderno por Brad Paisley.",
        "category":  "Country Virtuoso Twang",
        "dspRecommendations":  "Slapback echo, amplificador estilo Dr. Z o Fender Deluxe al borde del breakup, presencia definida."
    },
    {
        "body":  "Fresno pesado acabado en rojo carmesí brillante",
        "name":  "Fender Telecaster \u0027Muddy Waters\u0027 \u002758 (Muddy Waters)",
        "pickups":  "2 Single-Coil de Alnico V con potenciómetros de amplificador \u0027amp knobs\u0027",
        "tonalProfile":  "Graves profundos y retumbantes en mástil, y mordisco crujiente en puente ideal para slide con tubo de metal en afinación abierta.",
        "context":  "El patriarca del blues eléctrico de Chicago (\u0027Mannish Boy\u0027, \u0027Hoochie Coochie Man\u0027). La transición acústica-eléctrica que parió el rock.",
        "category":  "Chicago Blues Primitive",
        "dspRecommendations":  "Ampli Tweed saturando en graves, compresión natural, reverb de placa sutil."
    },
    {
        "body":  "Aliso con capas superpuestas de pintura negra y gris desgastadas al extremo",
        "name":  "Fender Telecaster \u0027Joe Strummer\u0027 \u002766 (The Clash)",
        "pickups":  "2 Single-Coils vintage de bobinado estándar",
        "tonalProfile":  "Tono directo, sin adornos, rítmico, áspero y cortante para acordes rasgados a gran velocidad y contratiempos de reggae punk.",
        "context":  "El estandarte del punk británico (\u0027London Calling\u0027, \u0027White Riot\u0027). Tocada con la fuerza visceral del brazo derecho de Joe Strummer.",
        "category":  "Punk Rock Rebel",
        "dspRecommendations":  "Ampli Music Man HD o Marshall JCM800 limpio-crujiente sin pedales."
    },
    {
        "body":  "Aliso acabado en Faded Ice Blue Metallic",
        "name":  "Fender Telecaster \u0027Chrissie Hynde\u0027 \u002765 (The Pretenders)",
        "pickups":  "Fender Vintage \u002765 Single-Coils con golpeador cromado espejado",
        "tonalProfile":  "Rítmicas limpias y crujientes con agudos metálicos que destacan en la mezcla sin ensuciar la voz.",
        "context":  "La fuerza rítmica de The Pretenders (\u0027Brass in Pocket\u0027, \u0027Back on the Chain Gang\u0027). El puente perfecto entre el punk y el pop melódico.",
        "category":  "New Wave Post-Punk",
        "dspRecommendations":  "Chorus analógico sutil, amplificador Fender Twin Reverb con agudos presentes."
    },
    {
        "body":  "Aliso acabado en blanco perla total con herrajes rojos/cromados",
        "name":  "Fender Telecaster \u0027John 5\u0027 Ghost / J5 Triple Tele (John 5 - Mötley Crüe)",
        "pickups":  "Dimarzio D Activator Humbuckers de altísima salida + Killswitch arcade",
        "tonalProfile":  "Ataque instantáneo, claridad milimétrica en arpegios rápidos y potencia brutal bajo distorsiones extremas.",
        "context":  "El virtuoso que combina country chicken-pickin\u0027 ultrasónico con metal industrial en Marilyn Manson, Rob Zombie y Mötley Crüe.",
        "category":  "Industrial Country Shred",
        "dspRecommendations":  "Ampli High Gain de alta definición con noise gate y delay sincronizado."
    },
    {
        "body":  "Fresno con acabado pintado a mano con diseño psicodélico de Dragón oriental",
        "name":  "Fender Telecaster \u0027Jimmy Page\u0027 Dragon / Mirror \u002759 (Led Zeppelin I)",
        "pickups":  "2 Single-Coil \u002759 originales con imanes Alnico V",
        "tonalProfile":  "Potencia que engaña: suena tan pesada como un humbucker pero con la articulación, mordisco y corte limpio de una Telecaster.",
        "context":  "La guitarra con la que Jimmy Page grabó todo el primer disco de Led Zeppelin (\u0027Good Times Bad Times\u0027, \u0027Dazed and Confused\u0027) y el solo de \u0027Stairway to Heaven\u0027.",
        "category":  "Psychedelic Hard Rock",
        "dspRecommendations":  "Sola Sound Tone Bender MkII fuzz virtual en bloque FX antes de un ampli Supro o Marshall."
    },
    {
        "body":  "Cuerpo ultra delgado y liviano de caoba sólida con cuernos afilados biselados",
        "name":  "Gibson SG Standard \u002761 (Angus Young / Tony Iommi)",
        "pickups":  "2 Humbuckers \u002757 Classic / 490R-498T",
        "tonalProfile":  "Ataque frontal instantáneo, medios-altos punzantes y agresivos que sobresalen en la mezcla, sin los graves retumbantes de la Les Paul.",
        "context":  "El motor rítmico y solista de AC/DC (\u0027Back in Black\u0027, \u0027Highway to Hell\u0027) y la piedra angular del heavy metal primitivo con Black Sabbath.",
        "category":  "Solidbody Double-Cut",
        "dspRecommendations":  "Marshall JCM800 o Plexi 1959 crujiente, perilla de medios al 70%, ganancia de preamp justa para no perder dinámica de ataque."
    },
    {
        "body":  "Caoba sólida delgada con unión de mástil en el traste 22",
        "name":  "Gibson SG Special con P-90s (Pete Townshend - The Who)",
        "pickups":  "2 Pastillas P-90 Soapbar con selector de 3 vías",
        "tonalProfile":  "Gruñido gutural de frecuencias medias, respuesta electrizante al rasgueo furioso y saturación orgánica que nunca se empasta.",
        "context":  "La guitarra destructora de \u0027Live at Leeds\u0027 y \u0027Woodstock\u0027. La definición del power chord y la agresividad del proto-punk británico.",
        "category":  "Raw Rock P-90",
        "dspRecommendations":  "Ampli Hiwatt o Marshall con volumen al máximo, saturación de salida, sin pedales intermediarios."
    },
    {
        "body":  "Caoba maciza con pegatina de mono y mástil barnizado en poliuretano",
        "name":  "Gibson SG \u0027Tony Iommi\u0027 \u0027Monkey\u0027 \u002765 Special (Black Sabbath)",
        "pickups":  "Custom Single-Coils de alta salida John Birch / Simm-Watts",
        "tonalProfile":  "Medios oscuros, graves cavernosos y un fuzz orgánico denso que definió el stoner rock y doom metal.",
        "context":  "El origen del Heavy Metal. Usada en \u0027Paranoid\u0027, \u0027Iron Man\u0027 y \u0027Master of Reality\u0027. Calibrada con cuerdas ultra ligeras y afinaciones caídas (C#).",
        "category":  "Doom Metal Origin",
        "dspRecommendations":  "Dallas Rangemaster Treble Booster empujando ampli Laney Supergroup al límite."
    },
    {
        "body":  "Caoba con acabado Cherry brillante y puente fijo Stopbar",
        "name":  "Gibson SG \u0027Derek Trucks\u0027 \u002761 Reissue (Tedeschi Trucks / Allman)",
        "pickups":  "2 Humbuckers \u002757 Classic con placa de cordal Lyre grabada",
        "tonalProfile":  "Tono vocal líquido incomparable: agudos sedosos que imitan a una cantante de soul y sustain amaderado perfecto.",
        "context":  "El mayor maestro de slide contemporáneo. Toca exclusivamente sin púa ni pedales de efectos, directo al amplificador.",
        "category":  "Vocal Slide Master",
        "dspRecommendations":  "Ampli Super Reverb crujiente a válvulas, cero pedales, ecualización plana con graves contenidos."
    },
    {
        "body":  "Caoba con mástil delgado de los 60",
        "name":  "Gibson SG \u0027Robby Krieger\u0027 \u002767 (The Doors)",
        "pickups":  "2 Humbuckers vintage de baja salida",
        "tonalProfile":  "Chasquido amaderado percusivo en medios, agudos definidos y calidez tímbrica única en arpegios psicodélicos.",
        "context":  "La guitarra de \u0027Light My Fire\u0027, \u0027Riders on the Storm\u0027 y \u0027Break on Through\u0027. Ejecutada con técnica de guitarra clásica y flamenco sin púa.",
        "category":  "Psychedelic Fingerstyle",
        "dspRecommendations":  "Ampli Fender Twin Reverb o Acoustic 260 con saturación sutil de válvulas."
    },
    {
        "body":  "Caoba con múltiples conmutadores minitoggle integrados",
        "name":  "Gibson SG \u0027Frank Zappa\u0027 \u0027Roxy\u0027 \u002760s Custom (Frank Zappa)",
        "pickups":  "2 Humbuckers con preamplificador activo a bordo y conmutadores de fase",
        "tonalProfile":  "Medios nasales extremos, armónicos artificiales que cantan al menor contacto y distorsión quirúrgica.",
        "context":  "Usada en los históricos conciertos de \u0027Roxy \u0026 Elsewhere\u0027. Capaz de producir cualquier combinación de fuera de fase y frecuencias paramétricas.",
        "category":  "Avant-Garde Modified",
        "dspRecommendations":  "Overdrive paramétrico con realce en 1.8 kHz y delay estéreo sincronizado."
    },
    {
        "body":  "Madera de Korina (1958) o Caoba selecta (1967) en forma de flecha simétrica",
        "name":  "Gibson Flying V \u002758 / \u002767 (Albert King / Jimi Hendrix / Schenker)",
        "pickups":  "2 Humbuckers PAF / 496R-500T cerámicos",
        "tonalProfile":  "Tono muy enfocado y proyectado hacia adelante: el diseño de flecha elimina cancelaciones acústicas, entregando medios cantores y graves limpios.",
        "context":  "Nacida adelantada a su tiempo. Utilizada por Albert King en afinaciones graves (\u0027Born Under a Bad Sign\u0027), Jimi Hendrix en Isle of Wight y Michael Schenker.",
        "category":  "Futuristic Vintage V",
        "dspRecommendations":  "Ampli de alta ganancia o crunch británico clásico, ecualización balanceada, delay de solo de 380ms."
    },
    {
        "body":  "Caoba acabada en dos tonos divididos blanco y negro",
        "name":  "Gibson Flying V \u0027Michael Schenker\u0027 / \u0027Grace Potter\u0027 (Scorpions / UFO)",
        "pickups":  "Humbuckers Gibson 496R/500T de salida extrema",
        "tonalProfile":  "Sustain punzante infinito, armónicos que explotan en legato veloz y claridad en agudos sin sonar fino.",
        "context":  "El sonido solista del hard rock europeo de UFO (\u0027Lights Out\u0027, \u0027Doctor Doctor\u0027) y Michael Schenker Group.",
        "category":  "Hard Rock Lead",
        "dspRecommendations":  "Marshall JCM800 empujado por pedal wah en posición semi-abierta, delay de solo de 400ms."
    },
    {
        "body":  "Madera maciza de Korina con barra de acero transversal y trémolo Bigsby",
        "name":  "Gibson Flying V \u0027Lonnie Mack\u0027 \u002758 (Lonnie Mack / SRV)",
        "pickups":  "2 Humbuckers PAF originales de Korina",
        "tonalProfile":  "Tono gordo, campaneante y vibrante; el trémolo Bigsby en Korina entrega un aleteo y grosor sonoro imponente.",
        "context":  "El pionero del virtuosismo en guitarra eléctrica (\u0027Wham!\u0027). La principal inspiración técnica de Stevie Ray Vaughan.",
        "category":  "Roots Blues-Rock Vibrato",
        "dspRecommendations":  "Ampli Magnatone con vibrato de tono o Fender Bassman Tweed al 6."
    },
    {
        "body":  "Enorme masa de caoba sólida en diseño angular futurista",
        "name":  "Gibson Explorer \u002758 / \u002776 (The Edge - U2 / James Hetfield)",
        "pickups":  "2 Humbuckers PAF o Gibson 496R/500T cerámicos de alta salida",
        "tonalProfile":  "Masividad acústica: sustain monumental, graves profundos pero controlados y un \u0027thump\u0027 percusivo en palm-muting que pocas guitarras igualan.",
        "context":  "La guitarra de The Edge en los primeros cuatro discos de U2 (\u0027I Will Follow\u0027, \u0027Sunday Bloody Sunday\u0027) y la legendaria \u0027EET FUK\u0027 de James Hetfield en Master of Puppets.",
        "category":  "Heavy Resonance",
        "dspRecommendations":  "Delays modulados sincronizados a tresillos (The Edge) o ampli High Gain apretado con puerta de ruido (Metallica)."
    },
    {
        "body":  "Madera de Korina original de 1958",
        "name":  "Gibson Explorer \u0027Allen Collins\u0027 \u002758 (Lynyrd Skynyrd)",
        "pickups":  "2 Humbuckers PAF originales con cordal maestro vibrato modificado",
        "tonalProfile":  "Ataque cortante y sostenido que escala dinámicamente con cada compás sin perder cuerpo armónico.",
        "context":  "La protagonista indiscutible del solo más largo y aclamado del Southern Rock: el final épico de \u0027Free Bird\u0027.",
        "category":  "Southern Epic Lead",
        "dspRecommendations":  "Marshall Super Lead 100W con volumen a 8, ecualización con presencia en 60%."
    },
    {
        "body":  "Caoba maciza acabada en blanco Alpine White con golpeador dorado",
        "name":  "Gibson Explorer \u0027Lzzy Hale\u0027 Signature (Halestorm)",
        "pickups":  "\u002757 Classic y \u002757 Classic Plus con herrajes dorados",
        "tonalProfile":  "Crunch moderno apretado, medios definidos para cantar encima de la mezcla y agudos nítidos.",
        "context":  "La máquina de estadios de Lzzy Hale en Halestorm (\u0027I Miss the Misery\u0027, \u0027Love Bites\u0027).",
        "category":  "Modern Arena Hard Rock",
        "dspRecommendations":  "Ampli High Gain moderno con ganancia controlada, compresión rápida en rítmicas."
    },
    {
        "body":  "Construcción \u0027Neck-Through\u0027 de 9 capas de caoba/nogal con alas de caoba invertidas",
        "name":  "Gibson Firebird V (Johnny Winter / Allen Collins - Lynyrd Skynyrd)",
        "pickups":  "2 Firebird Mini-Humbuckers con imanes de barra alnico sin polos ajustables",
        "tonalProfile":  "Único e irrepetible: los mini-humbuckers Firebird son más brillantes y cortantes que un PAF, pero más densos y con mayor pegada que una pastilla simple.",
        "context":  "Diseñada por el diseñador de coches Ray Dietrich. El arma slide de Johnny Winter y la guitarra de \u0027Free Bird\u0027 en directo con Lynyrd Skynyrd.",
        "category":  "Neck-Through Mini-Humbucker",
        "dspRecommendations":  "Overdrive estilo Tube Screamer, ampli con cuerpo medio-bajo, excelente respuesta a la técnica de slide con bottleneck de cristal."
    },
    {
        "body":  "Construcción neck-through invertida en caoba",
        "name":  "Gibson Firebird I \u0027Clapton\u0027 (Eric Clapton - Blind Faith / Cream)",
        "pickups":  "1 Único Mini-Humbucker Firebird en posición de puente",
        "tonalProfile":  "Cero interferencias de circuito: la pastilla directa entrega un ataque explosivo, agudos vidriosos y distorsión pura.",
        "context":  "Tocada por Clapton en el concierto histórico de Hyde Park de 1969 con Blind Faith y en \u0027Badge\u0027.",
        "category":  "Minimalist Mini-Humbucker",
        "dspRecommendations":  "Marshall Plexi al borde de la saturación con volumen en la guitarra al 8 para limpiar."
    },
    {
        "body":  "Caoba maciza con pala invertida y clavijeros tipo \u0027banjo\u0027",
        "name":  "Gibson Firebird VII \u0027Dave Grohl\u0027 (Foo Fighters)",
        "pickups":  "3 Mini-Humbuckers Alnico V con trémolo Lyre Vibrola",
        "tonalProfile":  "Mayor amplitud de frecuencias que una guitarra estándar, con medios elásticos y gran resistencia al acople indeseado.",
        "context":  "Frecuente en las giras mundiales de Foo Fighters para rítmicas masivas y dinámicas alternativas.",
        "category":  "Alternative Wall of Power",
        "dspRecommendations":  "Ampli Vox AC30 combinado con Mesa Boogie Dual Rectifier para sonido grunge/power-pop."
    },
    {
        "body":  "Caoba maciza masiva con dos mástiles paralelos",
        "name":  "Gibson EDS-1275 Double Neck \u002768 (Jimmy Page / Don Felder)",
        "pickups":  "4 Humbuckers PAF (2 para mástil de 12 cuerdas, 2 para mástil de 6 cuerdas)",
        "tonalProfile":  "Mástil de 12 cuerdas con un brillo orquestal majestuoso; mástil de 6 cuerdas con la pegada clásica de una Gibson SG para solos ardientes.",
        "context":  "El icono absoluto de los directos de rock: \u0027Stairway to Heaven\u0027 (Page) y \u0027Hotel California\u0027 (Don Felder en The Eagles).",
        "category":  "Double-Neck Legend",
        "dspRecommendations":  "Reverb de placas amplia, chorus estéreo en el canal de 12 cuerdas, overdrive británico en el de 6."
    },
    {
        "body":  "Arce laminado con bloque central sólido de arce y abeto",
        "name":  "Gibson ES-335 Dot (B.B. King / Larry Carlton / Eric Clapton Cream)",
        "pickups":  "2 Humbuckers PAF / \u002757 Classic",
        "tonalProfile":  "Tono que respira y florece: agudos dulces, medios amaderados vocales y graves aterciopelados con una respuesta al tacto insuperable.",
        "context":  "La \u0027Reina de las Semihollow\u0027. Nacida en 1958 para unir la calidez del jazz con la resistencia al acople del rock. La base de B.B. King (\u0027Lucille\u0027) y Larry Carlton.",
        "category":  "Semi-Hollowbody",
        "dspRecommendations":  "Overdrive transparente estilo Dumble o Klon, amplificador Fender Twin o Deluxe al borde de quiebre, reverb Plate cálida."
    },
    {
        "body":  "Cuerpo semi-hueco sin aberturas en \u0027F\u0027 para eliminar acoples a altos volúmenes",
        "name":  "Gibson \u0027Lucille\u0027 / ES-355 (B.B. King)",
        "pickups":  "2 Humbuckers 490R / 490T con selector rotativo Varitone de 6 posiciones",
        "tonalProfile":  "El circuito Varitone filtra frecuencias específicas produciendo desde tonos nasales ahuecados hasta graves aterciopelados de blues puro.",
        "context":  "Inseparable de B.B. King (\u0027The Thrill Is Gone\u0027). Con ella desarrolló el vibrato con dedo índice más imitado de la historia.",
        "category":  "Blues Royalty",
        "dspRecommendations":  "Ampli Fender Twin Reverb o Lab Series L5 a transistores, agudos al 7, cero distorsión pesada."
    },
    {
        "body":  "Arce laminado con inlays de paralelogramo dividido y Varitone",
        "name":  "Gibson ES-345 Stereo (Freddie King / Chuck Berry)",
        "pickups":  "2 Humbuckers PAF con cableado estéreo independiente",
        "tonalProfile":  "Ataque percusivo enérgico, sustain balanceado y medios cálidos con enorme dinamismo para acompañamiento rítmico.",
        "context":  "El arma de Freddie King (\u0027Hide Away\u0027) y Chuck Berry. La base del sonido blues eléctrico de Texas y Chicago.",
        "category":  "Stereo Blues \u0026 Rock",
        "dspRecommendations":  "Ampli Fender Super Reverb crujiente con saturación natural al atacar fuerte."
    },
    {
        "body":  "Arce laminado con aberturas en diamante y pala invertida Firebird",
        "name":  "Gibson DG-335 / Trini Lopez (Dave Grohl - Foo Fighters)",
        "pickups":  "Burstbucker 1 en mástil + Burstbucker 2 en puente",
        "tonalProfile":  "Resonancia acústica mezclada con ganancia extrema: produce acoples melódicos controlados y acordes masivos que llenan estadios.",
        "context":  "La firma de Dave Grohl en Foo Fighters (\u0027Everlong\u0027, \u0027The Pretender\u0027, \u0027All My Life\u0027).",
        "category":  "Post-Grunge Semi-Hollow",
        "dspRecommendations":  "Mesa Boogie Dual Rectifier + Vox AC30 simultáneos, puerta de ruido moderada."
    },
    {
        "body":  "Completamente hueca (Full Hollow) de arce laminado, sin bloque central sólido",
        "name":  "Epiphone Casino (The Beatles: John Lennon, George Harrison, Paul McCartney)",
        "pickups":  "2 Pastillas P-90 Dogear originales",
        "tonalProfile":  "Crujiente, orgánica, ligera y resonante como una acústica amplificada. Entra en acople armónico musical controlado a volúmenes elevados (\u0027Revolution\u0027).",
        "context":  "El instrumento vertebral de The Beatles desde 1965: grabaron con ella \u0027Taxman\u0027, \u0027Sgt. Pepper\u0027, \u0027The White Album\u0027 y el mítico concierto en la azotea (Get Back).",
        "category":  "Full Hollowbody P-90",
        "dspRecommendations":  "Ampli Vox AC30 (preset UK 30), ecualización con agudos brillantes, saturación moderada que deje oir el aire de la caja."
    },
    {
        "body":  "Arce laminado con bloque central sólido de arce",
        "name":  "Epiphone Sheraton II (John Lee Hooker / Noel Gallagher - Oasis)",
        "pickups":  "2 Humbuckers Alnico Classic Pro con inlays en madreperla y abalone",
        "tonalProfile":  "Graves majestuosos, sustain prolongado y compresión dulce perfecta para arpegios de britpop y rasgueos de blues.",
        "context":  "La guitarra del \u0027Boogie\u0027 de John Lee Hooker y de los himnos de Oasis en \u0027Definitely Maybe\u0027 y \u0027Morning Glory\u0027.",
        "category":  "Britpop \u0026 Delta Blues",
        "dspRecommendations":  "Marshall JCM900 crujiente con boost de medios y reverb de muelles."
    },
    {
        "body":  "Semi-hueca con cordal dividido Frequensator para diferente tensión de cuerdas",
        "name":  "Epiphone Riviera \u002765 con Frequensator (Nick Valensi - The Strokes)",
        "pickups":  "Pastillas Gibson P-94 (P-90 en tamaño de humbucker)",
        "tonalProfile":  "Ataque rítmico afilado, precisión de corte y medios secos y ajustados que permiten entrelazar dos guitarras limpias sin estorbarse.",
        "context":  "La base del renacimiento del garage rock neoyorquino en \u0027Is This It\u0027 y \u0027Room on Fire\u0027 con The Strokes.",
        "category":  "Garage Rock Revival",
        "dspRecommendations":  "Ampli Fender Hot Rod DeVille con pedal Jekyll \u0026 Hyde (overdrive suave)."
    },
    {
        "body":  "Caja ancha profunda de arce laminado o abeto macizo tallado con cordal trapezoidal",
        "name":  "Gibson ES-175 / L-5 CES (Joe Pass / Wes Montgomery / Pat Metheny)",
        "pickups":  "1 o 2 Humbuckers \u002757 Classic montados sobre tapa flotante",
        "tonalProfile":  "Tono oscuro, redondo, amaderado y profundo con tono bajado al 5; ausencia total de asperezas agudas, nota fundamental con gran cuerpo y articulación pura.",
        "context":  "El patrón de oro del Jazz tradicional en Nueva York. La voz melódica con pulgar de Wes Montgomery y el bebop virtuoso de Joe Pass.",
        "category":  "Archtop Jazz Pure",
        "dspRecommendations":  "Ampli a transistores ultra limpio (Polytone / Roland JC) o valvular limpio oscuro, cero distorsión, compresor ligero y reverb sutil de sala."
    },
    {
        "body":  "Caja hueca de arce con barra de tono de caballete y vibrato Bigsby B6",
        "name":  "Gretsch G6120 / Nashville (Brian Setzer / Chet Atkins)",
        "pickups":  "2 Humbuckers Filter\u0027Tron con imanes Alnico",
        "tonalProfile":  "\u0027Twang and Growl\u0027: graves elásticos y prietos, medios con un gruñido característico y agudos brillantes sin zumbido de fondo.",
        "context":  "La reina del Rockabilly, Fingerstyle country y Rock and Roll de los 50. Inseparable de Chet Atkins, Duane Eddy y Brian Setzer Orchestra.",
        "category":  "Hollowbody Filter\u0027Tron",
        "dspRecommendations":  "Slapback delay analógico (120ms con 1 repetición), reverb Spring profunda y amplificador Fender Bassman estilo Tweed."
    },
    {
        "body":  "Caoba con cámaras acústicas internas profundas y tapa sólida de arce negro",
        "name":  "Gretsch Duo Jet (George Harrison Early Beatles / Cliff Gallup)",
        "pickups":  "2 Pastillas DeArmond / Dynasonic Single-Coil de gran imán",
        "tonalProfile":  "Ataque percusivo explosivo y chispeante de bobina simple gruesa, pero con el cuerpo cálido y la respuesta acústica de una cámara resonante.",
        "context":  "La primera gran guitarra profesional de George Harrison en Hamburgo y Cavern Club. El tono del rockabilly primitivo de Cliff Gallup con Gene Vincent.",
        "category":  "Chambered Single-Coil",
        "dspRecommendations":  "Previo al límite de saturación valvular, compresor suave, eco de cinta sutil."
    },
    {
        "body":  "Caoba con cámaras acústicas internas, acabado despojado a madera natural",
        "name":  "Gretsch G6131T Jet Firebird \u0027The Beast\u0027 (Malcolm Young - AC/DC)",
        "pickups":  "1 Sola pastilla Filter\u0027Tron de puente (pastillas de mástil y centro retiradas)",
        "tonalProfile":  "Cero interferencias: una resonancia seca, percusiva y atronadora que golpea con la precisión de un redoblante y la fuerza de un cañón.",
        "context":  "El mejor sonido de guitarra rítmica de la historia del rock. Malcolm Young en \u0027Highway to Hell\u0027, \u0027Back in Black\u0027 y \u0027Thunderstruck\u0027.",
        "category":  "Pure Rhythm Machine",
        "dspRecommendations":  "Marshall Super Bass o JTM45 sin pedales, ganancia limpia-crujiente, presencia en 70%."
    },
    {
        "body":  "Enorme cuerpo hueco de 17 pulgadas con acabado blanco nieve y oropel dorado",
        "name":  "Gretsch White Falcon (Neil Young / Frusciante en Californication)",
        "pickups":  "2 Pastillas Filter\u0027Tron / High Sensitive",
        "tonalProfile":  "Tono majestuoso, panorámico, abierto y sedoso; llena frecuencias de 80Hz a 12kHz con un aire y belleza acústica sin igual.",
        "context":  "La guitarra más fastuosa de la historia. Inmortalizada en las rítmicas acústicas-eléctricas de Neil Young y en el tono de \u0027Otherside\u0027 y \u0027Californication\u0027.",
        "category":  "Hollowbody Deluxe",
        "dspRecommendations":  "Reverb Plate de estudio generosa, compresor de estudio transparente, overdrive sutil de baja ganancia."
    },
    {
        "body":  "Caja ancha de nogal oscuro con palanca de sordinas mecánicas dobles",
        "name":  "Gretsch Chet Atkins Country Gentleman (George Harrison / Chet Atkins)",
        "pickups":  "2 Filter\u0027Tron Dual Coil con aberturas F simuladas pintadas para evitar acople",
        "tonalProfile":  "Brillo acampanado sin asperezas, graves controlados y una resonancia elegante para arpegios limpios de acordes abiertos.",
        "context":  "La guitarra de George Harrison en la conquista de Estados Unidos en 1964: \u0027A Hard Day\u0027s Night\u0027, \u0027I Want to Hold Your Hand\u0027 y \u0027She Loves You\u0027.",
        "category":  "Beatle Chime Hollow",
        "dspRecommendations":  "Ampli Vox AC30 con Top Boost, eco corto y compresión suave."
    },
    {
        "body":  "Arce semi-acústico con bordes redondeados y pala patentada para 12 cuerdas",
        "name":  "Rickenbacker 360/12 (The Beatles / The Byrds / Tom Petty)",
        "pickups":  "2 Single-Coil \u0027Toaster Top\u0027 vintage de baja impedancia",
        "tonalProfile":  "Tintineo de campanas doradas: la duplicación de octavas brillantes combinada con las pastillas Toaster produce una lluvia de armónicos inconfundible.",
        "context":  "El sonido \u0027jangle\u0027 que definió la invasión británica y el folk-rock de los 60: \u0027A Hard Day\u0027s Night\u0027, \u0027Ticket to Ride\u0027 y \u0027Mr. Tambourine Man\u0027.",
        "category":  "12-String Electric",
        "dspRecommendations":  "Compresor de estudio agresivo (emulando pedal JangleBox), amplificador limpio brillante con agudos libres y cero saturación."
    },
    {
        "body":  "Cuerpo compacto semi-hueco con escala corta de 20.75 pulgadas y vibrato Kauffman/Ac\u0027cent",
        "name":  "Rickenbacker 325 (John Lennon - 1964 Ed Sullivan)",
        "pickups":  "3 Pastillas Single-Coil Vintage Toaster",
        "tonalProfile":  "Ataque rítmico instantáneo y seco: cuerdas con menor tensión que permiten acordes rápidos y rítmicas de rock and roll percusivas y vivaces.",
        "context":  "La guitarra con la que John Lennon revolucionó la música en el Show de Ed Sullivan en febrero de 1964 ante 73 millones de espectadores.",
        "category":  "Short Scale Rhythm",
        "dspRecommendations":  "Ampli Vox AC30 limpio con medios claros, slapback de cinta y ausencia de graves retumbantes."
    },
    {
        "body":  "Arce con corte de herradura \u0027Slash soundhole\u0027 y bordes afilados",
        "name":  "Rickenbacker 330 (Pete Townshend / Paul Weller - The Jam)",
        "pickups":  "2 Hi-Gain Single-Coils Rickenbacker",
        "tonalProfile":  "Agresividad brillante de campana con medios afilados para cortar a través del bajo y la batería en canciones de ritmo vertiginoso.",
        "context":  "La voz del movimiento mod británico: The Who en los 60 y Paul Weller en The Jam (\u0027Town Called Malice\u0027, \u0027That\u0027s Entertainment\u0027).",
        "category":  "Mod Revival Jangle",
        "dspRecommendations":  "Ampli británico crujiente con agudos abiertos y compresión tenue."
    },
    {
        "body":  "Semi-hueca con tapa de abeto laminado, fondo de arce flameado y trémolo Deluxe",
        "name":  "Duesenberg Starplayer TV (The Killers / John Mayer / Chris Cornell)",
        "pickups":  "Pastilla Domino P-90 en mástil + GrandVintage Humbucker en puente",
        "tonalProfile":  "El matrimonio sonoro perfecto: la calidez orgánica y vocal del P-90 en mástil con el crunch directo, apretado y rockero del humbucker en puente.",
        "context":  "La joya de la luthería alemana moderna. La guitarra preferida en giras de estadio por Chris Cornell, The Killers, Keith Urban y Mike Campbell.",
        "category":  "Modern Vintage Semi-Hollow",
        "dspRecommendations":  "Overdrive transparente y dinámico, delay analógico con repeticiones rítmicas, excelente para pop-rock y britpop de estadio."
    },
    {
        "body":  "Cuerpo asimétrico ergonómico con circuito independiente Lead / Rhythm y trémolo flotante",
        "name":  "Fender Jazzmaster (Sonic Youth / The Cure / Surf Rock / J Mascis)",
        "pickups":  "2 Single-Coils de bobina ancha y plana (estilo \u0027Soapbar\u0027)",
        "tonalProfile":  "Circuito Lead afilado y percusivo con frecuencias agudas cristalinas; circuito Rhythm oscuro, profundo y sedoso perfecto para fuzz.",
        "context":  "Del surf instrumental de The Ventures al shoegaze de My Bloody Valentine, The Cure y el rock ruidoso de Dinosaur Jr. y Sonic Youth.",
        "category":  "Offset Single Coil",
        "dspRecommendations":  "Fuzz clásico tipo Big Muff o Fuzz Face en el bloque FX, trémolo modulado, reverb Hall profunda y amplia."
    },
    {
        "body":  "Escala corta de 24 pulgadas con placa cromada de selectores de corte de graves (\u0027Strangle switch\u0027)",
        "name":  "Fender Jaguar (Kurt Cobain / Johnny Marr - The Smiths)",
        "pickups":  "2 Single-Coils con jaula metálica dentada para supresión de ruido (o DiMarzio humbuckers en versión Cobain)",
        "tonalProfile":  "Ataque quirúrgico y percusivo; el interruptor de corte de graves permite que las notas se destaquen con nitidez absoluta a través de pedales de distorsión.",
        "context":  "La guitarra de Johnny Marr en The Smiths y de Kurt Cobain durante la consagración de Nirvana (\u0027Nevermind\u0027).",
        "category":  "Offset Short Scale",
        "dspRecommendations":  "Pedal de Chorus espeso (estilo Small Clone), distorsión agresiva tipo Boss DS-1 o ProCo Rat, reverb de muelles."
    },
    {
        "body":  "Cuerpo compacto y liviano de aliso/álamo con vibrato Dynamic Mustang",
        "name":  "Fender Mustang (Kurt Cobain - \u0027Smells Like Teen Spirit\u0027 \u0026 \u0027In Utero\u0027)",
        "pickups":  "2 Pastillas Single-Coil inclinadas con interruptores de desfase independiente",
        "tonalProfile":  "Tono rebelde, indomable y lo-fi. Al invertir la fase de las pastillas produce un timbre hueco, nasal y corrosivo ideal para punk y grunge.",
        "context":  "La guitarra fetiche de Kurt Cobain. Usada en el videoclip de \u0027Smells Like Teen Spirit\u0027 y la gira mundial de \u0027In Utero\u0027 (Lake Placid Blue y Fiesta Red).",
        "category":  "Short Scale Grunge",
        "dspRecommendations":  "Distorsión pesada tipo Boss DS-2 (Turbo mode) o Electro-Harmonix PolyChorus, amplificador británico saturado."
    },
    {
        "body":  "Aliso Sonic Blue con golpeador rojo carey",
        "name":  "Fender Mustang \u0027Kurt Cobain\u0027 \u0027Skystang I\u0027 (Nirvana - Live and Loud)",
        "pickups":  "Seymour Duncan JB Humbucker inclinado en puente + Mustang single en mástil",
        "tonalProfile":  "Riffs brutales y crujientes en la pastilla del puente combinados con el limpio oscuro y hueco de mástil.",
        "context":  "La guitarra número 1 de la gira final de Nirvana en 1993-94 (grabada en el concierto \u0027Live and Loud\u0027 de MTV).",
        "category":  "Grunge Weapon",
        "dspRecommendations":  "Boss DS-2 Turbo Distortion empujando un preamplificador estilo Marshall o SansAmp."
    },
    {
        "body":  "Diseño híbrido creado por Kurt Cobain dibujando mitades de Jaguar y Mustang",
        "name":  "Fender Jag-Stang (Kurt Cobain Custom Design)",
        "pickups":  "1 Humbucker vintage en puente + 1 Single-Coil Mustang en mástil",
        "tonalProfile":  "Agresividad crujiente en puente para riffs demoledores con la flexibilidad rítmica acampanada en la pastilla simple del mástil.",
        "context":  "Diseñada específicamente para Kurt por la Custom Shop de Fender en 1993 y utilizada en la etapa final de Nirvana.",
        "category":  "Grunge Hybrid",
        "dspRecommendations":  "Overdrive de alta ganancia, ecualización con medios recortados levemente, chorus espacial."
    },
    {
        "body":  "Semi-hueca asimétrica de arce laminado con bloque central",
        "name":  "Fender Starcaster \u002776 (Leo Nocentelli - The Meters / Jonny Greenwood)",
        "pickups":  "2 Fender Wide Range Humbuckers con clavijero curvo único",
        "tonalProfile":  "Tono elástico, espacioso y resonante; combina el ataque de un humbucker con el aire dulce de una caja acústica.",
        "context":  "El funk sincopado de Nueva Orleans con The Meters y la era contemporánea de Radiohead.",
        "category":  "Funk \u0026 Alt-Rock Semi-Hollow",
        "dspRecommendations":  "Auto-wah o envolvente en bloque FX, compresor transparente y ampli limpio."
    },
    {
        "body":  "Aliso con escala corta de 24.75 pulgadas (estilo Gibson en cuerpo Fender)",
        "name":  "Fender Toronado (John Frusciante / Frank Iero - My Chemical Romance)",
        "pickups":  "2 Humbuckers Fender Atomic de alta salida",
        "tonalProfile":  "Tensión suave en cuerdas, ataque cálido y facilidad para bends amplios con gran resistencia a la distorsión pesada.",
        "context":  "Usada por John Frusciante durante las grabaciones de \u0027Californication\u0027 y en el post-hardcore de los 2000s.",
        "category":  "Post-Grunge Punk",
        "dspRecommendations":  "Ampli británico saturado con delay analógico."
    },
    {
        "body":  "Tilo americano (Basswood) con asa \u0027Monkey Grip\u0027 y cavidad Lion\u0027s Claw para puente flotante",
        "name":  "Ibanez JEM / Universe (Steve Vai)",
        "pickups":  "Configuración H-S-H DiMarzio Evolution / Gravity Storm de alta salida",
        "tonalProfile":  "Claridad híper-quirúrgica bajo niveles descomunales de distorsión; armónicos artificiales que saltan al mínimo contacto y agudos cortantes.",
        "context":  "Creada en 1987 por Steve Vai. La guitarra que redefinió la ejecución técnica moderna en \u0027Passion and Warfare\u0027.",
        "category":  "Superstrat Virtuoso",
        "dspRecommendations":  "Ampli de alta ganancia tipo Cali Dual / Soldano, Tube Screamer como boost limpio, Delay digital estéreo de 450ms."
    },
    {
        "body":  "Cuerpo de tilo o caoba con mástil Wizard ultra delgado de radio casi plano",
        "name":  "Ibanez RG Series (Modern Shred \u0026 Progressive Metal)",
        "pickups":  "Humbuckers cerámicos de respuesta ultra rápida",
        "tonalProfile":  "Transitorios inmediatos, graves secos y prietos ideales para palm-muting veloz y ecualización diseñada para traspasar paredes de bajo y batería.",
        "context":  "El arma predilecta del shred de los 90 y el metal progresivo contemporáneo (Paul Gilbert, Chon, Polyphia).",
        "category":  "Modern Shred",
        "dspRecommendations":  "Puerta de ruido estricta en la entrada, amplificador Modern High Gain, ecualización balanceada sin exceso de graves."
    },
    {
        "body":  "Caoba maciza con cuerno inferior invertido agresivo",
        "name":  "Ibanez Iceman (Paul Stanley - KISS / System of a Down - Daron Malakian)",
        "pickups":  "2 Humbuckers de alta salida Ibanez Super 80 / DiMarzio",
        "tonalProfile":  "Medios graves robustos y crujientes con gran pegada frontal; ideal para afinaciones bajas (Drop C) donde mantiene la nota centrada y viva.",
        "context":  "Icono visual y sonoro del hard rock setentero con Paul Stanley y del nu-metal frenético de System of a Down (\u0027Toxicity\u0027, \u0027Chop Suey!\u0027).",
        "category":  "Heavy Rock Icon",
        "dspRecommendations":  "Ampli High Gain moderno, presencia en 65%, ecualización centrada en empujar los 800-1200Hz."
    },
    {
        "body":  "Caoba maciza tallada en bisel pronunciado",
        "name":  "ESP / LTD Snakebyte \u0026 Eclipse (James Hetfield - Metallica)",
        "pickups":  "Set activo EMG JH \u0027Het Set\u0027 (cerámico en puente, imanes individuales en mástil)",
        "tonalProfile":  "La pegada de pastillas activas pero con la dinámica y apertura de tono pasivo; graves híper-tensos que jamás embarran el sonido con palm-mutes pesados.",
        "context":  "La máquina rítmica moderna de James Hetfield para los directos masivos de Metallica. Creada para resistir el ataque más salvaje de púa hacia abajo.",
        "category":  "Modern Metal Active",
        "dspRecommendations":  "Simulador de Mesa Boogie Rectifier o Peavey 5150, corte estricto de graves antes de saturar, cabina 4x12 cerrada con conos V30."
    },
    {
        "body":  "Aliso selecto con mástil de arce de perfil extra fino",
        "name":  "ESP Eclipse / KH-2 Ouija (Kirk Hammett - Metallica)",
        "pickups":  "EMG 81 en puente y EMG 60 en mástil con puente Floyd Rose original",
        "tonalProfile":  "Compresión agresiva, sustain quirúrgico para solos empapados en pedal wah y precisión en armónicos pinchados.",
        "context":  "La guitarra de solos de Kirk Hammett en el \u0027Black Album\u0027, \u0027Master of Puppets\u0027 y giras mundiales.",
        "category":  "Thrash Metal Soloist",
        "dspRecommendations":  "Mesa Boogie Triaxis o Mark IIC+, wah wah Dunlop Crybaby en bloque FX, delay de solo."
    },
    {
        "body":  "Caoba maciza con tapa de arce y cruz de hierro incrustada",
        "name":  "ESP LTD \u0027Iron Cross\u0027 (James Hetfield - Metallica)",
        "pickups":  "EMG HetSet activo con conmutador superior simulado",
        "tonalProfile":  "Masividad y rapidez en el palm-mute con claridad extrema en acordes disonantes de metal.",
        "context":  "La guitarra de directo de Hetfield en la era contemporánea de Metallica (\u0027Hardwired... to Self-Destruct\u0027).",
        "category":  "Heavy Riff Singlecut",
        "dspRecommendations":  "Ampli High Gain moderno con ecualización en \u0027V\u0027 suave y filtro Low Cut en cabina."
    },
    {
        "body":  "Estructura multicapa de caoba, tilo y tapa de arce tallado con acceso total al traste 24",
        "name":  "Music Man John Petrucci / Majesty (Dream Theater)",
        "pickups":  "DiMarzio Sonic Ecstasy / Rainmaker + Sistema Piezoeléctrico custom en selletas",
        "tonalProfile":  "Definición microscópica en pasajes híper-rápidos y posibilidad instantánea de conmutar de distorsión destructiva a tono acústico cristalino.",
        "context":  "La cumbre de la ingeniería para metal progresivo. Desarrollada junto a John Petrucci para maximizar velocidad, afinación y versatilidad acústica.",
        "category":  "Progressive High-Tech",
        "dspRecommendations":  "Ampli High Gain boutique, compresión en limpio, chorus sutil en solos y reverb estéreo inmersiva."
    },
    {
        "body":  "Fresno del norte o tilo con mástil de arce frotado a mano al aceite",
        "name":  "Charvel / EVH Wolfgang \u0027Frankenstrat\u0027 (Eddie Van Halen)",
        "pickups":  "Humbucker EVH Wolfgang de salida caliente atornillado directamente al cuerpo",
        "tonalProfile":  "El sagrado \u0027Brown Sound\u0027: saturación valvular esponjosa (\u0027chewy\u0027), armónicos que brotan en cada traste, medios orgánicos y graves cálidos jamás ásperos.",
        "context":  "El invento casero que cambió para siempre el sonido de la guitarra en 1978: un humbucker de Gibson montado en un cuerpo de Stratocaster con puente trémolo.",
        "category":  "Brown Sound Origin",
        "dspRecommendations":  "Ampli Plexi con Variac virtual (voltaje reducido), pedal Phaser (Phase 90) antes de la distorsión, delay de 250ms con 2 repeticiones."
    },
    {
        "body":  "Arce macizo con mástil de arce y puente Floyd Rose original",
        "name":  "Kramer Baretta \u002784 (Eddie Van Halen / 80s Sunset Strip)",
        "pickups":  "1 Único Humbucker Seymour Duncan JB inclinado en puente",
        "tonalProfile":  "Ataque estridente, directo, mordiente y sin pérdidas de señal; la esencia del glam metal y hard rock ochentero.",
        "context":  "El icono visual y sonoro de MTV en los 80. Un solo control de volumen y una sola pastilla inclinada para captar armónicos agudos.",
        "category":  "80s Hair Metal",
        "dspRecommendations":  "Ampli británico modificado al máximo, chorus analógico y reverb Plate generosa."
    },
    {
        "body":  "Construcción \u0027Neck-Through-Body\u0027 de arce central con alas de aliso",
        "name":  "Jackson Soloist / Rhoads V (Randy Rhoads / Marty Friedman - Megadeth)",
        "pickups":  "Seymour Duncan JB en puente y \u002759 en mástil (o set EMG 81/85)",
        "tonalProfile":  "La pastilla JB entrega un \u0027gruñido\u0027 de medios altos (upper-mid snarl) que corta a través de cualquier mezcla; agudos afilados para solos veloces.",
        "context":  "La estética y sonido del thrash y speed metal de los 80. Usada en \u0027Rust in Peace\u0027 de Megadeth y los himnos inmortales de Ozzy Osbourne.",
        "category":  "Classic 80s Thrash",
        "dspRecommendations":  "Ampli británico modificado de alta ganancia, delay en solo de 350ms, reverb de sala discreta."
    },
    {
        "body":  "Diseño angular agresivo derivado de la Explorer",
        "name":  "Jackson Kelly (Marty Friedman - Megadeth)",
        "pickups":  "Seymour Duncan JB / Custom Shop Marty Friedman",
        "tonalProfile":  "Graves con enorme percusión y medios penetrantes ideales para escalas exóticas orientales y vibrato amplio.",
        "context":  "El arma de Marty Friedman para los legendarios solos de \u0027Tornado of Souls\u0027 y \u0027Holy Wars\u0027 en Megadeth.",
        "category":  "Thrash Exotic Virtuosity",
        "dspRecommendations":  "Marshall JCM800 empujado por pedal overdrive, delay estéreo sincronizado."
    },
    {
        "body":  "Cuerpo híbrido masivo de Flying V y Explorer con pala gigante en \u0027V\u0027",
        "name":  "Dean ML (Dimebag Darrell - Pantera)",
        "pickups":  "Bill Lawrence L500XL / Seymour Duncan Dimebucker en puente",
        "tonalProfile":  "Agudos de cuchilla, ecualización en \u0027V\u0027 extrema (mid-scoop quirúrgico) y armónicos artificiales que chillan al hacer dive-bombs con el trémolo.",
        "context":  "El tono desgarrador de Dimebag Darrell en \u0027Cowboys from Hell\u0027, \u0027Vulgar Display of Power\u0027 y \u0027Walk\u0027.",
        "category":  "Groove Metal Legend",
        "dspRecommendations":  "Ampli Randall a transistores de alta ganancia o modern high gain con medios rebajados al 35% y agudos al 80%."
    },
    {
        "body":  "Caoba maciza neck-through con cuernos arqueados",
        "name":  "BC Rich Mockingbird (Slash / Chuck Schuldiner - Death)",
        "pickups":  "2 Humbuckers DiMarzio Super Distortion con circuito de varitone pasivo",
        "tonalProfile":  "Sustain muy extendido, masa armónica densa y versatilidad gracias a los conmutadores de inversión de fase.",
        "context":  "Usada por Slash en el videoclip y conciertos de \u0027You Could Be Mine\u0027 (Terminator 2) y por leyendas del metal.",
        "category":  "Classic Heavy Metal",
        "dspRecommendations":  "Marshall JCM800 saturado con graves firmes y reverb de sala corta."
    },
    {
        "body":  "Aliso ligero de diseño angular afilado en negro medianoche",
        "name":  "BC Rich Stealth (Chuck Schuldiner - Death)",
        "pickups":  "1 Sola pastilla Dimarzio X2N de salida monstruosa en puente",
        "tonalProfile":  "Ganancia extrema, transitorios inmediatos y medios abrasivos diseñados para riffs híper-complejos a tempo vertiginoso.",
        "context":  "El instrumento que creó el Death Metal técnico en discos seminales como \u0027Symbolic\u0027 y \u0027The Sound of Perseverance\u0027.",
        "category":  "Death Metal Pioneer",
        "dspRecommendations":  "Marshall Valvestate 8100 crujiente con boost de medios, puerta de ruido estricta."
    },
    {
        "body":  "Aliso o padauk natural sin barniz con unión Stephens Extended Cutaway",
        "name":  "Washburn N4 (Nuno Bettencourt - Extreme)",
        "pickups":  "Bill Lawrence L500 en puente + Seymour Duncan \u002759 en mástil",
        "tonalProfile":  "El sonido más percusivo del rock virtuoso: chasquido seco de púa, dinámica limpia al bajar volumen y tono cálido en solos.",
        "context":  "La guitarra de \u0027Get the Funk Out\u0027 y \u0027More Than Words\u0027. El mástil sin talón permite digitaciones inverosímiles en los trastes altos.",
        "category":  "Funk Metal Virtuoso",
        "dspRecommendations":  "Ampli Soldano SLO-100 o Marshall JCM800 crujiente sin exceso de reverb."
    },
    {
        "body":  "Caoba pesada con tapa curvada de arce acolchado y escala extendida de 25.5 pulgadas",
        "name":  "Schecter Hellraiser / C-1 (Metalcore \u0026 Djent Drop Tunings)",
        "pickups":  "Pastillas activas EMG 81TW / 89R con bobinado conmutable",
        "tonalProfile":  "Compresión uniforme de entrada, graves implacables que no se desmoronan en afinaciones caídas y cero inducción de acoples molestos.",
        "context":  "La guitarra emblema de la era dorada del metalcore de los 2000s (Avenged Sevenfold, Killswitch Engage) y bandas de afinaciones en Drop C y Drop B.",
        "category":  "Modern Metalcore",
        "dspRecommendations":  "Noise Gate en nivel alto, Low Cut riguroso en cabina para limpiar el subgrave, saturación moderna agresiva."
    },
    {
        "body":  "Caoba de una pieza con tapa tallada de arce rizado y escala de 25 pulgadas",
        "name":  "PRS Custom 24 (Carlos Santana / Al Di Meola / Mark Tremonti)",
        "pickups":  "2 Humbuckers PRS 85/15 o Dragon con selector rotativo/blade",
        "tonalProfile":  "Articulación sin rival, medios vocales cantables, respuesta homogénea y sustain infinito que facilita técnicas de ligado y bending melódico.",
        "context":  "El puente perfecto entre Gibson y Fender creado por Paul Reed Smith. El sonido solista fluido de Carlos Santana y la potencia de Alter Bridge.",
        "category":  "Modern Double Cut",
        "dspRecommendations":  "Overdrive fluido tipo Tubescreamer empujando ampli estilo Cali Lead / US Boutique, delay estéreo sincronizado."
    },
    {
        "body":  "Caoba con tapa de arce rizado de grado 10-Top y escala corta de 24.5 pulgadas",
        "name":  "PRS Santana II (Carlos Santana)",
        "pickups":  "Santana Signature Humbuckers de bobinado grueso y salida cálida",
        "tonalProfile":  "Tono redondo y dulce como un violonchelo; sustain que dura compases enteros con tono bajado al 6 y respuesta cremosa.",
        "context":  "La voz inconfundible de Carlos Santana en \u0027Smooth\u0027, \u0027Black Magic Woman\u0027, \u0027Oye Como Va\u0027 y \u0027Europa\u0027.",
        "category":  "Latin Rock Legend",
        "dspRecommendations":  "Mesa Boogie Mark I clásico o Dumble Overdrive Special, compresión cálida, delay de 320ms."
    },
    {
        "body":  "Caoba gruesa de corte clásico con puente trémolo flotante modificado",
        "name":  "PRS Tremonti (Mark Tremonti - Creed / Alter Bridge)",
        "pickups":  "Tremonti Custom Treble (alta ganancia) + Tremonti Bass (cálida)",
        "tonalProfile":  "Pegada masiva en graves sin emborronar, transitorios percusivos y agudos muy nítidos para afinaciones caídas.",
        "context":  "La muralla de afinaciones pesadas (Drop D, Open D5) de Mark Tremonti en \u0027Metalingus\u0027 y \u0027Isolation\u0027.",
        "category":  "Modern Heavy Singlecut",
        "dspRecommendations":  "Ampli Bogner Uberschall o Mesa Boogie Triple Rectifier, puerta de ruido frontal."
    },
    {
        "body":  "Aliso con mástil de arce y radio vintage de 7.25 pulgadas",
        "name":  "PRS Silver Sky (John Mayer)",
        "pickups":  "3 Pastillas Single-Coil 635JM con bobinado vintage afinado al milímetro",
        "tonalProfile":  "Todo lo bueno del sonido de bobina simple tradicional pero sin asperezas estridentes en agudos; medios redondeados y un low-end sedoso y cálido.",
        "context":  "La visión contemporánea de John Mayer sobre la Stratocaster perfecta de 1963-64. Usada en \u0027Continuum\u0027 y \u0027Sob Rock\u0027.",
        "category":  "Modern Vintage Single-Coil",
        "dspRecommendations":  "Ampli estilo Two-Rock o Fender Super Reverb, Klon Centaur virtual en overdrive, reverb amplia de sala."
    },
    {
        "body":  "Marco hueco de contrachapado de álamo con tapas de Masonite (aglomerado duro)",
        "name":  "Danelectro 59 DC (Jimmy Page - \u0027Kashmir\u0027 / Link Wray)",
        "pickups":  "2 Pastillas Lipstick Single-Coil montadas en tubos de latón cromado",
        "tonalProfile":  "Timbre nasal, tintineante, seco y hueco; su personalidad lo-fi no se parece a ninguna otra guitarra y corta con un encanto \u0027vintage garage\u0027 único.",
        "context":  "La guitarra de 40 dólares que creó leyendas. Utilizada por Jimmy Page para \u0027Kashmir\u0027 e \u0027In My Time of Dying\u0027 en afinación DADGAD, y Link Wray en \u0027Rumble\u0027.",
        "category":  "Vintage Lo-Fi Lipstick",
        "dspRecommendations":  "Ampli a válvulas limpio crujiente con agudos abiertos, compresión suave, reverb de resortes o de sala."
    },
    {
        "body":  "Cuerpo hueco moldeado en fibra de vidrio \u0027Res-O-Glass\u0027 con unión central de madera",
        "name":  "Supro / Airline \u0027JB Hutto\u0027 (Jack White - The White Stripes)",
        "pickups":  "2 Pastillas Valco Single-Coil de gran bobinado con estética de humbucker",
        "tonalProfile":  "Crudo, salvaje, primitivo y rasposo: combina la resonancia elástica de la fibra de vidrio con la saturación explosiva de pastillas simples monstruosas.",
        "context":  "La icónica guitarra roja de Jack White en The White Stripes (\u0027Seven Nation Army\u0027, \u0027Fell in Love with a Girl\u0027). La definición del garage blues del siglo XXI.",
        "category":  "Res-O-Glass Garage",
        "dspRecommendations":  "Fuzz clásico llevado al límite o pedal de octava (Whammy/Octavia), ampli valvular al borde del colapso sónico."
    },
    {
        "body":  "Aliso con bisel alemán invertido (\u0027German Carve\u0027) y mástil ultra plano de trastes bajísimos",
        "name":  "Mosrite Ventures II / Mark I (Johnny Ramone / The Ventures)",
        "pickups":  "2 Single-Coil Mosrite de salida extrema (más de 12k de resistencia)",
        "tonalProfile":  "Ataque híper-rápido y estridente: las pastillas con bobinado salvaje saturan el previo con una furia cortante que definió la velocidad del punk rock.",
        "context":  "La ametralladora rítmica de Johnny Ramone en The Ramones (\u0027Blitzkrieg Bop\u0027). Tocada sin descanso durante 22 años con golpes hacia abajo ininterrumpidos.",
        "category":  "Punk Rock Downstroke",
        "dspRecommendations":  "Marshall JMP Super Lead al máximo sin pedales, ganancia media-alta y ecualización muy cargada en medios para rítmica pura."
    },
    {
        "body":  "Roble y caoba de chimenea centenaria tallada a mano con cámaras acústicas internas",
        "name":  "Brian May \u0027Red Special\u0027 (Queen)",
        "pickups":  "3 Pastillas Burns Tri-Sonic modificadas, cableadas en serie con interruptores de fase individuales",
        "tonalProfile":  "Orquesta de guitarras: la conexión en serie produce un tono gigantesco similar a un humbucker pero con armónicos de cuerda frotada (violín) y riqueza coral.",
        "context":  "Construida por Brian May y su padre en 1963. La voz inconfundible de Queen en \u0027Bohemian Rhapsody\u0027, \u0027We Will Rock You\u0027 y \u0027Killer Queen\u0027.",
        "category":  "Boutique Handmade Legend",
        "dspRecommendations":  "Treble Booster (bloque FX) empujando un amplificador estilo Vox AC30 (UK 30) al máximo de saturación, modulación tipo chorus suave."
    },
    {
        "body":  "Monocasco íntegro de fibra de carbono y resina epoxi de alta densidad sin pala",
        "name":  "Steinberger GL / Headless Carbon Fiber (Allan Holdsworth / 80s Pop)",
        "pickups":  "Humbuckers pasivos EMG o Seymour Duncan",
        "tonalProfile":  "Cero puntos muertos (\u0027dead spots\u0027): uniformidad tonal perfecta en cada traste del mástil, afinación inamovible y un sustain clínico y transparente.",
        "context":  "La revolución científica de Ned Steinberger en 1980. Usada por virtuosos del fusion como Allan Holdsworth y en la escena pop de los 80.",
        "category":  "Headless Composite",
        "dspRecommendations":  "Chorus estéreo ochenteno cristalino, compresor de estudio, ampli limpio de alta fidelidad."
    },
    {
        "body":  "Caoba africana ultra liviana con geometría ergonómica angular única",
        "name":  "Ernie Ball Music Man St. Vincent (Annie Clark)",
        "pickups":  "3 Mini-Humbuckers Custom Dimarzio con selector de 5 posiciones",
        "tonalProfile":  "Articulación prístina: balance exquisito entre la definición de notas en acordes complejos disonantes y la respuesta a texturas de fuzz pesado.",
        "context":  "Creada específicamente por Annie Clark (St. Vincent) para ergonomía total en directo y una paleta tonal diversa para el art-rock y synth-pop moderno.",
        "category":  "Modern Art-Rock",
        "dspRecommendations":  "Pedal de fuzz moderno, reverb Shimmer, amplificador de techo limpio con dinámica rápida."
    },
    {
        "body":  "Caoba con cámaras acústicas diseñadas mediante medición de flujo acústico y tapa de arce",
        "name":  "Yamaha Revstar Professional / Standard (Modern Japanese Craft)",
        "pickups":  "2 Humbuckers VH5 o P-90 con circuito pasivo \u0027Focus Switch\u0027",
        "tonalProfile":  "Resonancia orgánica rica en armónicos; el conmutador Focus Switch simula pastillas sobrebobinadas engordando medios y graves de manera inmediata.",
        "context":  "Inspirada en las motocicletas Café Racer de Tokio. La sorpresa tonal más aclamada por críticos y músicos de estudio contemporáneos.",
        "category":  "Modern Japanese Craft",
        "dspRecommendations":  "Overdrive versátil de grano fino, simulador de cabina abierta 2x12, respuesta fiel a cualquier dinámica de ejecución."
    },
    {
        "body":  "Aliso macizo con tapa de arce flameado y selletas GraphTech de teflón",
        "name":  "Yamaha Pacifica 611 (Workhorse Session Studio)",
        "pickups":  "Seymour Duncan SP90 en mástil + Custom 5 Humbucker en puente con split de bobina",
        "tonalProfile":  "Caleidoscopio de timbres: blues aterciopelado en mástil, funk transparente en bobina simple y riffs roqueros sólidos en puente.",
        "context":  "La reina de la relación calidad-precio en estudios de grabación independientes. Diseñada para cubrir cualquier encargo musical sin cambiar de instrumento.",
        "category":  "Modern Session Workhorse",
        "dspRecommendations":  "Ideal para presets todoterreno con varios bloques de modulación y delays ambientales."
    },
    {
        "body":  "Caoba laminada con bloque central y acabado Cherry clásico",
        "name":  "Guild Starfire IV / V (Buddy Guy / Jerry Garcia - Grateful Dead)",
        "pickups":  "2 Pastillas LB-1 \u0027Little Bucker\u0027 anti-hum vintage",
        "tonalProfile":  "Tono más ligero y campaneante que una 335, con medios aireados y gran respuesta a pasajes melódicos improvisados.",
        "context":  "El sonido psicodélico de San Francisco en los 60 con Grateful Dead y el Chicago blues eléctrico.",
        "category":  "Vintage Jam Semi-Hollow",
        "dspRecommendations":  "Ampli Fender Twin con reverb Spring generosa y saturación transparente."
    },
    {
        "body":  "Marco de álamo con tapas de aglomerado de cartón prensado prensado en los almacenes Sears",
        "name":  "Silvertone 1448 Amp-in-Case (Beck / Jack White / Dexter Romweber)",
        "pickups":  "1 Pastilla Lipstick central original de alta impedancia",
        "tonalProfile":  "Tono nasal, áspero, con encanto primitivo que se deforma musicalmente bajo cualquier pedal de fuzz o saturación.",
        "context":  "Vendida por correo en los 60 con el amplificador integrado dentro de la maleta de transporte. Icono del rock lo-fi moderno.",
        "category":  "Primitive Garage Lo-Fi",
        "dspRecommendations":  "Overdrive crujiente de previo pequeño, slapback echo corto y corte de agudos."
    },
    {
        "body":  "Escala extendida de 25.5 a 27 pulgadas para mantener tensión en la 7ma cuerda en Si (B)",
        "name":  "Guitarra Eléctrica de 7 Cuerdas (Meshuggah / Korn / Dream Theater)",
        "pickups":  "Humbuckers pasivos/activos de rango extendido (Fishman Fluence Modern / Bare Knuckle)",
        "tonalProfile":  "Respuesta masiva de frecuencias hasta 60 Hz. Requiere gestión de graves en el DSP para evitar que la séptima cuerda suene pastosa (\u0027muddy\u0027).",
        "context":  "Popularizada por Steve Vai en la Universe y convertida en el estándar de afinaciones graves en Nu-Metal, Djent y Progresivo.",
        "category":  "Extended Range 7-String",
        "dspRecommendations":  "Filtro Low Cut activo en previo o cabina a 100-120 Hz, puerta de ruido estricta, ampli High Gain con ganancia media para claridad en acordes."
    },
    {
        "body":  "Trastes en abanico (Fanned Frets / Multiescala de 26 a 28 pulgadas) para balance de tensión",
        "name":  "Guitarra Multiescala de 8 Cuerdas (Animals As Leaders - Tosin Abasi)",
        "pickups":  "Fishman Fluence Tosin Abasi Signature multivoicing",
        "tonalProfile":  "Rango tímbrico colosal que compite con el bajo eléctrico; demanda una claridad quirúrgica absoluta para distinguir notas en intervalos cerrados.",
        "context":  "La frontera de la técnica moderna de \u0027thumping\u0027 y progresivo polirrítmico de Tosin Abasi y Meshuggah. Llega al Fa# (F#) grave.",
        "category":  "Extended Range 8-String",
        "dspRecommendations":  "Low Cut en 130-150 Hz en entrada, realce en 2 kHz - 4 kHz para ataque de púa y dedos, amplificador Modern High Gain con compresor."
    },
    {
        "body":  "Escala larga de 30 pulgadas afinada de Mi a Mi (E-A-D-G-B-E) una octava completa por debajo",
        "name":  "Fender Bass VI / Guitarra Barítono (The Cure / Beatles - \u0027Let It Be\u0027 / Spaghetti Western)",
        "pickups":  "3 Pastillas Single-Coil tipo Jaguar con interruptor de corte de graves",
        "tonalProfile":  "Un híbrido hipnótico entre bajo eléctrico y guitarra con \u0027twang\u0027: gruñido grave profundo pero capaz de ejecutar acordes y arpegios melódicos cristalinos.",
        "context":  "Tocada por John Lennon en \u0027Let It Be\u0027, Robert Smith en las melodías nostálgicas de The Cure (\u0027Disintegration\u0027) y bandas sonoras de Ennio Morricone.",
        "category":  "Baritone / Bass VI",
        "dspRecommendations":  "Ampli de bajo con agudos presentes o ampli de guitarra con corte de subgraves, chorus analógico sutil y reverb primaveral."
    },
    {
        "body":  "Tapa armónica de abeto Sitka con aros y fondo de palisandro de la India macizo",
        "name":  "Martin D-28 / Taylor 814ce (Electroacústica Piezo / Micrófono)",
        "pickups":  "Transductor piezoeléctrico bajo selleta o sistema de micrófono interno",
        "tonalProfile":  "Respuesta plana y extendida de 20 Hz a 15 kHz; brillo de aire en altas frecuencias sin aspereza piezoeléctrica, cuerpo amaderado y graves nobles.",
        "context":  "El sonido acústico de referencia en miles de grabaciones históricas de folk, pop, baladas acústicas y country.",
        "category":  "Acoustic Simulation",
        "dspRecommendations":  "Bypass de saturación eléctrica, modelo de previo Acoustic, cabina con corte suave, compresor transparente y reverb Hall espaciosa."
    },
    {
        "body":  "Dreadnought de hombros caídos (Slope Shoulder) con tapa de abeto y fondo de caoba",
        "name":  "Gibson J-45 \u0027The Workhorse\u0027 (Bob Dylan / John Lennon / Noel Gallagher)",
        "pickups":  "Pastilla interna L.R. Baggs Element bajo selleta",
        "tonalProfile":  "Graves cálidos y comprimidos naturalmente que dejan espacio perfecto para la voz del cantante sin invadir el rango medio.",
        "context":  "La acústica más grabada de la historia del folk y rock. La voz de Bob Dylan, Donovan y los himnos acústicos de Oasis (\u0027Wonderwall\u0027).",
        "category":  "Dreadnought Singer-Songwriter",
        "dspRecommendations":  "Previo acústico transparente, corte de graves en 80Hz, compresor suave y reverb Plate."
    },
    {
        "body":  "Caja cuadrada grande de caoba con tapa de abeto Sitka y golpeador grabado de colibrí",
        "name":  "Gibson Hummingbird (Keith Richards - \u0027Wild Horses\u0027 / Gram Parsons)",
        "pickups":  "Pastilla magnética acústica o transductor piezoeléctrico",
        "tonalProfile":  "Tono dulce, balanceado, brillante y suavemente aterciopelado ideal para rasgueos abiertos con púa delgada.",
        "context":  "El rasgueo acústico de los Rolling Stones en \u0027Wild Horses\u0027, \u0027Angie\u0027 y el country-rock de los 70.",
        "category":  "Square-Shoulder Acoustic",
        "dspRecommendations":  "Compresor óptico suave, ecualización con realce dulce en 10kHz y reverb acústica."
    },
    {
        "body":  "Caja tradicional española o electroacústica delgada con cutaway",
        "name":  "Guitarra Clásica / Cuerdas de Nylon (Tim Henson - Polyphia / Bossa Nova)",
        "pickups":  "Piezoeléctrico bajo selleta adaptado para tensión de cuerdas de nylon",
        "tonalProfile":  "Ataque suave, cálido y dulce en agudos sin el chasquido acerado del metal; medios profundos y dinámica íntima al toque de yemas o uñas.",
        "context":  "El virtuosismo moderno de \u0027Playing God\u0027 de Polyphia y la tradición de la Bossa Nova de Joao Gilberto y el flamenco español.",
        "category":  "Nylon String Acoustic",
        "dspRecommendations":  "Compresor de respuesta rápida para igualar el volumen de notas pulsadas, reverb Shimmer sutil, cero saturación."
    },
    {
        "body":  "Caoba con doble cámara acústica y tapa sólida de cedro, diseñada para cero acoples en directo",
        "name":  "Godin Multiac Nylon / Grand Concert (Flamenco \u0026 Jazz Fusion)",
        "pickups":  "Selletas individuales RMC con sensor piezo individual por cuerda",
        "tonalProfile":  "Aislamiento perfecto de frecuencias: tono flamenco puro o jazzero de nylon capaz de sonar a volúmenes de festival sin retroalimentación ni resonancias descontroladas.",
        "context":  "La guitarra acústica preferida en conciertos de estadio por Al Di Meola, Paco de Lucía y John McLaughlin.",
        "category":  "Stage Nylon High-Tech",
        "dspRecommendations":  "Previo limpio de alta transparencia, ecualización con recorte en 400Hz para limpiar la mezcla, compresión sutil y delay difuso."
    },
    {
        "body":  "Fondo redondeado de fibra de vidrio Lyrachord con tapa de abeto o fibra de carbono",
        "name":  "Ovation Custom Balladeer / Adamas (Al Di Meola / Glen Campbell)",
        "pickups":  "Pastilla piezoeléctrica Ovation integrada con previo activo",
        "tonalProfile":  "Ataque ultra rápido y percusivo, gran definición de púa para fraseos veloces y resistencia absoluta a los acoples.",
        "context":  "Pionera en los 70 y 80 para los acústicos a velocidad de vértigo de Al Di Meola y Paco de Lucía en \u0027Friday Night in San Francisco\u0027.",
        "category":  "Composite Bowl Acoustic",
        "dspRecommendations":  "Chorus sutil, compresión de ataque rápido, reverb de sala acústica."
    },
    {
        "body":  "Cuerpo hueco de caoba con orificio acústico \u0027Stringed Instrument Resonance System\u0027 (SIRS)",
        "name":  "Fender Telecaster Acoustasonic (Modern Acoustic/Electric Hybrid)",
        "pickups":  "Acoustic Engine piezo bajo puente + sensor de cuerpo + pastilla magnética Noiseless",
        "tonalProfile":  "Flexibilidad total: desde el aire orgánico de madera acústica hasta el mordisco eléctrico de bobina simple sin cambiar de instrumento.",
        "context":  "La guitarra híbrida moderna que permite transicionar de una acústica dreadnought a una Telecaster saturada con un giro de potenciómetro.",
        "category":  "Hybrid Acoustic-Electric",
        "dspRecommendations":  "Canal limpio cristalino para el modo acústico o previo crunch para el modo magnético."
    }
];
  const guitars = data.guitars;
  const songs = data.songs;
  const genres = data.genres;

  // Lista única de artistas ordenada alfabéticamente
  const artistMap = new Map();
  songs.forEach(s => {
    if (!artistMap.has(s.artist.toLowerCase())) {
      artistMap.set(s.artist.toLowerCase(), { name: s.artist, genre: s.genre, songCount: 1 });
    } else {
      artistMap.get(s.artist.toLowerCase()).songCount++;
    }
  });
  const uniqueArtists = Array.from(artistMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  // Normalizador de texto para búsquedas insensibles a tildes y mayúsculas
  function normalize(str) {
    return (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  return {
    songs,
    genres,
    uniqueArtists,

    guitars,

    /**
     * Busca modelos de guitarra que coincidan con la consulta
     */
    searchGuitars(query, limit = 15) {
      const q = normalize(query);
      if (!q) return guitars.slice(0, limit);

      const tokens = q.split(/[\s\/\,\-]+/).filter(Boolean);

      return guitars
        .filter(g => {
          const gNorm = normalize(g.name);
          const pNorm = normalize(g.pickups);
          const cNorm = normalize(g.context);
          const catNorm = normalize(g.category);
          if (gNorm.includes(q) || pNorm.includes(q) || cNorm.includes(q) || catNorm.includes(q)) return true;
          if (tokens.length > 1) {
            return tokens.some(t => gNorm.includes(t) || pNorm.includes(t) || cNorm.includes(t) || catNorm.includes(t));
          }
          return false;
        })
        .sort((a, b) => {
          const aStarts = normalize(a.name).startsWith(q) ? -1 : 1;
          const bStarts = normalize(b.name).startsWith(q) ? -1 : 1;
          return aStarts - bStarts;
        })
        .slice(0, limit);
    },

    /**
     * Encuentra un perfil de guitarra por nombre
     */
    findGuitar(name) {
      if (!name) return null;
      const q = normalize(name);
      return guitars.find(g => normalize(g.name) === q) ||
             guitars.find(g => normalize(g.name).includes(q) || q.includes(normalize(g.name))) ||
             null;
    },

    /**
     * Busca artistas que coincidan con la consulta
     */
    searchArtists(query, limit = 8) {
      const q = normalize(query);
      if (!q) return uniqueArtists.slice(0, limit);
      return uniqueArtists
        .filter(a => normalize(a.name).includes(q))
        .sort((a, b) => {
          const aStarts = normalize(a.name).startsWith(q) ? -1 : 1;
          const bStarts = normalize(b.name).startsWith(q) ? -1 : 1;
          return aStarts - bStarts || b.songCount - a.songCount;
        })
        .slice(0, limit);
    },

    /**
     * Busca canciones que coincidan con la consulta y opcionalmente filtradas por artista
     */
    searchSongs(query, artistFilter = '', limit = 8) {
      const q = normalize(query);
      const af = normalize(artistFilter);

      let filtered = songs;
      if (af) {
        filtered = filtered.filter(s => normalize(s.artist).includes(af));
      }

      if (!q) return filtered.slice(0, limit);

      return filtered
        .filter(s => normalize(s.song).includes(q) || (!af && normalize(s.artist).includes(q)))
        .sort((a, b) => {
          const aStarts = normalize(a.song).startsWith(q) ? -1 : 1;
          const bStarts = normalize(b.song).startsWith(q) ? -1 : 1;
          return aStarts - bStarts;
        })
        .slice(0, limit);
    },

    /**
     * Busca géneros que coincidan con la consulta
     */
    searchGenres(query, limit = 14) {
      const q = normalize(query);
      if (!q) return genres.slice(0, limit);

      const tokens = q.split(/[\s\/\,\-]+/).filter(Boolean);

      return genres
        .filter(g => {
          const gNorm = normalize(g.name);
          if (gNorm.includes(q) || q.includes(gNorm)) return true;
          if (g.subgenres && g.subgenres.some(sub => {
            const sNorm = normalize(sub);
            return sNorm.includes(q) || q.includes(sNorm);
          })) return true;
          // Coincidencia por tokens individuales
          if (tokens.length > 1) {
            return tokens.some(t => gNorm.includes(t) || (g.subgenres && g.subgenres.some(sub => normalize(sub).includes(t))));
          }
          return false;
        })
        .sort((a, b) => {
          const aStarts = normalize(a.name).startsWith(q) ? -1 : 1;
          const bStarts = normalize(b.name).startsWith(q) ? -1 : 1;
          return aStarts - bStarts;
        })
        .slice(0, limit);
    },

    /**
     * Encuentra una canción exacta o aproximada
     */
    findSong(artist, song) {
      const aNorm = normalize(artist);
      const sNorm = normalize(song);
      return songs.find(s => normalize(s.artist) === aNorm && normalize(s.song) === sNorm) ||
             songs.find(s => normalize(s.artist).includes(aNorm) && normalize(s.song).includes(sNorm)) ||
             null;
    },

    /**
     * Encuentra un perfil de género por nombre
     */
    findGenre(genreName) {
      const q = normalize(genreName);
      return genres.find(g => normalize(g.name) === q || (g.subgenres && g.subgenres.some(sub => normalize(sub) === q))) ||
             genres.find(g => normalize(g.name).includes(q) || (g.subgenres && g.subgenres.some(sub => normalize(sub).includes(q)))) ||
             null;
    }
  };
})();