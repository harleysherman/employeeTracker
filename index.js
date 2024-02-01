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
        database: 'courses_db'
    },
    console.log(`Connected to the courses_db database.`)
);

//asks user questions about what text, font color, shape and shape color they want for their logo
function promptMenu() {
    inquirer
    .prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'actionChosen',
            choices: ['View all departments', 'View all roles', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        },)
    .then((response) => {
        console.log(response);
    //TODO view all departments
    //if(response.actionChosen === "View all departments") {
    //         db.query('WRITE QUERY TO VIEW ALL DEPTS', 3, (err, result) => {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 console.log(result);
    //                 promptMenu();
    //             }
    //         })
    //}

    //     //TODO view all roles

    //     //TODO view all employees

    //     //TODO add a department

    //     //TODO add a role

    //     //TODO add an employee

    //     //TODO update an employee role
    //     //don't add promptMenu() here, this is the end
 })
}
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

