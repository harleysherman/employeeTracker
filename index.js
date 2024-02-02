const questions = require("./questions/questions");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "kittens123",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

//asks user questions about what text, font color, shape and shape color they want for their logo
function promptMenu() {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "actionChosen",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
    })
    .then((response) => {
      console.log(response);
      //TODO view all departments
      if (response.actionChosen === "View all departments") {
        db.query(
          "SELECT * FROM department ORDER BY department.department_name",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.table(result);
              promptMenu();
            }
          }
        );
      } else if (response.actionChosen === "View all roles") {
        //TODO view all roles
        db.query("SELECT * FROM role", 3, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.table(result);
            promptMenu();
          }
        });
      } else if (response.actionChosen === "View all employees") {
        //TODO view all employees
        db.query("SELECT * FROM employee", (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.table(result);
            promptMenu();
          }
        });
      } else if (response.actionChosen === "Add a department") {
        //TODO add a department
        //console.log(response);
        //console.log("we're here to add a department");
        inquirer
          .prompt({
            type: "input",
            message: "What is the department you want to add?",
            name: "departmentAdded",
          })
          .then((response) => {
            db.query(
              "INSERT INTO department(department_name) VALUES (?)",
              response.departmentAdded,
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  console.table(result);
                  console.log(
                    `Added ${response.departmentAdded} as a new department`
                  );
                  promptMenu();
                }
              }
            );
          });
      } else if (response.actionChosen === "Add a role") {
        //TODO add a role
        //console.log(response);
        //console.log("we're here to add a role");

        db.query(
          "SELECT * FROM department ORDER BY department.department_name",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
              const roleParsed = result.map((role) => {
                return {
                  name: role.department_name,
                  value: role.id,
                };
              });
              inquirer
                .prompt([
                  {
                    type: "input",
                    message: "What is the role you want to add?",
                    name: "roleAdded",
                  },
                  {
                    type: "input",
                    message: "What is the salary you want to add?",
                    name: "salaryAdded",
                  },
                  {
                    type: "list",
                    message: "What is the department you want to add?",
                    name: "departmentAdded",
                    choices: roleParsed,
                  },
                ])
                .then((response) => {
                  db.query(
                    "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
                    [
                      response.roleAdded,
                      response.salaryAdded,
                      response.departmentAdded,
                    ],
                    (err, result) => {
                      //console.log("we've started the query");
                      if (err) {
                        //console.log("we printed the error instead");
                        console.log(err);
                      } else {
                        console.table(result);
                        console.log(
                          `Added ${response.roleAdded} as a new role`
                        );
                        promptMenu();
                      }
                    }
                  );
                });
            }
          }
        );
      } else if (response.actionChosen === "Add an employee") {
        //TODO add an employee -- add role id too, need only role id
        //console.log("We're in the add the employee");
        db.query(
          "SELECT title, department_id FROM role id FULL OUTER JOIN employee ON employee.role_id = role.id WHERE employee.id IS NULL OR employee.manager_id IS NULL",
          (err, result) => {
            //SELECT employee.role_id, employee.manager_id FROM employee
            //SELECT <select_list>
            //FROM TableA A
            //FULL OUTER JOIN TableB B
            //ON A.Key = B.Key WHERE A.Key IS NULL
            //OR B.Key IS NULL
            //SELECT employee.title, employee.department_id FROM role FULL OUTER JOIN employee ON employee.manager_id = role.id WHERE employee.manager_id IS NULL or employee.id IS NULL
            if (err) {
              console.log(err);
            } else {
              //console.table("result" + result);
              const roleParsed = result.map((role) => {
                return {
                  name: role.title,
                  value: role.department_id,
                };
              });
              //console.log(roleParsed);
              inquirer
                .prompt([
                  {
                    type: "input",
                    message:
                      "What is the employee's first name you want to add?",
                    name: "firstNameAdded",
                  },
                  {
                    type: "input",
                    message:
                      "What is the employee's last name you want to add?",
                    name: "lastNameAdded",
                  },
                  {
                    type: "list",
                    message: "What is the role you want to add?",
                    name: "roleAdded",
                    choices: roleParsed,
                  },
                  {
                    type: "input",
                    message: "Who is the manager you want to add?",
                    name: "managerAdded",
                  },
                ])
                .then((data) => {
                  // db.query('SELECT employee.role_id, employee.manager_id FROM employee', (err, result) => {
                  //     if (err) {
                  //         console.log(err);
                  //     } else {
                  //         inquirer
                  //         .prompt([

                  //         ])
                  //     }
                  console.log("Employee has been added to database");
                  promptMenu();
                });
            }
          }
        );
      }
    });
}

//TODO update an employee role

promptMenu();
