let data = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n');

const DIMENSIONS = 4;

const VALUES = [-1, 0, 1];

let combos = [];

function addCombo(dimension, values){
    if(dimension === 0){
        !values.every(e => e === 0) && combos.push(values);
        return;
    }

    VALUES.forEach(value => {
        addCombo(dimension - 1, [...values, value]);
    });
}

addCombo(DIMENSIONS, []);

let map = data.map((row, y) => {
    return [...row].map((icon, x) => {
        let coords = new Array(DIMENSIONS).fill(0);
        coords.splice(0, 2, x, y);

        return {
            activated: icon === '#',
            coords,
            neighbors: new Set()
        };
    })
}).reduce((a, b) => [...a, ...b]);

for(var i = 0; i < 6; i++){
    map
        .filter(e => e.activated && e.neighbors.size !== combos.length)
        .forEach(cube => {
            cube.neighbors = new Set(combos.map(coord => {
                let relative_coords = cube.coords.map((e, i) => e + coord[i]);

                let neighbor = map.find(e => e.coords.every((c, i) => c === relative_coords[i]));
                if(!neighbor){
                    neighbor = {
                        activated: false, 
                        coords: relative_coords,
                        neighbors: new Set()
                    }

                    map.push(neighbor);
                }

                neighbor.neighbors.add(cube);
                
                return neighbor;
            }));
        });
    
    let to_activate = map.filter(e => {
        if(e.activated){
            return false;
        }

        let activeNeighbors = [...e.neighbors].filter(e => e.activated).length;

        return activeNeighbors === 3;
    });

    let to_inactivate = map.filter(e => {
        if(!e.activated){
            return false;
        }

        let activeNeighbors = [...e.neighbors].filter(e => e.activated).length;

        return activeNeighbors != 2 && activeNeighbors != 3;
    });

    to_inactivate.forEach(e => {
        e.activated = false;
    });

    to_activate.forEach(e => {
        e.activated = true;
    });
}

var result = map.filter(e => e.activated).length

console.log(result);