const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const OCTAVES = 2;
const whiteOrder = ["C","D","E","F","G","A","B"];
const blackPos = {"C#":40,"D#":100,"F#":220,"G#":280,"A#":340}; 


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


const keyboard = document.getElementById("keyboard");

// --- Draw 2 octaves ---
let whiteIndex = 0;
for (let octave=0; octave<2; octave++) {
  for (let w=0; w<whiteOrder.length; w++) {
    let note = whiteOrder[w];
    let div = document.createElement("div");
    div.classList.add("key","white");
    div.style.left = `${whiteIndex*60}px`;
    div.dataset.note = note;
    keyboard.appendChild(div);

    // place black key if exists after this white
    if (["C","D","F","G","A"].includes(note)) {
      let sharp = note+"#";
      let bdiv = document.createElement("div");
      bdiv.classList.add("key","black");
      bdiv.style.left = `${whiteIndex*60 + blackPos[sharp%12] - 40}px`; // simplified positioning
      bdiv.style.left = `${whiteIndex*60 + (note==="C"||note==="F"?40:40)}px`;
      bdiv.dataset.note = sharp;
      keyboard.appendChild(bdiv);
    }
    whiteIndex++;
  }
}

// --- Show tables ---
function showChords(){ renderTable(chords); }
function showScales(){ renderTable(scales); }

function renderTable(data){
  let root = document.getElementById("root").value;
  let table = document.getElementById("chart");
  table.innerHTML="";

  for(let [name,intervals] of Object.entries(data)){
    let row = table.insertRow();
    let cell1=row.insertCell();
    let cell2=row.insertCell();
    cell1.innerText=`${root} ${name}`;
    let chordNotes=intervals.map(i=>notes[(notes.indexOf(root)+i)%12]);
    cell2.innerText=chordNotes.join(" – ");

    row.onclick=()=>highlightNotes(chordNotes);
  }
}

function highlightNotes(chordNotes){
  document.querySelectorAll(".key").forEach(k=>k.classList.remove("highlight"));
  document.querySelectorAll(".key").forEach(k=>{
    if(chordNotes.includes(k.dataset.note)){
      k.classList.add("highlight");
    }
  });
}
