const mongoose = require("mongoose");

const atlas = "mongodb+srv://mordecode:fr4nkier0@cluster0.9c0dhod.mongodb.net/?retryWrites=true&w=majority";
const local = "mongodb://localhost:27017/task-manager-api-test";

mongoose.connect(local);
