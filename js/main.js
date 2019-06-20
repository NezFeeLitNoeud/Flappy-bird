let canva = document.getElementById("flappyBird");
let ctx = canva.getContext("2d");

let flappy = new Image();
let background = new Image();
let bottom = new Image();
let tuyauxH = new Image();
let tuyauxB = new Image();

flappy.src = 'images/bird.png';
background.src = 'images/bg.png';
bottom.src = 'images/fg.png';
tuyauxH.src = 'images/tuyauxH.png';
tuyauxB.src = 'images/tuyauxB.png';

let constant;

class Decors {
	constructor(canvas, context, flap, bg, bot, haut, bas){
		this.canvas = canva;
		this.context = ctx;
		this.flap = flappy;
		this.bg = background;
		this.bot = bottom;
		this.haut = tuyauxH;
		this.bas = tuyauxB;
	}
}

const visu = new Decors;

class Flappy extends Decors {
	constructor(gap, flappyX, flappyY, gravite, score, bg, haut, bas){
		super(bg, haut, bas)
		this.gap = 90;
		this.flappyX = 10;
		this.flappyY = 150;
		this.gravite = 1.5;
		this.score = 0;
		this.bas;
	}

	moveUp(){
		this.flappyY -= 25;
		}
}

const oiseau = new Flappy;

document.addEventListener("keydown", function(){
	// Monte de 25px en hauteur à chaque presse de clavier
	oiseau.moveUp();
})

let tuyaux = [];
// console.log(tuyaux);
tuyaux[0] = {
	x: canva.width,
	y:0
}

// console.log(tuyaux);


// function moveUp(){
//    oiseau.flappyY -= 25;
//    console.log(oiseau.flappyY);
// }

// document.addEventListener("keydown", movingUp);

// function movingUp(){
// 	oiseau.flappyY += 25;
// 	console.log(oiseau.flappyY)
// }

// document.getElementById("btn").addEventListener("click", draw());

	function draw(){
		
    ctx.drawImage(visu.bg,0,0);

		for(let i = 0; i < tuyaux.length; i++){
			constant = oiseau.haut.height + oiseau.gap;
			// x = margin-left
			// y = margin-top
			ctx.drawImage(visu.haut, tuyaux[i].x, tuyaux[i].y);
			ctx.drawImage(visu.bas, tuyaux[i].x, tuyaux[i].y + constant);
			tuyaux[i].x--;

			if(tuyaux[i].x == 100){
				tuyaux.push({
					x: canva.width,
					y: Math.floor(Math.random()*oiseau.haut.height)-oiseau.haut.height

				})
			}

			if(oiseau.flappyX + oiseau.flap.width >= tuyaux[i].x && oiseau.flappyX <= tuyaux[i].x + tuyauxH.width && (oiseau.flappyY <= tuyaux[i].y + tuyauxH.height || oiseau.flappyY + oiseau.flap.height >= tuyaux[i].y + constant) || oiseau.flappyY >= 425){
             location.reload(); // reload the page
             // console.log("perdu")
        }
		}
    // if(oiseau.flappyY >= 425){
    // 	location.reload();
    // }
    ctx.drawImage(visu.flap, oiseau.flappyX, oiseau.flappyY);
    oiseau.flappyY += oiseau.gravite


    ctx.drawImage(visu.bot, 0 , 450)

    requestAnimationFrame(draw);
}

draw()