
const firstNameInput = document.getElementById("addFirstName");
const lastNameInput = document.getElementById("addLastName");
const positionInput = document.getElementById("addPosition");
const salaryInput = document.getElementById("addSalary");
const addButton = document.querySelector(".addButton");
const table = document.querySelector("#employeeTable");
const tableBody = document.querySelector("#employeeTable tbody");
const rows = Array.from(tableBody.querySelectorAll("tr"));
const sortFirstName = document.querySelector("#sortFirstName");
const sortLastName = document.querySelector("#sortLastName");
const sortPosition = document.querySelector("#sortPosition");
const minSalaryInput = document.getElementById("minSalary");
const maxSalaryInput = document.getElementById("maxSalary");
const salaryFilterButton = document.querySelector("#salaryFilterButton");
const positionFilterButton = document.querySelector("#positionFilterButton");
const inputSearch = document.querySelector("#inputSearch");

addButton.addEventListener('click', addEmployee);

sortFirstName.addEventListener("click", function() {
  sortTable(0);
});
sortLastName.addEventListener("click", function() {
  sortTable(1);
});
sortPosition.addEventListener("click", function() {
  sortTable(2);
});

function addEmployee() {
  
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const position = positionInput.value;
  const salary = salaryInput.value;

  if (!firstName || !lastName || !position || !salary || !/^\d+$/.test(salary)) {
    alert("Məlumatları düzgün yaz");
    return;
  }

  const newRow = document.createElement("tr");

  const firstNameCell = document.createElement("td");
  firstNameCell.textContent = firstName;
  firstNameCell.contentEditable = true;
  firstNameCell.addEventListener("blur", () => {
    const newFirstName = firstNameCell.textContent.trim();
    if (newFirstName !== "") {
      firstNameCell.textContent = newFirstName;
    } else {
      firstNameCell.textContent = firstName;
      alert("Ad düzgün daxil edilməyib!");
    }
  });
  newRow.appendChild(firstNameCell);

  const lastNameCell = document.createElement("td");
  lastNameCell.textContent = lastName;
  lastNameCell.contentEditable = true;
  lastNameCell.addEventListener("blur", () => {
    const newLastName = lastNameCell.textContent.trim();
    if (newLastName !== "") {
      newLastName.textContent = newLastName;
    } else {
      newLastName.textContent = lastName;
      alert("Soyad düzgün daxil edilməyib!");
    }
  });
  newRow.appendChild(lastNameCell);

  const positionCell = document.createElement("td");
  positionCell.textContent = position;
  newRow.appendChild(positionCell);

  const salaryCell = document.createElement("td");
  salaryCell.textContent = salary;
  salaryCell.contentEditable = true;
  salaryCell.addEventListener("blur", () => {
    const newSalary = salaryCell.textContent.trim();
    if (!newSalary && /^\d+$/.test(newSalary)) {
      salaryCell.textContent = newSalary;
    } else {
      salaryCell.textContent = salary;
      alert("Maaş düzgün daxil edilməyib!");
    }
  });
  newRow.appendChild(salaryCell);

  const deleteButtonCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Sil";
  deleteButton.addEventListener("click", () => {
    newRow.remove();
  });


  deleteButtonCell.appendChild(deleteButton);
  newRow.appendChild(deleteButtonCell);

  tableBody.appendChild(newRow);

  firstNameInput.value = "";
  lastNameInput.value = "";
  positionInput.value = "Developer";
  salaryInput.value = "";
}


function sortTable(columnIndex) {
    const table = document.querySelector("#employeeTable");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((rowA, rowB) => {
      const cellA = rowA.querySelectorAll("td")[columnIndex].textContent;
      const cellB = rowB.querySelectorAll("td")[columnIndex].textContent;
      return cellA.localeCompare(cellB);
    });
  
    tableBody.innerHTML = "";
    rows.forEach(row => tableBody.appendChild(row));
  }

  
  
  salaryFilterButton.addEventListener("click", () => {
    const minSalary = Number(minSalaryInput.value);
    const maxSalary = Number(maxSalaryInput.value);
  
    if ( minSalary > maxSalary || !/^\d+$/.test(minSalary) || !/^\d+$/.test(maxSalary)) {
      alert("Rəqəmləri düzgün girin");
      return;
    }
  
    Array.from(tableBody.querySelectorAll("tr")).forEach(row => {
      const salaryCell = row.querySelector("td:nth-child(4)");
      const salary = Number(salaryCell.textContent);
      
      if (row.style.display != "none") {
      
        if (salary >= minSalary && salary <= maxSalary) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      
      }
      if (!minSalary && !maxSalary) {
        row.style.display = "";
      }
    });
  });

  positionFilterButton.addEventListener("click", () => {
    const positionFilter = document.querySelector("#positionFilter");
    const positionFilterSelect = positionFilter.value;

    Array.from(tableBody.querySelectorAll("tr")).forEach(row => {
        const positionCell = row.querySelector("td:nth-child(3)");
        const position = positionCell.textContent;
        if (positionFilterSelect === "All") {
          row.style.display = "";
          return;
      }
        if (row.style.display != "none") {
          if (position === positionFilterSelect ) {
              row.style.display = "";
          }else{
              row.style.display = "none";
          }
            
        } 
      }
      );
  });



  inputSearch.addEventListener("keyup", function() {
    var filter = inputSearch.value.toLowerCase();

    for (var i = 0; i < table.rows.length; i++) {
      var row = table.rows[i];
      var firstName = row.cells[0].textContent.toLowerCase();
      if (row.style.display != "none") {
        if (firstName.indexOf(filter) > -1 ) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      }
    }
  });