 /* Opdracht Objectgeorienteerd programmeren
    Informatica - Emmauscollege Rotterdam
 */

/* ******************************************************* */
/* instellingen om foutcontrole van je code beter te maken */
/* ******************************************************* */
///<reference path="p5.global-mode.d.ts" />
"use strict"


/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
let mensen = []

// var xPosities = [];
// var yPosities = [];
// var speedX = [];
// var speedY = [];
//const BREEDTE = 66.666666;



/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  for (var teller = 0; teller < 420; teller++) {
    // we moeten ze niet te dicht bij de rand tekenen
    // om geen problemen met stuiteren te krijgen
    var ruimteTotRand = 50;
    
    // creëer random positie en snelheid
    var randomX = random(ruimteTotRand, width - ruimteTotRand);
    var randomY = random(ruimteTotRand, height - ruimteTotRand);
    var randomSpeedX = random(-5, 5);
    var randomSpeedY = random(-5, 5);
  
    // maak nieuw mensobject
    var nieuwMens = new Mens(randomX, randomY, randomSpeedX, randomSpeedY, 20);
    
    // voeg mensobject toe aan array
    mensen.push(nieuwMens)
  }
     // 👆
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() { 
  // zwarte achtergrond
  background(0, 0, 0);

  // teken
  noStroke;
  fill(255, 255, 255);

  for(let i = 0; i < mensen.length; i++){
  mensen[i].show()

  // update positie
  mensen[i].update()
  }

  // stuiter evt. tegen de kanten
  // if (mensen[i].xPositie <= 0 || mensen[i].xPositie + BREEDTE >= width) {
  //   mensen[i].speedX = mensen[i].speedX * -1;
  // }

  // if (mensen[i].yPositie <= 0 || mensen[i].yPositie + BREEDTE >= height) {
  //   mensen[i].speedY = mensen[i].speedY * -1;
  // }

}

class Mens {
  x;
  y;
  speedX;
  speedY;
  breedte;

  constructor(newX, newY, newSpeedX, newSpeedY, breedte) {
    this.x = newX;
    this.y = newY;
    this.speedX = newSpeedX;
    this.speedY = newSpeedY;
    this.breedte = breedte
  }

  show() {
    fill(255)
    rect(this.x, this.y, this.breedte, this.breedte)
  }

  update() {
    this.x += this.speedX;
    this.y +=this.speedY;
    
    if(this.x<=0 || this.x >= width-this.breedte){
      this.speedX *= -1
    }
    if(this.y<=0 || this.y >= height-this.breedte){
      this.speedY *= -1
    }
  }
}