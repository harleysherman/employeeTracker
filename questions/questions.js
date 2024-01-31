//Import Inquirer and FS packages
const inquirer = require('inquirer');
const fs = require('fs');

//asks user questions about what text, font color, shape and shape color they want for their logo
function firstQuestion() {
    inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'actionChosen',
        choices: ['View all departments', 'View all roles', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
      },
    ])
}

function secondQuestion() {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'Which employee do you want to update?',
            name: 'employeeUpdate',
            choices: [''],
        },
    ])
}

//Call function firstQuestion() and secondQuestion() once the first is answered
firstQuestion();
//secondQuestion();