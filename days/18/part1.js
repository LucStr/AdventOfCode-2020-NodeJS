const data = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n');

function evaluate(expression){
    let index = 0;
    let is_multiplication = false;
    let sub_total = 0;
    let is_sub_expression = false;
    let sub_expression_start;
    let sub_expression_depth;

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
                if(is_multiplication){
                    sub_total *= number
                } else{
                    sub_total += number
                }
            } else if(value == '+'){
                is_multiplication = false;
            } else if(value == '*'){
                is_multiplication = true;
            } else {
                is_sub_expression = true;
                sub_expression_start = index;
                sub_expression_depth = [...value].filter(e => e === '(').length;
            }
        }

        index++;
    }

    return sub_total;
}

let result = data.map(e => evaluate(e.split(' '))).reduce((a, b) => a + b);

console.log(result);