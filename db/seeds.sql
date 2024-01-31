/* Add seed data for two tables */
INSERT INTO department (departmentName)
VALUES ("Design"),
    ("Management"),
    ("Data"),
    ("Testing"),
    ("Engineering");

INSERT INTO role (title, salary)
VALUES ("Data Analyst", 150000),
    ("Product Manager", 90000),
    ("Cloud Architect", 100000),
    ("Database Administrator", 100000),
    ("Data Scientist", 150000),
    ("Data Architect", 150000),
    ("Software Engineer", 150000),
    ("Full Stack Web Developer", 90000),
    ("DevOps Engineer", 150000),
    ("UI Designer", 75000);

INSERT INTO employee (first_name, last_name)
VALUES ("James Smith"),
    ("Michael", "Johnson"),
    ("Robert", "Brown"),
    ("Maria", "Garcia"),
    ("David", "Hernandez"),
    ("Mariana", "Rodriguez"),
    ("Mary", "Wilson"),
    ("Isambard", "Brunel"),
    ("Ewart", "Gladstone"),
    ("Emmeline", "Pankhurst");