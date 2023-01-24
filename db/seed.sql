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
    ('Sales Lead', 100000, 3),
    ('Salesperson', 80000, 3),
    ('Lead Engineer', 150000, 6),
    ('Software Engineer', 120000, 6),
    ('marketing Manager', 160000, 9),
    ('Accountant', 125000, 9),
    ('Lawyer', 190000, 12);

INSERT INTO worker
    (first_name, last_name, role_id)
VALUES
    ('Josh', 'Dosea', 3),
    ('Mike', 'Chan', 6),
    ('Ashley', 'Rodriguez', 9),
    ('Kevin', 'Tupik', 12),
    ('paul', 'courts', 15),
    ('Malia', 'smith', 18),
    ('Sarah', 'Lourd', 21),
    ('Tom', 'Allen', 24);
