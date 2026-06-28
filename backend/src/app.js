const express = require("express");
const simulationRoutes = require("./routes/simulationRoutes");

const app = express();

app.use(express.json());

app.use("/api/simulation", simulationRoutes);

app.get("/", (req, res) => {
    res.send("Sortie Generation Simulation API is running.");
});

module.exports = app;