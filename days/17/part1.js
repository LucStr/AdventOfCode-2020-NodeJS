let data = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n');

let xyz_combos = [];
for(var x = -1; x <= 1 ; x++){
    for(var y = -1; y <= 1; y++){
        for(var z = -1; z <= 1; z++){
            if(x === 0 && y === 0 && z === 0){
                continue;
            }
            xyz_combos.push({x, y, z});
        }
    }
}

let map = data.map((row, y) => {
    return [...row].map((icon, x) => {
        return {
            activated: icon === '#',
            x,
            y,
            z: 0,
            neighbors: new Set()
        };
    })
}).reduce((a, b) => [...a, ...b]);

for(var i = 0; i < 6; i++){
    map
        .filter(e => e.activated && e.neighbors.size !== xyz_combos.length)
        .forEach(cube => {
            cube.neighbors = new Set(xyz_combos.map(({x, y, z}) => {
                x += cube.x;
                y += cube.y;
                z += cube.z;

                let neighbor = map.find(e => e.x === x && e.y === y && e.z === z);
                if(!neighbor){
                    neighbor = {
                        x, y, z, activated: false, neighbors: new Set()
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