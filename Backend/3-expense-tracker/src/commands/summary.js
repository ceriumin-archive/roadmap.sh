const { load } = require("../repository/repository");

async function summariseExpense(options) {
  try {
    const expenses = await load();
    let filteredExpenses = expenses;

    if (options.year) {
      filteredExpenses = filteredExpenses.filter(
        (expense) =>
          new Date(expense.date).getFullYear() === parseInt(options.year)
      );
    }

    if (options.month) {
      filteredExpenses = filteredExpenses.filter(
        (expense) =>
          new Date(expense.date).getMonth() + 1 === parseInt(options.month)
      );
    }

    const total = filteredExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    console.log(`\nTotal: $${total.toFixed(2)}`);
  } catch (err) {
    console.log(`Could not summarise Expenses: ${err.message}`);
  }
}

module.exports = summariseExpense;
