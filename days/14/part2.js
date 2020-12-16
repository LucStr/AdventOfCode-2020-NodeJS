



let instructions = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n');

function run(instructions) {
    let mask = [];
    let memory = [];

    instructions.forEach((instruction, i, a) => {
        if(instruction.includes("mask")){
            updateMask(instruction);
        } else if(instruction.includes("mem")) {
            updateMemory(instruction);
        }

        console.log(`${i} / ${a.length}`)
    });

    console.log('exit', Object.values(memory).reduce((a, b) => a + b));

    return memory.filter(e => e).reduce((a, b) => a + b);

    function updateMask(instruction){
        mask = [...instruction.match(/mask = (.+)/)[1]];
    }

    function updateMemory(instruction){
        console.log('updateMemory');
        let {index, number} = instruction.match(/mem\[(?<index>.+)\] = (?<number>\d+)/).groups;
        index = [...Number(index).toString(2)];
        number = Number(number);

        let binary_index = mask.map((e, i) => {
            let index_icon = index[index.length + i - mask.length];
            return index_icon && e == '0' ? index_icon : e; 
        })

        console.log(binary_index.join(''))

        writeFloating(binary_index, number)
    }

    function writeFloating(binary_index, number){
        let x_index = binary_index.indexOf('X');
        if(x_index === -1){
            writeMaskedIndex(binary_index, number);
        } else {
            let index_0 = [...binary_index];
            index_0.splice(x_index, 1, '0')
            writeFloating(index_0, number);

            let index_1 = [...binary_index];
            index_1.splice(x_index, 1, '1')
            writeFloating(index_1, number);
        }
    }

    function writeMaskedIndex(binary_index, number){
        if(binary_index.includes('X')){
            throw 'Maks cannot contain X';
        }

        let index = parseInt(binary_index.join(''), 2);   

        memory[index] = number;
    }
}



var result = run(instructions);

console.log(result);