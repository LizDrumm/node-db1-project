-- Database Queries

-- Find all customers with postal code 1010
select * from customers where postalcode like'%1010%'

-- Find the phone number for the supplier with the id 11
select * from suppliers where supplierid = 11;

-- List first 10 orders placed, sorted descending by the order date
?????
-- //SELECT * FROM Orders order by OrderDate desc limit 10 this is the solution code- not right!


--//first 10 ascending order !! SELECT * FROM orders ORDER BY orderdate LIMIT 10;
-- //last 10 orders!! SELECT * FROM orders ORDER BY orderdate DESC LIMIT 10;

-- Find all customers that live in London, Madrid, or Brazil
SELECT * FROM customers WHERE Country='Brazil' or City ='London' or City = 'Madrid';

-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country) VALUES ('The Shire','Bilbo Baggins','1 Hobbit-Hole','Bag End','111','Middle Earth');

-- Update Bilbo Baggins record so that the postal code changes to "11122"
update Customers set PostalCode = '11122' where CustomerID = 92

-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted

-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
