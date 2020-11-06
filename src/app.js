const express = require("express");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
require("./connectdb");
const createRoutes = require("./routes/create.routes");
const incidentRoutes = require("./routes/incident.routes");
const disasterTypeRoutes = require("./routes/disasterType.routes");
const DataSourceRoutes = require("./routes/datasource.routes");
const districtRoutes = require("./routes/district.routes");
const vmRoutes = require("./routes/vm.routes");
const { allData } = require("./controllers/allData.controller");

const app = express();
app.use(require("cors")());
app.use(express.json()); //bodyparser

//create database or tables
app.use("/create", createRoutes);
//incident table
app.use("/incident", incidentRoutes);
//disasterType table
app.use("/disasterType", disasterTypeRoutes);
//DataSource table
app.use("/DataSource", DataSourceRoutes);
//district table
app.use("/district", districtRoutes);
//VDC_or_Municipality table
app.use("/vm", vmRoutes);

app.get("/", allData);

//catch all errors here
app.use(errorMiddleware);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
