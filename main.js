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
            for(let i = 0; i < 4; i++){
                randNumbers[i] = Math.floor(Math.random() * length);
            }
            return randNumbers;
        }
    return randNumber;
}

class Person {
    constructor( gender, age, childfree, job, health, stageDisease ,phobia, hobby, firstFact, secondFact, backpack, actCard ){

    }
}