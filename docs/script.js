now = Tone.now() + 1.0;

async function play() {
    // load a midi file in the browser
    const synthPad = await Midi.fromUrl("./music/synth-pad.mid");
    const synthPadnotes = synthPad.tracks[0].notes;

    const bassSynth = await Midi.fromUrl("./music/bass-synth.mid");
    const bassSynthNotes = bassSynth.tracks[0].notes;

    const drums = await Midi.fromUrl("./music/drums-85-bpm.mid");
    const drumsNotes = drums.tracks[0].notes;

    const highHats = await Midi.fromUrl("./music/bouncy-high-hats.mid");
    const highHatsNotes = highHats.tracks[0].notes;

    const pedalSteel = await Midi.fromUrl("./music/pedal-steel-midi-convert.mid");
    const pedalSteelNotes = pedalSteel.tracks[0].notes;

    const synthOne = new Tone.Synth().toMaster();
    const synthTwo = new Tone.Synth().toMaster();
    const synthThree = new Tone.Synth().toMaster();
    const synthFour = new Tone.Synth().toMaster();
    const synthFive = new Tone.Synth().toMaster();

    playNotes(synthPadnotes, synthOne);
    playNotes(bassSynthNotes, synthTwo);
    playNotes(drumsNotes, synthThree);
    playNotes(highHatsNotes, synthFour);
    playNotes(pedalSteelNotes, synthFive);
}

async function playNotes(notes, instrument) {
    notes.forEach(note => {
        instrument.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity);
    })
}