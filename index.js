// tab list array
let myLeads = [];

//UI elements
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");


//array list render as html list
function render(leads) {
  let lisItems = "";
  for (let i = 0; i < leads.length; i++) {

    lisItems += `
      <li>
      <a target='_blank' href='${leads[i]}' >
        ${leads[i]} 
        </a>
      </li>`;
  }
  ulEl.innerHTML = lisItems;
}


//initial render load data from local storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("Leads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}


//save 
inputBtn.addEventListener("click", function () {

  myLeads.push(inputEl.value);

  //clear
  if (inputEl.value != "") {
    inputEl.value = "";
  }
  localStorage.setItem("Leads", JSON.stringify(myLeads));
  render(myLeads);
});


//save 
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("Leads", JSON.stringify(myLeads));
    render(myLeads);
  });
});


//delete 
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
