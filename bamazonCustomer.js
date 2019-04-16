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
    getOrder();
})
function getOrder() {
    inquirer.prompt([{
        type: "input",
        name: "idInput",
        message: "What is the ID of the item?"
    },
    {
        type: "input",
        name: "quantityInput",
        message: "How much of the item would you like?"
    }]).then(function(answer) {
        connection.query("SELECT * FROM product WHERE item_id=?", answer.idInput, function(err, res) {
            var item = answer.idInput;
            var amount = answer.quantityInput;
            if (err) {
                console.log(err)
            }

            if (res.length === 0) {
                console.log("Please input an item ID");
                getOrder();
            }
            else {
                for (var i = 0; i < res.length; i++) {
                    if (amount > res[i].stock_quantity) {
                        console.log("You have exceeded our stock!")
                    }
                    else {
                        var stock_quantity = res[i].stock_quantity - answer.quantityInput;
                        connection.query("UPDATE product SET ? WHERE ?", 
                        [{
                            stock_quantity: stock_quantity,
                        },
                        {
                            item_id: item,
                        }], function(err, res) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log("Your order is on the way!")
                            }
                        })
                        console.log("Your total price was: $" + res[i].price);
                    }
                }
            }
        })
    })
}