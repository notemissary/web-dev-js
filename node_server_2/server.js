const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const app = express();

app.use(express.static(__dirname + '/public'));

const options = {
    key: fs.readFileSync('keys/localhost.key'),
    cert: fs.readFileSync('keys/localhost.crt')
};

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);

app.post("/table.xml", function(req, res) {
    let filePath = req.url.substr(1);
    // console.log(filePath);
    fs.readFile("./public/".concat(filePath), function (error, data) {
        // console.log(data);
        if (error) {
            f404(res);
        } else {
            res.setHeader("Content-Type", "text/xml");
            res.end(data);
        }
    })
});

app.get("/*", function(req, res){
    // console.log("HELLO");
    console.log(req.url);
    if (req.url.startsWith("/")) {
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
    res.end("404: Response not found!");
}
