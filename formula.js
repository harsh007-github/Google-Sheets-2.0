for(let i = 1; i <= rows; i++)
{
  for(let j = 1; j <= cols; j++)
  {
    let cell = document.querySelector(`.cell[rid="${i}"][cid = "${j}"]`);
    cell.addEventListener("blur", () => {
      let address = addressBar.value;
      let [activeCell, cellProp] = getActiveCell(address);
      let enteredText = activeCell.innerText;
      cellProp.value = enteredText;
    });
  }
}
let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (e) => {
  let inputFormula = formulaBar.value;
  if(e.key === "Enter" && inputFormula)
  {
    let evaluatedFormula = eval(inputFormula);

    //To update UI and Cell Prop in DB
    setCellUiAndProp(evaluatedFormula, inputFormula);
  }
}); 

function setCellUiAndProp(evaluatedValue, formula) {
  let address = addressBar.value;
  let [activeCell, cellProp] = getActiveCell(address);
  //UI Update
  activeCell.innerText = evaluatedValue; 
  //DB Update
  cellProp.value = evauatedValue
  cellProp.formula = formula; 
}