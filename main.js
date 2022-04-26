'use strict';

const fs = require('fs');
const readLine = require('readline-sync');

const rand = arr => {
	const length = arr.length;
	let randNumber = Math.floor(Math.random() * length);
	if(arr == prossAndCons){
		let randNumbers = [];
		for(let i = 0; i < arr.length; i++){
			randNumbers[i] = Math.floor(Math.random() * length);
		}
		return randNumbers;
	}
	return randNumber;
};

const choice = (arr, target) => {
	let result = [];
	for(let elem of arr){
		if(!result.includes(target[elem])){
			result.push(target[elem]);
		}
	}
	return result;
};

const toArr = (str) => {
	const arr = str.split(' ');
	return arr;
};

const filler = (arr, n, m) => {
	for(let i = n; i <= m; i++){
		arr.push(i);
	}
};

const question = str => {
	const LINE_SEPARATOR = '\n';
	return readLine.question(`${str} ${LINE_SEPARATOR}`);
};

const writePlayers = (amount, arr, str) => {
	for(let i = 0; i < amount;i++){
		let elem = question(str);
		arr.push(elem);
	}
};

const toStrObj = obj => {
	const str = JSON.stringify(obj);
	return str
		.replace(/,/g, '\n')
		.replace('{', '')
		.replace('}', '')
		.replace(/"/g, '')
		.replace(/_/g, ' ')
		.replace(/:/g, ': ');
};

const writeFile = (folder, name, format, obj) => {
	fs.writeFileSync(`${folder}/${name}.${format}`, toStrObj(obj));
};

const popUsedElem = (arr, index) => {
	const length = arr.length;
	if(index == (length - 1)){
		arr.splice(index,index);
		return arr;
	}
	delete arr[index];
	arr[index] = arr.pop();
	return arr;
};

class Bunker {
	constructor(catastrophe, population, square, prossAndCons){
		this.catastrophe = catastrophe[rand(catastrophe)];
		this.population = population[rand(population)];
		this.square = square[rand(square)];
		this.prossAndCons = choice(rand(prossAndCons), prossAndCons); 
	}
}

class Person {
	constructor( gender, age, childfree, job, health, stageDisease ,phobia, hobby, firstFact, secondFact, backpack, actCard ){
		this.gender = gender[rand(gender)];
		this.age = age[rand(age)];
		this.childfree = childfree[rand(childfree)];
		this.job = job[rand(job)];
		this.health = health[rand(health)];
		this.stageDisease = stageDisease[rand(stageDisease)] + '%';
		this.phobia = phobia[rand(phobia)];
		this.hobby = hobby[rand(hobby)];
		this.firstFact = firstFact[rand(firstFact)];
		this.secondFact = secondFact[rand(secondFact)];
		this.backpack = backpack[rand(backpack)];
		this.actCard = actCard[rand(actCard)];
	}

	usePopUsedElem() {
		popUsedElem(job, job.indexOf(this.job));
		popUsedElem(health, health.indexOf(this.health));
		popUsedElem(phobia, phobia.indexOf(this.phobia));
		popUsedElem(hobby, hobby.indexOf(this.hobby));
		popUsedElem(firstFact, firstFact.indexOf(this.firstFact));
		popUsedElem(secondFact, secondFact.indexOf(this.secondFact));
		popUsedElem(backpack, backpack.indexOf(this.backpack));
		popUsedElem(actCard, actCard.indexOf(this.actCard));
	}
}

const readFile = fs.readFileSync('text.txt', 'utf8');
const arrText = readFile.split('\n');

const players = [];
const gender = ['male','female'];
const childfree = [true, false];
const job = toArr(arrText[0]);
const health = toArr(arrText[1]);
const phobia = toArr(arrText[2]);
const hobby = toArr(arrText[3]);
const firstFact = toArr(arrText[4]);
const secondFact = toArr(arrText[4]);
const backpack = toArr(arrText[5]);
const catastrophe = toArr(arrText[6]);
const prossAndCons = toArr(arrText[7]);
const actCard = toArr(arrText[8]);
const age = [];
const stageDisease = [];
const population = [];
const square = [];

filler(age, 18, 70);
filler(stageDisease, 20, 100);
filler(population, 1, 20);
filler(square, 100, 1000);

const amount = question('How many players will play today?');
writePlayers(amount, players, 'What is player name?');

const bunker = new Bunker(catastrophe, population, square, prossAndCons);
console.dir(bunker);

for(let player of players){
	let cards = new Person(gender, age, childfree, job, health, stageDisease, phobia, hobby, firstFact, secondFact, backpack, actCard);
	writeFile('texts', player, 'txt', cards);

	cards.usePopUsedElem();
}