const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const routes = require("./routes/routes");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("hi , backend welcomes u!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
