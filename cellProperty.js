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
    sheetDB.push();
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