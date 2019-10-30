let canvas, ctx;
let particles = [],
    num = 50;

function initParticles() {
    particles = [];
    for (let i = 0; i < num; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, 1900, 800);
    particles.forEach(p1 => {
        p1.update();

        particles.forEach(p2 => {
            linkParticles(p1.position, p2.position);
        });

        p1.draw(ctx);
    });

    requestAnimationFrame(animateParticles);
}

function linkParticles(p1, p2) {
    const dist = Vector.dist(p1, p2);

    if (dist < 150) {
        const o = (.4 - (dist / (1 / .4)) / 150);

        if (o > 0) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.closePath();

            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(255, 255, 255, ${o})`;
            ctx.stroke();
        }
    }
}

function init() {
    canvas = document.querySelector('.start-dialog canvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx = canvas.getContext('2d');

    initParticles();
    animateParticles();
}

window.onload = init();