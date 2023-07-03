let rows = 100;
let cols = 26;

let rowNameCont = document.querySelector(".row-name-cont");
let colNameCont = document.querySelector(".col-name-cont");
let cellsCont = document.querySelector(".cells-cont");

//For rows
for (let i = 1; i <= rows; i++) 
{
  let rowName = document.createElement("div");
  rowName.innerText = i;
  rowName.setAttribute("class", "row-name");
  rowNameCont.appendChild(rowName);
}

//For Columns
for(let i = 1; i <= cols; i++)
{
  let colName = document.createElement("div");
  colName.innerText = String.fromCharCode(64+i);
  colName.setAttribute("class", "col-name")
  colNameCont.appendChild(colName);
}

//For Cells
for(let i = 1; i <= rows; i++)
{
  let rowCont = document.createElement("div");
  rowCont.setAttribute("class", "row-cont")
  for(let j = 1; j <= cols; j++)
  {
    let cells = document.createElement("div");
    cells.setAttribute("class", "cell");
    rowCont.appendChild(cells);
  }
  cellsCont.appendChild(rowCont);
}