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
// false - starts off as false to show cell in question hasn't been touched yet

const grid = Array(3)
.fill(null)
.map(() => Array(3).fill(false));
// map method is used insteasd of adding [false, false, false] to fill.
// map method preferred as this allows dev to manipulate each row of the array individually.
// We can't do this with the latter.
console.log(grid);
