const fs = require("fs").promises;
const path = "./src/repository/data.json";

async function load() {
  try {
    const data = await fs.readFile(path, "utf8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.writeFile(path, "[]", "utf8");
      return [];
    }
    throw err;
  }
}

async function save(data) {
  try {
    await fs.writeFile(path, JSON.stringify(data), "utf-8");
  } catch (err) {
    throw err;
  }
}

module.exports = { save, load };
