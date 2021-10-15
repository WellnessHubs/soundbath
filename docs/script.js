var bassNotes, electricPianoNotes, gongNotes, highHatsNotes, c;
var bassSampler, pianoSampler, gongSampler, hhSampler, kickSampler; 

async function loadMidiFiles() {
    const bass = await Midi.fromUrl("./music/Bass.mid");
    bassNotes = bass.tracks[0].notes;
    console.log(bass.tracks[0]);

    const electricPiano = await Midi.fromUrl("./music/ElecPiano.mid");
    electricPianoNotes = electricPiano.tracks[0].notes;

    const gong = await Midi.fromUrl("./music/Gong.mid");
    gongNotes = gong.tracks[0].notes;

    const highHats = await Midi.fromUrl("./music/HiHats.mid");
    highHatsNotes = highHats.tracks[0].notes;

    const kick = await Midi.fromUrl("./music/Kick.mid");
    kickNotes = kick.tracks[0].notes;

    // const pad = await Midi.fromUrl("./music/Pad.mid");
    // const padNotes = pad.tracks[0].notes;

}

async function loadInstruments() {
    bassSampler = new Tone.Sampler({
        "D2": "./music/Bass_D2.mp3",
    }, function () {
        let bassVolume = document.getElementById("bass-volume-control");
        bassSampler.volume.value = bassVolume.value;

        bassVolume.addEventListener("change", function (e) {
            bassSampler.volume.value = e.currentTarget.value;
        });

        let bassMute = document.getElementById("bass-mute");
        bassMute.addEventListener("click", function (e) {
            bassSampler.volume.value = -60;
        });
    }).toMaster();

    pianoSampler = new Tone.Sampler({
        "B3": "./music/ElecPiano_B3_1bar.mp3",
    }, function () {
        let electricPianoVolume = document.getElementById("electric-piano-volume-control");
        pianoSampler.volume.value = electricPianoVolume.value;

        electricPianoVolume.addEventListener("change", function (e) {
            pianoSampler.volume.value = e.currentTarget.value;
        });
    }).toMaster();

    gongSampler = new Tone.Sampler({
        "B2": "./music/Gong_B2.mp3",
    }, function () {
        let gongVolume = document.getElementById("gong-volume-control");
        gongSampler.volume.value = gongVolume.value;

        gongVolume.addEventListener("change", function (e) {
            gongSampler.volume.value = e.currentTarget.value;
        });
    }).toMaster();

    hhSampler = new Tone.Sampler({
        "D2": "./music/HiHat_D2.mp3",
    }, function () {
        let hhVolume = document.getElementById("hh-volume-control");
        hhSampler.volume.value = hhVolume.value;

        hhVolume.addEventListener("change", function (e) {
            hhSampler.volume.value = e.currentTarget.value;
        });
    }).toMaster();

    kickSampler = new Tone.Sampler({
        "D2": "./music/Kick_D2.mp3",
    }, function () {
        let kickVolume = document.getElementById("kick-volume-control");
        kickSampler.volume.value = hhVolume.value;

        kickVolume.addEventListener("change", function (e) {
            kickSampler.volume.value = e.currentTarget.value;
        });
    }).toMaster();

    // var padSampler = new Tone.Sampler({
    //     "D2": "./music/Pad.mp3",
    // }, function () {
    //     let padVolume = document.getElementById("pad-volume-control");
    //     padSampler.volume.value = padVolume.value;

    //     padVolume.addEventListener("change", function (e) {
    //         padSampler.volume.value = e.currentTarget.value;
    //     });

    //     playNotes(padNotes, padSampler);
    // }).toMaster();
}

function convertNotes(notes) {
    let result = [];
    notes.forEach(note => {
        let object = {};
        object.time = note.time;
        object.note = note.name;
        object.duration = note.duration;  
        object.octave = note.octave;   
        result.push(object);
    })

    console.log(result);
    return result;
}

async function playMusic() {
    await loadMidiFiles();
    await loadInstruments();

    const bassPart = new Tone.Part(function(time, note) {
        bassSampler.triggerAttackRelease(note.note, note.duration, time);
      }, convertNotes(bassNotes)).start(0);

      const pianoPart = new Tone.Part(function(time, note) {
        pianoSampler.triggerAttackRelease(note.note, note.duration, time);
      }, convertNotes(electricPianoNotes)).start(0);

      const gongPart = new Tone.Part(function(time, note) {
        gongSampler.triggerAttackRelease(note.note, note.duration, time);
      }, convertNotes(gongNotes)).start(0);

      const hhPart = new Tone.Part(function(time, note) {
        hhSampler.triggerAttackRelease(note.note, note.duration, time);
      }, convertNotes(highHatsNotes)).start(0);

      const kickPart = new Tone.Part(function(time, note) {
        kickSampler.triggerAttackRelease(note.note, note.duration, time);
      }, convertNotes(kickNotes)).start(0);

    Tone.Transport.bpm.value = 80;
    // Tone.Transport.bpm.rampTo(120, 10);
}

playMusic();

var musicOn = false;

function togglePlayer() {
    musicOn ? Tone.Transport.pause() : Tone.Transport.start();
    musicOn = !musicOn;
}