now = Tone.now();

async function playMusic() {
    const bass = await Midi.fromUrl("./music/Bass.mid");
    const bassNotes = bass.tracks[0].notes;

    const electricPiano = await Midi.fromUrl("./music/ElecPiano.mid");
    const electricPianoNotes = electricPiano.tracks[0].notes;

    const gong = await Midi.fromUrl("./music/Gong.mid");
    const gongNotes = gong.tracks[0].notes;

    const highHats = await Midi.fromUrl("./music/Hihats.mid");
    const highHatsNotes = highHats.tracks[0].notes;

    const kick = await Midi.fromUrl("./music/Kick.mid");
    const KickNotes = kick.tracks[0].notes;

    const pad = await Midi.fromUrl("./music/Pad.mid");
    const padNotes = pad.tracks[0].notes;

    now = Tone.now() + 1.0;

    var bassSampler = new Tone.Sampler({
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

        playNotes(bassNotes, bassSampler);

    }).toMaster();

    var pianoSampler = new Tone.Sampler({
        "D2": "./music/ElecPiano.mp3",
    }, function () {
        let electricPianoVolume = document.getElementById("electric-piano-volume-control");
        pianoSampler.volume.value = electricPianoVolume.value;

        electricPianoVolume.addEventListener("change", function (e) {
            pianoSampler.volume.value = e.currentTarget.value;
        });

        playNotes(electricPianoNotes, pianoSampler);
    }).toMaster();

    var gongSampler = new Tone.Sampler({
        "B2": "./music/Gong_B2.mp3",
    }, function () {
        let gongVolume = document.getElementById("gong-volume-control");
        gongSampler.volume.value = gongVolume.value;

        gongVolume.addEventListener("change", function (e) {
            gongSampler.volume.value = e.currentTarget.value;
        });

        playNotes(gongNotes, gongSampler);
    }).toMaster();

    var hhSampler = new Tone.Sampler({
        "D2": "./music/HiHat_D2.mp3",
    }, function () {
        let hhVolume = document.getElementById("hh-volume-control");
        hhSampler.volume.value = hhVolume.value;

        hhVolume.addEventListener("change", function (e) {
            hhSampler.volume.value = e.currentTarget.value;
        });

        playNotes(highHatsNotes, hhSampler);
    }).toMaster();

    var kickSampler = new Tone.Sampler({
        "D2": "./music/Kick_D2.mp3",
    }, function () {
        let kickVolume = document.getElementById("kick-volume-control");
        kickSampler.volume.value = hhVolume.value;

        kickVolume.addEventListener("change", function (e) {
            kickSampler.volume.value = e.currentTarget.value;
        });

        playNotes(KickNotes, kickSampler);
    }).toMaster();

    var padSampler = new Tone.Sampler({
        "D2": "./music/Pad.mp3",
    }, function () {
        let padVolume = document.getElementById("pad-volume-control");
        padSampler.volume.value = padVolume.value;

        padVolume.addEventListener("change", function (e) {
            padSampler.volume.value = e.currentTarget.value;
        });

        playNotes(padNotes, padSampler);
    }).toMaster();
}

async function playNotes(notes, instrument) {
    notes.forEach(note => {
        console.log(note);
        instrument.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity);
    })
    
}