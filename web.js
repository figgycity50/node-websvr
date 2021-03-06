var http = require('http');
var fs = require('fs');
var mime = require('mime');
var markdown = require( "markdown" ).markdown;
var config = "./config.json";
var confOpts = {};
fs.readFile(config, {encoding: "ASCII"}, function (err, data) {
    confOpts = JSON.parse(data);
    console.log(confOpts);
});
setTimeout(gogogo, 5000);
function gogogo() {
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
            console.log(mime.lookup(confOpts.docroot + url));
            res.writeHead(200, {'Content-Type': mime.lookup(confOpts.docroot + url)});
            if (mime.lookup(confOpts.docroot + url) == "text/x-markdown") {
                res.end(markdown.toHTML(data));
            } else {
                res.end(data); 
            }
        }
    });
}).listen(confOpts.port, confOpts.ip);
console.log('Server running at http://' + confOpts.ip + ':' + confOpts.port);
}