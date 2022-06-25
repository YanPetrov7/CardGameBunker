'use strict';

const fs = require('fs');
const { format } = require('path');
const readLine = require('readline-sync');

const randomizer = (num) => Math.floor(Math.random() * num);

const rand = (arr, size) => {
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

const filler = (begin, end) => {
  const amountElems = end - begin;
  const arr = Array(amountElems);
  for (let i = 0, j = begin; i <= amountElems, j <= end; i++, j++) {
    arr[i] = j;
  }
  return arr;
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
  const bunker = new Bunker(characters);
  console.dir(bunker);
  for (const player of players) {
    const cards = new Person(featurs);
    writeFile('texts', player, 'txt', cards);
    popUsedElem(featurs, cards, amount);
  }
};

const steal = (robber, victim, targetNum) => {
  const people = [robber, victim];
  const [robberText,
     victimText] = people.map(person => readFile('texts', 'txt', '\n', person));
  const robberCharacter = robberText[targetNum];
  const victimCharacter = victimText[targetNum];
  robberText[targetNum] = victimCharacter;
  victimText[targetNum] = robberCharacter;
  writeFile('texts', robber, 'txt', robberText);
  writeFile('texts', victim, 'txt', victimText);
};

const show = (victim, targetNum) => {
  const victimText = readFile('texts', 'txt', '\n', victim);
  console.log(victimText[targetNum]);
}

class Bunker {
  constructor (obj) {
    this.catastrophe = obj.catastrophe[rand(obj.catastrophe)];
    this.population = obj.population[rand(obj.population)] + '%';
    this.square = obj.square[rand(obj.square)];
    this.prossAndCons = choice(rand(obj.prossAndCons, PROSS_AND_CONS_SIZE), obj.prossAndCons);
  }
};

class Person {
  constructor (obj) {
    this.gender = obj.gender[rand(obj.gender)];
    this.age = obj.age[rand(obj.age)] + ' years';
    this.childfree = obj.childfree[rand(obj.childfree)];
    this.job = obj.job[rand(obj.job)];
    this.health = obj.health[rand(obj.health)];
    this.stageDisease = obj.stageDisease[rand(obj.stageDisease)] + '%';
    this.phobia = obj.phobia[rand(obj.phobia)];
    this.hobby = obj.hobby[rand(obj.hobby)];
    this.firstFact = obj.firstFact[rand(obj.firstFact)];
    this.secondFact = obj.secondFact[rand(obj.secondFact)];
    this.backpack = obj.backpack[rand(obj.backpack)];
    this.actCard = obj.actCard[rand(obj.actCard)];
  }
};

const text = readFile('texts', 'txt', '\n', 'text');
const splitedText = text.map(elem => toArr(elem));

const fillerNumbers = [filler(18, 80), filler(10, 100), filler(1, 20), filler(100, 1000)];

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

module.exports = { createGame, steal, show };
