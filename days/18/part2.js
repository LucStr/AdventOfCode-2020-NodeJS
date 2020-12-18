const data = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n');

function evaluate(expression){
    let index = 0;
    
    let is_sub_expression = false;
    let sub_expression_start;
    let sub_expression_depth;

    let operations = [];
    let first_operation = {second: {}};
    let prev_operation = first_operation;
    let current_operation;
    let prev_number = {value: 0};

    while(index < expression.length){
        let value = expression[index];

        if(is_sub_expression){
            if(value.includes('(')){
                sub_expression_depth += [...value].filter(e => e === '(').length;
            } else if(value.includes(')')){
                sub_expression_depth -= [...value].filter(e => e === ')').length;
            }

            if(sub_expression_depth === 0){
                let sub_expression = [...expression.slice(sub_expression_start, index + 1).join(' ')];

                sub_expression.shift();
                sub_expression.pop();

                value = evaluate(sub_expression.join('').split(' '));
                is_sub_expression = false;
            }
        } 
        
        if(!is_sub_expression){
            let number = Number(value);

            if(!isNaN(number)){
                prev_number = {value: number};

                if(current_operation){
                    current_operation.second = prev_number;
                }
            } else if(value.includes('(')) {
                is_sub_expression = true;
                sub_expression_start = index;
                sub_expression_depth = [...value].filter(e => e === '(').length;
            } else {
                current_operation = {
                    prev_operation,
                    first: prev_number,
                    operator: value
                };

                prev_operation.next_operation = current_operation;

                prev_operation = current_operation;

                operations.push(current_operation);
            } 
        }

        index++;
    }

    operations = operations.sort((a, b) => (b.operator === '+') - (a.operator === '+'));

    for(var i = 0; i < operations.length; i++){
        let operation = operations[i];

        let result = operation.operator === '+' ? operation.first.value + operation.second.value : operation.first.value * operation.second.value;
        
        operation.prev_operation.second.value = result;
        operation.prev_operation.next_operation = operation.next_operation;
        
        if(operation.next_operation){
            operation.next_operation.first = operation.prev_operation.second;
            operation.next_operation.prev_operation = operation.prev_operation;
        }
    }



    return first_operation.second.value;
}

let result = data.map(e => evaluate(e.split(' '))).reduce((a, b) => a + b);

console.log(result);
