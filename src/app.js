const { connectdb } = require("./config/database");
const cors = require("cors");
const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const authrouter = require("./route/auth");
const saverouter = require("./route/save");
app.use(cookieparser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/", authrouter);
app.use("/", saverouter);

connectdb()
  .then(() => {
    console.log("connected successfully");
    app.listen(7777, () => {
      console.log("Hey! Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("disconnected");
  });
