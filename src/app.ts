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
    .option('-g --get [param]',
    `Get params from server. Available params:
     registered_room - get all registered rooms names
     room - get all created rooms
     room/0 - get created room by id 
     room/state/0 - get created room state by id
     client - get all connected clients 
    `)
    .version('0.1.0')
    .parse(process.argv);

let http = cli.ssl ? "https://" : "http://";
let host = cli.address || "localhost";
let port = cli.port || 2657;
let route = cli.route || "/monitor";
let opearion = cli.get ? "/" + cli.get : "";
let url = http + host + ":" + port + route + opearion;


let WAITING = true;

if (cli.verbose)
    console.log("Connecting to " + url + " ...")

//allow self-signed SSL sertificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

request.get(url, (err, res, body) => {
    if (err)
        console.log("Failed to connect to " + url + "\n" + err);
    else if (res.statusCode == 404)
        console.log("Requested item was not found");
    else {
        let info = JSON.parse(body);
        if (opearion == "") {
            console.log("Registered rooms: " + info.registeredRoomsCount);
            console.log("Created rooms: " + info.createdRoomsCount)
            console.log("Connected clients: " + info.connectedClientsCount)
        }
        // else if (opearion == "/registered_room") {
        //     console.log("Registered rooms: " + info.registeredRoomsCount);
        //     console.log("Created rooms: " + info.createdRoomsCount)
        //     console.log("Connected clients: " + info.connectedClientsCount)
        // }
        else {

            console.log(info)
        }
    }
    WAITING = false;
});




function wait() { if (WAITING) setTimeout(wait, 100); };
wait();