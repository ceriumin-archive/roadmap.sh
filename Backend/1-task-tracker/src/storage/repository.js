const fs = require("fs").promises;
const path = "./src/storage/data.json";

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
  await fs.writeFile(path, JSON.stringify(data, null, 2), "utf8");
}

module.exports = { load, save };
