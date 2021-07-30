const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Variables
let score;
let scoreText;
let highScore;
let highScoreText;
let player;
let gravity;
let obstacles = [];
let gameSpeed;
let keys = {};


// Event Listeners
document.addEventListener('keydown', function (evt) {
    keys[evt.code] = true;
});
document.addEventListener('keyup', function (evt) {
    keys[evt.code] = false;
});


// Game Functions
function SpawnObstacle () {
    let size = RandomIntInRange(20, 70);
    let type = RandomIntInRange(0, 1);
    let obstacle = new Obstacle(canvas.width + size, canvas.height - size, size, size, '#2484E4');

    if (type === 1) {
        obstacle.y -= player.originalHeight - 10;
    }
    obstacles.push(obstacle);
}


function RandomIntInRange (min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function Start () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.font = "20px sans-serif";

    gameSpeed = 3;
    gravity = 1;

    score = 0;
    highScore = 0;
    if (localStorage.getItem('highScore')) {
        highScore = localStorage.getItem('highScore');
    }

    player = new Player(25, 0, 50, 50, '#FF5858');

    scoreText = new Text("Score: " + score, 25, 25, "left", "#212121", "20");
    highScoreText = new Text("High Score: " + highScore, canvas.width - 25, 25, "right", "#212121", "20");

    requestAnimationFrame(Update);
}

let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;
function Update () {
    requestAnimationFrame(Update);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    spawnTimer--;
    if (spawnTimer <= 0) {
        SpawnObstacle();
        console.log(obstacles);
        spawnTimer = initialSpawnTimer - gameSpeed * 8;

        if (spawnTimer < 60) {
            spawnTimer = 60;
        }
    }

    // Spawn Enemies
    for (let i = 0; i < obstacles.length; i++) {
        let o = obstacles[i];

        if (o.x + o.weight < 0) {
            obstacles.splice(i, 1);
        }

        if ( (player.x < o.x + o.weight) && (player.x + player.weight > o.x) && (player.y < o.y + o.height) && (player.y + player.height > o.y) ) {
            obstacles = [];
            score = 0;
            spawnTimer = initialSpawnTimer;
            gameSpeed = 3;
            window.localStorage.setItem('highScore', highScore);
        }

        o.Update();
    }

    player.Animate();

    score++;
    scoreText.text = "Score: " + score;
    scoreText.Draw();

    if (score > highScore) {
        highScore = score;
        highScoreText.text = "High Score: " + highScore;
    }

    highScoreText.Draw();

    gameSpeed += 0.003;
}

Start();