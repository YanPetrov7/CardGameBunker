'use strict';

const fs = require('fs');
const readLine = require('readline-sync');

const readFile = fs.readFileSync('text.txt', 'utf8');
const arrText = readFile.split('\n');

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
}

const choice = (arr, target) => {
    let result = [];
    for(let elem of arr){
        if(!result.includes(target[elem])){
            result.push(target[elem]);
        }
    }
    return result;
}

const toArr = (str, separator) => {
    const arr = str.split(separator);
    return arr;
}

const filler = (arr, n, m) => {
    for(let i = n; i <= m; i++){
        arr.push(i);
    }
}

const readFile = fs.readFileSync('text.txt', 'utf8');
const arrText = toArr(readLine, '\n');

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
}

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