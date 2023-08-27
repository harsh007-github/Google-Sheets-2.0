for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid = "${j}"]`);
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [activeCell, cellProp] = getActiveCell(address);
      let enteredData = activeCell.innerText;
      cellProp.value = enteredData;
      // console.log(cellProp);
    });
  }
}
let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (e) => {
  let inputFromula = formulaBar.value;
  if (e.key === "Enter" && inputFromula) {
    let evaluatedValue = evaluateFormula(inputFromula);
    setCellUiAndCellProp(evaluatedValue, inputFromula);
  }
});
function evaluateFormula(formula) {
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [cell, cellProp] = getActiveCell(encodedFormula[i]);
      encodedFormula[i] = cellProp.value;
    }
  }
  let decodedFormula = encodedFormula.join(" ");
  return eval(decodedFormula);
}
function setCellUiAndCellProp(evaluatedValue, formula) {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);
  cell.innerText = evaluatedValue; //UI Update
  cellProp.value = evaluatedValue; //DB Update
  cellProp.formula = formula;
}
