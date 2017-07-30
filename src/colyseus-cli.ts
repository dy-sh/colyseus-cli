#!/usr/bin/env node

/**
 * Created by Derwish (derwish.pro@gmail.com) on 30.07.2017.
 * License: MIT
 */

import * as cli from 'commander';
import * as request from 'request';
import * as logUpdate from 'log-update';

cli
    .option('-a, --address <address>', 'Sever address (default: "localhost")')
    .option('-p, --port <number>', 'Port to connect (default: 2657)')
    .option('-r, --route <url>', 'Route to connect (default: "/monitor")')
    .option('-s, --ssl', 'Use SSL (https instead of http)')
    .option('-g --get <param>',
    `Get params from server. Available params:
     registered_room - get all registered rooms names
     room - get all created rooms
     room/0 - get created room by id 
     room/state/0 - get created room state by id
     client - get all connected clients 
    `)
    .option('-l, --loop [time]', 'Repeat the request after a specified time (defaut: 1000), and display the changes in real time. This option is enabled by default for root monitoring (when --get flag is not defined), set "-l 0" if you want to disable it.')
    .option('-v, --verbose', 'Verbose output')
    .version('0.1.0')
    .parse(process.argv);

let http = cli.ssl ? "https://" : "http://";
let host = cli.address || "localhost";
let port = cli.port || 2657;
let route = cli.route || "/monitor";
let opearion = cli.get ? "/" + cli.get : "";
let url = http + host + ":" + port + route + opearion;

let loop = null;
if (!cli.get && cli.loop == null) loop = 1000; //enable it for root monitoring ("/monitor")
else if (cli.loop === true) loop = 1000; //"-l" without parameters
else if (cli.loop == 0) loop = null; //disable it if "-l 0"
else if (cli.loop) loop = cli.loop; // set number value


let WAITING = true;

if (cli.verbose)
    console.log("Connecting to " + url + " ...")

//allow self-signed SSL sertificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let requestsSended = 0;

function sendRequest() {
    request.get(url, (err, res, body) => {
        requestsSended++;

        let text = "";
        if (err)
            text = "Failed to connect to " + url + "\n" + err;
        else if (res.statusCode == 404)
            text = "Requested item was not found";
        else {
            let info = JSON.parse(body);

            if (opearion == "") {
                // text += "Registered rooms: " + info.registeredRoomsCount + "\n";
                text += "Created rooms: " + info.createdRoomsCount + "\n";
                text += "Connected clients: " + info.connectedClientsCount + "\n";
            }
            // else if (opearion == "/registered_room") {
            // }
            else {
                text = JSON.stringify(info, null, 4);
            }
        }

        if (loop) {
            let points = requestsSended % 20 + 1;
            text += "\n" + ".".repeat(points);
        }

        logUpdate(text);

        if (!loop)
            WAITING = false;
        else {
            setTimeout(() => sendRequest(), loop);
        }
    });
}
sendRequest();


function wait() { if (WAITING) setTimeout(wait, 100); };
wait();