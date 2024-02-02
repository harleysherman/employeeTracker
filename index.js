const questions = require("./questions/questions");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const { log } = require("util");

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
              //console.log(result);
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
        // then when you want to the roles you can use a select to get the roles and you also need department you can join with department
        db.query("SELECT * FROM employee",
          (err, employeeResult) => {
            if (err) {
              console.log(err);
            } else {
                console.table(employeeResult);

              db.query("SELECT role.title, role.id FROM role",
                (err, roleResult) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.table(roleResult);

                    const roleParsed = roleResult.map((role) => {
                      return {
                        name: role.title,
                        value: role.department_id,
                      };
                    });
                    const managerParsed = employeeResult.map((employee) => {
                      return {
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id,
                      };
                    });
                    //add None to manager list
                    managerParsed.push({name: 'None', value: null});

                    // you can prompt first and last name
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
                          type: "list",
                          message: "Who is the employee's manager?",
                          name: "managerAdded",
                          choices: managerParsed,
                        },
                      ])
                      .then((response) => {
                        db.query(
                          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                          [
                            response.firstNameAdded,
                            response.lastNameAdded,
                            response.roleAdded,
                            response.managerAdded,
                          ],
                          (err, result) => {
                            if (err) {
                              console.log(err);
                            } else {
                              console.log(
                                "Employee has been added to database"
                              );
                              promptMenu();
                            }
                          }
                        );
                      });
                  }
                }
              );
            }
          }
        );
      } else if (response.actionChosen === "Update an employee role") {
        //TODO update an employee role
        db.query("SELECT employee.first_name, employee.last_name FROM employee", (err, employeeResult) => {
            if (err) {
                console.log(err);
            } else {
                //display employees
                console.table(employeeResult);

                const employeeParsed = employeeResult.map((employee) => {
                    return {
                      name: `${employee.first_name} ${employee.last_name}`,
                      value: employee.id,
                    };
                  });
                db.query("SELECT * FROM role", (err, roleResult) => {
                    if (err) {
                        console.log(err);
                    } else {
                        const roleParsed = roleResult.map((role) => {
                            return {
                              name: role.title,
                              value: role.id,
                            };
                          });
        
                        //display questions
                        inquirer
                        .prompt ([
                            {
                                type: "list",
                                message: "Which employee do you need to update?",
                                name: "employeeAdded",
                                choices: employeeParsed,
                              },
                              {
                                type: "list",
                                message: "What is the employee's new role?",
                                name: "roleAdded",
                                choices: roleParsed,
                              },
                        ])
                        .then ((response) => {
                            db.query("UPDATE employee SET role_id = ? WHERE id = ?", [
                                response.employeeAdded,
                                response.roleAdded,
                            ], (err, result) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("Employee has been updated");
                                    promptMenu();
                                }
                            });
                        });
                    }
                })
            }
        });
      } else {
        //TODO displays in terminal if all else fails
        console.log("Not sure how you ended up here buddy. Try again.");
        promptMenu();
      }
    });
}

promptMenu();