"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = __importStar(require("path"));
const app = express();
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/templates/home.html'));
});
app.get('/page/:path', function (req, res) {
    res.sendFile(path.join(__dirname + '/templates/' + req.params.path + '.html'));
});
app.get('/enemy', function (req, res) {
    res.sendFile(path.join(__dirname + '/templates/battle_screen.html'));
});
app.get('/checkword2/:path', function (req, res) {
    var fs = require('fs');
    fs.readFile(path.join(__dirname + "/wordlists/wordlist.txt"), 'utf8', function (err, data) {
        if (err)
            throw err;
        return res.send({
            keyword: `*${req.params.path.toLowerCase()}*`,
            found: data.toString().split("\r\n").some(x => x.toLowerCase() === `*${req.params.path.toLowerCase()}*`),
            data: data.toString().split("\r\n")
        });
    });
});
app.get('/checkword/:path', function (req, res) {
    var fs = require('fs');
    fs.readFile(path.join(__dirname + "/wordlists/wordlist.txt"), 'utf8', function (err, data) {
        if (err)
            throw err;
        if (data.toString().split("\r\n").some(x => x.toLowerCase() === `*${req.params.path.toLowerCase()}*`)) {
            return res.send("t");
        }
        else {
            return res.send("f");
        }
    });
});
app.get('/specialword/:path/:word', function (req, res) {
    var fs = require('fs');
    fs.readFile(path.join(__dirname + "/wordlists/wordlist_" + req.params.path.toLowerCase() + ".txt"), 'utf8', function (err, data) {
        if (err)
            throw err;
        if (data.toString().split("\r\n").some((x) => x === `*${req.params.word.toLowerCase()}*`)) {
            return res.send("t");
        }
        else {
            return res.send("f");
        }
    });
});
app.use("/", express.static(path.join(__dirname, "/")));
app.use(express.static(__dirname + "/public/"));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080;
var server = app.listen(8080, () => console.log(`The server is running on port ${PORT} use this link http://localhost:${PORT}/`));
//# sourceMappingURL=server.js.map