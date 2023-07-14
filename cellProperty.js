let sheetDB = [];
for(let i = 1; i <= rows; i++)
{
    let sheetRow = [];
    for(let j = 1; j <= close; j++)
    {
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "16",
            fontColor:"#000000",
            cellColor: "#000000"
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}
//Selecting all properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignment = document.querySelector(".alignment");
let fontSize = document.querySelector(".font-size");
let fontFamily = document.querySelector(".font-family");
let fontColor = document.querySelector(".font-color-picker")
let cellColor = document.querySelector(".cell-color-picker")
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

// let addressBar = document.querySelector(".cell-address");
let activeColor = "#d1d8e0";
let inactiveColor = "#ecf0f1";

//Attatching event listeners to cell properties
bold.addEventListener("click", () => {
    let address = addressBar.value;
    let [cell,cellProp] = activeCell(address);
    cellProp.bold = !cellProp.bold;
    cell.style.fontWeight = cellProp.bold? "bold":"normal";
    bold.style.backgroundcolor = cellProp.bold? activeColor:inactiveColor;
})
function activeCell(address) {
    let [rid,cid] = decodeCellAddress(address);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid = "${cid}"]`);
    cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}
function decodeCellAddress(address) {
    let rowId = Number(address.slice(1));
    let colId = Number(address.charCodeAt(0) - 64);
    return [rowId, colId];
}