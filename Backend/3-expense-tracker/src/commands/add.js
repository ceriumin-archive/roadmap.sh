const { load, save } = require("../repository/repository");

async function addExpense(options) {
  try {
    const expenses = await load();

    if (!options.description) {
      throw new Error("Description is missing");
    }

    if (!options.amount) {
      throw new Error("Amount is missing");
    }

    const parsedAmount = parseFloat(options.amount);
    if (isNaN(parsedAmount)) {
      throw new Error("Amount must be a number");
    }

    options.amount = parsedAmount;

    const nextID = expenses.length
      ? Math.max(...expenses.map((expense) => expense.id)) + 1
      : 1;

    const expense = {
      id: nextID,
      date: new Date().toISOString().split("T")[0],
      description: options.description,
      amount: options.amount,
    };

    expenses.push(expense);
    await save(expenses);

    console.log(`Expense added successfully (ID:${expense.id})`);
  } catch (err) {
    console.log(`Could not add Expense: ${err.message}`);
  }
}

module.exports = addExpense;
