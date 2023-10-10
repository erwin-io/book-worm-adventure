import { Express } from "express";
import express = require("express");
import * as path from "path";

const app: Express = express();

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/templates/home.html'));
});
app.get('/page/:path', function (req, res) {
  res.sendFile(path.join(__dirname+'/templates/'+ req.params.path +'.html'));
});
app.get('/enemy', function (req, res) {
  res.sendFile(path.join(__dirname+'/templates/battle_screen.html'));
});
app.get('/checkword/:path', function (req, res) {
  var fs = require('fs');
  fs.readFile(path.join(__dirname+"/wordlists/wordlist.txt"), 'utf8', function(err: any, data: { toString: () => string; }) {
    if (err) throw err;
    if(data.toString().split("\r\n").some((x: string)=>x.toLowerCase() === `*${req.params.path.toLowerCase()}*`)) {
      return res.send("t");
    } else {
      return res.send("f");
    }
  });

});
app.get('/specialword/:path/:word', function (req, res) {
  var fs = require('fs');
  fs.readFile(path.join(__dirname+"/wordlists/wordlist_" + req.params.path.toLowerCase() + ".txt"), 'utf8', function(err: any, data: { toString: () => string; }) {
    if (err) throw err;
    if(data.toString().split("\r\n").some((x: string)=>x === `*${req.params.word.toLowerCase()}*`)) {
      return res.send("t");
    } else {
      return res.send("f");
    }
  });
});

app.use("/", express.static(path.join(__dirname, "/")));

const PORT: any = process.env.PORT ?? 8080;
var server = app.listen(8080, () =>
console.log(
  `The server is running on port ${PORT} use this link http://localhost:${PORT}/`,
),
);