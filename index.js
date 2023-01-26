const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const database = require("./db");
require("console.table");

init();
function init() {
    const logotext = logo({ name: "staff manager" }).render();
    console.log(logotext);
    loadmainprompts();
}

function loadMainPrompts() {
    prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you need to do?",
        choices: [
          {
            name: "View All staff",
            value: "VIEW-staff"
          },
          {
            name: "View All staff By Department",
            value: "VIEW-STAFF-BY-DEPARTMENT"
          },
          {
            name: "View All staff By Manager",
            value: "VIEW-STAFF-BY-MANAGER"
          },
          {
            name: "Add staff",
            value: "ADD-STAFF"
          },
          {
            name: "Delete staff",
            value: "Delete-STAFF"
          },
          {
            name: "Update staff Role",
            value: "UPDATE-STAFF-ROLE"
          },
          {
            name: "Update staff Manager",
            value: "UPDATE-STAFF-MANAGER"
          },
          {
            name: "View All Roles",
            value: "VIEW-ROLES"
          },
          {
            name: "Add Role",
            value: "ADD-ROLE"
          },
          {
            name: "Delete Role",
            value: "Delete-ROLE"
          },
          {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS"
          },
          {
            name: "Add Department",
            value: "ADD-DEPARTMENT"
          },
          {
            name: "Delete Department",
            value: "Delete-DEPARTMENT"
          },
          {
            name: "done",
            value: "DONE"
          }
        ]
    }
]).then(res => {
    let choice = res.choice;
    switch (choice) {
      case "VIEW_STAFF":
        viewstaff();
        break;
      case "VIEW_STAFF_BY_DEPARTMENT":
        viewstaffByDepartment();
        break;
      case "VIEW_STAFF_BY_MANAGER":
        viewstaffByManager();
        break;
      case "ADD_STAFF":
        addstaff();
        break;
      case "Delete_STAFF":
        Deletestaff();
        break;
      case "UPDATE_STAFF_ROLE":
        updatestaffRole();
        break;
      case "UPDATE_STAFF_MANAGER":
        updatestaffManager();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "Delete_DEPARTMENT":
        DeleteDepartment();
        break;
      case "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT":
        viewUtilizedBudgetByDepartment();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "Delete_ROLE":
        DeleteRole();
        break;
      default:
        quit();
    }
  }
  )
}
function viewstaff() {
    db.findAllstaff()
      .then(([rows]) => {
        let staff = rows;
        console.log("\n");
        console.table(staff);
      })
      .then(() => loadMainPrompts());
  }

  function Deletestaff() {
    db.findAllEmployees()
      .then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
  
        prompt([
          {
            type: "list",
            name: "employeeId",
            message: "witch staff members are you wanting to Deleting?",
            choices: employeeChoices
          }
        ])
          .then(res => db.DeleteStaffMember(res.staffId))
          .then(() => console.log("delete employee from the database"))
          .then(() => loadMainPrompts())
      })
  }
  
  function updatestaffRole() {
    db.findAllstaff()
      .then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
  
        prompt([
          {
            type: "list",
            name: "staffId",
            message: "Which staff member do you want to update?",
            choices: employeeChoices
          }
        ])
          .then(res => {
            let staffId = res.employeeId;
            db.findAllRoles()
              .then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({ id, title }) => ({
                  name: title,
                  value: id
                }));
  
                prompt([
                  {
                    type: "list",
                    name: "roleId",
                    message: "Which role do you want to assign the selected staff-member?",
                    choices: roleChoices
                  }
                ])
                  .then(res => db.updatestaffRole(staffId, res.roleId))
                  .then(() => console.log("Updated employee's role"))
                  .then(() => loadMainPrompts())
              });
          });
      })
  }
  
  function updatestaffManager() {
    db.findAllEmployees()
      .then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(({ id, f_name, last_name }) => ({
          name: `${f_name} ${last_name}`,
          value: id
        }));
  
        prompt([
          {
            type: "list",
            name: "staffId",
            message: "Which staff manager do you want to update?",
            choices: employeeChoices
          }
        ])
          .then(res => {
            let employeeId = res.employeeId
            db.findAllPossibleManagers(employeeId)
              .then(([rows]) => {
                let managers = rows;
                const managerChoices = managers.map(({ id, first_name, last_name }) => ({
                  name: `${first_name} ${last_name}`,
                  value: id
                }));
  
                prompt([
                  {
                    type: "list",
                    name: "managerId",
                    message:
                      "Which employee do you want to set as manager for the selected employee?",
                    choices: managerChoices
                  }
                ])
                  .then(res => db.updatestaffManager(staffId, res.managerId))
                  .then(() => console.log("Updated staff manager"))
                  .then(() => loadMainPrompts())
              })
          })
      })
  }
  
  function viewRoles() {
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("");
            console.table(roles);
        })
        .then(() => loadMainPrompts());
  }
        prompt([
          {
            name: "title",
            message: "What is the name of the role?"
          },
          {
            name: "pay",
            message: "What is the pay for this role?"
          },
          {
            type: "list",
            name: "department_id",
            message: "Which department is the role for?",
            choices: departmentChoices
          }
        ])
          .then(role => {
            db.createRole(role)
              .then(() => console.log(`Added ${role.title} to the database`))
              .then(() => loadMainPrompts())
          })
        
      // this is from smu 
      function removeRole() {
        db.findRoles()
          .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, role }) => ({
              name: role,
              value: id
            }));
      
            prompt([
              {
                type: "list",
                name: "roleId",
                message:
                  "Which role do you want to delete?",
                choices: roleChoices
              }
            ])
              .then(res => db.removeRole(res.roleId))
              .then(() => console.log("deleted role from the database"))
              .then(() => loadMainPrompts())
          })
  
      function addDepartment() {
        prompt([
          {
            name: "name",
            message: "What is the name of the department?"
          }
        ])
          .then(res => {
            let name = res;
            db.createDepartment(name)
              .then(() => console.log(`Added ${name.name} to the database`))
              .then(() => loadMainPrompts())
          })
      }
      
      function removeDepartment() {
        db.findAllDepartments()
          .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
              name: name,
              value: id
            }));

            prompt({
              type: "list",
              name: "departmentId",
              message:
                "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
              choices: departmentChoices
            })
              .then(res => db.removeDepartment(res.departmentId))
              .then(() => console.log(`Removed department from the database`))
              .then(() => loadMainPrompts())
          })
      }

      function addstaff() {
  prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ])
    .then(res => {
      let firstName = res.first_name;
      let lastName = res.last_name;

      db.findAllRoles()
        .then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }));

          prompt({
            type: "list",
            name: "roleId",
            message: "What is the staff role?",
            choices: roleChoices
          })
            .then(res => {
              let roleId = res.roleId;

              db.findAllstaff()
                .then(([rows]) => {
                  let employees = rows;
                  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                  }));

                  managerChoices.unshift({ name: "None", value: null });

                  prompt({
                    type: "list",
                    name: "managerId",
                    message: "Who is the employee's manager?",
                    choices: managerChoices
                  })
                    .then(res => {
                      let employee = {
                        manager_id: res.managerId,
                        role_id: roleId,
                        first_name: firstName,
                        last_name: lastName
                      }

                      db.createEmployee(employee);
                    })
                    .then(() => console.log(
                      `Added ${firstName} ${lastName} to the database`
                    ))
                    .then(() => loadMainPrompts())
                })
            })
        })
    })
  }
      }

function quit() {
  console.log('thanks');
  process.exit();
}
