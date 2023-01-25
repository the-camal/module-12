const { identity } = require("rxjs");
const connec = require("./connect");

class db {
    constructor(connection) {
        this.connection = connection;
    }
    getAllStaff() {
        return this.connection.promise().query(
            "SELECT Staff.id, Staff.first_name, Staff.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN Staff manager on manager.id = Staff.manager_id;"  
        );
    }
    getAllManagers(StaffId) {
        return this.connection.promise().query(
          "SELECT id, first_name, last_name FROM Staff WHERE id != ?",
          StaffId
        );
      }
      createStaffMember(Staff) {
        return this.connection.promise().query("INSERT INTO employee SET ?", Staff);
      }
      removeStaffmember(StaffId) {
        return this.connection.promise().query(
          "DELETE FROM Staff WHERE id = ?",
          StaffId
        );
      }
}