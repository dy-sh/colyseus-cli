This command-line app allows to remote monitoring colyseus server. You can watch the number of rooms created, the number of connected users, the state of rooms and much more.

You need to intall [colyseus-monitor](https://www.npmjs.com/package/colyseus-monitor) library on server side to use this app.

The current version of CLI works with colyseus version 0.4.

## How to install

```bash
npm i colyseus-cli -g
```

and do not forget to install [colyseus-monitor](https://www.npmjs.com/package/colyseus-monitor) in your app.

## How to use
 
Run colyseus server and execute:  

```bash
colyseus-cli
```

This simple command (without any parameters) will try to connect to colyseus-monitor at `http://localhost:2657/monitor`, and you will see real-time monitoring of yor app:

```bash
colyseus-cli
```

```
Created rooms: 20  
Connected clients: 40  
```


If you using SSL (https instead of http) you can execute with `--ssl` parameter:  

```bash
colyseus-cli --ssl
```

Now, the app will try to connect to the server at `https://localhost:2657/monitor`.

You can execute `col` instead of `colyseus-cli` (it is the same).

There is an opportunity to set an address to a remote server to which you want to connect:

```bash
colyseus-cli --address www.myserver.com --port 3000
```

Call `--verbose` to see some debug information (such as resulting request to the server).

Execute `--help` parameter to get more help.

### Some more commands:  

`-a, --address [address]` - Sever address (default: "localhost")  

`-p, --port <number>` - Port to connect (default: 2657) 

`-r, --route <url>` - Route to connect (default: "/monitor")  

`-s, --ssl` - Use SSL (https instead of http)  

`-g, --get <param>` - Get params from server. Available params:

 `registered_room` - get all registered rooms names    
 `room` - get all created rooms  
 `room/0` - get created room by id  
 `room/state/0` - get created room state by id  
 `client` - get all connected clients  

`-l, --loop [time]` - Repeat the request after a specified time (defaut: 1000), and display the changes in real time. This option is enabled by default for root monitoring (when `--get` flag is not defined), set `-l 0` if you want to disable it.

`-v, --verbose` - Verbose output

`-V, --version` - Output the version number

`-h, --help` - Output usage information
