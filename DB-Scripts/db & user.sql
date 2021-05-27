CREATE DATABASE ecommerce_project;

#create database service acounts:
CREATE USER 'ecommerceapp'@'localhost' IDENTIFIED BY 'ecommerceapp';

#grant:
GRANT SELECT ON ecommerce_project.* to 'ecommerceapp'@'localhost';
GRANT INSERT ON ecommerce_project.* to 'ecommerceapp'@'localhost';
GRANT UPDATE ON ecommerce_project.* to 'ecommerceapp'@'localhost';
GRANT DELETE ON ecommerce_project.* to 'ecommerceapp'@'localhost';
GRANT CREATE ON ecommerce_project.* to 'ecommerceapp'@'localhost';

