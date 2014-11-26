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
    



 