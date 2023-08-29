INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Retired');

INSERT INTO role (title, salary, dapartment_id)
VALUES ('Fired', 60.5, 5),
       ('Lawyer', 30.75, 4),
       ('Accountant', 100, 3),
       ('SWE', 17, 2),
       ('Telemarketer', 99.99, 1);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Joe', 'Bob', 3, 1),
       ('Sally', 'Sals', 1, 2),
       ('Frank', 'Furter', 5, 1),
       ('Jill', 'Jills', 2, 1),
       ('Darth', 'Vader', 4, 2);
