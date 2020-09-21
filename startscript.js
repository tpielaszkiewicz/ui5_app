const { exec } = require("child_process");

var port = process.env.PORT || 3219;
console.log(exec);
console.log("Use port:" + port);
exec(`ui5 serve -p ${port} -o`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
