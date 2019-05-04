const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const app = express();
const MongoClient = require("mongodb").MongoClient;
const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://thebestmotherfucking.website/';
let index_html;
let links = [];
let imgs = [];
let scripts = [];

const options = {
    key: fs.readFileSync('keys/localhost.key'),
    cert: fs.readFileSync('keys/localhost.crt')
};

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);

app.get("/*", function(req, res){
    console.log(req.url);
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
    res.end("404: Response not found!");
}

rp(url)
    .then(function(html){
        //success!
        index_html = html;
        let item;
        let request;
        for (let i = 0; i < $('link', html).length; i++) {
            item = $('link', html)[i].attribs.href;
            if (item && !(item.toString().startsWith("https://")
                || item.toString().startsWith("http://"))) {
                links.push(url.concat(item));
                request = https.get(url.concat(item), function(response) {
                    response.pipe(fs.createWriteStream("public/".concat(item)));
                });
            }
        }
        for (let i = 0; i < $('img', html).length; i++) {
            item = $('img', html)[i].attribs.src;
            if (item && !(item.toString().startsWith("https://")
                || item.toString().startsWith("http://"))) {
                imgs.push(url.concat(item));
                request = https.get(url.concat(item), function(response) {
                    response.pipe(fs.createWriteStream("public/".concat(item)));
                });
            }
        }
        // for (let i = 0; i < $('script', html).length; i++) {
        // item = $('script', html)[0].children[0].data;
        // const text = item.match(/var scriptSrc = (.*);/);
        // eval(text);
        // console.log(scriptSrc);
        // request = https.get(url.concat(scriptSrc[0]), function(response) {
        //     response.pipe(fs.createWriteStream("public/".concat(scriptSrc[0])));
        // });
            // if (item && !(item.toString().startsWith("https://")
            //     || item.toString().startsWith("http://"))) {
            //     scripts.push(item);
            // }
            scripts.push(item);
        // }
        console.log(links);
        console.log(imgs);
        // console.log(scripts);
    })
    .catch(function(err){
        console.log(err);
    });

// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

mongoClient.connect(function(err, client){
    const db = client.db("websitesdb");
    const collection = db.collection("websites");
    let website = {link: url, page: index_html, images: imgs, lnks: links};
    collection.insertOne(website, function(err, result){

        if(err){
            return console.log(err);
        }
        fs.writeFile('public/index.html', result.ops[0]['page'], (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
        // console.log(result.ops);
        client.close();
    });
});

