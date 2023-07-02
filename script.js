let rows = 100;
let cols = 26;
let rowNameCont = document.querySelector(".row-name-cont");
for(let i = 1; i < 100; i++)
{
    let rowName = document.createElement("div");
    rowName.innerText = i;
    rowNameCont.appendChild(rowName);
}