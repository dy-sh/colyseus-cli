#!/usr/bin / env node

/**
 * Created by Derwish (derwish.pro@gmail.com) on 30.07.2017.
 * License: MIT
 */


import * as cli from 'commander';
import * as request from 'request';

cli
    .option('-s, --server <address>', 'Sever address (default: "http://localhost")')
    .option('-p, --port <number>', 'Port to connect (default: 2657)')
    .option('-r, --route <url>', 'Route to connect (default: "/monitor")')
    .option('-v, --verbose', 'Verbose output')
    .version('0.1.0')
    .parse(process.argv);

let host = cli.host || "http://localhost";
let port = cli.port || 2657;
let route = cli.route || "/monitor";
let url = host + ":" + port + route;

if (cli.verbose)
    console.log("Connecting to " + url)

request(url, (err, res, body) => {
    if (err) return "ERROR: " + err;

    console.log(url);
});

