function onGameSet(data) {	
	
    // Update game position
    var temp = gameClass[data.room].get();
    if ( data.score > temp.score ) {
        gameClass[data.room].setScore(data.score); 
    }
    
    if ( data.name != '' ) {
        maxEnemies[data.room]--;
        //console.log(maxEnemies);
        delete enemies[data.name];
        socket.sockets.to(data.room).emit("detele enemie", { name : data.name, max : maxEnemies[data.room] });
    }
    
    gameClass[data.room].set(data);
    
    temp = gameClass[data.room].get();
   
    
    numberEnemies[data.room]--;
    //console.log(data);
    //console.log(temp);
	// Broadcast updated position to connected socket clients
    var post = ({
        score: temp.score, 
        restart: temp.restart, 
        paused: temp.paused, 
        countRestart: temp.countRestart 
    });
    
	this.broadcast.to(data.room).emit("game get", post);
};

// player die
function onPlayerDie(data) {
   gameClass[data.room].setPlay(0);
   var temp = gameClass[data.room].get();
   //console.log(temp);
   var tempCountRestart = temp.countRestart;
   if ( tempCountRestart == 0 ) {
        tempCountRestart == 1;
   } 
   if ( temp.numberPlay == 0 || temp.numberPlay < 0 ) {
        //console.log(data);
        gameClass[data.room].setPlay(2); 
        var post = ({
            score: 1, 
            restart: 1, 
            paused: 0, 
            countRestart: tempCountRestart,
        });
        gameClass[data.room].setRestart(1);      
        socket.sockets.to(data.room).emit("game get", post);
        
   } else {
        this.broadcast.to(data.room).emit("player die", {id: data.id});
   }  
}
// game has set
function onGameRestart(data) {
	
	// Update game position 
    gameClass[data.room].setScore(0);     
    gameClass[data.room].set(data);    
    var temp = gameClass[data.room].get();
    var tempMap = map[data.room].get()    
        
    maxEnemies[data.room] = currentEnemies[data.room] = tempMap.max;  
   
    numberEnemies[data.room] = 0;
    
    var post = ({
        score: temp.score, 
        restart: temp.restart, 
        paused: temp.paused, 
        countRestart: temp.countRestart
    });
    //console.log(data);
    //console.log(post);
	// Broadcast updated position to connected socket clients
	this.broadcast.to(data.room).emit("game get", post);
};

// game has set
function onGameDisconnect(data, room) {
    // Update game position
  
    //gameClass.setScore(0);     
    gameClass[room].set(data); 
    gameClass[room].setPlay(0);   
    var temp = gameClass[room].get();
    var tempMap = map[room].get()    
    temp.score = 1;
    temp.countRestart = 1;
        
    maxEnemies[room] = currentEnemies[room] = tempMap.max;  
   
    numberEnemies[room] = 0;
    numberPlayerRoom[room] = 1;
    
    var tempMap = map[room].get()    
    var tempLocationPlayer = tempMap.locationPlayer[0];
    
   	var i, existingPlayer;
	for (i = 0; i < playersRoom[room].length; i++) {		
        var tempPlayer = playersRoom[room][i].get();        
        var post = ({            
            x: tempLocationPlayer.x, 
            y: tempLocationPlayer.y,             
            order: 0,
        });
        playersRoom[room][i].set(post);		
	}; 
    
    var post = ({
        score: temp.score, 
        restart: temp.restart, 
        paused: temp.paused, 
        countRestart: temp.countRestart, 
        win: 1,
        x: tempLocationPlayer.x, 
        y: tempLocationPlayer.y,          
        order: 0
         
    });
    // Broadcast updated position to connected socket clients
	socket.sockets.to(room).emit("game get", post);
    
    
}

// game die
function onGameDie(data) {
   var temp = gameClass[data.room].get();
   var tempCountRestart = temp.countRestart;
   if ( tempCountRestart == 0 ) {
        tempCountRestart == 1;
   } 
   var post = ({
            score: 1, 
            restart: 1, 
            paused: 0, 
            countRestart: tempCountRestart, 
            lost: 1,
        });
   gameClass[data.room].setRestart(1);
        //console.log(post);
   socket.sockets.to(data.room).emit("game get", post); 
}

