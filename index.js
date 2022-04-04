const { Engine, Render, Runner, World, Bodies } = Matter; // All this are accessed from the Matter JS script link found in index.html

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800, // all in px value
        height: 600,        
    }
}); // this create a canvas element in html
Render.run(render);
Runner.run(Runner.create(), engine);

/*
const shape = Bodies.rectangle(200, 200, 50, 50, {
    isStatic: true // this causes shape to stay in its position. If this is removed, gravity will pull the shape down.
    // Need to create a wall border to prevent the shape from disappearing beyond the bottom of the screen.
}); // this create a shape. But this doesn't show it in the screen
World.add(world, shape); // this calls the shape to show up in the screen
*/

//Walls
const walls = [
    Bodies.rectangle(400, 0, 800, 40, { isStatic: true}),
    Bodies.rectangle(400, 600, 800, 40, { isStatic: true}),
    Bodies.rectangle(0, 300, 40, 600, { isStatic: true}),
    Bodies.rectangle(800, 300, 40, 600, { isStatic: true})
];
World.add(world, walls);

World.add(world, Bodies.rectangle(200, 200, 50, 50));

