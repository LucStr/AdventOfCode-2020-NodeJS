const data = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n');

let get_program = (data) => data.map(e => {
    const split = e.split(' ');

    return {
        instruction: split[0],
        value: Number(split[1])
    }
});

const switcher = {
    nop: 'jmp',
    jmp: 'nop',
    acc: 'acc'
}

for(var i = 0; i < data.length; i++){
    const program = get_program(data);
    program[i].instruction = switcher[program[i].instruction];

    const result = tryToFinish(program);
    if(result){
        console.log(result);
        break;
    }
}

function tryToFinish(program){
    let accumulator = 0;
    let pointer = 0;
    
    do {
        const line = program[pointer];

        if(line.executed){
            return false;
        }

        line.executed = true;
        
        switch(line.instruction){
            case 'jmp':
                pointer += line.value;
                break;
            case 'acc':
                accumulator += line.value;
            case 'nop':
                pointer++;
                break;
            default:
                throw('INVALID INSTRUCTION: ' + line.instruction)
        }
    } while(program[pointer])
    
    return accumulator;
}
