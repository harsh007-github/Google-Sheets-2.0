for (let i = 1; i <= rows; i++) {
  for (let j = 1; j <= cols; j++) {
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
  if (e.key === "Enter" && inputFormula) {
    let evaluatedFormula = evaluateFormula(inputFormula);
    //To update UI and Cell Prop in DB
    let address = addressBar.value;
    setCellUiAndProp(evaluatedFormula, inputFormula, address);
    // addParentChildRelation(inputFormula);
  }
});

//To establish relation b/w parent cell and child cell
// function addParentChildRelation(formula) {
//   let encodedFormula = formula.split(" ");
//   let childAddress = addressBar.value;
//   for (let i = 0; i < encodedFormula.length; i++) {
//     let asciiValue = encodedFormula[i].charCodeAt(0);
//     if (asciiValue >= 65 && asciiValue <= 90) {
//       let [parentCell, parentCellProp] = getActiveCell(encodedFormula[i]);
//       parentCellProp.children.push(childAddress);
//     }
//   }
// }

function evaluateFormula(formula) {
  //Formula to be performed over cells (A1 + B9)
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [cell, cellProp] = getActiveCell(encodedFormula[i]);
      encodedFormula[i] = cellProp.value;
    }
  }
  let decodedFormula = encodedFormula.join(" ");

  //Simply return if numeric values are given in the formula bar (10 + 23)
  return eval(decodedFormula);
}

function setCellUiAndProp(evaluatedValue, formula, address) {
  let [activeCell, cellProp] = getActiveCell(address);
  //UI Update
  activeCell.innerText = evaluatedValue;
  //DB Update
  cellProp.value = evauatedValue;
  cellProp.formula = formula;
}
