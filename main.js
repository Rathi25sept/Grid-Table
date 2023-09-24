import './style.css'
import { dataSet } from './counter.js'
import { titleData } from './counter.js'

function srchBar() {
  let container = document.querySelector(".container");
  let box = document.querySelector(".box")
  let inputBox = document.createElement("div");
  inputBox.className = "inputBox";
  let spanBox = document.createElement("span");
  spanBox.innerText = "Search : ";
  let input = document.createElement("input"); 
  input.type = "text";
  input.id = "searchText";
  input.placeholder = "search";
  input.addEventListener('keyup',searchFun);
  inputBox.append(spanBox,input);
  box.append(inputBox)
  container.append(box);
}
srchBar();

function headingFunction(tdata) {
  let container = document.querySelector(".container");
  let table = document.createElement("table");
  table.id = "myTable";
  let thead = document.createElement('thead');
  thead.id = "thead";
  let tableRow = document.createElement("tr");
  tdata.forEach(function(data){
      console.log('tdata ----',data);
      let tableHeading = document.createElement("th");
      tableHeading.id = "tableHeading";
      tableHeading.innerText = data.title;
      tableHeading.addEventListener('click',sortingFun);
      tableHeading.setAttribute = ('sortingData','decending');
      tableRow.append(tableHeading);
      thead.append(tableRow);
  })
  table.append(thead);
  let tbody = document.createElement("tbody");
  tbody.className = "tbody";
  table.append(tbody);
  container.append(table);
}
headingFunction(titleData);

function renderData(allData) {
  let tbody = document.querySelector(".tbody");
  allData.forEach(function(data){
      console.log('all data--',data);
      let tableRow = document.createElement("tr")
      tableRow.id = "row";
      let tableSN = document.createElement("td");
      tableSN.innerText = data.sn;
      let tableData1 = document.createElement("td");
      tableData1.innerText = data.name;
      let tableData2 = document.createElement("td");
      tableData2.innerText = data.position;
      let tableData3 = document.createElement("td");
      tableData3.innerText = data.office;
      let tableData4 = document.createElement("td");
      tableData4.innerText = data.extn;
      let tableData5 = document.createElement("td");
      tableData5.innerText = data.startDate;
      let tableData6 = document.createElement("td");
      tableData6.innerText = data.salary;
      tableRow.append(tableSN,tableData1,tableData2,tableData3,tableData4,tableData5,tableData6);
      tbody.append(tableRow);
    });
};
renderData(dataSet);

function searchFun() {
let filter = document.getElementById('searchText').value.toLocaleLowerCase();
let myTable = document.getElementById('myTable');
let tr = myTable.getElementsByTagName('tr');

for(let i=0; i<tr.length; i++){
  let td = tr[i].getElementsByTagName('td')[1];

  if(td) {
    let textvalue = td.textContent;

    if(textvalue.toLocaleLowerCase().indexOf(filter) > -1 ) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}

}



function sortingFun(event) {
console.log('---',event);
window.evt = event;
var propOfSort = event.target.textContent.toLowerCase();
let tbody = document.querySelector(".tbody");

  dataSet.sort((a, b) => {
    console.log('===>', a[propOfSort], b[propOfSort]);
    let x = (a[propOfSort]);
    let y = (b[propOfSort]);
    if (x === y) {
      return 0;
    }
    else if (x < y) {
      return -1;
    }
    return 1;
  });
  tbody.innerHTML = "";
  console.log('---->',dataSet);
  renderData(dataSet);
  

}

let totalNoOfRow = document.querySelectorAll("tbody tr");
console.log(totalNoOfRow,"asdfsdfghjklasdfgh");

let totalNoOfRowPerPage = 5;
let totalNoOfPage = Math.ceil(totalNoOfRow.length / totalNoOfRowPerPage);

var dropDown = document.querySelector("#dropDown")
console.log(dropDown.value);
dropDown.addEventListener("change",() => {
console.log("dropDown value",dropDown.value);
totalNoOfRowPerPage = dropDown.value;
totalNoOfPage = Math.ceil(totalNoOfRow.length / totalNoOfRowPerPage);
createBtn();
})

console.log(totalNoOfPage);

function createBtn() {
let btnBox = document.querySelector('.btnBox');
btnBox.innerHTML = '';
let btn1 = document.createElement("button");
btn1.innerText = "Pre";
btn1.addEventListener("click",prev)
btnBox.append(btn1);
for(let i=1; i <= totalNoOfPage; i++){
let btn = document.createElement("button");
btn.className = "active";
btn.addEventListener("click", (event) => {
  displayPage(parseInt(event.target.textContent));
});
btn.innerText = i;
btnBox.append(btn);
}
let btn2 = document.createElement("button");
btn2.innerText = "Next";
btn2.addEventListener("click",next)
btnBox.append(btn2);
displayPage(1);

}

let tbody = document.querySelector(".tbody");


function displayPage(currentPage) {
tbody.innerHTML = "";
let startIndex = (currentPage - 1) * totalNoOfRowPerPage;
let lastIndex = (totalNoOfRowPerPage - 1) + startIndex;
const data = dataSet.slice(startIndex , lastIndex + 1);
renderData(data);
}

let currentPage = 1;

function next(){
if(currentPage <= totalNoOfPage) {
  console.log('=======))',currentPage,totalNoOfPage);
  currentPage++;
  displayPage(currentPage);
}
}

function prev(){
if(currentPage >= 1) {
  console.log('=======))',currentPage);
  currentPage--;
  displayPage(currentPage);
}
}