const questions = [
      {
        type: 'list',
        message: 'What is the name of the department?',
        name: 'department',
        choices: ['Design', 'Management', 'Testing', 'Engineering'],
      },
      {
        type: 'list',
        message: 'What is the name of the role?',
        name: 'role',
        choices: ['Data Analyst', 'Product Manager', 'Cloud Architect', 'Database Administrator', 'Data Scientist', 'Data Architect', 'Software Engineer', 'Full Stack Web Developer', 'DevOps Engineer', 'UI Designer'],
      },
      {
        type: 'list',
        message: 'What is the salary of the role?',
        name: 'salary',
        choices: ['75000', '90000', '100000', '150000'],
      },
      {
        type: 'list',
        message: 'Which department does the role belong to?',
        name: 'departmentRole',
        choices: ['Design', 'Management', 'Testing', 'Engineering'],
      },
      {
        type: 'input',
        message: `What is the employee's first name?`,
        name: 'firstName',
      },
      {
        type: 'input',
        message: `What is the employee's last name?`,
        name: 'lastName',
      },
      {
        type: 'input',
        message: `Who is the employee's manager?`,
        name: 'manager',
      },
      {
        type: 'list',
        message: `Which employee's role do you want to update?`,
        choices: ['James Smith', 'Michael Johnson','Robert Brown','Maria Garcia', 'David Hernandez','Mariana Rodriguez','Mary Wilson', 'Isambard Brunel', 'Ewart Gladstone','Emmeline Pankhurst'],
      },
    ];

module.exports = questions;