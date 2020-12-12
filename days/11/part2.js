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
    tile.neighbors = [
        {x: 0, y: 1},
        {x: 0, y: -1},
        {x: 1, y: 1},
        {x: 1, y: -1},
        {x: -1, y: 1},
        {x: -1, y: -1},
        {x: 1, y: 0},
        {x: -1, y: 0},
        
    ].map(e => {
        var found = {icon: '.'};
        var count = 1;
        while(found && found.icon == '.'){
            found = map.find(f => f.x === e.x * count + tile.x && f.y === e.y * count + tile.y);
            count++;
        }
        return found;
    }).filter(e => e && e.icon);
});

function simulate(map){
    map.forEach((tile, index) => {
        if(tile.icon === 'L'){
            tile.newIcon = tile.neighbors.filter(e => e.icon === '#').length === 0 ? '#' : 'L';
        }

        if(tile.icon === '#'){
            tile.newIcon = tile.neighbors.filter(e => e.icon === '#').length >= 5 ? 'L' : '#';
        } 
    });

    map.forEach(tile => {
        tile.icon = tile.newIcon || tile.icon;
    });
}

var occupied = 0;

do{
    occupied = map.filter(e => e.icon === '#').length;

    simulate(map);

} while(occupied != map.filter(e => e.icon === '#').length)

console.log(occupied);