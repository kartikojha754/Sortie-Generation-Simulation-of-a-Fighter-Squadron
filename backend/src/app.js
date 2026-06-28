const express = require("express");
const cors = require("cors");

const simulationRoutes = require("./routes/simulationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Sortie Generation Simulation API is running."
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "Sortie Generation Simulation Backend"
    });
});

app.use("/api/simulation", simulationRoutes);

module.exports = app;