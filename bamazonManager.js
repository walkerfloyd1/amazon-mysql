var sql = require("mysql");

var inquirer = require("inquirer");

var connection = sql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "goheels2!",
    database: "bamazon"
})
connection.connect(function(err) {
    if (err) {
        console.log(err)
    };
    console.log("This is connected");
    getItems();
})
function getItems() {

    inquirer.prompt([{
        name: "actionChoice",
        type: "list",
        message: "Please select an option",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function(answer) {
        if (answer.actionChoice === "View Products for Sale") {
            connection.query("SELECT * FROM product", function(err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
                };
            })
        }
     else if (answer.actionChoice === "View Low Inventory") {
        connection.query("SELECT * FROM product WHERE stock_quantity < 5", function (err, res) {
            if (err) {
                console.log(err);
            }
            else {
                for (var i = 0; i < res.length; i++) {
                    console.log(res[i].product_name);
                }
            }
        }) 
        }
    else if (answer.actionChoice === "Add to Inventory") {
           inquirer.prompt([{
               type: "input",
               name: "updateId",
               message: "What item's quantity would you like to change? (Please input Item ID number)."
           },
        {
           type: "input",
           name: "newQuantity",
           message: "How much would you like to add?",
        }]).then(function(input) {
            connection.query("SELECT * FROM product WHERE item_id=?", input.updateId, function(err, res) {
                if (err) {
                    console.log(err)
                }
                else {
                    if (res.length === 0) {
                        console.log("This is not a valid ID");
                    }
                    else {
                        connection.query("UPDATE product SET stock_quantity=" + ("res[0].stock_quantity" + "input.newQuantity") + " WHERE item_id= " + input.updateId, 
                        function() {
                            console.log("There is now " + (res[0].stock_quantity + input.newQuantity) + " in stock for " + res[0].product_name);
                        })
                    }
                }
            })
        })
    }
        else if (answer.actionChoice === "Add New Product") {
            inquirer.prompt([{
                type: "input",
                name: "itemName",
                message: "What is the name of your item?"
            },
            {
                type: "input",
                name: "deptName",
                message: "What department would it fit in?"
            },
            {
                type: "input",
                name: "price",
                message: "What is the base price?"
            },
            {
                type: "input",
                name: "quantity",
                message: "How many are there?"
            }]).then(function(input) {
                connection.query("INSERT INTO product SET?", {
                    product_name: input.itemName,
                    department_name: input.deptName,
                    price: input.price,
                    stock_quantity: input.quantity,
                }, function(err) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log("You have added " + input.itemName + "to the shop.");
                        console.log(input.itemName + " Price: " + input.price + ".");
                        console.log(input.itemName + " Quantity: " + input.quantity + ".");

                    }
                })
            })
        }
    })
}