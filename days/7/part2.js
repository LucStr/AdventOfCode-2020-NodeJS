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

let result = 0;

const queue = [...bagStructure.find(e => e.color === 'shiny gold').slaves.map(e => {
    return {
        amount: e.amount,
        color: e.color
    }
})];

while(queue.length){
    const element = queue.shift();
    result += element.amount;

    queue.push(...element.color.slaves.map(e => {
        return {
            amount: element.amount * e.amount,
            color: e.color
        }
    }))
}


console.log(result);