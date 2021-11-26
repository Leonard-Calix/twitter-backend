var mongoose = require("mongoose");
var dbName = "twitter";
var password = "asd1234"

class Database {
    constructor() {
        this.conectar();
    }
    conectar() {
        mongoose.connect(`mongodb+srv://root:${password}@inventory.l4vee.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
            .then(() => {
                console.log("Se conecto a la base de datos...");
            })
            .catch(error => {
                console.error(JSON.stringify(error));
            });
    }
}

module.exports = new Database();