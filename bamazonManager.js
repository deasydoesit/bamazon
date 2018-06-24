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
        // based on their answer, either call the bid or the post functions
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

}
