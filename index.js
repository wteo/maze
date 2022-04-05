const { Engine, Render, Runner, World, Bodies } = Matter; // All this are accessed from the Matter JS script link found in index.html

const cells = 3;
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
// false - starts off as false to show cell in question hasn't been touched yet

const grid = Array(cells)
    .fill([])
    .map(() => Array(cells).fill(false));

const verticals = Array(cells)
    .fill([])
    .map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
    .fill([])
    .map(() => Array(cells).fill(false));

// Code below the picked starting cell is randomized
const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells)

console.log(startRow, startColumn);
