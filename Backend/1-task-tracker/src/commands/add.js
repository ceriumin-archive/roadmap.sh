const { load, save } = require("../storage/Repository");

async function addTask(argument) {
  try {
    const tasks = await load();
    const nextId = tasks.length
      ? Math.max(...tasks.map((task) => (task = task.id))) + 1
      : 1;

    const task = {
      id: nextId,
      name: argument,
      status: "todo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(task);

    console.log(`Task added successfully (ID:${task.id})`);

    await save(tasks);
  } catch (err) {
    console.log(`Could not add Task: ${err.message}`);
  }
}

module.exports = addTask;
