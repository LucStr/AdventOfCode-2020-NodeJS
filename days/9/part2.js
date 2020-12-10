const data = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n').map(Number);

let stash = data.slice(0, 25);

let invalid_number = 0;

for(var i = 25; i < data.length; i++){
    const number = data[i];

    if(!stash.find(e => stash.find(f => e + f == number))){
        invalid_number = number;
        break;
    };
    stash.shift();
    stash.push(number);
}

for(var i = 0; i < data.length; i++){
    let sub_total = 0;
    let sub_index = i;

    while(sub_total < invalid_number){
        sub_total += data[sub_index];
        sub_index++;
    }

    if(sub_total === invalid_number){
        let sub_array = data.slice(i, sub_index);
        console.log(Math.max(...sub_array) + Math.min(Math.min(...sub_array)));
        break;
    }
}