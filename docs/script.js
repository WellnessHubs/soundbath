var bassNotes, electricPianoNotes, gongNotes, highHatsNotes; // Variables for the notes from each MIDI file.
var bassSampler, pianoSampler, gongSampler, hhSampler, kickSampler; // Variables for each "instrument".

/* loadMidiFiles: a function that loads all the midi files in the music folder and extracts the notes. */
async function loadMidiFiles() {
    // Load in the Bass MIDI file.
    const bass = await Midi.fromUrl("./music/Soundbath_MIDI_10.19/Part1.mid"); // Load in the MIDI file and convert it to a Tone.js-friendly JSON object.
    bassNotes = bass.tracks[0].notes; // Extract the notes.

    // Load in the Electric Piano MIDI file.
    const electricPiano = await Midi.fromUrl("./music/Soundbath_MIDI_10.19/Part2.mid");
    electricPianoNotes = electricPiano.tracks[0].notes;

    // Load in the Gong MIDI file.
    const gong = await Midi.fromUrl("./music/Soundbath_MIDI_10.19/Part3.mid");
    gongNotes = gong.tracks[0].notes;

    // Load in the High Hats MIDI file.
    const highHats = await Midi.fromUrl("./music/Soundbath_MIDI_10.19/Part4.mid");
    highHatsNotes = highHats.tracks[0].notes;
    console.log(highHatsNotes);

    // Load in the Kick MIDI file.
    const kick = await Midi.fromUrl("./music/Soundbath_MIDI_10.19/Part5.mid");
    kickNotes = kick.tracks[0].notes;
    
}

/* loadInstruments: a function that creates "instruments" with audio files. */
async function loadInstruments() {
    // Create the Bass "instrument" with sample audio.
    bassSampler = new Tone.Sampler({
        "D2": "./music/Soundbath_Audio_10.19/Part1.wav", // Assign a D2 to a sample audio of a Bass instrument playing a D2.
    }, function () {
        let bassVolume = document.getElementById("bass-volume-control");
        bassSampler.volume.value = bassVolume.value; // Set the current volume to the slider's current value.

        bassVolume.addEventListener("change", function (e) { // Everytime the slider changes...
            bassSampler.volume.value = e.currentTarget.value; // Set the current volume to the current slider's current value.
        });
    }).toMaster();

    // Create the Electric Piano "instrument" with sample audio.
    pianoSampler = new Tone.Sampler({
        "D1": "./music/Soundbath_Audio_10.19/Part2_1.wav",
    }, function () {
        let electricPianoVolume = document.getElementById("electric-piano-volume-control");
        pianoSampler.volume.value = electricPianoVolume.value;

        electricPianoVolume.addEventListener("change", function (e) {
            pianoSampler.volume.value = e.currentTarget.value;
        });
    }).toMaster();

    // Create the Gong "instrument" with sample audio.
    gongSampler = new Tone.Sampler({
        "D3": "./music/Soundbath_Audio_10.19/Part3.wav",
    }, function () {
        let gongVolume = document.getElementById("gong-volume-control");
        gongSampler.volume.value = gongVolume.value;

        gongVolume.addEventListener("change", function (e) {
            gongSampler.volume.value = e.currentTarget.value;
        });
    }).toMaster();

    // Create the High Hats "instrument" with sample audio.
    hhSampler = new Tone.Sampler({
        "D5": "./music/Soundbath_Audio_10.19/Part4.wav",
    }, function () {
        let hhVolume = document.getElementById("hh-volume-control");
        hhSampler.volume.value = hhVolume.value;

        hhVolume.addEventListener("change", function (e) {
            hhSampler.volume.value = e.currentTarget.value;
        });
    }).toMaster();

    // Create the Kick "instrument" with sample audio.
    kickSampler = new Tone.Sampler({
        "D2": "./music/Soundbath_Audio_10.19/Part5.wav",
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

/* convertNotes: a function that takes in a list of notes from a Tone.js-friendly JSON object and converts it into a list of note objects that the Part object can read. */
function convertNotes(notes) {
    let result = [];
    notes.forEach(note => {
        let object = {};
        object.time = note.time; // Extract the note time.
        object.note = note.name; // Extract the note name.
        object.duration = note.duration + 0.25; // Extract the note duration.
        object.octave = note.octave;
        result.push(object);
    })

    console.log(result);
    return result;
}

/* defineMusic: a function that loads the MIDI files, creates the instruments, and assigns the parts. */
async function defineMusic() {
    await loadMidiFiles(); // Loads the MIDI files.
    await loadInstruments(); // Creates the instruments.

    // // Create the bass instrument.
    //  const bassPart = new Tone.Part(function(time, note) { // At each time instance...
    //     bassSampler.triggerAttackRelease(note.note, note.duration, time); // Play the next note in the note array.
    //   }, convertNotes(bassNotes)).start(0); // Insert the node array; start at time 0.

    // // Create the electric piano instrument.
    //   const pianoPart = new Tone.Part(function(time, note) {
    //     pianoSampler.triggerAttackRelease(note.note, note.duration, time);
    //   }, convertNotes(electricPianoNotes)).start(0);

    // // Create the gong instrument.
    //   const gongPart = new Tone.Part(function(time, note) {
    //     gongSampler.triggerAttackRelease(note.note, note.duration, time);
    //   }, convertNotes(gongNotes)).start(0);

    // // Create the high hats instrument.
    //   const hhPart = new Tone.Part(function(time, note) {
    //     hhSampler.triggerAttackRelease(note.note, note.duration, time);
    //   }, convertNotes(highHatsNotes)).start(0);
    //   console.log(hhSampler);

    // Create the kick instrument.
      const kickPart = new Tone.Part(function(time, note) {
        kickSampler.triggerAttackRelease(note.note, note.duration, time);
      }, convertNotes(kickNotes)).start(0);

    Tone.Transport.bpm.value = 60; // Set the beats per minute to 80.
}

defineMusic(); // Call define music when the page loads.
var musicOn = false; // Initialize the music player to off.

/* togglePlayer: a function that toggles the music player on and off. */
function togglePlayer() {
    musicOn ? Tone.Transport.pause() : Tone.Transport.start(); // If the music is on, turn it off. Vice versa.
    musicOn = !musicOn; // Toggle the player.
}