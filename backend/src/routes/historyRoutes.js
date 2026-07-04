const express = require("express");
const HistoryController = require("../controllers/HistoryController");

const router = express.Router();

router.get("/", HistoryController.getSimulationHistory);
router.get("/:id", HistoryController.getSimulationById);
router.delete("/:id", HistoryController.deleteSimulationById);

module.exports = router;
