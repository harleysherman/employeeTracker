const questions = require('./questions/questions');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'kittens123',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

//asks user questions about what text, font color, shape and shape color they want for their logo
function promptMenu() {
    inquirer
        .prompt(
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'actionChosen',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
            },)
        .then((response) => {
            console.log(response);
            //TODO view all departments
            if (response.actionChosen === "View all departments") {
                db.query('SELECT * FROM department ORDER BY department.department_name', (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(result);
                        promptMenu();
                    }
                })
            } else if (response.actionChosen === "View all roles") {
                //TODO view all roles
                db.query('SELECT * FROM role', 3, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(result);
                        promptMenu();
                    }
                })
            } else if (response.actionChosen === "View all employees") {
                //TODO view all employees
                db.query('SELECT * FROM employee', (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(result);
                        promptMenu();
                    }
                })
            } else if (response.actionChosen === "Add a department") {
                //TODO add a department
                //console.log(response);
                //console.log("we're here to add a department");
                db.query('SELECT * FROM department ORDER BY department.department_name', (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(result);

                        promptMenu();

                    }
                })

            } else if (response.actionChosen === "Add a role") {
                //TODO add a role
                console.log(response);
                //console.log("we're here to add a role");

                db.query('SELECT * FROM department ORDER BY department.department_name', (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                        const roleParsed = result.map((role) => {
                            return {
                                name: role.department_name,
                                value: role.id
                            }
                        });
                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    message: 'What is the role you want to add?',
                                    name: 'roleAdded',
                                },
                                {
                                    type: 'input',
                                    message: 'What is the salary you want to add?',
                                    name: 'salaryAdded',
                                },
                                {
                                    type: 'list',
                                    message: 'What is the department you want to add?',
                                    name: 'departmentAdded',
                                    choices: roleParsed,
                                },
                            ])
                            .then((response) => {
                                db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [response.roleAdded, response.salaryAdded, response.departmentAdded], (err, result) => {
                                    //console.log("we've started the query");
                                    if (err) {
                                        //console.log("we printed the error instead");
                                        console.log(err);
                                    } else {
                                        console.table(result);
                                        console.log(`Added ${response.roleAdded} as a new role`);
                                        promptMenu();
                                    }
                                })
                            });
                    }
                })
            } else if (response.actionChosen === "Add a employee") {
                //TODO add an employee -- add role id too, need only role id

            }
        })
} 

//     //TODO update an employee role

promptMenu();
