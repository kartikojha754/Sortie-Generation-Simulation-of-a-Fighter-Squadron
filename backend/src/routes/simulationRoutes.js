const express = require("express");
const SimulationController = require("../controllers/SimulationController");

const router = express.Router();

router.get("/sample", SimulationController.runSampleSimulation);
router.get("/sample/summary", SimulationController.runSampleSimulationSummary);

router.post("/run", SimulationController.runCustomSimulation);
router.post("/run/summary", SimulationController.runCustomSimulationSummary);

module.exports = router;
