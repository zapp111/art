let stars = [];
let particles = [];


function setup() {

    let canvas = createCanvas(
        windowWidth,
        windowHeight
    );

    canvas.parent("canvas-container");


    // -------------------------
    // CREATE STARS
    // -------------------------

    for (let i = 0; i < 250; i++) {

        stars.push({
            x: random(width),
            y: random(height),
            size: random(1, 3),
            twinkle: random(1000)
        });

    }


    // -------------------------
    // CREATE PARTICLES
    // -------------------------

    for (let i = 0; i < 900; i++) {

        particles.push({
            x: random(width),
            y: random(height),
            offset: random(1000),
            size: random(1, 3)
        });

    }


    background(8, 10, 25);
}


// ========================================
// DRAW
// ========================================

function draw() {

    background(
        8,
        10,
        25,
        35
    );

    drawStars();

    drawAurora();

    drawParticles();
}


// ========================================
// STARS
// ========================================

function drawStars() {

    noStroke();

    for (let star of stars) {

        let brightness =
            150 +
            sin(
                frameCount * 0.03 +
                star.twinkle
            ) * 80;

        fill(
            220,
            220,
            255,
            brightness
        );

        circle(
            star.x,
            star.y,
            star.size
        );
    }
}


// ========================================
// AURORA
// ========================================

function drawAurora() {

    noFill();

    for (let layer = 0; layer < 18; layer++) {

        beginShape();

        for (
            let x = -50;
            x <= width + 50;
            x += 12
        ) {

            let wave =
                sin(
                    x * 0.006 +
                    frameCount * 0.008 +
                    layer * 0.3
                ) * 45;

            let wave2 =
                sin(
                    x * 0.013 -
                    frameCount * 0.004
                ) * 20;

            let y =
                height * 0.42 +
                wave +
                wave2 +
                layer * 9;

            stroke(
                80 + layer * 5,
                150 + layer * 3,
                210 + layer * 2,
                25
            );

            strokeWeight(3);

            curveVertex(x, y);
        }

        endShape();
    }
}


// ========================================
// PARTICLES
// ========================================

function drawParticles() {

    noStroke();

    for (let p of particles) {

        let angle =
            noise(
                p.x * 0.002,
                p.y * 0.002,
                frameCount * 0.001
            ) *
            TWO_PI *
            2;

        let speed = 1.2;

        p.x += cos(angle) * speed;
        p.y += sin(angle) * speed;


        // Wrap around screen

        if (p.x < 0) {
            p.x = width;
        }

        if (p.x > width) {
            p.x = 0;
        }

        if (p.y < 0) {
            p.y = height;
        }

        if (p.y > height) {
            p.y = 0;
        }


        fill(
            120,
            190,
            255,
            80
        );

        circle(
            p.x,
            p.y,
            p.size
        );
    }
}


// ========================================
// RESIZE
// ========================================

function windowResized() {

    resizeCanvas(
        windowWidth,
        windowHeight
    );
}