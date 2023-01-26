const all = require("./db");
const veiw = require("./index");


function viewDepartments() {
    db.findAllDepartments()
      .then(([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => loadMainPrompts());
  }

  function viewUtilizedBudgetByDepartment() {
    db.viewAllDepartmentBudgets()
      .then(([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => loadMainPrompts());
  }
