/**************************************************
** NODE.JS REQUIREMENTS
**************************************************/

var util = require("util"),					// Utility resources (logging, object inspection, etc)
	io = require("socket.io"),				// Socket.IO 
    //express = require('express'),
    //app = express(),
    //http = require('http'),
    //server = http.createServer(app),
    //server = http.createServer(app).listen(process.env.PORT || 8000);
    //io = require('socket.io').listen(server),
	player = require("./class/Player").Player,	// Player class    
    game = require("./class/Game").Game,	        // Game class
    MapGame = require("./class/Map").Map,	        // Map class 
    Enemie = require("./class/Enemie").Enemie,	        // Enemie class  
    //time = require("exectimer"),   
    path = require('path'),  
    //sleep = require('sleep'),    
    fs = require('fs');       

eval(fs.readFileSync('./server/config/init.js')+'');

eval(fs.readFileSync('./server/function/math.js')+'');
eval(fs.readFileSync('./server/function/JareUtils.js')+'');



/**************************************************
** GAME INITIALISATION
**************************************************/
function initServer() {
	// Create an empty array to store players
	players = [];
    // Create an empty array to store bullets
	bullets = [];
    // Create an empty array to store Enemies
	enemies = [];
    
    numberPlayerRoom = [];
    playersRoom = [];
     
	// Set up Socket.IO to listen on port 8000
	socket = io.listen(process.env.PORT || 8000);    
    //console.log(functionPlayer);
    
	// Configure Socket.IO
	socket.configure(function() {
		// Only use WebSockets
		socket.set("transports", ["websocket"]);

		// Restrict log output
		socket.set("log level", 2);
	});
    console.log('test game');
	// Start listening for events
	//setEventHandlers();
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
    console.log('test game');
	// Socket.IO
	socket.sockets.on("connection", onSocketConnection);
};

// New socket connection
function onSocketConnection(client) {
    //console.log(client);
	util.log("New player has connected: "+client.id);
    console.log('test game');
	// Listen for client disconnected
	client.on("disconnect", onClientDisconnect);
    
    // Listen for new player message
	client.on("check room", onCheckRoom);

	// Listen for new player message
	client.on("new player", onNewPlayer);

	// Listen for move player bullets
	client.on("bullets player", onBulletsPlayer);
    
    // Listen for player message
	client.on("move player", onMovePlayer);   
 
    // Listen for Enemie message
	client.on("move enemie", locationEnemie);  
    
    // Listen for game set
	client.on("game set", onGameSet);
    
    // Listen for player die
    client.on("player die", onPlayerDie);
    
    // Listen for game restart
    client.on("game restart", onGameRestart);
    
    // Listen for game die
    client.on("game die", onGameDie);
    
    // Listen for rooms get
    client.on("rooms get", onRoomsGet);
    
    // Listen for new room
    client.on("new room", onNewRooms);
};



eval(fs.readFileSync('./server/function/Player.js')+'');
eval(fs.readFileSync('./server/function/Game.js')+'');
eval(fs.readFileSync('./server/function/Enemie.js')+'');
eval(fs.readFileSync('./server/function/Room.js')+'');

/*function loop() {
    console.log('1');
    setTimeout(loop, 1000);
}*/

/**************************************************
** RUN THE GAME
**************************************************/
initServer();
//scanRoom()
//createEnemie();


 