use worker;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('marketing'),
    ('legal-team');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('marketing Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Lawyer', 190000, 4);

INSERT INTO worker
    (first_name, last_name, role_id)
VALUES
    ('Josh', 'Dosea', 100100),
    ('Mike', 'Chan', 011000),
    ('Ashley', 'Rodriguez', 110100),
    ('Kevin', 'Tupik', 100110),
    ('paul', 'courts', 11101),
    ('Malia', 'smith', 11111),
    ('Sarah', 'Lourd', 110110),
    ('Tom', 'Allen', 001010);
