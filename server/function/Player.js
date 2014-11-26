// Socket client has disconnected
function onClientDisconnect() {
    //players
	util.log("Player has disconnected: "+this.id);
    //disconnect(client);
	var removePlayer = playerById(this.id);

	// Player not found
	if (!removePlayer) {
		util.log("Player not found: "+this.id);
		return;
	};

    numberPlayer--;
    numberPlayerRoom[this.room]--
    //console.log(this.room);
    //console.log(numberPlayerRoom[this.room]);
	// Remove player from players array
	players.splice(players.indexOf(removePlayer), 1);
    playersRoom[this.room].splice(playersRoom[this.room].indexOf(removePlayer), 1);
    //console.log(playersRoom[this.room]);
    //remote.kill(this.id);
    delete removePlayer;
	// Broadcast removed player to connected socket clients
    //console.log(numberPlayer);
    this.leave(this.room);
    onRoomsGet(2);
    gameClass[this.room].setPlay(0); 
    gameClass[this.room].setConnection(numberPlayerRoom[this.room]); 
    if ( numberPlayerRoom[this.room] == 1 ) {
        var temp = [];
        temp.score = 0;
        temp.restart = 1;
        temp.paused = 0;
        onGameDisconnect(temp, this.room);
    }
    if ( numberPlayerRoom[this.room] == 0 ) {
        delete playersRoom[this.room];
        var temp = [];        
        temp.restart = 0;
        temp.paused = 0;
        temp.countRestart = 0;
        gameClass[this.room].set(temp);
        gameClass[this.room].setScore(0);
    }
	this.broadcast.to(this.room).emit("remove player", {id: this.id});
};

// New player has joined
function onNewPlayer(data) {
	// Create a new player
    // store the room name in the socket session for this client
    socket.room = data.room;   
    this.room = data.room 
    //var array = [ "Enemie" , "player" ];
    map[socket.room] = new MapGame(data.file);
    //console.log(filepath);
    map[socket.room].init();
    var tempMap = map[socket.room].get();
    
      // Create Game
    if ( !gameClass[socket.room] )  {
        gameClass[socket.room] = new game(); 
        //gameClass[socket.room].setPlay(1);    
        gameClass[socket.room].setMax(2);          
    }
    
    //gameClass[socket.room].setPlay(1);
    
    
    if ( !numberPlayerRoom[socket.room] )  {
        numberPlayerRoom[socket.room] = 0;
        numberEnemies[socket.room] = 0;
    }
    
    //console.log(numberPlayerRoom[socket.room]);
    var tempGame = gameClass[socket.room].get();
    //console.log(tempGame);
    if ( tempGame.numberConnection <= tempGame.numberMax-1 ) {
        gameClass[socket.room].setPlay(1);            
        var temp = tempMap.locationPlayer[numberPlayerRoom[socket.room]];    
        //console.log(temp);
        
        maxEnemies[socket.room] = currentEnemies[socket.room] = tempMap.max;  
        
        var newPlayer = new player(this.id, temp.x, temp.y, data.name, numberPlayerRoom[socket.room]);
        
       		
        //console.log(socket);
        //console.log(io);    
        // send client to room 1
    	this.join(socket.room);
        
        numberPlayer++;
        numberPlayerRoom[socket.room]++;
        
        gameClass[this.room].setConnection(numberPlayerRoom[this.room]);
        
    	newPlayer.id = this.id;    
    	// Broadcast new player to connected socket clients
        var tempPlayer = newPlayer.get();   
        //console.log(tempPlayer);
        var post = ({
            id: newPlayer.id, 
            x: tempPlayer.x, 
            y: tempPlayer.y, 
            name: tempPlayer.playName, 
            order: tempPlayer.order,
            restart: 0,
        });
        //socket.sockets.in(socket.room).emit('new player', post); 
    	this.broadcast.to(socket.room).emit("new player", post);
        post.max = tempMap.max;
        if ( tempGame.restart == 1 ) {
            post.restart = 1;
        }
        this.emit("new player", post);
        //players.push(newPlayer);
    	// Send existing players to the new player
     
        if ( playersRoom[socket.room] )  {
        	var i, existingPlayer;
        	for (i = 0; i < playersRoom[socket.room].length; i++) {
        		existingPlayer = playersRoom[socket.room][i];
                var tempPlayer = existingPlayer.get();
                //console.log(tempPlayer);
                var post = ({
                    id: existingPlayer.id, 
                    x: tempPlayer.x, 
                    y: tempPlayer.y, 
                    name: tempPlayer.playName, 
                    order: tempPlayer.order
                });
        		this.emit("new player", post);
        	};
        }
    		
    	// Add new player to the players array
        //console.log(players.length);
    	players.push(newPlayer);   
        if ( !playersRoom[socket.room] )  {
            playersRoom[socket.room] = [];
        }
        //console.log(playersRoom[socket.room]);
        playersRoom[socket.room].push(newPlayer);
        onRoomsGet(2);
    }
    //console.log(numberPlayer);    
    /*console.log(players.length);
    console.log(players);*/
    /*console.log(players.length);*/    
};

// New player has joined
function onBulletsPlayer(data) {
    // Find player in array
	var bulletsPlayer = playerById(this.id);
    
    // Player not found
	if (!bulletsPlayer) {
		util.log("Player not found: "+this.id);
		return;
	};
    
    // Update player position
	bulletsPlayer.setX(data.x);
	bulletsPlayer.setY(data.y);
    bulletsPlayer.setRotation(data.rotation);
    bulletsPlayer.setFire(data.fire);
    //console.log(data.rotation);
    // Broadcast updated position to connected socket clients
    var post = ({
        id: bulletsPlayer.id, 
        x: bulletsPlayer.getX(), 
        y: bulletsPlayer.getY(), 
        rotation: bulletsPlayer.getRotation(), 
        fire: bulletsPlayer.getFire()
    });
	this.broadcast.to(data.room).emit("bullets player", post);
    
};

// Player has moved
function onMovePlayer(data) {
	// Find player in array
	var movePlayer = playerById(this.id);

	// Player not found
	if (!movePlayer) {
		util.log("Player not found: "+this.id);
		return;
	};

	// Update player position
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
    movePlayer.setRotation(data.rotation);
    //console.log(data.rotation);
	// Broadcast updated position to connected socket clients
    var post = ({
        id: movePlayer.id, 
        x: movePlayer.getX(), 
        y: movePlayer.getY(), 
        rotation: movePlayer.getRotation()
    });
	this.broadcast.to(data.room).emit("move player", post);
};

/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
// Find player by ID
function playerById(id) {
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i].id == id)
			return players[i];
	};
	
	return false;
};





