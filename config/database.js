const mongoose = require("mongoose")
require("dotenv").config();

const { MONGO_URI } = process.env;
exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    }).then(() => {
        console.log("Successfully connected to database");
    }).catch((error) => {
        console.log("db conn faild");
        console.error(error);
        process.exit(1)
    })
}