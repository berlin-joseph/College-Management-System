const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const connectDatabase = require("./db/db");
const userRoutes = require("./routes/userRoutes");

//env config
dotenv.config({ path: path.join(__dirname, ".", ".env") });

//cors
app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

// connect database
connectDatabase();

app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
