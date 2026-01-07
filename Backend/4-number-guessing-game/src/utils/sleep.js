const { GAME_CONFIG } = require("../constants/constants");

function sleep(m = GAME_CONFIG.DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, m));
}

async function printWithDelay(message, delayMs = GAME_CONFIG.DELAY_MS) {
  console.log(message);
  await sleep(delayMs);
}

module.exports = { sleep, printWithDelay };
