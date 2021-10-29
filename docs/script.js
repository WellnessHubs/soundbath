var part1Notes, part2Notes, part3Notes, part4Notes, part5Notes, part6Notes; // Variables for the notes from each MIDI file.
var part1Sampler, part2Sampler, part3Sampler, part4Sampler, part5Sampler; // Variables for each "instrument".

var songDuration = Number.MIN_VALUE;

/* loadMidiFiles: a function that loads all the midi files in the music folder and extracts the notes. */
async function loadMidiFiles() {
  // Load in the Part 1 MIDI file.
  const part1Midi = await Midi.fromUrl("./music/Soundbath_MIDI_10.19/Part1.mid"); // Load in the MIDI file and convert it to a Tone.js-friendly JSON object.
  part1Notes = part1Midi.tracks[0].notes; // Extract the notes.
  songDuration = Math.max(part1Midi.duration, songDuration);
  // console.log(part1Midi);

  // Load in the Part 2 MIDI file.
  const part2Midi = await Midi.fromUrl("./music/Soundbath_MIDI_10.19/Part2.mid");
  part2Notes = part2Midi.tracks[0].notes;
  songDuration = Math.max(part2Midi.duration, songDuration);

  // Load in the Part 3 MIDI file.
  const part3Midi = await Midi.fromUrl("./music/Soundbath_MIDI_10.19/Part3.mid");
  part3Notes = part3Midi.tracks[0].notes;
  songDuration = Math.max(part3Midi.duration, songDuration);

  // Load in the Part 4 MIDI file.
  const part4Midi = await Midi.fromUrl("./music/Soundbath_MIDI_10.19/Part4.mid");
  part4Notes = part4Midi.tracks[0].notes;
  songDuration = Math.max(part4Midi.duration, songDuration);

  // Load in the Part 5 MIDI file.
  const part5Midi = await Midi.fromUrl("./music/Soundbath_MIDI_10.19/Part5.mid");
  part5Notes = part5Midi.tracks[0].notes;
  songDuration = Math.max(part5Midi.duration, songDuration);

}

/* loadInstruments: a function that creates "instruments" with audio files. */
async function loadInstruments() {
  // Create the Bass "instrument" with sample audio.
  part1Sampler = new Tone.Sampler({
    "D2": "./music/Soundbath_Audio_10.19/Part1.wav", // Assign a D2 to a sample audio of a Bass instrument playing a D2.
  }, function () {
    // let bassVolume = document.getElementById("bass-volume-control");
    // bassSampler.volume.value = bassVolume.value; // Set the current volume to the slider's current value.
    part1Sampler.volume.value = 0;

    // bassVolume.addEventListener("change", function (e) { // Everytime the slider changes...
    //     bassSampler.volume.value = e.currentTarget.value; // Set the current volume to the current slider's current value.
    // });
  }).toMaster();

  // Create the Electric Piano "instrument" with sample audio.
  part2Sampler = new Tone.Sampler({
    "D1": "./music/Soundbath_Audio_10.19/Part2_1.wav",
  }, function () {
    // let electricPianoVolume = document.getElementById("electric-piano-volume-control");
    // pianoSampler.volume.value = electricPianoVolume.value;
    part2Sampler.volume.value = 0;

    // electricPianoVolume.addEventListener("change", function (e) {
    //     pianoSampler.volume.value = e.currentTarget.value;
    // });
  }).toMaster();

  // Create the Gong "instrument" with sample audio.
  part3Sampler = new Tone.Sampler({
    "D3": "./music/Soundbath_Audio_10.19/Part3.wav",
  }, function () {
    // let gongVolume = document.getElementById("gong-volume-control");
    // gongSampler.volume.value = gongVolume.value;
    part3Sampler.volume.value = 0;

    // gongVolume.addEventListener("change", function (e) {
    //     gongSampler.volume.value = e.currentTarget.value;
    // });
  }).toMaster();

  // Create the High Hats "instrument" with sample audio.
  part4Sampler = new Tone.Sampler({
    "D5": "./music/Soundbath_Audio_10.19/Part4.wav",
  }, function () {
    // let hhVolume = document.getElementById("hh-volume-control");
    // hhSampler.volume.value = hhVolume.value;
    part4Sampler.volume.value = -80;

    // hhVolume.addEventListener("change", function (e) {
    //     hhSampler.volume.value = e.currentTarget.value;
    // });
  }).toMaster();

  // Create the Kick "instrument" with sample audio.
  part5Sampler = new Tone.Sampler({
    "D2": "./music/Soundbath_Audio_10.19/Part5.wav",
  }, function () {
    // let kickVolume = document.getElementById("kick-volume-control");
    // kickSampler.volume.value = hhVolume.value;
    part5Sampler.volume.value = 0;

    // kickVolume.addEventListener("change", function (e) {
    //     kickSampler.volume.value = e.currentTarget.value;
    // });
  }).toMaster();
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

  // console.log(result);
  return result;
}

/* defineMusic: a function that loads the MIDI files, creates the instruments, and assigns the parts. */
async function defineMusic() {
  await loadMidiFiles(); // Loads the MIDI files.
  await loadInstruments(); // Creates the instruments.

  // Create the bass instrument.
  const part1 = new Tone.Part(function (time, note) { // At each time instance...
    console.log(part1Sampler.volume.value);
    part1Sampler.triggerAttackRelease(note.note, note.duration, time); // Play the next note in the note array.
  }, convertNotes(part1Notes)).start(0); // Insert the node array; start at time 0.

  // Create the electric piano instrument.
  const part2 = new Tone.Part(function (time, note) {
    part2Sampler.triggerAttackRelease(note.note, note.duration, time);
  }, convertNotes(part2Notes)).start(0);

  // Create the gong instrument.
  const part3 = new Tone.Part(function (time, note) {
    part3Sampler.triggerAttackRelease(note.note, note.duration, time);
  }, convertNotes(part3Notes)).start(0);

  // Create the high hats instrument.
  const part4 = new Tone.Part(function (time, note) {
    part4Sampler.triggerAttackRelease(note.note, note.duration, time);
  }, convertNotes(part4Notes)).start(0);
  // console.log(hhSampler);

  // Create the kick instrument.
  const part5 = new Tone.Part(function (time, note) {
    part5Sampler.triggerAttackRelease(note.note, note.duration, time);
  }, convertNotes(part5Notes)).start(0);

  Tone.Transport.bpm.value = 80; // Set the beats per minute to 80.

  part1Sampler.release = 1;
  part2Sampler.release = 1;
  part3Sampler.release = 1;
  part4Sampler.release = 1;
  part5Sampler.release = 1;

  Tone.Transport.loop = true;
  Tone.Transport.loopStart = 0;
  Tone.Transport.loopEnd = songDuration + 6;

  Tone.Transport.schedule(() => {
    part4Sampler.volume.rampTo(0, "16:0:0");
  }, "0:0:0");

}

defineMusic(); // Call define music when the page loads.
var musicOn = false; // Initialize the music player to off.

/* togglePlayer: a function that toggles the music player on and off. */
function togglePlayer() {
  musicOn ? Tone.Transport.pause() : Tone.Transport.start(); // If the music is on, turn it off. Vice versa.
  musicOn = !musicOn; // Toggle the player.
}