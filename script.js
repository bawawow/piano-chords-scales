const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const OCTAVES = 2;

const CHORDS = {
  "Major": [0, 4, 7],
  "Minor": [0, 3, 7],
  "7 (Dom)": [0, 4, 7, 10],
  "Maj7": [0, 4, 7, 11],
  "m7": [0, 3, 7, 10],
  "Sus2": [0, 2, 7],
  "Sus4": [0, 5, 7],
  "Dim": [0, 3, 6]
};

const SCALES = {
  "Major Scale": [0, 2, 4, 5, 7, 9, 11],
  "Minor Scale": [0, 2, 3, 5, 7, 8, 10],
  "Pentatonic Major": [0, 2, 4, 7, 9],
  "Pentatonic Minor": [0, 3, 5, 7, 10]
};

function createKeyboard() {
  const keyboard = document.getElementById("keyboard");
  keyboard.innerHTML = "";

  let whiteIndex = 0;
  for (let o = 0; o < OCTAVES; o++) {
    NOTES.forEach(note => {
      if (note.includes("#")) {
        // black key
        let blackKey = document.createElement("div");
        blackKey.classList.add("key", "black");
        blackKey.dataset.note = note + o;
        blackKey.style.left = (whiteIndex * 40) + "px";
        keyboard.appendChild(blackKey);
      } else {
        // white key
        let whiteKey = document.createElement("div");
        whiteKey.classList.add("key", "white");
        whiteKey.dataset.note = note + o;
        keyboard.appendChild(whiteKey);
        whiteIndex++;
      }
    });
  }
}

function noteAt(root, interval) {
  let idx = NOTES.indexOf(root);
  return NOTES[(idx + interval) % NOTES.length];
}

function renderTable(mode) {
  const tbody = document.querySelector("#chordTable tbody");
  tbody.innerHTML = "";
  const root = document.getElementById("root").value;
  const dict = mode === "chords" ? CHORDS : SCALES;

  for (let [name, intervals] of Object.entries(dict)) {
    let notes = intervals.map(i => noteAt(root, i)).join(" – ");
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${root} ${name}</td><td>${notes}</td>`;
    tr.dataset.notes = intervals.map(i => noteAt(root, i));
    tbody.appendChild(tr);
  }
}

function highlightNotes(notes) {
  document.querySelectorAll(".key").forEach(k => k.classList.remove("highlight"));
  notes.forEach(note => {
    document.querySelectorAll(`.key[data-note^='${note}']`).forEach(k => {
      k.classList.add("highlight");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createKeyboard();
  renderTable("chords");

  document.getElementById("showChords").addEventListener("click", () => renderTable("chords"));
  document.getElementById("showScales").addEventListener("click", () => renderTable("scales"));

  document.querySelector("#chordTable tbody").addEventListener("click", e => {
    if (e.target.closest("tr")) {
      let notes = e.target.closest("tr").dataset.notes.split(",");
      highlightNotes(notes);
    }
  });
});
