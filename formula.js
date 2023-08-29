for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid = "${j}"]`);
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [activeCell, cellProp] = getActiveCell(address);
      let enteredData = activeCell.innerText;
      if (enteredData === cellProp.value) return;
      cellProp.value = enteredData;
      //If data is modified
      removeChild(cellProp.formula);
      cellProp.formula = "";
      updateChildren(address);
      // console.log(cellProp);
    });
  }
}
let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (e) => {
  let inputFromula = formulaBar.value;
  if (e.key === "Enter" && inputFromula) {
    //If change in formula occurs
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCell(address);
    if (inputFromula !== cellProp.formula) {
      removeChild(cellProp.formula);
    }

    let evaluatedValue = evaluateFormula(inputFromula);
    setCellUiAndCellProp(evaluatedValue, inputFromula, address);

    //Establishing Parent Child Relation
    parentChildRealtion(inputFromula);
    // console.log(sheetDB);
    updateChildren(address);
  }
});

function parentChildRealtion(formula) {
  let encodedFormula = formula.split(" ");
  let childAddress = addressBar.value;
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = getActiveCell(encodedFormula[i]);
      parentCellProp.children.push(childAddress);
    }
  }
}

//In case formula is changed by user
function removeChild(formula) {
  let encodedFormula = formula.split(" ");
  let childAddress = addressBar.value;
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = getActiveCell(encodedFormula[i]);

      //Removing the child from parent's children array
      let index = parentCellProp.children.indexOf(childAddress);
      parentCellProp.children.splice(index, 1);
    }
  }
}
//Updates children when formula is changed
function updateChildren(parentAddress) {
  let [parentCell, parentCellProp] = getActiveCell(parentAddress);
  let children = parentCellProp.children;
  for (let i = 0; i < children.length; i++) {
    let childAddress = children[i];
    let [childCell, childCellProp] = getActiveCell(childAddress);
    let childFormula = childCellProp.formula;
    let evaluatedValue = evaluateFormula(childFormula);
    setCellUiAndCellProp(evaluatedValue, childFormula, childAddress);
    updateChildren(childAddress);
  }
}

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
function setCellUiAndCellProp(evaluatedValue, formula, address) {
  let [cell, cellProp] = getActiveCell(address);
  cell.innerText = evaluatedValue; //UI Update
  cellProp.value = evaluatedValue; //DB Update
  cellProp.formula = formula;
}
