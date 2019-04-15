var sql = require("mysql");

var inquirer = require("inquirer");

var connection = sql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "goheels2!",
    database: "top_songsDB"
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
    }]).then(function(idInput, quantityInput) {
        connection.query("SELECT * FROM WHERE ?", {item_id: idInput}, function(err, res) {
            if (err) {
                console.log(err)
            }

            if (res.length === 0) {
                console.log("Please input an item ID");
            }
            else {
                if (quantityInput > res.stock_quantity) {
                    console.log("You have exceeded our stock!")
                }
                else {
                    var newQuantity = res.stock_quantity - quantityInput;
                    connection.query("UPDATE product SET stock_quantity = " + newQuantity + "WHERE item_id = " + idInput, function(err, res) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("Your order is on the way!")
                        }
                    })
                }
            }
        })
    })
}