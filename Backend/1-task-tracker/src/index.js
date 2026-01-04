#!/usr/bin/env node
const addTask = require("./commands/add.js");
const removeTask = require("./commands/delete.js");
const updateTask = require("./commands/update.js");
const listTask = require("./commands/list.js");
const markTask = require("./commands/mark.js");

const args = process.argv.slice(2);

// Gets the first argument after slicing
switch (args[0]) {
  case "add":
    addTask(args[1]);
    break;
  case "delete":
    removeTask(args[1]);
    break;
  case "update":
    updateTask(args[1], args[2]);
    break;
  case "list":
    listTask(args[1]);
    break;
  case "mark":
    markTask(args[1], args[2]);
    break;
  default:
    console.log(`command not found: ${args[0]}`);
    break;
}
