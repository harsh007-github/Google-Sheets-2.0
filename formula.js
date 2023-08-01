for (let i = 1; i <= rows; i++) {
  for (let j = 1; j <= close; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid = "${j}"]`);
    cell.addEventListener("blur", () => {
      let address = addressBar.value;
      let [activeCell, cellProp] = activeCell(address);
      let enteredText = activeCell.innerText;
      cellProp.value = enteredText;
    });
  }
}
let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (e) => {
  if (e.key === "enter" && formulaBar.value) {
    let evaluatedValue = evaluateFormula(formulaBar.value);
    //To update UI and cellprop in DB
    setCellUiAndProp(evaluatedValue, formulaBar.value);
  }
});

function evaluateFormula(formula) {
  return eval(formula);
}
function setCellUiAndProp(evaluatedValue, formula) {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  //UI Update
  cell.innerText = evaluatedValue;
  //DB Update
  cellProp.value = evaluatedValue;
  cellProp.formula = formula;
}
