const data = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n');

var map = data.map((row, y) =>  [...row].map((icon, x) => {
        return {
            icon, x, y
        }
    })
).reduce((a, b) => {
    a.push(...b);
    return a;
}, [])

map.forEach(tile => {
    tile.neighbors = map.filter(e => Math.abs(tile.x - e.x) <= 1 && Math.abs(tile.y - e.y) <= 1 && e != tile); 
});

function simulate(map){
    map.forEach((tile, index) => {
        if(tile.icon === 'L'){
            tile.newIcon = tile.neighbors.filter(e => e.icon === '#').length === 0 ? '#' : 'L';
        }

        if(tile.icon === '#'){
            tile.newIcon = tile.neighbors.filter(e => e.icon === '#').length >= 4 ? 'L' : '#';
        }
    });

    map.forEach(tile => {
        tile.icon = tile.newIcon;
    });
}

var occupied = 0;

do{
    occupied = map.filter(e => e.icon === '#').length;

    simulate(map);

} while(occupied != map.filter(e => e.icon === '#').length)

console.log(occupied);