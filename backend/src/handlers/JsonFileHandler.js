const fs = require("fs/promises");
const path = require("path");

const STORAGE_DIR = path.join(__dirname, "../../storage");
const HISTORY_FILE = path.join(STORAGE_DIR, "simulationHistory.json");

class JsonFileHandler {
  static async ensureHistoryFile() {
    await fs.mkdir(STORAGE_DIR, { recursive: true });

    try {
      await fs.access(HISTORY_FILE);
    } catch (error) {
      await fs.writeFile(HISTORY_FILE, "[]", "utf-8");
    }
  }

  static async readHistory() {
    await this.ensureHistoryFile();

    const fileContent = await fs.readFile(HISTORY_FILE, "utf-8");

    if (!fileContent.trim()) {
      return [];
    }

    return JSON.parse(fileContent);
  }

  static async writeHistory(records) {
    await this.ensureHistoryFile();

    await fs.writeFile(HISTORY_FILE, JSON.stringify(records, null, 2), "utf-8");
  }

  static createId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  static async createSimulation(record) {
    const records = await this.readHistory();
    const now = new Date().toISOString();

    const document = {
      _id: this.createId(),
      ...record,
      createdAt: now,
      updatedAt: now,
    };

    records.push(document);

    await this.writeHistory(records);

    return document;
  }

  static async getAllSimulations() {
    const records = await this.readHistory();

    return records
      .map(({ result, requestPayload, ...summaryRecord }) => summaryRecord)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  static async getSimulationById(id) {
    const records = await this.readHistory();

    return records.find((record) => record._id === id) || null;
  }

  static async deleteSimulationById(id) {
    const records = await this.readHistory();

    const recordIndex = records.findIndex((record) => record._id === id);

    if (recordIndex === -1) {
      return null;
    }

    const [deletedRecord] = records.splice(recordIndex, 1);

    await this.writeHistory(records);

    return deletedRecord;
  }

  static async countSimulations() {
    const records = await this.readHistory();

    return records.length;
  }
}

module.exports = JsonFileHandler;
