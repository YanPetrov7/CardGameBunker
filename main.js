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