class Obstacle {
    x;
    y;
    weight;
    height;
    color;
    constructor (x, y, weight, height, color) {
        this.x = x;
        this.y = y;
        this.weight = weight;
        this.height = height;
        this.color = color;

        this.dx = -gameSpeed;
    }

    Update () {
        this.x += this.dx;
        this.Draw();
        this.dx = -gameSpeed;
    }

    Draw () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.weight, this.height);
        ctx.closePath();
    }


}

