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
const gender = [];
const childfree = [];
const age = [];
const job = [];
const health = [];
const stageDisease = [];
const phobia = [];
const hobby = [];
const firstFact = [];
const secondFact = [];
const backpack = [];
const catastrophe = [];
const prossAndCons = [];
const actCard = [];
const population = [];
const square = [];