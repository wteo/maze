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

const shape = Bodies.rectangle(200, 200, 50, 50, {
    isStatic: true // this causes shape to stay in its position. If this is removed, gravity will pull the shape down.
}); // this create a shape. But this doesn't show it in the screen
World.add(world, shape); // this calls the shape to show up in the screen


