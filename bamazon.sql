DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

create table product (
item_id INT NOT NULL,
product_name VARCHAR(10),
department_name VARCHAR(20),
price INT(50) NULL,
stock_quantity INT(20) NULL
)
