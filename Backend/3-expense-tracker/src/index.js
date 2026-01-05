#!/usr/bin/env node

const { Command } = require("commander");

const addExpense = require("./commands/add");
const deleteExpense = require("./commands/delete");
const updateExpense = require("./commands/update");
const listExpense = require("./commands/list");
const summariseExpenses = require("./commands/summary");

const program = new Command();

program.name("expense");

program
  .command("add")
  .description("Add a new expense to the tracker")
  .option("-d, --description <string>", "Expense description")
  .option("-a, --amount <number>", "Expense amount in dollars")
  .action((options) => {
    addExpense(options);
  });

program
  .command("delete")
  .description("Delete an expense from the tracker")
  .option("-i, --id <number>", "Expense ID to delete")
  .action((options) => {
    deleteExpense(options);
  });

program
  .command("update")
  .description("Update an expense in the tracker")
  .option("-i, --id <number>", "Expense ID to update")
  .option("-d, --description <string>", "New expense description")
  .option("-a, --amount <number>", "New expense amount in dollars")
  .action((options) => {
    updateExpense(options);
  });

program
  .command("list")
  .description("List all expenses in the tracker")
  .action(() => {
    listExpense();
  });

program
  .command("summary")
  .description("Show a summary of all expenses")
  .option("-m, --month <number>", "New expense description")
  .option("-y, --year <number>", "New expense amount in dollars")
  .action((options) => {
    summariseExpenses(options);
  });

program.parse();
