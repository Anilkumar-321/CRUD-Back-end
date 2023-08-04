const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 5000; // You can change this port if needed

// Connect to MongoDB
mongoose.connect(
  "mongodb://mhemanthkmr:Hemanth123$@mongodb.selfmade.ninja:27017/users",
  {
    dbName: "mhemanthkmr_Test",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
