const { load, save } = require("../repository/repository");

async function deleteExpense(options) {
  try {
    const expenses = await load();
    const parsedID = parseInt(options.id);

    if (isNaN(parsedID) || parsedID <= 0) {
      throw new Error("ID is Invalid");
    }

    const filteredExpenses = expenses.filter(
      (expense) => expense.id !== parsedID
    );

    await save(filteredExpenses);

    console.log(`Expense deleted successfully (ID:${parsedID})`);
  } catch (err) {
    console.log(`Could not delete Expense: ${err.message}`);
  }
}

module.exports = deleteExpense;
