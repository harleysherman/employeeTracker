SELECT first_name, last_name, title, salary, manager_id
FROM employee
JOIN role 
ON employee.role_id = role.id
ORDER BY employee.id;

SELECT employee.first_name, employee.last_name, managers.first_name, managers.last_name
FROM employee
LEFT JOIN employee AS managers 
ON employee.manager_id = managers.id
ORDER BY employee.id;

-- get title, salary and department from role
-- SELECT employee.first_name, employee.last_name, managers.first_name, managers.last_name
-- FROM employee
-- LEFT JOIN employee AS managers 
-- ON employee.manager_id = managers.id
-- ORDER BY employee.id;