const { load } = require("../storage/Repository");

async function listTask(status) {
  try {
    const tasks = await load();
    const filteredTasks = tasks.filter((task) => task.status === status);

    if (status !== "complete" && status !== "todo" && status !== "working") {
      throw new Error("Invalid status");
    }

    if (status === undefined) {
      console.table(tasks);
    } else {
      console.table(filteredTasks);
    }
  } catch (err) {
    console.log(`Could not list Tasks: ${err.message}`);
  }
}

module.exports = listTask;
