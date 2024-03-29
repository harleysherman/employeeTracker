/* Add seed data for department, role and employee tables */
INSERT INTO department (department_name)
VALUES ("Design"),
    ("Management"),
    ("Data"),
    ("Testing"),
    ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Data Analyst", 150000, 3),
    ("Product Manager", 90000 , 2),
    ("Cloud Architect", 100000, 5),
    ("Database Administrator", 100000, 5),
    ("Data Scientist", 150000, 3),
    ("Data Architect", 150000, 3),
    ("Software Engineer", 150000, 5),
    ("Full Stack Web Developer", 90000, 5),
    ("DevOps Engineer", 150000, 4),
    ("UI Designer", 75000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "Smith", 1, NULL),
    ("Michael", "Johnson",1, NULL),
    ("Robert", "Brown", 1, 2),
    ("Maria", "Garcia", 1, 2),
    ("David", "Hernandez", 1, 4),
    ("Mariana", "Rodriguez", 1, 4),
    ("Mary", "Wilson", 1, NULL),
    ("Isambard", "Brunel", 1, 7),
    ("Ewart", "Gladstone", 1, 7),
    ("Emmeline", "Pankhurst", 1, NULL);
