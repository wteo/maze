const { Engine, Render, Runner, World, Bodies } = Matter; // All this are accessed from the Matter JS script link found in index.html

const width = 600;
const height = 600;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: true,
        width, 
        height        
    }
}); 
Render.run(render);
Runner.run(Runner.create(), engine);

//Walls
const walls = [
    Bodies.rectangle(width/2, 0, width, 40, { isStatic: true}),
    Bodies.rectangle(width/2, height, width, 40, { isStatic: true}),
    Bodies.rectangle(0, height/2, 40, height, { isStatic: true}),
    Bodies.rectangle(width, width/2, 40, height, { isStatic: true})
];
World.add(world, walls);

// Maze generation

const grid = [];

for (let i = 0; i < 3; i++) {
    grid.push([]);
    for (let j = 0; j < 3; j++) {
        grid[i].push(false);
    }
}

console.log(grid);
