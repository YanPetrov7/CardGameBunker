'use strict';

const fs = require('fs');
const readLine = require('readline-sync');

const randomizer = num => Math.floor(Math.random() * num);

const rand = (arr, size) => {
  const LENGTH = arr.length;
  if (size) {
    const randNumbers = Array(size);
    for (let i = 0; i < size; i++) {
      randNumbers[i] = randomizer(LENGTH);
    }
    return randNumbers;
  }
  const randNumber = randomizer(LENGTH);
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
  const LINE_SEPARATOR = ' ';
  const arr = str.split(LINE_SEPARATOR);
  return arr;
};

const filler = (begin, end) => {
  const AMOUNT_ELEMS = end - begin;
  const arr = Array(AMOUNT_ELEMS);
  for (let i = 0, j = begin; i <= AMOUNT_ELEMS, j <= end; i++, j++) {
    arr[i] = j;
  }
  return arr;
};

const question = str => {
  const LINE_SEPARATOR = '\n';
  return readLine.question(`${str} ${LINE_SEPARATOR}`);
};

const writePlayers = (amount, arr, str) => {
  for (let i = 0; i < amount; i++) {
    const elem = question(str);
    arr.push(elem);
  }
};

const toStrObj = obj => {
  const str = JSON.stringify(obj);
  return str
    .replace(/["{}]/g, '')
    .replace(/[_]/g, ' ')
    .replace(/,/g, '\n');
};

const readFile = (path, separator) => {
  const text = fs.readFileSync(path, 'utf-8');
  if (separator) {
    return text.split(separator);
  }
  return text;
};

const writeFile = (folder, name, format, obj) => {
  fs.writeFileSync(`${folder}/${name}.${format}`, toStrObj(obj));
};

const getValues = obj => Object.values(obj);

const popUsedElem = (allValues, targetValues, exeptionLenght) => {
  const arrs = getValues(allValues);
  const targets = getValues(targetValues);
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

const useFuncArr = (func, arr) => {
  const res = [];
  for (const elem of arr) {
    res.push(func(elem));
  }
  return res;
};

class Bunker {
  constructor (obj) {
    this.catastrophe = obj.catastrophe[rand(obj.catastrophe)];
    this.population = obj.population[rand(obj.population)] + '%';
    this.square = obj.square[rand(obj.square)];
    this.prossAndCons = choice(rand(obj.prossAndCons, prossAndConsSize), obj.prossAndCons);
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

const text = readFile('text.txt', '\n');
const splitedText = useFuncArr(toArr, text);

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

const characters = { catastrophe, population, square, prossAndCons };

const players = [];
const prossAndConsSize = characters.prossAndCons.length;

const amount = question('How many players will play today?');
writePlayers(amount, players, 'What is player name?');

const bunker = new Bunker(characters);
console.dir(bunker);

for (const player of players) {
  const cards = new Person(featurs);
  console.log(Object.values(cards));
  writeFile('texts', player, 'txt', cards);
  popUsedElem(featurs, cards, amount);
}
