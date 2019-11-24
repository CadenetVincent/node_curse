"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var express = require("express");
var metrics_1 = require("./metrics");
var path = require('path');
var app = express();
var port = '3000';

app.use(express.static(path.join(__dirname, '../public')))

app.set('views', __dirname + "./../views")
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.write('Hello world');
    res.end();
});

app.get('/metrics.json', function (req, res) {
    metrics_1.MetricsHandler.get(function (err, result) {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

app.get(
  '/hello/:name', 
  (req, res) => res.render('hello.ejs', {name: req.params.name})
)

app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + port);
});
