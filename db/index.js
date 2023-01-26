const { connect } = require("http2");
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
        return this.connection.promise().query("INSERT INTO staff SET ?", Staff);
      }
      removeStaffmember(StaffId) {
        return this.connection.promise().query(
          "DELETE FROM Staff WHERE id = ?",
          StaffId
        );
      }
      updateStaffRole(StaffId, roleId) {
        return this.connection.promise().query(
          "UPDATE staff SET role_id = ? WHERE id = ?",
          [roleId, StaffId]
        );
      }
      updateStaffManager(StaffId, managerId) {
        return this.connection.promise().query(
          "UPDATE Staff SET manager_id = ? WHERE id = ?",
          [managerId, StaffId]
        );
      }
      findAllRoles() {
        return this.connection.promise().query(
          "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
      }
      createRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role);
      }

      deleteRole(roleId) {
        return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleId);
      }
    
      findAllDepartments() {
        return this.connection.promise().query(
          "SELECT department.id, department.name FROM department;"
        );
      }
    
      viewDepartmentBudgets() {
        return this.connection.promise().query(
          "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
        );
      }
    
      createDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET ?", department);
      }
    
      deleteDepartment(departmentId) {
        return this.connection.promise().query(
          "DELETE FROM department WHERE id = ?",
          departmentId
        );
      }
    
      findAllStaffByDepartment(departmentId) {
        return this.connection.promise().query(
          "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
          departmentId
        );
      }

      findAllStaffMemebersByManager(managerId) {
        return this.connection.promise().query(
          "SELECT employee.id, Staff.first_name, Saff.last_name, department.name AS department, role.title FROM Staff LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
          managerId
        );
      }
}
module.exports = new db(connection);