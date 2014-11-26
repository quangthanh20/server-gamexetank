// Socket get room
function onRoomsGet( number ) {
    //console.log(numberPlayerRoom);  
    //console.log(rooms);
    number = number || 1;
    var array = [];
    var i;
    //var temp = [];
    for (i = 0; i < rooms.length; i++) {
        var temp = [];
        if ( numberPlayerRoom[rooms[i]] ) {
		   //temp[rooms[i]] = numberPlayerRoom[rooms[i]];
            array.push(numberPlayerRoom[rooms[i]]);
        } else {
             array.push(0);
        }
        
	};
    //console.log(array); 
    if ( number == 1 ) {
        this.emit("get room", rooms, array);
    }else {
        if ( number == 2 ) {
            socket.sockets.emit("get room", rooms, array);
        }     
    }
};

// Socket get room
function onCheckRoom( data ) {
    var temp = 0;
    if ( numberPlayerRoom[data.room] ) {
        temp = numberPlayerRoom[data.room];
    }
    //console.log(temp);
    this.emit("check room", {number: temp, name: data.room});   
    
}


// Socket new room
function onNewRooms(nameRoom) {
    //console.log(nameRoom);
    var flag = true;
    var array = [];
    var i;
    for (i = 0; i < rooms.length; i++) {
        var temp = [];
        if ( numberPlayerRoom[rooms[i]] ) {
		   //temp[rooms[i]] = numberPlayerRoom[rooms[i]];
            array.push(numberPlayerRoom[rooms[i]]);
        } else {
             array.push(0);
        }
        if ( rooms[i] == nameRoom ) {
            flag = false;
        }
        
	};
    
    if ( flag ) {
        array.push(0);
        rooms.push(nameRoom);
                
        socket.sockets.emit("get room", rooms, array);
        
    } else {
        this.emit("room exist", nameRoom);
    }
}
