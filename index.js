const { Engine, Render, Runner, World, Bodies } = Matter; // All this are accessed from the Matter JS script link found in index.html

const cells = 3;
const width = 600;
const height = 600;

const unitLength = width / cells; // the size of each cell on every side

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

const position = (row, column) => {
    // If I have visited the cell at [row, column], then return.
    if (grid[row][column]) {
        return;
    }

    // Mark this cell as being visited.
    grid[row][column] = true;

    // Assemble randomly-ordered list of neighbors.
    const neighbors = shuffle([
        [row - 1, column, "up"],
        [row, column + 1, "right"],
        [row + 1, column, "down"],
        [row, column - 1, "left"]
    ]); // need to randomize this. Otherwise, maze will always look the same.
    
    // For each neightbor...
    for (let neighbor of neighbors) {
        const [nextRow, nextColumn, direction] = neighbor;
        
        // See if that neighbor is out of bounds.
        if (nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells) {
            continue; 
        }
        
        // If we have visited that neighbour, continue to next neighbor.
        if (grid[nextRow][nextColumn]) {
            continue;
        }
        
        // Remove a wall from either horizontals or verticals.
        if (direction === "left") {
            verticals[row][column - 1] = true;
        } else if (direction === "right") {
            verticals[row][column] = true;
        } else if (direction === "up") {
            horizontals[row - 1][column] = true;
        } else if (direction === "down") {
            horizontals[row][column] = true;
        }

        position(nextRow, nextColumn);
    }
    // Visit that next cell.
};

position(startRow, startColumn); // this repeats the func in a loop to continously remove the walls until a proper maze is created.

horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return;
        }

        const wall = Bodies.rectangle(
            columnIndex * unitLength + unitLength / 2,
            rowIndex * unitLength + unitLength,
            unitLength,
            5, 
            {
                isStatic: true
            }
        );
        World.add(world, wall);
    });
});

verticals.forEach((row,rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return;
        }
        
        const wall = Bodies.rectangle(
            columnIndex * unitLength + unitLength,
            rowIndex * unitLength + unitLength / 2,
            5,
            unitLength, {
                isStatic: true
            }
        );
        World.add(world, wall);
    });
});

const goal = Bodies.rectangle(
    width - unitLength / 2,
    height - unitLength / 2,
    unitLength * 0.7,
    unitLength * 0.7,
    {
        isStatic: true
    }
);
World.add(world, goal);