const express = require("express");
const mongoose = require("mongoose");
const MongoURI = require("./config");
const app = express();

// Connect to MongoDB
async function connect() {
  try {
    // await mongoose.connect(MongoURI + "movies");
    await mongoose.connect(MongoURI);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}
connect();

// Middleware
app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter)

app.listen(3001, () => {
  console.log("server running on 3001");
});
