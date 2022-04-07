const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter; // All this are accessed from the Matter JS script link found in index.html

const cellsHorizontal = 8;
const cellsVertical = 5;
const width = window.innerWidth; // this ensures the maze fills up the entire window screen
const height = window.innerHeight;

const unitLengthX = width / cellsHorizontal; 
const unitLengthY = height / cellsVertical;

const engine = Engine.create();
engine.world.gravity.y = 0; // disable gravity
const { world } = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width, 
        height        
    }
}); 
Render.run(render);
Runner.run(Runner.create(), engine);

//Walls
const walls = [
    Bodies.rectangle(width/2, 0, width, 2, { isStatic: true}),
    Bodies.rectangle(width/2, height, width, 2, { isStatic: true}),
    Bodies.rectangle(0, height/2, 2, height, { isStatic: true}),
    Bodies.rectangle(width, height/2, 2, height, { isStatic: true})
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

const grid = Array(cellsVertical)
    .fill([])
    .map(() => Array(cellsHorizontal).fill(false));

const verticals = Array(cellsVertical)
    .fill([])
    .map(() => Array(cellsHorizontal - 1).fill(false));

const horizontals = Array(cellsVertical - 1)
    .fill([])
    .map(() => Array(cellsHorizontal).fill(false));

// Code below the picked starting cell is randomized
const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal)

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
        if (
            nextRow < 0 || 
            nextRow >= cellsVertical || 
            nextColumn < 0 || 
            nextColumn >= cellsHorizontal) {
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
            columnIndex * unitLengthX + unitLengthX / 2,
            rowIndex * unitLengthY + unitLengthY,
            unitLengthX,
            1, {
                label: "wall",
                isStatic: true,
                render: {
                    fillStyle: "gray"
                }
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
            columnIndex * unitLengthX + unitLengthX,
            rowIndex * unitLengthY + unitLengthY / 2,
            1,
            unitLengthY, {
                label: "wall",
                isStatic: true, 
                render: {
                    fillStyle: "gray"
                }
            }
        );
        World.add(world, wall);
    });
});

// Goal

const goal = Bodies.rectangle(
    width - unitLengthX / 2,
    height - unitLengthY / 2,
    unitLengthX * 0.7,
    unitLengthY * 0.7,
    {
        label: "goal",
        isStatic: true,
        render: {
            fillStyle: "green"
        }
    }
);
World.add(world, goal);

// Ball

const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
const ball = Bodies.circle(
    unitLengthX / 2,
    unitLengthY / 2,
    ballRadius, {
        label: "ball",
        render: {
            fillStyle: "red"
        }
    }
);
World.add(world, ball);

document.addEventListener("keydown", event => {
    const { x, y } = ball.velocity;

    if (event.keyCode === 87) {
        Body.setVelocity(ball, { x, y: y - 5 });
    }
    if (event.keyCode === 68) {
        Body.setVelocity(ball, { x: x + 5, y });
    }
    if (event.keyCode === 83) {
        Body.setVelocity(ball, { x, y: y + 5 });
    }
    if (event.keyCode === 65) {
        Body.setVelocity(ball, { x: x - 5, y });
    }
});

// Win Condition

Events.on(engine, "collisionStart", event => {
    event.pairs.forEach((collision) => {
        const labels = ["ball", "goal"];

        if (
            labels.includes(collision.bodyA.label) && 
            labels.includes(collision.bodyB.label)
            ) {
            document.querySelector(".winner").classList.remove("hidden");
            world.gravity.y = 1; // this turns gravity back on when win condition is met    
            world.bodies.forEach(body => {
                if (body.label === "wall") {
                    Body.setStatic(body, false);
                }
            });
        }
    });
});

