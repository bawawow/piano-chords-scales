const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const OCTAVES = 2;

const chords = {
  "Major": [0, 4, 7],
  "Minor": [0, 3, 7],
  "7 (Dom)": [0, 4, 7, 10],
  "Maj7": [0, 4, 7, 11],
  "m7": [0, 3, 7, 10],
  "Sus2": [0, 2, 7],
  "Sus4": [0, 5, 7],
  "Dim": [0, 3, 6]
};

const scales = {
  "Major Scale": [0, 2, 4, 5, 7, 9, 11],
  "Minor Scale": [0, 2, 3, 5, 7, 8, 10]
};

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const keyboard = document.getElementById("keyboard");

// --- Build 2 octaves (24 semitones = 14 white keys) ---
for (let i = 0; i < 24; i++) {
  let note = notes[i % 12];
  let div = document.createElement("div");
  div.classList.add("key");

  if (note.includes("#")) {
    div.classList.add("black");
    div.style.left = `${i * 60}px`;
  } else {
    div.classList.add("white");
  }

  div.dataset.note = note;
  keyboard.appendChild(div);
}

function showChords() {
  renderTable(chords);
}

function showScales() {
  renderTable(scales);
}

function renderTable(data) {
  let root = document.getElementById("root").value;
  let table = document.getElementById("chart");
  table.innerHTML = "";

  for (let [name, intervals] of Object.entries(data)) {
    let row = table.insertRow();
    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    cell1.innerText = `${root} ${name}`;
    let chordNotes = intervals.map(i => notes[(notes.indexOf(root) + i) % 12]);
    cell2.innerText = chordNotes.join(" – ");

    row.onclick = () => highlightNotes(chordNotes);
  }
}

function highlightNotes(chordNotes) {
  document.querySelectorAll(".key").forEach(k => k.classList.remove("highlight"));
  document.querySelectorAll(".key").forEach(k => {
    if (chordNotes.includes(k.dataset.note)) {
      k.classList.add("highlight");
    }
  });
}
