DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

create table product (
item_id INT NOT NULL,
product_name VARCHAR(10),
department_name VARCHAR(20),
price INT(50) NULL,
stock_quantity INT(20) NULL,
PRIMARY KEY (item_id)
);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Plunger", "Cleaning", "10", 5);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Snickers", "Food", "1", 20);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Orange Juice", "Food", "3", 10);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("The Avengers", "Movies", "15", 8);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Tshirt", "Clothing", "15", 5);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Football", "Sports", "20", 5);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", "100", 5);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Xbox", "Electronics", "300", 5);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Shoes", "Clothing", "30", 6);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Poster", "Decoration", "5", 3);






