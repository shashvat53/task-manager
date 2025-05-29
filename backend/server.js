const express = require("express");
const cors = require("cors");
const connectWithDB = require("./config/db");
require("dotenv").config();
const router = require("./routes/index");

const app = express();

app.use(
  cors({
    // "http://localhost:5173"
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
const PORT = 9000 || process.env.PORT;

app.use("/api", router);

connectWithDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to the database");
    console.log("Server is running on port:", PORT);
  });
});
