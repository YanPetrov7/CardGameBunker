'use strict';

const fs = require('fs');
const { setMaxListeners } = require('process');
const readLine = require('readline');
const { start } = require('repl');
const { resourceLimits } = require('worker_threads');
const { createGame } = require('./main.js');

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

const question = (str) => new Promise((answer) => rl.question(str, answer));

console.log('Greatings, use \'help\' to see a list of comands');

rl.prompt();

const commands = {
    help() {
      const info = fs.readFileSync('info.txt', 'utf-8');
      console.log(info);
      rl.prompt();
    },
    rules() {
      const rules = fs.readFileSync('rules.txt', 'utf-8');
      console.log(rules);
      rl.prompt();
    },
    async start() {
      console.log('Welcome to the card game Bunker!');
      const players = [];
      const amount = await question('How many players will play: \n');
      for (let i = 0; i < amount; i++){
        const player = await question('What is players name: \n');
        players.push(player);
      }
      createGame(amount, players);
      rl.prompt();
    },
    exit() {
      process.exit();
    }
}

rl.on('line', (input) => {
    input = input.trim();
    const command = commands[input];
    if (command) command();
    else console.error(`Unknown comand: '${input}'. Use 'help' for see a list of commands `);
});
