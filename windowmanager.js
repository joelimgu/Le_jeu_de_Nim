function play()
{
    document.getElementById("set").style.display="none"; 
    document.getElementById("interface").style.display="inline";
}
function param()
{
    document.getElementById("set").style.display="inline"; 
    document.getElementById("interface").style.display="none";
}


let tab=[];
function removeRow(mouseEvent) {
    console.log(mouseEvent.target.parentElement.parentElement.firstChild);
    tab.splice(mouseEvent.target.parentElement.parentElement.firstChild.value,1);
    mouseEvent.target.parentElement.parentElement.remove();

}
function displaygrid(){
    
    const body = document.getElementById("tablebody")
    body.innerHTML='';
    tab.forEach( (element, index) => {
        if(element){
            const newRow = document.createElement("TR");
            const lineCell = document.createElement("TD");
            lineCell.innerText=index;
            const columnCell = document.createElement("TD");
            columnCell.innerText=element;
            const removeCell = document.createElement("TD");
            const removeButton = document.createElement("BUTTON");
            removeButton.innerText = "remove";
            removeButton.addEventListener("click", removeRow);
            removeCell.appendChild(removeButton);
            newRow.appendChild(lineCell);
            newRow.appendChild(columnCell);
            newRow.appendChild(removeCell);
            body.appendChild(newRow);
        }           
    });
}

function addRow(){
    
    const n=document.getElementById("columnNumber").value;
    if (n <=10 && n >=0){
        tab.push(n); 
        displaygrid();
    }
    else {alert("Valeur non comprise entre 0 et 10! C'est la loi dsl")}
    
}