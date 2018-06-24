var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Bigpapi24!",
  database: "bamazonDB"
});

var items = [];

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

function start() { 
    console.log("\n\n\n    These are the items for sale:")
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw error;
        for (var i = 0; i < res.length; i++) {
            console.log("       " + res[i].product_name + ":" + " $" + res[i].price);
            items.push(res[i].product_name);
        }
        console.log("\n\n\n")
        askUser()
  });
  
} 

function askUser() {
    inquirer
        .prompt([{
            type: "list",
            name: "whatToBuy",
            message: "What would you like to buy?",
            choices: items
        }, 
        {
            type: "input",
            name: "howMany",
            message: "How many would you like to buy?"
        }]
        )
        .then(function(answers) {
            // based on their answer, either call the bid or the post functions
           console.log(answers);
        });
}