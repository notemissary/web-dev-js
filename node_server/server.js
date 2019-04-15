const http = require('http');
const express = require('express');
const app = express();
const fs = require("fs");

http.createServer(app).listen(3000);

// app.post('/asd', function() {
//     console.log("Server is listening to port:3000");
// });
//
// app.get("/asd", function(req, res) {
//     console.log(req.body);
//     res.status(200).send(req.body);
// });
//
// app.get("/", function(req, res){
//     console.log(req.body);
//     res.status(200).send("hello world");
// });

app.get("/*", function(req, res){
    console.log(req.body);
    if (req.url.startsWith("/public/")) {
        let filePath = req.url.substr(1);
        fs.readFile(filePath, function (error, data) {
            if (error) {
                f404(res);
            } else {
                res.setHeader("Content-Type", "text/html");
                res.end(data);
            }
        })
    } else {
        f404(res);
    }
});

function f404(res){
    res.statusCode = 404;
    res.end("Response not found!");
}