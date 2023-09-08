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
let actoren = []



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

  for (var teller = 0; teller < 25; teller++) {
    // we moeten ze niet te dicht bij de rand tekenen
    // om geen problemen met stuiteren te krijgen
    var ruimteTotRand = 50;
    
    // creëer random positie en snelheid
    var randomX = random(ruimteTotRand, width - ruimteTotRand);
    var randomY = random(ruimteTotRand, height - ruimteTotRand);
    var randomSpeedX = random(-5, 5);
    var randomSpeedY = random(-5, 5);
  
    // maak nieuw mensobject
    var nieuwMens = new Mens(randomX, randomY, randomSpeedX, randomSpeedY);
    
    // voeg mensobject toe aan array
    actoren.push(nieuwMens)
  }
  for (var teller = 0; teller < 10; teller++) {
    // we moeten ze niet te dicht bij de rand tekenen
    // om geen problemen met stuiteren te krijgen
    var ruimteTotRand = 50;
    
    // creëer random positie en snelheid
    var randomX = random(ruimteTotRand, width - ruimteTotRand);
    var randomY = random(ruimteTotRand, height - ruimteTotRand);
    var randomSpeedX = random(-2, 2);
    var randomSpeedY = random(-2, 2);
  
    // maak nieuw mensobject
    actoren.push(new Kat(randomX, randomY, randomSpeedX, randomSpeedY));
    
    // voeg mensobject toe aan array
  }
  for (var teller = 0; teller < 5; teller++) {
    // we moeten ze niet te dicht bij de rand tekenen
    // om geen problemen met stuiteren te krijgen
    var ruimteTotRand = 50;
    
    // creëer random positie en snelheid
    var randomX = random(ruimteTotRand, width - ruimteTotRand);
    var randomY = random(ruimteTotRand, height - ruimteTotRand);
    var randomSpeedX = random(-5, 5);
    var randomSpeedY = random(-5, 5);
  
    // maak nieuw mensobject
    actoren.push(new Dokter(randomX, randomY, randomSpeedX, randomSpeedY));
  }
  actoren[0].isBesmet = true;
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
  let besmet = 0
  for(let i = 0; i < actoren.length; i++){
  actoren[i].show()

  // update positie
  actoren[i].update()
    if(actoren[i].isBesmet) {
      besmet ++
    }
  }
  text("Besmet: "+besmet, 50, 50);
  text("Niet besmet: "+ (actoren.length-besmet), 50, 100);
  text("Besmetting procent: "+ round(((actoren.length-besmet)/actoren.length) * 100), 50, 150);
  // ga alle actoren langs
for (var i = 0; i < actoren.length; i++) {
  var mensA = actoren[i];
  // ga met mensA opnieuw alle actoren langs om te checken op overlap, behalve met zichzelf
  for (var j = 0; j < actoren.length; j++) {
    var mensB = actoren[j];
    if (mensA != mensB) {
      // check overlap
      var actorenOverlappen = mensA.isOverlappend(mensB);
      if (actorenOverlappen) {
        // check of er een besmetting optreedt
if (mensA.isBesmet || mensB.isBesmet) {
  if (mensA instanceof Dokter || mensB instanceof Dokter) {
    // minimaal één van de mensen is dokter,
    // dus ze worden / blijven beide gezond
    mensA.isBesmet = false;
    mensB.isBesmet = false;
  }
  else {
    // geen van de mensen is dokter, dus
    // als er één besmet is, wordt ze allebei besmet
    // als ze allebei besmet zijn, verandert deze code niets.
    mensA.isBesmet = true;
    mensB.isBesmet = true;
  }  
}
      }
    }
  }
}

}

class Actor {
  constructor(x, y, speedX, speedY, breedte = 50, isBesmet = false){
    this.x = x
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.breete= breedte;
    this.isBesmet = isBesmet;
  }

  show() {
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

  isOverlappend(andereMens) {
    // zet teruggeefwaarde standaard op false
    var overlappend = false;
  
    // zet teruggeefwaarde op true als er een overlap is
    if ( (this.x >= andereMens.x &&
          this.x <= andereMens.x + andereMens.breedte &&
          this.y >= andereMens.y &&
          this.y <= andereMens.y + andereMens.breedte)
            ||
          (this.x+this.breedte >= andereMens.x &&
          this.x+this.breedte <= andereMens.x + andereMens.breedte &&
          this.y >= andereMens.y &&
          this.y <= andereMens.y + andereMens.breedte)
            ||
          (this.x >= andereMens.x &&
          this.x <= andereMens.x + andereMens.breedte &&
          this.y+this.breedte >= andereMens.y &&
          this.y+this.breedte <= andereMens.y + andereMens.breedte)
            ||
          (this.x+this.breedte >= andereMens.x &&
          this.x+this.breedte <= andereMens.x + andereMens.breedte &&
          this.y+this.breedte >= andereMens.y &&
          this.y+this.breedte <= andereMens.y + andereMens.breedte)
          /* VUL HIER ZELF LATER AAN VOOR DE ANDERE HOEKEN*/
        ) {
  
      overlappend = true;
    }
  
    // stuur de teruggeefwaarde terug
    return overlappend;
  }
}

class Mens extends Actor {
  show() {
    fill(255)
    if(this.isBesmet) {
      fill(255, 0, 0)
    }
    this.breedte = 50
    super.show()
  }
}

class Dokter extends Mens {
  show() {
    super.show()

    strokeWeight(5);
    stroke(255, 0, 0);    // rood
    line(this.x + this.breedte / 2, this.y, this.x + this.breedte / 2, this.y + this.breedte);
    line(this.x, this.y + this.breedte / 2, this.x + this.breedte, this.y + this.breedte / 2);
    strokeWeight(1);
    stroke(0);
  }
}

class Kat extends Actor {
   show() {
    fill(0, 0, 255)
    if(this.isBesmet) {
      fill(255, 75, 75)
    }
    this.breedte = 10;
    super.show()
  }
}