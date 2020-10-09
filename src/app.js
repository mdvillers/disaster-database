const express = require("express");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
require("./connectdb");
const createRoutes = require("./routes/create.routes");
const deleteRoutes = require("./routes/delete.routes");
const insertRoutes = require("./routes/insert.routes");
const viewRoutes = require("./routes/view.routes");

const app = express();
app.use(express.json()); //bodyparser

//create database and tables
app.use("/create", createRoutes);

//insert into tables
app.use("/insert", insertRoutes);

//view tables
app.use("/view", viewRoutes);

//delete from table
app.use("/delete", deleteRoutes);

app.use("/", (req, res) => {
  res.send({ message: "welcome to disaster database by Absurd Guys" });
});

//catch all errors here
app.use(errorMiddleware);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
