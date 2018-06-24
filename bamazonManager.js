var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Bigpapi24!",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("\n\n");
  console.log("connected as id " + connection.threadId);
  console.log("\n\n");
  start();
});

function start() {
    inquirer
        .prompt({
        name: "options",
        type: "list",
        message: "Would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        })
        .then(function(answer) {
            if (answer.options === "View Products for Sale") {
                viewProducts();
            }
            else if (answer.options === "View Low Inventory") {
                viewLow();
            } 
            else if (answer.options === "Add to Inventory") {
                addInventory();
            }
            else if (answer.options === "Add New Product") {
                addProduct();
            }
        });
}

function viewProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw error;
        console.log("\n\n");
        console.log("item_id | product_name | department_name | price | stock_quantity");
        console.log("-----------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(`${res[i].item_id} | ${res[i].product_name} | ${res[i].department_name} | ${res[i].price} | ${res[i].stock_quantity}`)
        }
        console.log("-----------------------------------------------------------------");
        console.log("\n\n");
        start();
  });
}

function viewLow() {
    connection.query('SELECT * FROM products WHERE products.stock_quantity < 100', function (err, res) {
        if (err) throw err;
        console.log("\n\n");
        console.log("Items with quantity less than 30!");
        console.log("\n");
        console.log("item_id | product_name | department_name | price | stock_quantity");
        console.log("-----------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(`${res[i].item_id} | ${res[i].product_name} | ${res[i].department_name} | ${res[i].price} | ${res[i].stock_quantity}`)
        }
        console.log("-----------------------------------------------------------------");
        console.log("\n\n");
        start();
  });
}

function addInventory() {
    inquirer
        .prompt([{
            type: "input",
            name: "whichToIncrease",
            message: "For which item would you like to increase the stock?",
        }, 
        {
            type: "input",
            name: "howMany",
            message: "How many would you like to add?"
        }]
        )
        .then(function(answers) {
            if (Number.isInteger(parseInt(answers.howMany))) {
                connection.query(
                    `UPDATE products SET stock_quantity=stock_quantity+${answers.howMany} WHERE product_name="${answers.whichToIncrease}"`,
                    function (err, res) {
                        if (err) throw err;
                        if (res.affectedRows === 0) {
                            console.log("\n\n");
                            console.log(`Hey! ${answers.whichToIncrease} isn't an item that we currently offer!`);
                            console.log("\n\n");
                            setTimeout(function () {
                                start();
                            }, 3000);
                        } 
                        else {
                            console.log("\n\n");
                            console.log(`You have increased the quanity of ${answers.whichToIncrease} by ${answers.howMany}`);
                            console.log("\n\n");
                            setTimeout(function () {
                                start();
                            }, 3000);
                        }
                    }
                );
            } 
            else {
                console.log("\n\n");
                console.log(`Hey! ${answers.howMany} isn't a valid input! Please provide an integer!`);
                console.log("\n\n");
                setTimeout(function () {
                    start();
                }, 3000);
            }
        })
}

function addProduct() {
    inquirer
        .prompt([{
            type: "input",
            name: "item",
            message: "What item would you like to add?",
        }, 
        {
            type: "input",
            name: "department",
            message: "In which department should it be?"
        },
        {
            type: "input",
            name: "price",
            message: "What should the price be?"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many are in stock?"
        }
        ])
        .then(function(answers) {
            connection.query(
                `INSERT INTO products (product_name, department_name, price, stock_quantity)
                VALUES ("${answers.item}", "${answers.department}", ${answers.price}, ${answers.quantity})`,
                function (err, res) {
                if (err) throw err;
                console.log("\n\n");
                console.log(`You have created an entry for ${answers.item} in the ${answers.department} department, with at a price of $${answers.price}, with a quantiy of ${answers.quantity}`);
                console.log("\n\n");
                setTimeout(function () {
                    start();
                }, 3000);
                }
            );
        })
}
