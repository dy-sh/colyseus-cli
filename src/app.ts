#!/usr/bin / env node

/**
 * Created by Derwish (derwish.pro@gmail.com) on 30.07.2017.
 * License: MIT
 */

import * as cli from 'commander';
import * as request from 'request';

cli
    .option('-a, --address <address>', 'Sever address (default: "localhost")')
    .option('-p, --port <number>', 'Port to connect (default: 2657)')
    .option('-r, --route <url>', 'Route to connect (default: "/monitor")')
    .option('-s, --ssl', 'Use SSL (https instead of http)')
    .option('-v, --verbose', 'Verbose output')
    .version('0.1.0')
    .parse(process.argv);

let http = cli.ssl ? "https://" : "http://";
let host = cli.address || "localhost";
let port = cli.port || 2657;
let route = cli.route || "/monitor";
let url = http + host + ":" + port + route;

let waiting = true;

if (cli.verbose)
    console.log("Connecting to " + url + " ...")

//allow self-signed SSL sertificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

request.get(url, (err, res, body) => {
    if (err) {
        console.log("Failed to connect to " + url + "\n" + err);
    }
    else if (res.statusCode == 404)
        console.log("Requested item is not found");
    else {
        console.log(body)
    }
    waiting = false;
});




function wait() { if (waiting) setTimeout(wait, 100); };
wait();