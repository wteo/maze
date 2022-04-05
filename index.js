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

const shuffle = (arr) => {
    let counter = arr.length;
    while(counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

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

const stepThroughCell = (row, column) => {
    // If I have visited the cell at [row, column], then return.
    if (grid[row][column]) {
        return;
    }

    // Mark this cell as being visited.
    grid[row][column] = true;

    // Assemble randomly-ordered list of neighbors.
    const neighbors = shuffle([
        [row - 1, column],
        [row, column + 1],
        [row + 1, column],
        [row, column - 1]
    ]); // need to randomize this. Otherwise, maze will always look the same.
    console.log(neighbors);

    // JS doesn't allow us to randomize elements within an Array. So, we need to build this ourselves.

    // So, we need to create own function for ourselves.

    // For each neightbor...

    // See if that neighbor is out of bounds.

    // If we have visited that neighbour, continue to next neighbor.

    // Remove a wall from either horizontals or verticals.

    // Visit that next cell.
};

stepThroughCell(1, 1);
