const { load, save } = require("../storage/Repository");

async function updateTask(id, description) {
  try {
    const tasks = await load();
    const parsedInt = parseInt(id, 10);

    if (Number.isNaN(parsedInt) || parsedInt <= 0) {
      throw new Error("ID must be a positive integer");
    }

    if (!tasks.some((task) => task.id === parsedInt)) {
      throw new Error(`ID:${parsedInt} does not exist`);
    }

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parsedInt) {
        tasks[i].name = description;
        tasks[i].updatedAt = new Date().toISOString();
        break;
      }
    }

    console.log(`Task updated successfully (ID:${id})`);

    await save(tasks);
  } catch (err) {
    console.log(`Could not update Task: ${err.message}`);
  }
}

module.exports = updateTask;
