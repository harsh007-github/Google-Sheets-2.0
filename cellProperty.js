let sheetDB = [];
for (let i = 0; i < rows; i++) {
  let sheetRow = [];
  for (let j = 0; j < cols; j++) {
    let cellProp = {
      bold: false,
      italic: false,
      underline: false,
      alignment: "left",
      fontFamily: "monospace",
      fontSize: "14",
      fontColor: "#000000",
      cellColor: "#000000", // Just for indication purpose,
      formula: "",
      value: ""
    };
    sheetRow.push(cellProp);
  }
  sheetDB.push(sheetRow);
}
//Selecting all properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignment = document.querySelectorAll(".alignment");
let fontSize = document.querySelector(".font-size");
let fontFamily = document.querySelector(".font-family");
let fontColor = document.querySelector(".font-color-picker");
let cellColor = document.querySelector(".cell-color-picker");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];
let activeColor = "#d1d8e0";
let inactiveColor = "#C2C3C4";

//Attatching event listeners to cell properties
bold.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);
  cellProp.bold = !cellProp.bold;
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
  bold.style.backgroundColor = cellProp.bold ? activeColor : inactiveColor;
});

italic.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);
  cellProp.italic = !cellProp.italic;
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
  italic.style.backgroundColor = cellProp.italic ? activeColor : inactiveColor;
});

underline.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);
  cellProp.underline = !cellProp.underline;
  cell.style.textDecoration = cellProp.underline ? "underline" : "none";
  underline.style.backgroundColor = cellProp.underline
    ? activeColor
    : inactiveColor;
});

fontSize.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);
  cellProp.fontSize = fontSize.value;
  cell.style.fontSize = cellProp.fontSize + "px";
  fontSize.value = cellProp.fontSize;
});

fontFamily.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);
  cellProp.fontFamily = fontFamily.value;
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamily.value = cellProp.fontFamily;
});

fontColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);
  cellProp.fontColor = fontColor.value;
  cell.style.color = cellProp.fontColor;
  fontColor.value = cellProp.fontColor;
});

cellColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);
  cellProp.cellColor = cellColor.value;
  cell.style.backgroundColor = cellProp.cellColor;
  cellColor.value = cellProp.cellColor;
});

alignment.forEach((alignElem) => {
  alignElem.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCell(address);
    let alignValue = e.target.classList[0];
    cellProp.alignment = alignValue;
    cell.style.textAlign = cellProp.alignment;
    switch (alignValue) {
      case "left":
        leftAlign.style.backgroundColor = activeColor;
        centerAlign.style.backgroundColor = inactiveColor;
        rightAlign.style.backgroundColor = inactiveColor;
        cell.style.textAlign = "left";
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColor;
        centerAlign.style.backgroundColor = inactiveColor;
        rightAlign.style.backgroundColor = activeColor;
        cell.style.textAlign = "right";
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColor;
        centerAlign.style.backgroundColor = activeColor;
        rightAlign.style.backgroundColor = inactiveColor;
        cell.style.textAlign = "center";
        break;
      default:
        leftAlign.style.backgroundColor = inactiveColor;
        centerAlign.style.backgroundColor = inactiveColor;
        rightAlign.style.backgroundColor = inactiveColor;
        cell.style.textAlign = "normal";
        break;
    }
  });
});
var allCell = document.querySelectorAll(".cell");
for (let i = 0; i < allCell.length; i++) {
  addListenerToAttachCellProp(allCell[i]);
}
function addListenerToAttachCellProp(cell) {
  cell.addEventListener("click", () => {
    let address = addressBar.value;
    let [rid, cid] = decodeCellAddress(address);
    let cellProp = sheetDB[rid][cid];

    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.color = cellProp.fontColor;
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.textAlign = cellProp.alignment;
    cell.style.backgroundColor = cellProp.cellColor === "#000000" ? "transparent" : cellProp.cellColor;

    //Apply propeties to UI
    bold.style.backgroundColor = cellProp.bold ? activeColor : inactiveColor;
    italic.style.backgroundColor = cellProp.italic
      ? activeColor
      : inactiveColor;
    underline.style.backgroundColor = cellProp.underline
      ? activeColor
      : inactiveColor;
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;
    fontColor.value = cellProp.fontColor;
    cellColor.value = cellProp.cellColor;
    switch (cellProp.alignment) {
      case "left":
        leftAlign.style.backgroundColor = activeColor;
        centerAlign.style.backgroundColor = inactiveColor;
        rightAlign.style.backgroundColor = inactiveColor;
        cell.style.textAlign = "left";
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColor;
        centerAlign.style.backgroundColor = inactiveColor;
        rightAlign.style.backgroundColor = activeColor;
        cell.style.textAlign = "right";
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColor;
        centerAlign.style.backgroundColor = activeColor;
        rightAlign.style.backgroundColor = inactiveColor;
        cell.style.textAlign = "center";
        break;
      default:
        leftAlign.style.backgroundColor = inactiveColor;
        centerAlign.style.backgroundColor = inactiveColor;
        rightAlign.style.backgroundColor = inactiveColor;
        cell.style.textAlign = "normal";
        break;
    }
  });
}

function getActiveCell(address) {
  let [rid, cid] = decodeCellAddress(address);
  let cell = document.querySelector(`.cell[rid="${rid}"][cid = "${cid}"]`);
  cellProp = sheetDB[rid][cid];
  return [cell, cellProp];
}

function decodeCellAddress(address) {
  let rowId = Number(address.slice(1));
  let colId = Number(address.charCodeAt(0) - 64);
  return [rowId, colId];
}
