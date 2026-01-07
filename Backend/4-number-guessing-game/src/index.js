const fs = require("fs/promises");

const readline = require("node:readline");
const between = require("./utils/between");
const getRandomInt = require("./utils/randomInt");
const { sleep, printWithDelay } = require("./utils/sleep");
const { DIFFICULTY_LEVELS, GAME_CONFIG } = require("./constants/constants");

let targetNumber = getRandomInt(GAME_CONFIG.MAX_NUMBER);
let remainingAttempts = 0;
let selectedLevel;
let guessCount = 0;
let isGameActive = true;

let start;
let end;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function isValidDifficultyChoice(choice) {
  const numChoice = Number(choice);
  return between(numChoice, 1, Object.keys(DIFFICULTY_LEVELS).length);
}

function isValidGuess(guess) {
  const numGuess = Number(guess);
  return between(numGuess, GAME_CONFIG.MIN_NUMBER, GAME_CONFIG.MAX_NUMBER);
}

async function startGame() {
  await displayWelcomeScreen();
  await selectDifficulty();
  await playGame();
  rl.close();
}

async function setScores(difficulty, chances, time) {
  let scores = {};
  try {
    const data = await fs.readFile("./src/data/scores.json", "utf-8");
    scores = JSON.parse(data);
  } catch (err) {
    scores = {
      Easy: null,
      Medium: null,
      Hard: null,
    };
  }

  const score = {
    date: new Date().toLocaleString(),
    chances: chances,
    time: time,
  };

  const prevScore = scores[difficulty];
  if (
    !prevScore ||
    chances < prevScore.chances ||
    (chances === prevScore.chances && time < prevScore.time)
  ) {
    scores[difficulty] = score;
    await fs.writeFile(
      "./src/data/scores.json",
      JSON.stringify(scores, null, 2),
      "utf-8"
    );
  }
}

async function displayWelcomeScreen() {
  await printWithDelay("Welcome to the Number Guessing Game!");
  await printWithDelay(
    `I'm thinking of a number between ${GAME_CONFIG.MIN_NUMBER} and ${GAME_CONFIG.MAX_NUMBER}.`
  );
  await printWithDelay("\nPlease select the difficulty level:");

  const levelNames = Object.keys(DIFFICULTY_LEVELS);
  levelNames.forEach((level, index) => {
    const chances = DIFFICULTY_LEVELS[level];
    console.log(`${index + 1} - ${level} (${chances} chances)`);
  });

  await sleep(GAME_CONFIG.DELAY_MS);
}

async function selectDifficulty() {
  const choice = await askQuestion("\nEnter your choice (1-3): ");

  if (!isValidDifficultyChoice(choice)) {
    console.log("Invalid choice. Please try again.\n");
    await sleep(GAME_CONFIG.DELAY_MS);
    return selectDifficulty();
  }

  const levelNames = Object.keys(DIFFICULTY_LEVELS);
  selectedLevel = levelNames[Number(choice) - 1];
  remainingAttempts = DIFFICULTY_LEVELS[selectedLevel];

  await printWithDelay(
    `\nGreat! You selected ${selectedLevel} difficulty (${remainingAttempts} chances).`
  );
  await printWithDelay("Let's start the game!\n");
}

async function playGame() {
  start = Date.now();

  while (isGameActive && remainingAttempts > 0) {
    const guess = await askQuestion(
      `Guess the number [${remainingAttempts} remaining]: `
    );

    if (!isValidGuess(guess)) {
      console.log(
        `Please enter a number between ${GAME_CONFIG.MIN_NUMBER} and ${GAME_CONFIG.MAX_NUMBER}.\n`
      );
      continue;
    }

    const numGuess = Number(guess);
    guessCount++;

    if (numGuess === targetNumber) {
      await handleCorrectGuess();
      isGameActive = false;
    } else if (numGuess < targetNumber) {
      console.log(`Too low! Try a higher number.\n`);
      remainingAttempts--;
    } else {
      console.log(`Too high! Try a lower number.\n`);
      remainingAttempts--;
    }
  }

  if (isGameActive) {
    await handleGameOver();
  }
}

async function handleCorrectGuess() {
  end = Date.now();

  const timeTakenSeconds = ((end - start) / 1000).toFixed(2);

  setScores(selectedLevel, guessCount, timeTakenSeconds);

  await printWithDelay(
    `\nCorrect! You found the number ${targetNumber} in ${guessCount} guess${
      guessCount !== 1 ? "es" : ""
    }! (Time taken: ${timeTakenSeconds} seconds)`
  );

  await sleep(GAME_CONFIG.DELAY_MS);

  const choice = await askQuestion("Would you like to try again? (yes/no) ");

  if (choice.trim().toLowerCase() === "yes") {
    targetNumber = getRandomInt(GAME_CONFIG.MAX_NUMBER);
    guessCount = 0;
    isGameActive = true;
    await selectDifficulty();
    await playGame();
  } else {
    await printWithDelay("\nThank you for playing! Goodbye!");
    rl.close();
    process.exit(0);
  }
}

async function handleGameOver() {
  await printWithDelay(`\nGame Over! The number was ${targetNumber}.`);
  await printWithDelay(
    `You made ${guessCount} guess${guessCount !== 1 ? "es" : ""}.`
  );

  await sleep(GAME_CONFIG.DELAY_MS);

  const choice = await askQuestion("Would you like to try again? (yes/no) ");

  if (choice.trim().toLowerCase() === "yes") {
    targetNumber = getRandomInt(GAME_CONFIG.MAX_NUMBER);
    guessCount = 0;
    isGameActive = true;
    await selectDifficulty();
    await playGame();
  } else {
    await printWithDelay("\nThank you for playing! Goodbye!");
    rl.close();
    process.exit(0);
  }
}

startGame();
