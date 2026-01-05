const { load } = require("../repository/repository");

async function listExpenses() {
  try {
    const expenses = await load();

    console.table(expenses);
  } catch (err) {
    console.log(`Could not list Expenses: ${err.message}`);
  }
}

module.exports = listExpenses;
