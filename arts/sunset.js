// ========================================
// SUNSET
// ========================================
//
// The artwork below is the sketch from test.js, copied in unchanged.
//
// It is wrapped in a p5 instance rather than running in global mode,
// because aurora.js already owns the page's global sketch: two global
// sketches would overwrite each other's setup()/draw() and both would
// append a canvas to <body> outside the art screen.
//
// The wrapper hands the sketch the same globals p5's global mode used
// to give it (width, height, frameCount, random, noise, ...) backed by
// this instance, so not a line of the artwork itself had to change.
// createCanvas() puts the canvas inside #sunset-container, and the
// size/frame values are refreshed whenever the sketch reads them.
//
// The wrapper also keeps the sketch's own variables (waves, clouds,
// stars, pebbles) out of the global scope, where they would collide
// with aurora.js.
// ========================================

let sunsetSketch = new p5(function (p) {

    // ----------------------------------------
    // P5 INSTANCE -> GLOBALS THE SKETCH EXPECTS
    // ----------------------------------------

    let width = p.windowWidth;
    let height = p.windowHeight;
    let windowWidth = p.windowWidth;
    let windowHeight = p.windowHeight;
    let frameCount = 0;

    function sync() {

        width = p.width;
        height = p.height;
        windowWidth = p.windowWidth;
        windowHeight = p.windowHeight;
        frameCount = p.frameCount;
    }


    // constants

    const PI = p.PI;
    const TWO_PI = p.TWO_PI;
    const CLOSE = p.CLOSE;


    // drawing

    const createCanvas = function (w, h) {

        let canvas = p.createCanvas(w, h);

        canvas.parent("sunset-container");

        sync();

        return canvas;
    };

    const resizeCanvas = function (w, h) {

        p.resizeCanvas(w, h);

        sync();
    };

    const fill = function () { p.fill.apply(p, arguments); };
    const stroke = function () { p.stroke.apply(p, arguments); };
    const noFill = function () { p.noFill(); };
    const noStroke = function () { p.noStroke(); };
    const strokeWeight = function (w) { p.strokeWeight(w); };

    const rect = function () { p.rect.apply(p, arguments); };
    const ellipse = function () { p.ellipse.apply(p, arguments); };
    const circle = function () { p.circle.apply(p, arguments); };

    const push = function () { p.push(); };
    const pop = function () { p.pop(); };
    const translate = function () { p.translate.apply(p, arguments); };

    const beginShape = function () { p.beginShape(); };
    const endShape = function () { p.endShape.apply(p, arguments); };
    const vertex = function () { p.vertex.apply(p, arguments); };


    // maths

    const abs = function (v) { return p.abs(v); };
    const sin = function (v) { return p.sin(v); };
    const pow = function (a, b) { return p.pow(a, b); };
    const max = function () { return p.max.apply(p, arguments); };
    const lerp = function () { return p.lerp.apply(p, arguments); };
    const map = function () { return p.map.apply(p, arguments); };
    const constrain = function () { return p.constrain.apply(p, arguments); };
    const random = function () { return p.random.apply(p, arguments); };
    const noise = function () { return p.noise.apply(p, arguments); };


    // ----------------------------------------
    // THE ARTWORK (from test.js, unchanged)
    // ----------------------------------------

let waves = [];
let clouds = [];
let stars = [];
let pebbles = [];

function setup() {

    createCanvas(windowWidth, windowHeight);

    // ========================================
    // OCEAN WAVES
    // ========================================

    for (let i = 0; i < 75; i++) {

        waves.push({
            depth: random(),
            phase: random(TWO_PI),
            speed: random(0.0004, 0.0012),
            seed: random(1000)
        });
    }


    // ========================================
    // CLOUDS
    // ========================================

    // Fewer, quieter clouds
    for (let i = 0; i < 5; i++) {

        clouds.push({

            x: random(-300, width + 300),

            y: random(
                height * 0.16,
                height * 0.40
            ),

            w: random(180, 380),

            h: random(25, 55),

            speed: random(0.015, 0.035),

            seed: random(1000)

        });
    }


    // ========================================
    // FAINT STARS
    // ========================================

    for (let i = 0; i < 35; i++) {

        stars.push({

            x: random(width),

            y: random(height * 0.42),

            size: random(0.5, 1.3),

            alpha: random(15, 45)

        });
    }

    // ========================================
    // BEACH PEBBLES
    // ========================================

    for (let i = 0; i < 28; i++) {

        let x =
            noise(i * 7.31) * width;

        let y =
            height * 0.875 +
            35 +
            noise(i * 13.17) *
            (height * 0.125 - 45);

        let visibility =
            noise(
                x * 0.008,
                y * 0.008
            );

        if (visibility < 0.58)
            continue;

        pebbles.push({

            x: x,

            y: y,

            width: random(2, 6),

            height: random(1, 3),

            r: random(105, 170),

            g: random(90, 145),

            b: random(75, 120),

            alpha: random(70, 140)

        });
    }
}


// ========================================
// DRAW
// ========================================

function draw() {

    drawSky();

    drawAtmosphere();

    drawClouds();

    drawSun();

    drawHorizon();

    drawOcean();

    drawSunReflection();

    drawRipples();

    drawBeach();

    drawFoam();

    drawStars();
}


// ========================================
// SKY
// ========================================

function drawSky() {

    noStroke();

    let horizon =
        height * 0.57;


    for (
        let y = 0;
        y < horizon;
        y++
    ) {

        let t =
            y / horizon;

        let r;
        let g;
        let b;


        if (t < 0.42) {

            let p =
                t / 0.42;

            r =
                lerp(
                    55,
                    145,
                    p
                );

            g =
                lerp(
                    75,
                    100,
                    p
                );

            b =
                lerp(
                    135,
                    175,
                    p
                );

        } else {

            let p =
                (t - 0.42) /
                0.58;

            r = lerp(
                145,
                242,
                p
            );

            g = lerp(
                100,
                162,
                p
            );

            b = lerp(
                175,
                145,
                p
            );
        }


        // Extra warmth near horizon

        let warmth =
            pow(
                max(0, t - 0.55),
                2
            );


        r +=
            warmth * 25;

        g +=
            warmth * 15;


        fill(
            r,
            g,
            b
        );


        rect(
            0,
            y,
            width,
            1
        );
    }
}


// ========================================
// ATMOSPHERIC LIGHT
// ========================================

function drawAtmosphere() {

    noStroke();

    let horizon =
        height * 0.54;


    for (
        let i = 0;
        i < 40;
        i++
    ) {

        let radius =
            map(
                i,
                0,
                39,
                100,
                width * 0.85
            );


        let alpha =
            map(
                i,
                0,
                39,
                7,
                0
            );


        fill(
            255,
            170,
            120,
            alpha
        );


        ellipse(
            width * 0.70,
            horizon - 40,
            radius,
            radius * 0.42
        );
    }
}


// ========================================
// CLOUDS
// ========================================

function drawClouds() {

    noStroke();

    for (let cloud of clouds) {

        cloud.x += cloud.speed;


        if (
            cloud.x >
            width + cloud.w
        ) {

            cloud.x =
                -cloud.w;
        }


        push();

        translate(
            cloud.x,
            cloud.y
        );


        /*
         * Very soft irregular cloud.
         * No circles / no obvious blobs.
         */

        beginShape();


        // Top edge

        for (
            let x = -cloud.w / 2;
            x <= cloud.w / 2;
            x += 12
        ) {

            let n =
                noise(
                    cloud.seed +
                    x * 0.009
                );


            let curve =
                sin(
                    map(
                        x,
                        -cloud.w / 2,
                        cloud.w / 2,
                        0,
                        PI
                    )
                );


            let y =
                -curve *
                cloud.h *
                (0.45 + n * 0.55);


            vertex(
                x,
                y
            );
        }


        // Bottom edge

        for (
            let x = cloud.w / 2;
            x >= -cloud.w / 2;
            x -= 12
        ) {

            let n =
                noise(
                    cloud.seed +
                    x * 0.009 +
                    50
                );


            vertex(
                x,
                cloud.h *
                (0.12 + n * 0.12)
            );
        }


        endShape(CLOSE);


        // Very subtle warm underside

        fill(
            235,
            145,
            135,
            12
        );


        ellipse(
            0,
            cloud.h * 0.2,
            cloud.w * 0.75,
            cloud.h * 0.25
        );


        pop();
    }
}


// ========================================
// SUN
// ========================================

function drawSun() {

    // Centered sunset
    let sunX = width * 0.50;
    let sunY = height * 0.475;

    noStroke();

    // Large soft atmospheric glow
    for (let i = 70; i > 0; i--) {

        let radius = 75 + i * 7;

        let alpha = map(
            i,
            70,
            0,
            0,
            4
        );

        fill(
            255,
            190,
            150,
            alpha
        );

        ellipse(
            sunX,
            sunY,
            radius * 1.7,
            radius
        );
    }

    // Warm haze immediately around sun

    fill(
        255,
        200,
        160,
        18
    );

    circle(
        sunX,
        sunY,
        110
    );

    // Actual sun

    fill(
        255,
        218,
        172
    );

    circle(
        sunX,
        sunY,
        78
    );
}


// ========================================
// HORIZON
// ========================================

function drawHorizon() {

    noStroke();

    /*
     * Very distant atmospheric horizon.
     * No large dark polygon.
     */

    fill(
        85,
        85,
        90,
        45
    );

    rect(
        0,
        height * 0.568,
        width,
        3
    );


    // Very subtle warm haze directly above water

    fill(
        245,
        170,
        145,
        25
    );

    rect(
        0,
        height * 0.558,
        width,
        10
    );
}


// ========================================
// OCEAN
// ========================================

function drawOcean() {

    noStroke();


    let top =
        height * 0.575;

    let bottom =
        height * 0.90;


    for (
        let y = top;
        y < bottom;
        y++
    ) {

        let t =
            (y - top) /
            (bottom - top);


        let r =
            lerp(
                75,
                40,
                t
            );

        let g =
            lerp(
                105,
                100,
                t
            );

        let b =
            lerp(
                145,
                135,
                t
            );


        // Warmth near sunset

        let distance =
            abs(
                y -
                height * 0.62
            );


        let warmth =
            max(
                0,
                1 -
                distance /
                (height * 0.25)
            );


        r +=
            warmth * 35;

        g +=
            warmth * 18;


        fill(
            r,
            g,
            b
        );


        rect(
            0,
            y,
            width,
            1
        );
    }
}


// ========================================
// SUN REFLECTION
// ========================================

function drawSunReflection() {

    noStroke();

    let sunX =
        width * 0.50;

    let horizon =
        height * 0.575;


    for (
        let y = horizon + 5;
        y < height * 0.875;
        y += 4
    ) {

        let distance =
            y - horizon;

        let progress =
            constrain(
                distance /
                (height * 0.30),
                0,
                1
            );


        // Reflection gets wider toward viewer

        let spread =
            lerp(
                5,
                75,
                progress
            );


        // Gradually fades

        let alpha =
            lerp(
                65,
                2,
                progress
            );



        let center =
            sunX +
            (
                noise(
                    y * 0.025
                ) -
                0.5
            ) *
            spread *
            0.55;



        let pieces =
            progress < 0.35
                ? 1
                : progress < 0.7
                    ? 2
                    : 3;


        for (
            let i = 0;
            i < pieces;
            i++
        ) {

            let side =
                pieces === 1
                    ? 0
                    : map(
                        i,
                        0,
                        pieces - 1,
                        -1,
                        1
                    );


            let x =
                center +
                side *
                spread *
                0.45;


            // Slight organic variation

            x +=
                (
                    noise(
                        y * 0.04 +
                        i * 30
                    ) -
                    0.5
                ) *
                15;


            let fragmentWidth =
                lerp(
                    9,
                    28,
                    progress
                );


            let fragmentAlpha =
                alpha *
                (
                    0.5 +
                    noise(
                        y * 0.035 +
                        i * 50
                    ) *
                    0.5
                );


            fill(
                255,
                205,
                155,
                fragmentAlpha
            );


            rect(
                x,
                y,
                fragmentWidth,
                1.5
            );
        }
    }
}


// ========================================
// RIPPLING WATER
// ========================================

function drawRipples() {

    noFill();


    for (let wave of waves) {

        let y =
            height * 0.58 +
            wave.depth *
            height * 0.29;


        // Extremely gentle movement

        let amplitude =
            map(
                wave.depth,
                0,
                1,
                0.4,
                2.2
            );


        // Wider, less frequent waves

        let spacing =
            map(
                wave.depth,
                0,
                1,
                60,
                28
            );


        beginShape();


        for (
            let x = -40;
            x <= width + 40;
            x += spacing
        ) {

            let n =
                noise(
                    wave.seed +
                    x * 0.004,
                    wave.depth * 8
                );


            let offset =
                sin(
                    x * 0.015 +
                    wave.phase +
                    frameCount *
                    wave.speed
                ) *
                amplitude;


            offset +=
                (n - 0.5) *
                amplitude;


            vertex(
                x,
                y + offset
            );
        }


        endShape();


        stroke(
            205,
            215,
            220,
            map(
                wave.depth,
                0,
                1,
                18,
                5
            )
        );


        strokeWeight(
            map(
                wave.depth,
                0,
                1,
                0.8,
                0.4
            )
        );
    }
}


// ========================================
// BEACH
// ========================================

function drawBeach() {

    noStroke();

    let shoreline = height * 0.875;

    // ========================================
    // MAIN SAND
    // ========================================

    beginShape();

    vertex(0, shoreline);

    for (let x = 0; x <= width; x += 10) {

        let variation =
            (noise(x * 0.006, 500) - 0.5) * 16;

        vertex(
            x,
            shoreline + variation
        );
    }

    vertex(width, height);
    vertex(0, height);

    fill(205, 178, 145);

    endShape(CLOSE);


    // ========================================
    // WET SAND
    // ========================================

    beginShape();

    vertex(0, shoreline - 5);

    for (let x = 0; x <= width; x += 10) {

        let variation =
            (noise(x * 0.006, 500) - 0.5) * 16;

        vertex(
            x,
            shoreline + variation - 5
        );
    }

    for (let x = width; x >= 0; x -= 10) {

        let variation =
            (noise(x * 0.006, 500) - 0.5) * 16;

        vertex(
            x,
            shoreline + variation + 22
        );
    }

    fill(
        155,
        143,
        128,
        80
    );

    endShape(CLOSE);


    // ========================================
    // NATURAL SAND GRAIN
    // ========================================

    /*
     * Instead of putting grains everywhere,
     * noise decides where they appear.
     */

    noStroke();

    for (let x = 0; x < width; x += 4) {

        for (
            let y = shoreline + 18;
            y < height;
            y += 4
        ) {

            let density =
                noise(
                    x * 0.035,
                    y * 0.035
                );


            // Most areas remain completely clean.

            if (density > 0.72) {

                let size =
                    map(
                        density,
                        0.72,
                        1,
                        0.3,
                        1.2
                    );


                fill(
                    125,
                    110,
                    95,
                    map(
                        density,
                        0.72,
                        1,
                        8,
                        28
                    )
                );


                ellipse(
                    x,
                    y,
                    size,
                    size * 0.6
                );
            }
        }
    }


    // ========================================
    // SUBTLE SAND STREAKS
    // ========================================

    noFill();

    stroke(
        135,
        120,
        105,
        16
    );

    strokeWeight(0.7);

    for (let i = 0; i < 18; i++) {

        let y =
            shoreline +
            30 +
            i * 7;

        beginShape();

        for (
            let x = 0;
            x <= width;
            x += 20
        ) {

            let n =
                noise(
                    x * 0.01,
                    i * 2
                );

            vertex(
                x,
                y +
                (n - 0.5) * 5
            );
        }

        endShape();
    }


    // ========================================
    // PEBBLES / SHELLS
    // ========================================

    noStroke();

    for (let pebble of pebbles) {

        fill(
            pebble.r,
            pebble.g,
            pebble.b,
            pebble.alpha
        );

        ellipse(
            pebble.x,
            pebble.y,
            pebble.width,
            pebble.height
        );
    }
}

// ========================================
// FOAM / SHORELINE
// ========================================

function drawFoam() {

    noFill();

    stroke(
        245,
        235,
        220,
        28
    );

    strokeWeight(0.8);

    let shoreline = height * 0.875;


    /*
     * Only a few broken foam traces.
     */

    for (let i = 0; i < 5; i++) {

        beginShape();

        for (
            let x = -30;
            x <= width + 30;
            x += 12
        ) {

            let n =
                noise(
                    x * 0.009,
                    i * 4
                );

            vertex(
                x,
                shoreline +
                i * 4 +
                (n - 0.5) * 7
            );
        }

        endShape();
    }
}


// ========================================
// STARS
// ========================================

function drawStars() {

    noStroke();


    for (let s of stars) {

        fill(
            255,
            230,
            210,
            s.alpha
        );


        circle(
            s.x,
            s.y,
            s.size
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

    // ----------------------------------------
    // LIFECYCLE
    // ----------------------------------------

    p.setup = function () {

        sync();

        setup();
    };

    p.draw = function () {

        sync();

        draw();
    };

    p.windowResized = function () {

        sync();

        windowResized();
    };

});
