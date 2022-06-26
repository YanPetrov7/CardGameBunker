'use strict';

const fs = require('fs');

const randomizer = (num) => Math.floor(Math.random() * num);

const random = (arr, size) => {
  const length = arr.length;
  if (size) {
    const randNumbers = Array(size);
    for (let i = 0; i < size; i++) {
      randNumbers[i] = randomizer(length);
    }
    return randNumbers;
  }
  const randNumber = randomizer(length);
  return randNumber;
};

const randObjValues = (obj) => {
  const values = Object.values(obj);
  const keys = Object.keys(obj);
  const length = keys.length;
  const result = {};
  for (let i = 0; i < length; i++) {
    const value = values[i];
    const key = keys[i];
    if (key === 'prossAndCons') {
      result[key] = choice(random(value, PROSS_AND_CONS_SIZE), value);
    } else result[key] = value[random(value)];
  }
  return result;
};

const choice = (arr, target) => {
  const result = [];
  for (const elem of arr) {
    if (!result.includes(target[elem])) {
      result.push(target[elem]);
    }
  }
  return result;
};

const toArr = (str) => {
  const lineSeparator = ' ';
  const arr = str.split(lineSeparator);
  return arr;
};

const filler = (limits) => {
  const result = [];
  for (const property in limits) {
    const value = limits[property];
    const begin = value[0];
    const end = value[1];
    const amountElems = end - begin;
    const arr = [];
    for (let i = 0, j = begin; i <= amountElems, j <= end; i++, j++) {
      arr[i] = j;
    }
    result.push(arr);
  }
  return result;
};

const toStrObj = (obj, replaced) => {
  const str = JSON.stringify(obj);
  return str
    .replaceAll(replaced.toNothing, '')
    .replaceAll(replaced.toSpace, ' ')
    .replaceAll(replaced.toLineTranslator, '\n');
};

const readFile = (folder, format, separator, name) => {
  const text = fs.readFileSync(`${folder}/${name}.${format}`, 'utf-8');
  if (separator) {
    return text.split(separator);
  }
  return text;
};

const writeFile = (folder, name, format, obj) => {
  fs.writeFileSync(`${folder}/${name}.${format}`, toStrObj(obj, replaced));
};

const popUsedElem = (allValues, targetValues, exeptionLenght) => {
  const arrs = Object.values(allValues);
  const targets = Object.values(targetValues);
  for (let i = 0; i < arrs.length; i++) {
    const arr = arrs[i];
    const length = arr.length;
    if (length > exeptionLenght) {
      const target = targets[i];
      const index = arr.indexOf(target);
      if (index === (length - 1)) {
        arr.splice(index, index);
      }
      delete arr[index];
      arr[index] = arr.pop();
    }
  }
};

const createGame = (amount, players) => {
  const bunker = new Bunker(randObjValues(characters));
  writeFile('texts/players', 'Bunker', 'txt', bunker);
  console.dir(bunker);
  for (const player of players) {
    const cards = new Person(randObjValues(featurs));
    writeFile('texts/players', player, 'txt', cards);
    popUsedElem(featurs, cards, amount);
  }
};

const steal = (robber, victim, targetNum) => {
  const people = [robber, victim];
  const [robberText,
    victimText] = people.map(person => readFile('texts/players', 'txt', '\n', person));
  const robberCharacter = robberText[targetNum];
  const victimCharacter = victimText[targetNum];
  robberText[targetNum] = victimCharacter;
  victimText[targetNum] = robberCharacter;
  writeFile('texts/players', robber, 'txt', robberText);
  writeFile('texts/players', victim, 'txt', victimText);
};

const show = (victim, targetNum) => {
  const victimText = readFile('texts/players', 'txt', '\n', victim);
  const victimCharacter = victimText[targetNum];
  console.log(victimCharacter);
};

const reroll = (person, targetNum) => {
  const featursKeys = Object.keys(featurs);
  const featursValues = Object.values(featurs);
  const arr = featursValues[targetNum];
  const key = featursKeys[targetNum];
  const personText = readFile('texts/players', 'txt', '\n', person);
  personText[targetNum] = `${key}:${arr[random(arr)]}`;
  writeFile('texts/players', person, 'txt', personText);
};

class Bunker {
  constructor (obj) {
    this.catastrophe = obj.catastrophe;
    this.population = obj.population;
    this.square = obj.square;
    this.prossAndCons = obj.prossAndCons;
  }
};

class Person {
  constructor (obj) {
    this.gender = obj.gender;
    this.age = obj.age;
    this.childfree = obj.childfree;
    this.job = obj.job;
    this.health = obj.health;
    this.stageDisease = obj.stageDisease;
    this.phobia = obj.phobia;
    this.hobby = obj.hobby;
    this.firstFact = obj.firstFact;
    this.secondFact = obj.secondFact;
    this.backpack = obj.backpack;
    this.actCard = obj.actCard;
  }
};

const text = readFile('texts', 'txt', '\n', 'text');
const splitedText = text.map(text => toArr(text));

const numLimits = {
  ageLimits: [18, 70],
  stageDiseaseLimits: [10, 100],
  populationLimits: [1, 20],
  squareLimits: [100, 1000]
};

const fillerNumbers = filler(numLimits);

const [gender,
  childfree,
  job,
  health,
  phobia,
  hobby,
  firstFact,
  secondFact,
  backpack,
  actCard,
  catastrophe,
  prossAndCons] = splitedText;

const [age, stageDisease, population, square] = fillerNumbers;

const featurs = {
  gender,
  age,
  childfree,
  job,
  health,
  stageDisease,
  phobia,
  hobby,
  firstFact,
  secondFact,
  backpack,
  actCard
};

const replaced = {
  toNothing: '"',
  toSpace: '_',
  toLineTranslator: ','
};

const characters = { catastrophe, population, square, prossAndCons };

const PROSS_AND_CONS_SIZE = 4;

module.exports = { createGame, steal, show, reroll };
