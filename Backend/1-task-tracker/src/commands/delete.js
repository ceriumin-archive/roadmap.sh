const { load, save } = require("../storage/Repository");

async function removeTask(argument) {
  try {
    const tasks = await load();
    const parsedInt = parseInt(argument, 10);

    if (Number.isNaN(parsedInt) || parsedInt <= 0) {
      throw new Error("ID must be a positive integer");
    }

    if (!tasks.some((task) => task.id === parsedInt)) {
      throw new Error(`ID:${argument} does not exist`);
    }

    const filteredTasks = tasks.filter((task) => task.id !== parsedInt);

    console.log(`Task deleted successfully (ID:${argument})`);

    await save(filteredTasks);
  } catch (err) {
    console.log(`Could not delete Task: ${err}`);
  }
}

module.exports = removeTask;
