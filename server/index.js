const express = require("express"); 
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

const connectDB = require("./config/db");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
connectDB();

app.use(errorHandlerMiddleware());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is running on port 3000");
});