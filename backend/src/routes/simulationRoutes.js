const express = require("express");
const SimulationController = require("../controllers/SimulationController");

const router = express.Router();

router.get("/sample", SimulationController.runSampleSimulation);

module.exports = router;