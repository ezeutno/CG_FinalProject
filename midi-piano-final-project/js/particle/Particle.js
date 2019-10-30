class Particle {

    constructor() {
        this.radius = Math.random() * 3;
        this.position = this.getRandomPosition();
        this.speed = 2;
        this.velocity = new Vector(Math.random() - .5, Math.random() - .5);
    }

    update() {
        const v = new Vector(this.velocity.x * this.speed, this.velocity.y * this.speed);

        this.position.add(v);

        this.checkOut();
    }

    checkOut() {
        const newPos = {
            x_left: this.radius,
            x_right: canvas.width - this.radius,
            y_top: this.radius,
            y_bottom: canvas.height - this.radius
        };

        if (this.position.x > canvas.width) {
            this.position.x = newPos.x_left;
            this.position.y = (Math.random() * canvas.height - this.radius) + this.radius;
        } else if (this.position.x + this.radius < 0) {
            this.position.x = newPos.x_right;
            this.position.y = (Math.random() * canvas.height - this.radius) + this.radius;
        }

        if (this.position.y > canvas.height) {
            this.position.y = newPos.y_top;
            this.position.x = (Math.random() * canvas.width - this.radius) + this.radius;
        } else if (this.position.y + this.radius < 0) {
            this.position.y = newPos.y_bottom;
            this.position.x = (Math.random() * canvas.width - this.radius) + this.radius;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();

        ctx.fillStyle = `rgba(255, 255, 255, .4)`;
        ctx.fill();
    }

    getRandomPosition() {
        const x = (Math.random() * canvas.width - this.radius) + this.radius,
            y = (Math.random() * canvas.height - this.radius) + this.radius;

        return new Vector(x, y);
    }
}   