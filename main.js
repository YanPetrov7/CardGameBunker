'use strict';

const fs = require('fs');
const readLine = require('readline-sync');

const randomizer = num => {
	return Math.floor(Math.random() * num);
};

const rand = (arr, size) => {
		const LENGTH = arr.length;
		if(size !== undefined){
			const randNumbers = Array(size);
			for(let i = 0; i <= size; i++){
				randNumbers[i] = randomizer(LENGTH);
			}
			return randNumbers;
		}
		const randNumber = randomizer(LENGTH);
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
	const LINE_SEPARATOR = ' ';
	const arr = str.split(LINE_SEPARATOR);
	return arr;
};

const filler = (begin, end) => {
	const AMOUNT_ELEMS = end - begin;
	const arr = Array(AMOUNT_ELEMS);
	for(let i = 0, j = begin; i <= AMOUNT_ELEMS, j <= end; i++, j++){
		arr[i] = j;
	}
	return arr;
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
		.replace('[', '')
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
		this.prossAndCons = choice(rand(prossAndCons, 4), prossAndCons); 
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
const age = filler(18, 70);;
const stageDisease = filler(20, 100);
const population = filler(1, 20);
const square = filler(100, 1000);

const amount = question('How many players will play today?');
writePlayers(amount, players, 'What is player name?');

const bunker = new Bunker(catastrophe, population, square, prossAndCons);
console.dir(bunker);

for(let player of players){
	let cards = new Person(gender, age, childfree, job, health, stageDisease, phobia, hobby, firstFact, secondFact, backpack, actCard);
	writeFile('texts', player, 'txt', cards);

	cards.usePopUsedElem();
}
