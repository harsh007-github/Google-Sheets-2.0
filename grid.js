let rows = 100;
let cols = 26;

let rowNameCont = document.querySelector(".row-name-cont");
let colNameCont = document.querySelector(".col-name-cont");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".cell-address");

//Rows
for (let i = 0; i < rows; i++) {
  let rowName = document.createElement("div");
  rowName.innerText = i + 1;
  rowName.setAttribute("class", "row-name");
  rowNameCont.appendChild(rowName);
}

//Columns
for (let i = 0; i < cols; i++) {
  let colName = document.createElement("div");
  colName.innerText = String.fromCharCode(65 + i);
  colName.setAttribute("class", "col-name");
  colNameCont.appendChild(colName);
}

//For Cells
for (let i = 0; i < rows; i++) {
  let rowCont = document.createElement("div");
  rowCont.setAttribute("class", "row-cont");
  for (let j = 0; j < cols; j++) {
    let cells = document.createElement("div");
    cells.setAttribute("class", "cell");
    cells.setAttribute("contenteditable", "true");
    cells.setAttribute("spellcheck", "false");
    
    //For storage and identification of cells
    cells.setAttribute("rId", i);
    cells.setAttribute("cId", j);
    rowCont.appendChild(cells);
    addAddressOfCell(cells, i, j);
  }
  cellsCont.appendChild(rowCont);
}
function addAddressOfCell(cells, i, j) {
  cells.addEventListener("click", () => {
    let rowID = i + 1;
    let colID = String.fromCharCode(65 + j);
    addressBar.value = `${colID}${rowID}`;
  });
}
let defaultCell = document.querySelector(".cell");
defaultCell.click();
