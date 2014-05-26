var base = "C:\Users\George\Google Drive\nodeWeb"
var config = "./config.json";
var http = require('http');
var fs = require('fs');
var mime = require('mime');
var confOpts = {};
fs.readFile(config, function (err, data) {
    confOpts = JSON.parse(data);
}

http.createServer(function (req, res) {
    if (req.url == "/") {
        url = "/index.html"
    } else {
        url = req.url
    }
    fs.readFile(confOpts.docroot + url, function (err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end(confOpts.fnftext); 
        } else {
            res.writeHead(200, {'Content-Type': mime.lookup(confOpts.docroot + url)});
            res.end(data); 
        }
    });
}).listen(confOpts.port, confOpts.ip);
console.log('Server running at http://127.0.0.1:1337/');