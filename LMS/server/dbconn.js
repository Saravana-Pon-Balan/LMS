const mongoose =  require("mongoose");

const DB_CONNECTION_URL =   "mongodb://localhost:27017/LMS";


async function dbconn() {
    const db = await mongoose.connect(DB_CONNECTION_URL);
    return db;
}

module.exports = dbconn