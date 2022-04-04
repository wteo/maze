const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter; // All this are accessed from the Matter JS script link found in index.html

const width = 800;
const height = 600;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,// this gives solid shapes. Random colours will be given to the shapes
        width, 
        height        
    }
}); // this create a canvas element in html
Render.run(render);
Runner.run(Runner.create(), engine);

World.add(world, MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
}))

/*
const shape = Bodies.rectangle(200, 200, 50, 50, {
    isStatic: true // this causes shape to stay in its position. If this is removed, gravity will pull the shape down.
    // Need to create a wall border to prevent the shape from disappearing beyond the bottom of the screen.
}); // this create a shape. But this doesn't show it in the screen
World.add(world, shape); // this calls the shape to show up in the screen
*/

//Walls
const walls = [
    Bodies.rectangle(400, // horizontal position 
        0, // vertical position
        800, // width
        40, // height
        { isStatic: true}),
    Bodies.rectangle(400, 600, 800, 40, { isStatic: true}),
    Bodies.rectangle(0, 300, 40, 600, { isStatic: true}),
    Bodies.rectangle(800, 300, 40, 600, { isStatic: true})
];
World.add(world, walls);

// Random Shapes
for (let i = 0; i < 20; i++) {
    if (Math.random() > 0.5) {
        World.add(world, Bodies.rectangle(
            Math.random() * width, // randomized these positions so shapes will pop in any random places in the screen.
            Math.random() * height, // Otherwise, they will stacked against each other.
            50, 50));
    } else {
        World.add(
            world,
            Bodies.circle(
                Math.random() * width, 
                Math.random() * height,
                35, // radius
                {
                    render: {
                        fillStyle: "red"
                    }
                })
        )
    }
} // The loop should determine the number of shapes in screen

