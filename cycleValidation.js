let graphComponentMatrix = [];
for(let i = 0; i < rows; i++)
{
    let row = [];
    for(let j = 0; j < cols; j++)
    {
        //Creating array to store childrens
        row.push([]);
    }
    graphComponentMatrix.push(row);
}