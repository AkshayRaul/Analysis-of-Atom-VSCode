var exec = require('child_process').exec;
const fs = require('fs');

const task = process.argv[2] || 'sloc';


switch (task) {
    case 'sloc': 
        exec("sloc -f json -e node_modules ../vscode", {maxBuffer: 2048 * 2048}, function(error, stdout, stderr){
            if (error) {
                console.log("Some error occurred: Exiting the program", error);
            } else {
                console.log("success");
                // console.log(JSON.parse(stdout));
                fs.writeFile('outputs/vscode/sloc.json', stdout, (err) => {
                    if (err) {
                        console.log("Err: ", err);
                    }
                });
            }
        });
    break;
    case 'vscode-testcases':
        exec("./../vscode/scripts/test.sh", {maxBuffer: 2048 * 2048}, function(error, stdout, stderr){
            if (error) {
                console.log("Some error occurred: Exiting the program", error);
            } else {
                console.log("success");
                // console.log(JSON.parse(stdout));
                fs.writeFile('outputs/vscode/testcases.json', stdout, (err) => {
                    if (err) {
                        console.log("Err: ", err);
                    }
                });
            }
        });
    default:
        console.log("Please enter a valid task name");
}