const express = require("express");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
require("./connectdb");
const createRoutes = require("./routes/create.routes");
const incidentRoutes = require("./routes/incident.routes");
const disasterTypeRoutes = require("./routes/disasterType.routes");
const disasterGroupRoutes = require("./routes/disasterGroup.routes");
const disasterSubGroupRoutes = require("./routes/disasterSubGroup.routes");
const DataSourceRoutes = require("./routes/datasource.routes");
const districtRoutes = require("./routes/district.routes");
const VDCorMRoutes = require("./routes/VDCorM.routes");

const app = express();
app.use(express.json()); //bodyparser

//create database or tables
app.use("/create", createRoutes);

//incident table
app.use("/incident", incidentRoutes);
//disasterType table
app.use("/disasterType", disasterTypeRoutes);
//disasterGroup table
app.use("/disasterGroup", disasterGroupRoutes);
//disasterGroup table
app.use("/disasterSubGroup", disasterSubGroupRoutes);
//DataSource table
app.use("/DataSource", DataSourceRoutes);
//district table
app.use("/district", districtRoutes);
//VDC_or_Municipality table
app.use("/VDCorM", VDCorMRoutes);

app.use("/", (req, res) => {
  res.send({ message: "welcome to disaster database by Absurd Guys" });
});

//catch all errors here
app.use(errorMiddleware);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
