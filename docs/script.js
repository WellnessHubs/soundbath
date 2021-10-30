var songs = {
  song1: {
    phase1: {
      part1: {},
      part2: {},
      part3: {},
      part4: {},
      part5: {}
    },
    phase2: {
      part6: {},
      part7: {},
      part8: {},
      part9: {},
      part10: {}
    }
  },
};

var part1Sampler, part2Sampler, part3Sampler, part4Sampler, part5Sampler, part6Sampler, part7Sampler, part8Sampler, part9Sampler, part10Sampler; // Variables for each "instrument".

var songDuration = Number.MIN_VALUE;

/* loadMidiFiles: a function that loads all the midi files in the music folder and extracts the notes. */
async function loadMidiFiles() {
  let currentSong = songs.song1;

  // Load in the Part 1 MIDI file.
  const part1Midi = await Midi.fromUrl("./music/Soundbath_MIDI_10.19/Part1.mid"); // Load in the MIDI file and convert it to a Tone.js-friendly JSON object.
  currentSong.phase1.part1.notes = part1Midi.tracks[0].notes; // Extract the notes.
  songDuration = Math.max(part1Midi.duration, songDuration);

  // Load in the Part 2 MIDI file.
  const part2Midi = await Midi.fromUrl("./music/Soundbath_MIDI_10.19/Part2.mid");
  currentSong.phase1.part2.notes = part2Midi.tracks[0].notes;
  songDuration = Math.max(part2Midi.duration, songDuration);

  // Load in the Part 3 MIDI file.
  const part3Midi = await Midi.fromUrl("./music/Soundbath_MIDI_10.19/Part3.mid");
  currentSong.phase1.part3.notes = part3Midi.tracks[0].notes;
  songDuration = Math.max(part3Midi.duration, songDuration);

  // Load in the Part 4 MIDI file.
  const part4Midi = await Midi.fromUrl("./music/Soundbath_MIDI_10.19/Part4.mid");
  currentSong.phase1.part4.notes = part4Midi.tracks[0].notes;
  songDuration = Math.max(part4Midi.duration, songDuration);

  // Load in the Part 5 MIDI file.
  const part5Midi = await Midi.fromUrl("./music/Soundbath_MIDI_10.19/Part5.mid");
  currentSong.phase1.part5.notes = part5Midi.tracks[0].notes;
  songDuration = Math.max(part5Midi.duration, songDuration);

  // Load in the Part 6 MIDI file.
  const part6Midi = await Midi.fromUrl("./music/Soundbath_NewAudio_MIDI_10.26/NewMIDI_10.26/part6_D1.mid");
  currentSong.phase2.part6.notes = part6Midi.tracks[0].notes;

  // Load in the Part 7 MIDI file.
  const part7Midi = await Midi.fromUrl("./music/Soundbath_NewAudio_MIDI_10.26/NewMIDI_10.26/part7_D2.mid");
  currentSong.phase2.part7.notes = part7Midi.tracks[0].notes;

  // Load in the Part 8 MIDI file.
  const part8Midi = await Midi.fromUrl("./music/Soundbath_NewAudio_MIDI_10.26/NewMIDI_10.26/part8_F4.mid");
  currentSong.phase2.part8.notes = part8Midi.tracks[0].notes;

  // Load in the Part 9 MIDI file.
  const part9Midi = await Midi.fromUrl("./music/Soundbath_NewAudio_MIDI_10.26/NewMIDI_10.26/part9_D3.mid");
  currentSong.phase2.part9.notes = part9Midi.tracks[0].notes;

  // Load in the Part 10 MIDI file.
  const part10Midi = await Midi.fromUrl("./music/Soundbath_NewAudio_MIDI_10.26/NewMIDI_10.26/part10_D3.mid");
  currentSong.phase2.part10.notes = part10Midi.tracks[0].notes;

}

/* loadInstruments: a function that creates "instruments" with audio files. */
async function loadInstruments() {
  // Create the Bass "instrument" with sample audio.
  part1Sampler = new Tone.Sampler({
    "D2": "./music/Soundbath_Audio_10.19/Part1.wav", // Assign a D2 to a sample audio of a Bass instrument playing a D2.
  }, function () {
    part1Sampler.volume.value = 0;
  }).toMaster();

  // Create the Electric Piano "instrument" with sample audio.
  part2Sampler = new Tone.Sampler({
    "D1": "./music/Soundbath_Audio_10.19/Part2_1.wav",
  }, function () {
    part2Sampler.volume.value = 0;
  }).toMaster();

  // Create the Gong "instrument" with sample audio.
  part3Sampler = new Tone.Sampler({
    "D3": "./music/Soundbath_Audio_10.19/Part3.wav",
  }, function () {
    part3Sampler.volume.value = 0;
  }).toMaster();

  // Create the High Hats "instrument" with sample audio.
  part4Sampler = new Tone.Sampler({
    "D5": "./music/Soundbath_Audio_10.19/Part4.wav",
  }, function () {
    part4Sampler.volume.value = -5;
  }).toMaster();

  // Create the Kick "instrument" with sample audio.
  part5Sampler = new Tone.Sampler({
    "D2": "./music/Soundbath_Audio_10.19/Part5.wav",
  }, function () {
    part5Sampler.volume.value = 0;
  }).toMaster();

  part6Sampler = new Tone.Sampler({
    "D1": "./music/Soundbath_NewAudio_MIDI_10.26/NewAudio_10.26/part6_D1.wav",
  }, function () {
    part6Sampler.volume.value = -80;
  }).toMaster();

  part7Sampler = new Tone.Sampler({
    "D2": "./music/Soundbath_NewAudio_MIDI_10.26/NewAudio_10.26/part7_D2.wav",
  }, function () {
    part7Sampler.volume.value = -80;
  }).toMaster();

  part8Sampler = new Tone.Sampler({
    "F#4": "./music/Soundbath_NewAudio_MIDI_10.26/NewAudio_10.26/part8_F4_1.wav",
  }, function () {
    part8Sampler.volume.value = -80;
  }).toMaster();

  part9Sampler = new Tone.Sampler({
    "D3": "./music/Soundbath_NewAudio_MIDI_10.26/NewAudio_10.26/part9_D3.wav",
  }, function () {
    part9Sampler.volume.value = -80;
  }).toMaster();

  part10Sampler = new Tone.Sampler({
    "D3": "./music/Soundbath_NewAudio_MIDI_10.26/NewAudio_10.26/part10_D3.wav",
  }, function () {
    part10Sampler.volume.value = -80;
  }).toMaster();
}

function generateLowerNotes(noteName) {
  let number = noteName.substring(noteName.length - 1, noteName.length);
  if (Number.parseInt(number) > 0) {
    number = Number.parseInt(number) - 1;
  }

  // console.log(noteName + " to " + noteName.substring(0, noteName.length - 1) + number);
  return noteName.substring(0, noteName.length - 1) + number;
}

/* convertNotes: a function that takes in a list of notes from a Tone.js-friendly JSON object and converts it into a list of note objects that the Part object can read. */
function convertNotes(notes, lowerOctave) {
  let result = [];
  notes.forEach(note => {
    let object = {};
    object.time = note.time; // Extract the note time.
    object.note = lowerOctave ? generateLowerNotes(note.name) : note.name; // Extract the note name.
    object.duration = note.duration + 1; // Extract the note duration.
    object.octave = note.octave;
    result.push(object);
  })

  // console.log(result);
  return result;
}

/* defineMusic: a function that loads the MIDI files, creates the instruments, and assigns the parts. */
async function defineMusic() {
  await loadMidiFiles(); // Loads the MIDI files.
  await loadInstruments(); // Creates the instruments.

  let currentSong = songs.song1;

  // Create the bass instrument.
  const part1 = new Tone.Part(function (time, note) { // At each time instance...
    part1Sampler.triggerAttackRelease(note.note, note.duration, time); // Play the next note in the note array.
  }, convertNotes(currentSong.phase1.part1.notes, false)).start(0); // Insert the node array; start at time 0.

  // Create the electric piano instrument.
  const part2 = new Tone.Part(function (time, note) {
    part2Sampler.triggerAttackRelease(note.note, note.duration, time);
  }, convertNotes(currentSong.phase1.part2.notes, false)).start(0);

  // Create the gong instrument.
  const part3 = new Tone.Part(function (time, note) {
    part3Sampler.triggerAttackRelease(note.note, note.duration, time);
  }, convertNotes(currentSong.phase1.part3.notes, false)).start(0);

  // Create the high hats instrument.
  const part4 = new Tone.Part(function (time, note) {
    part4Sampler.triggerAttackRelease(note.note, note.duration, time);
  }, convertNotes(currentSong.phase1.part4.notes, false)).start(0);
  // console.log(hhSampler);

  // Create the kick instrument.
  const part5 = new Tone.Part(function (time, note) {
    part5Sampler.triggerAttackRelease(note.note, note.duration, time);
  }, convertNotes(currentSong.phase1.part5.notes, false)).start(0);

  const part6 = new Tone.Part(function (time, note) {
    part6Sampler.triggerAttackRelease(note.note, note.duration, time);
  }, convertNotes(currentSong.phase2.part6.notes, true)).start(0);

  const part7 = new Tone.Part(function (time, note) {
    part7Sampler.triggerAttackRelease(note.note, note.duration, time);
  }, convertNotes(currentSong.phase2.part7.notes, true)).start(0);

  const part8 = new Tone.Part(function (time, note) {
    part8Sampler.triggerAttackRelease(note.note, note.duration, time);
  }, convertNotes(currentSong.phase2.part8.notes, true)).start(0);

  const part9 = new Tone.Part(function (time, note) {
    part9Sampler.triggerAttackRelease(note.note, note.duration, time);
  }, convertNotes(currentSong.phase2.part9.notes, true)).start(0);

  let part10SecondNote = true;
  const part10 = new Tone.Part(function (time, note) {
    if (part10SecondNote) {
      part10Sampler.triggerAttackRelease(note.note, note.duration, time);
    } else {
      part10Sampler.triggerAttackRelease(note.note.substring(0, note.note.length - 1) + 2, note.duration, time);  
    }
    part10SecondNote = !part10SecondNote;
  }, convertNotes(currentSong.phase2.part10.notes, true)).start(0);

  Tone.Transport.bpm.value = 80; // Set the beats per minute to 80.

  part1Sampler.release = 1;
  part2Sampler.release = 1;
  part3Sampler.release = 1;
  part4Sampler.release = 1;
  part5Sampler.release = 1;
  part6Sampler.release = 1;
  part7Sampler.release = 1;
  part8Sampler.release = 1;
  part9Sampler.release = 1;
  part10Sampler.release = 2;

  Tone.Transport.loop = true;
  Tone.Transport.setLoopPoints(0, songDuration + 6);

  // console.log(Tone.Transport.loopEnd);

  Tone.Transport.scheduleRepeat((time) => {
    let bar = Tone.Time(time).toBarsBeatsSixteenths().split(":")[0];
    console.log(Tone.Time(time).toBarsBeatsSixteenths());

    if (bar == "8") {
      console.log(time + " crossfading part 1 and part 6...");
      part1Sampler.volume.rampTo(-80, "4:0:0");
      part6Sampler.volume.rampTo(0, "4:0:0");
    } else if (bar == "16") {
      console.log(time + " crossfading part 2 and part 7...");
      part2Sampler.volume.rampTo(-80, "4:0:0");
      part7Sampler.volume.rampTo(0, "4:0:0");
    } else if (bar == "24") {
      console.log(time + " crossfading part 3 and part 8...");
      part3Sampler.volume.rampTo(-80, "4:0:0");
      part8Sampler.volume.rampTo(0, "4:0:0");
    } else if (bar == "32") {
      console.log(time + " crossfading part 4 and part 9...");
      part4Sampler.volume.rampTo(-80, "4:0:0");
      part9Sampler.volume.rampTo(0, "4:0:0");
    } else if (bar == "40") {
      console.log(time + " crossfading part 5 and part 10...");
      part5Sampler.volume.rampTo(-80, "4:0:0");
      part10Sampler.volume.rampTo(0, "4:0:0");
    }
  }, "1m");

}

defineMusic(); // Call define music when the page loads.
var musicOn = false; // Initialize the music player to off.

/* togglePlayer: a function that toggles the music player on and off. */
function togglePlayer() {
  musicOn ? Tone.Transport.pause() : Tone.Transport.start(); // If the music is on, turn it off. Vice versa.
  musicOn = !musicOn; // Toggle the player.
}