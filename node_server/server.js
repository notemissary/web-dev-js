// app.use(express.static('static'));
// app.get('/health-check', (req, res) => res.sendStatus(200));
//
// http.createServer(app).listen(443);

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


var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var app = express();

var options = {
    key: fs.readFileSync('keys/localhost.key'),
    cert: fs.readFileSync('keys/localhost.crt')
};

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);


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
