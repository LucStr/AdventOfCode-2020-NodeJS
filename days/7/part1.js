const data = require('fs').readFileSync(__dirname + '\\data.in').toString().split('\n');

var bagStructure = data.map(e => {
    const split = e.split(' bags contain ');
    return {
        masters: [],
        color: split[0],
        slaves: split[1].split(',').map(f => {
            const match = f.match(/(?<amount>\d+) (?<color>.+?) bag/);
            if(!match){
                return;
            }
            return {
                amount: Number(match.groups.amount),
                color: match.groups.color
            }
        }).filter(e => e)
    }
});

bagStructure.forEach(master => {
    master.slaves.forEach(slave => {
        slave.color = bagStructure.find(e => e.color === slave.color);
        slave.color.masters.push(master);
    });
});

const containing = [];

const queue = [...bagStructure.find(e => e.color === 'shiny gold').masters];

while(queue.length){
    const element = queue.shift();
    containing.push(element);

    queue.push(...element.masters);
}

let result = new Set(...[containing.map(e => e.color)]).size;



console.log(result);