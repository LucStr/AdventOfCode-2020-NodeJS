let instructions = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n');

function run(instructions) {
    let mask = [];
    let memory = [];

    instructions.forEach(instruction => {
        if(instruction.includes("mask")){
            updateMask(instruction);
        } else if(instruction.includes("mem")) {
            updateMemory(instruction);
        }
    });

    return memory.filter(e => e).reduce((a, b) => a + b);

    function updateMask(instruction){
        mask = [...instruction.match(/mask = (.+)/)[1]];
    }

    function updateMemory(instruction){
        let {index, number} = instruction.match(/mem\[(?<index>.+)\] = (?<number>\d+)/).groups;
        index = Number(index); 
        number = Number(number).toString(2);

        let binary_number = [...number].map((e, i, a) => {
            let mask_index = mask.length - a.length + i;
            return mask[mask_index] === 'X' ? e : mask[mask_index]
        });

        memory[index] = parseInt(
            [...mask.slice(0, mask.length - binary_number.length), ...binary_number].map(e => e === 'X' ? '0' : e).join('')
        , 2);
    }
}



var result = run(instructions);

console.log(result);