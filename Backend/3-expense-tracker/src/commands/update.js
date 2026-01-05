const { load, save } = require("../repository/repository");

async function updateExpenses(options) {
  try {
    const expenses = await load();
    const parsedID = parseInt(options.id);

    if (isNaN(parsedID) || parsedID <= 0) {
      throw new Error("ID is Invalid");
    }

    const expenseIndex = expenses.findIndex(
      (expense) => expense.id === parsedID
    );

    if (expenseIndex === -1) {
      throw new Error("Expense not found");
    }

    const expense = {
      id: options.id,
      description: options.description || expenses[expenseIndex].description,
      amount: options.amount || expenses[expenseIndex].amount,
    };

    expenses[expenseIndex] = expense;

    await save(expenses);
    console.log(`Expense updated successfully (ID:${parsedID})`);
  } catch (err) {
    console.log(`Could not update Expense: ${err.message}`);
  }
}

module.exports = updateExpenses;
