#!/usr/bin / env node

/**
 * Created by Derwish (derwish.pro@gmail.com) on 30.07.2017.
 * License: MIT
 */


import * as program from 'commander');

program
    .version('0.1.0')
    .option('-h, --host <address>', 'Host address (default http://localhost)')
    .option('-p, --port <number>', 'Port to connect (default 2657)')
    .parse(process.argv);

let host = program.host || "http://localhost";
let port = program.port || 2657;
let url = host + ":" + port;

console.log(url);
