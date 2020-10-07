var exec = require('child-process-promise').exec;
// var port = process.env.PORT || 3219;
// console.log(exec);
// console.log("Use port:" + port);
// exec(`ui5 serve -p ${port} -o`, (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });
console.log("Building the ui5");
exec(`npm run ui5-build`).then(function (result) {
    console.log("Start server");
    exec("npm run server-start");
})
.catch(function (err) {
    console.error('ERROR: ', err);
});
