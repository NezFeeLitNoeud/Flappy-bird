let canvaBird = document.getElementById("flappyBird");
let ctxBird = canvaBird.getContext("2d");

let flappy = new Image();
let bckgFlappy = new Image();
let bottomFlappy = new Image();
let tuyauxHFlappy = new Image();
let tuyauxBFlappy = new Image();

flappy.src = 'images/bird.png';
bckgFlappy.src = 'images/bg.png';
bottomFlappy.src = 'images/fg.png';
tuyauxHFlappy.src = 'images/tuyauxH.png';
tuyauxBFlappy.src = 'images/tuyauxB.png';

let constantFlappy;

class DecorsFlappy {
    constructor(canvasF, contextF, flapF, bgF, botF, hautF, basF) {
        this.canvasF = canvaBird;
        this.contextF = ctxBird;
        this.flapF = flappy;
        this.bgF = bckgFlappy;
        this.botF = bottomFlappy;
        this.hautF = tuyauxHFlappy;
        this.basF = tuyauxBFlappy;
    }
}

const visuFlappy = new DecorsFlappy;

class Flappy extends DecorsFlappy {
    constructor(gapF, flappyFX, flappyFY, graviteF, scoreF, bgF, hautF, basF) {
        super(bgF, hautF, basF)
        this.gapF = 100;
        this.flappyFX = 10;
        this.flappyFY = 150;
        this.graviteF = 1.5;
        this.scoreF = 0;
    }

    moveUp() {
        this.flappyFY -= 25;
    }
}

const flapp = new Flappy;

document.addEventListener("keydown", function() {
    // Monte de 25px en hauteur à chaque presse de clavier
    flapp.moveUp();

})

let tuyauxFlappy = []; 
tuyauxFlappy[0] = {
    x:canvaBird.width,
    y:0
}

function drawFlappy() {
    ctxBird.drawImage(visuFlappy.bgF, 0, 0);

    for (let i = 0; i < tuyauxFlappy.length; i++) {

        constantFlappy = flapp.hautF.height + flapp.gapF;
        // x = margin-left
        // y = margin-top
        ctxBird.drawImage(visuFlappy.hautF, tuyauxFlappy[i].x, tuyauxFlappy[i].y);
        ctxBird.drawImage(visuFlappy.basF, tuyauxFlappy[i].x, tuyauxFlappy[i].y + constantFlappy);
        tuyauxFlappy[i].x--;
       

        if (tuyauxFlappy[i].x == 100) {
            tuyauxFlappy.push({
                x: canvaBird.width,
                y: Math.floor(Math.random() * flapp.hautF.height) - flapp.hautF.height
            })
        }
        if (flapp.flappyFX + flapp.flapF.width >= tuyauxFlappy[i].x && flapp.flappyFX <= tuyauxFlappy[i].x + tuyauxHFlappy.width && (flapp.flappyFY <= tuyauxFlappy[i].y + tuyauxHFlappy.height || flapp.flappyFY + flapp.flapF.height >= tuyauxFlappy[i].y + constantFlappy) || flapp.flappyFY >= 425) {
            location.reload(); // reload the page
        }

        if(tuyauxFlappy[i].x == 5){
            flapp.scoreF++;
        }
    }
    ctxBird.drawImage(visuFlappy.flapF, flapp.flappyFX, flapp.flappyFY);
    // Fait tomber l'oiseau
    flapp.flappyFY += flapp.graviteF
    ctxBird.drawImage(visuFlappy.botF, 0, 450)

    ctxBird.fillStyle = "#000";
    ctxBird.font = "20px Verdana";
    ctxBird.fillText("Score : "+flapp.scoreF,10,canvaBird.height-20);

 requestAnimationFrame(drawFlappy);

}
 document.getElementById("bas").addEventListener("click", drawFlappy)