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
        if(response.actionChosen === "View all departments") {
            db.query('SELECT * FROM department ', 3, (err, result) => {
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
            db.query('SELECT * FROM employee', 3, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.table(result);
                    promptMenu();
                }
            })  
        } else if (response.actionChosen === "Add a department") {
            //TODO add a department
            console.log(response);
            db.query('INSERT INTO department (department_name) VALUES (?)', response, (err, result) => {
                //console.log("we've started the query");
                if (err) {
                    //console.log("we printed the error instead");
                    console.log(err);
                } else {
                    console.log("we're here to add a department");
                    inquirer
                    .prompt(
                        {
                            type: 'input',
                            message: 'What is the name of the department you want to add?',
                            name: 'departmentAdded',
                       }
                    )
                    console.table(result);
                    promptMenu();
                }
            })  
        }
    })
} 
    //     /

    //     //TODO add a role

    //     //TODO add an employee

    //     //TODO update an employee role
    //     //don't add promptMenu() here, this is the end
// inquirer.prompt ()
// // Hardcoded query: DELETE FROM course_names WHERE id = 3;
// db.query(`SELECT * FROM department`, 3, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// // Query database
// db.query('SELECT * FROM course_names', function (err, results) {
//   console.log(results);
// });

promptMenu();
