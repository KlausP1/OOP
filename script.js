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
var xPosities = [];
var yPosities = [];
var speedX = [];
var speedY = [];
const BREEDTE = 66.666666;



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

  // initialiseer waarden
  for(let i = 0; i < 5; i++){
  xPosities.push(width / 2);               // midden van de breedte van het canvas
  yPosities.push(height / 2);              // midden van de hoogte van het canvas
  speedX.push(random(-10, 10));      // random waarde tussen -5 en 5
  speedY.push(random(-10, 10)); 
  console.log(xPosities.length) 
  }    // 👆
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

  for(let i = 0; i < xPosities.length; i++){
  rect(xPosities[i], yPosities[i], BREEDTE, BREEDTE);

  // update positie
  xPosities[i] = xPosities[i] + speedX[i];
  yPosities[i] = yPosities[i] + speedY[i];

  // stuiter evt. tegen de kanten
  if (xPosities[i] <= 0 || xPosities[i] + BREEDTE >= width) {
    speedX[i] = speedX[i] * -1;
  }

  if (yPosities[i] <= 0 || yPosities[i] + BREEDTE >= height) {
    speedY[i] = speedY[i] * -1;
  }
}

}
