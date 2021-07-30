class Player {
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

        this.dy = 0;
        this.jumpForce = 15;
        this.originalHeight = height;
        this.grounded = false;
        this.jumpTimer = 0;
    }

    Animate () {
        // Jump
        if (keys['Space'] || keys['KeyW']) {
            this.Jump();
        } else {
            this.jumpTimer = 0;
        }

        if (keys['ShiftLeft'] || keys['KeyS']) {
            this.height = this.originalHeight / 2;
        } else {
            this.height = this.originalHeight;
        }

        this.y += this.dy;

        // Gravity: Trọng lực
        if (this.y + this.height < canvas.height) {
            this.dy += gravity;
            this.grounded = false;
        } else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.height;
        }

        this.Draw();
    }

    Jump () {
        if (this.grounded && this.jumpTimer === 0) {
            this.jumpTimer = 1;
            this.dy = -this.jumpForce;
        } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++;
            this.dy = -this.jumpForce - (this.jumpTimer / 50);
        }
    }

    Draw () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.weight, this.height);
        ctx.closePath();

    }
}