DROP DATABASE IF EXISTS animals_db;
CREATE DATABASE bamazonDB;
USE bamazonDB;


CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL, 
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER(11) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dog bones", "pets", 2.50, 100), ("Greenies", "pets", 6.75, 300), ("Kong Toy", "pets", 11.25, 25),
       ("basketball", "sporting goods", 25.10, 100), ("baseball", "sporting goods", 8.75, 300), ("football", "sporting goods", 28.70, 35),
       ("ethereum", "cryptocurrency", 450.12, 100), ("bitcoin", "cryptocurrency", 5000.35, 100), ("omisego", "cryptocurrency", 7.50, 100)
