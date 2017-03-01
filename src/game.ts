import {Render, Engine, World, Bodies, Body, Svg, Events} from "matter-js";
import platform from "./resources/platform";

const engine = Engine.create({
    constraintIterations : 10,
    positionIterations : 20,
    velocityIterations : 20
});
engine.world.gravity.y = 0;

let options: any = {
            width: Math.min(document.documentElement.clientWidth, 800),
            height: Math.min(document.documentElement.clientHeight, 600),
            showAngleIndicator: true,
            showCollisions: true,
            showVelocity: true
        };
const test = Bodies.rectangle(100, 100, 40, 40, { isStatic: true});

Body.setPosition(platform, {x: 400, y: 560});

const ball = Bodies.circle(710, 200, 10, { inertia: Infinity, restitution: 1, frictionAir: 0, frictionStatic: 0, friction: 0, slop: 0});
const ground = Bodies.rectangle(400, 610, 810, 60, { inertia: Infinity, isStatic: true, restitution: 1, friction: 0, frictionStatic: 0});
const up = Bodies.rectangle(400, 0, 810, 60, { inertia: Infinity, isStatic: true, restitution: 1, friction: 0, frictionStatic: 0});
const left = Bodies.rectangle(0, 400, 60, 810, { isStatic: true });
const right = Bodies.rectangle(800, 400, 60, 810, { inertia: Infinity, isStatic: true, restitution: 1, friction: 0, frictionStatic: 0, slop: 0});
Body.setVelocity(ball, {x: 10/50, y: 0});

// add all of the bodies to the world
World.add(engine.world, [platform, ground, ball, up, left, right, test]);

// run the engine
Engine.run(engine);


const render = Render.create({
    element: document.body,
    engine: engine,
    options: options
});

render.options.wireframes = true;

// run the renderer
Render.run(render);

let platformXSpeed = 0;
document.body.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            platformXSpeed = - 15;
            break;
        case 39:
            platformXSpeed = 15;
            break;
    }
};

Events.on(engine, 'collisionStart', function(event) {
    for(let pair of event.pairs) {
        if(pair.bodyA === ball && pair.bodyB === right ||
           pair.bodyB === ball && pair.bodyA === right) {
            console.log(pair);
            console.log(event);
        }
    }
});
Events.on(engine, 'collisionEnd', function(event) {
    for(let pair of event.pairs) {
        if(pair.bodyA === ball && pair.bodyB === right ||
            pair.bodyB === ball && pair.bodyA === right) {
            console.log(pair);
            console.log(event);
        }
    }
});
let pos = {x: 0, y:0};
Events.on(engine, 'beforeUpdate', function() {
    if(ball.velocity.x !== pos.x || ball.velocity.y !== pos.y) {
        pos.x = ball.velocity.x;
        pos.y = ball.velocity.y;
        console.log(ball.velocity);
    }
    platformXSpeed *= 0.9;
    if(platform.position.x - 100 + platformXSpeed >= 30 && platform.position.x + 100 + platformXSpeed <= 770) {
        Body.translate(platform, {x: platformXSpeed, y: 0});
    }
});

