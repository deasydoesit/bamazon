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
var quantity = {};
var price = {}

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

function start() { 
    console.log("\n\n    These are the items for sale:")
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw error;
        for (var i = 0; i < res.length; i++) {
            console.log("       " + res[i].product_name + ":" + " $" + res[i].price + ", QTY " + res[i].stock_quantity);
            items.push(res[i].product_name);
            quantity[res[i].product_name] = res[i].stock_quantity;
            price[res[i].product_name] = res[i].price;
        }
        console.log("\n\n");
        setTimeout(function () {
            askUser();
          }, 3000);
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
            if (quantity[answers.whatToBuy] < answers.howMany) {
                console.log("\n\nInsufficient quantity!");
                setTimeout(function () {
                    start();
                  }, 1000);
            } else {
                connection.query(
                    `UPDATE products SET stock_quantity=${quantity[answers.whatToBuy] - answers.howMany} WHERE product_name="${answers.whatToBuy}"`,
                    function (err, res) {
                      if (err) throw err;
                      console.log("\n\n");
                      console.log(`Your total is $${answers.howMany *  price[answers.whatToBuy]}`);
                      console.log("\n\n");
                      // re-prompt the user for if they want to bid or post
                      setTimeout(function () {
                        askUser();
                      }, 3000);
                    }
                );
            }
        });
}