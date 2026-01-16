const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
async function connect() {
    try {
        const mongoUri = process.env.MONGO_URI;
        const db = await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected to mongodb");
        return Promise.resolve(db);

    } catch (err) {
        return Promise.reject(err);

    }
}
module.exports = connect;