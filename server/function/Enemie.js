// New Enemie has create
function createEnemie( room ) {
    if ( playersRoom[room] ) {
        if ( playersRoom[room].length > 1) {
            if ( numberEnemies[room] < 5 && currentEnemies[room] > 0 ) {
                var tempMap = map[room].get(); 
                var location = RandomIntRange(0,2);
                var temp = tempMap.locationEnemie[location]; 
                var name = "enemie" + currentEnemies[room];
                var rotation = RandomIntRange(-1,4);
                var newEnemie = new Enemie(temp.x, temp.y, name, rotation);
                if ( !enemies[room] )  {
                    enemies[room] = [];
                }
                enemies[room][name] = newEnemie;
                //enemies.push(newEnemie);
                var post = ({
                    x: temp.x, 
                    y: temp.y, 
                    name: name, 
                    rotation: rotation, 
                    firePlayer: 1
                });
                
                socket.sockets.to(room).emit("new enemie", post);
                //this.emit("new enemie", {x: temp.x, y: temp.y, name: name, rotation: rotation});
                //console.log(enemies.length);    
                
                numberEnemies[room]++;
                currentEnemies[room]--;
            }
            if ( numberEnemies[room] > 0 ) {
                movingEnemies( room )
            }
        }
    }
    
}

// location enemie
function locationEnemie(data) {
    var enemie = enemies[data.room][data.name];
    
    // enemie not found
	if (!enemie) {
		util.log("enemie not found: "+data.name);
		return;
	};
    
    var temp;
    temp = enemie.get();
    tempX = Math.abs( temp.x - data.x );
    tempY = Math.abs( temp.y - data.y );     
    var post = ({
        name : temp.name,
        x : data.x,
        y : data.y,        
    });
    if ( tempX > 100 || tempY > 100 ) {
        socket.sockets.to(data.room).emit("moved to enemie", post);
    }
    enemie.set(data);
    
}

function movingEnemies( room ) { 
    
    var x;
    var i = 0;
    var array =[];
     //console.log(numberEnemies);
    var previous = -1;
    for (x in enemies[room]) { 
        //console.log(i); 
        array.push(enemies[room][x]);
        var temp = randomRotation( 0, i, previous);
        previous = temp;
        //console.log(x);
        //console.log(temp);
        rotation = movingOneEnemies( array[temp], room );
        var temp = array[temp].get();
        //console.log(rotation);
        socket.sockets.to(room).emit("moving enemie", {name: temp.name, rotation: rotation});
        
        //var enemie = array[temp].get();
        /*enemie.firePlayer = 1;
        array[temp].set(enemie);*/
        
        
        i++;
    }   
    
    var previous = -1; 
    //console.log(array.length);
    for( i = 0; i < array.length ; i++  ) {  
        //var temp = randomRotation( 0, i, previous);
        var temp = randomRotation( 0, 10, previous);
        //previous = temp;
        //temp = array[temp].get();
        //console.log(i);
        //console.log(temp);
        var tempArray = array[i].get();         
        //console.log(temp);
        //console.log(temp.name);
        //sleep(100);
        if ( temp == 5 || temp == 9 || temp == 1 ) {
            socket.sockets.to(room).emit("fire enemie", {name: tempArray.name,  firePlayer: 1}); 
        } 
    }

    		
}

function randomRotation( min, max, rotation ) {
    //max = max + 1;
    //console.log(min + " " + max + " " + rotation);
    var temp = RandomIntRange(min,max);    
    if ( rotation != -1 && max > 3 ) {
        while ( temp == rotation ) {
            temp = RandomIntRange(min,max);            
        }
    }
    //console.log("emty : " + temp);
    /*console.log(temp + ' ');
    console.log(rotation);*/
    //sleep(50);
    
    return temp
}

function movingOneEnemies( enemies, room ) { 
                
    /*var tempRotation = randomRotation( enemies.tempRotation );
    enemies.tempRotation = tempRotation;*/
    //var tempMap = map.get(); 
    var location = RandomIntRange(0,2);
    var player = playersRoom[room][location]; 
    var enemie = enemies.get();
    
    calculatePlay( enemie, player );
    var rand = enemiesRotation[Math.floor(Math.random() * enemiesRotation.length)];
    //console.log(enemiesRotation);
    return rand;
    /*enemie.rotation = enemiesRotation[rand];
    enemies.set(enemie);*/
    //enemies.set(enemie);
    /*if ( enemies.health > 0 ) {
       GameTest.Enemies.moving( enemies, enemies.tempRotation, 100 );       
    }*/
}

function calculatePlay( enemies, player ) {
    //console.log(enemies);
    //console.log(player);
    
    var Px = player.getX(),
        Py = player.getX(),
        Ex = enemies.x,
        Ey = enemies.y;
    var tempX,tempY;
    tempX = Ex - Px;
    tempY = Ey - Py; 
    var array = [];
    enemiesRotation = [];    
    
    if ( tempX > 0 ) {
        enemiesRotation.push(3); 
        array.push(2);          
    } else {            
        enemiesRotation.push(2);
        array.push(3);
    }
    
    if ( tempY > 0 ) {            
        enemiesRotation.push(1);
        array.push(0); 
    } else {            
        enemiesRotation.push(0);
        array.push(1);
    } 
    var rand = array[Math.floor(Math.random() * array.length)];
    /*console.log(array);
    console.log(rand);*/
    enemiesRotation.push(rand);
}

// ini
function scanRoom() {
    var i;
    for (i = 0; i < rooms.length; i++) {        
        if ( playersRoom[rooms[i]] ) {
            var temp = gameClass[rooms[i]].get();            
            if ( temp.restart == 0  ) {
                createEnemie( rooms[i] )
            }
        }
        //console.log(playersRoom[rooms[i]]);
	}; 
    setTimeout(scanRoom, 1000);
}