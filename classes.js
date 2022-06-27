'use strict';

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

module.exports = { Bunker, Person };