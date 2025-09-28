const NOTE_NAMES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

function createKeyboard() {
  const keyboard = document.getElementById("keyboard");
  keyboard.innerHTML = "";

  NOTES.forEach((note, index) => {
    let key = document.createElement("div");
    key.classList.add("key");

    // Black keys
    if (note.includes("#")) {
      key.classList.add("black");
      key.style.left = (index * 40 - 14) + "px";
    }

    key.dataset.note = note;
    keyboard.appendChild(key);
  });
}

function highlightKeys(noteList) {
  document.querySelectorAll(".key").forEach(key => {
    key.classList.remove("highlight");
    if (noteList.includes(key.dataset.note)) {
      key.classList.add("highlight");
    }
  });
}

// Draw keyboard on load
createKeyboard();

const CHORD_TYPES = {
  "Major": [0,4,7],
  "Minor": [0,3,7],
  "7 (Dom)": [0,4,7,10],
  "Maj7": [0,4,7,11],
  "m7": [0,3,7,10],
  "Sus2": [0,2,7],
  "Sus4": [0,5,7],
  "Dim": [0,3,6],
};

const SCALE_TYPES = {
  "Major": [0,2,4,5,7,9,11],
  "Minor": [0,2,3,5,7,8,10],
  "Harmonic Minor": [0,2,3,5,7,8,11],
  "Pentatonic": [0,2,4,7,9],
  "Blues": [0,3,5,6,7,10],
  "Chromatic": [...Array(12).keys()],
};

const rootSelect = document.getElementById("root");
const chordBtn = document.getElementById("chordBtn");
const scaleBtn = document.getElementById("scaleBtn");
const chartTable = document.getElementById("chartTable").querySelector("tbody");
const chartType = document.getElementById("chartType");
const modeTitle = document.getElementById("modeTitle");
const footer = document.getElementById("footer");

let mode = "Chord";
let root = "C";

// Fill root selector
NOTE_NAMES.forEach(note => {
  let opt = document.createElement("option");
  opt.value = note;
  opt.textContent = note;
  rootSelect.appendChild(opt);
});
rootSelect.value = root;

function noteIndex(rootIndex, semitone) {
  return (rootIndex + semitone) % 12;
}

function buildFromIntervals(root, intervals) {
  const rootIndex = NOTE_NAMES.indexOf(root);
  return intervals.map(i => NOTE_NAMES[noteIndex(rootIndex, i)]);
}

function renderChart() {
  chartTable.innerHTML = "";
  if (mode === "Chord") {
    chartType.textContent = "Chord";
    modeTitle.textContent = "Chord";
    Object.entries(CHORD_TYPES).forEach(([name, intervals]) => {
      const notes = buildFromIntervals(root, intervals);
      let row = `<tr><td>${root} ${name}</td><td>${notes.join(" – ")}</td></tr>`;
      chartTable.insertAdjacentHTML("beforeend", row);
    });
  } else {
    chartType.textContent = "Scale";
    modeTitle.textContent = "Scale";
    Object.entries(SCALE_TYPES).forEach(([name, intervals]) => {
      const notes = buildFromIntervals(root, intervals);
      let row = `<tr><td>${root} ${name}</td><td>${notes.join(" – ")}</td></tr>`;
      chartTable.insertAdjacentHTML("beforeend", row);
    });
  }
  footer.textContent = `This lookup chart shows all ${mode.toLowerCase()}s for root ${root}. Switch root or mode to explore more.`;
}

rootSelect.addEventListener("change", (e) => {
  root = e.target.value;
  renderChart();
});

chordBtn.addEventListener("click", () => {
  mode = "Chord";
  chordBtn.classList.add("active");
  scaleBtn.classList.remove("active");
  renderChart();
});

scaleBtn.addEventListener("click", () => {
  mode = "Scale";
  scaleBtn.classList.add("active");
  chordBtn.classList.remove("active");
  renderChart();
});

renderChart();
