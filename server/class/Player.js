/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(id, startX, startY, name, order) {
	var x = startX,
		y = startY,
        rotation = -1,
        firePlayer,
        //fire = 0,
        order = order,
		id = id,
        array = [],       
        playName = name;
   
    
	// Getters and setters
	var getX = function() {
		return x;
	};

	var getY = function() {
		return y;
	};
    
    var get = function() {
        array.id = id;
        array.x = x;
        array.y = y;
        array.playName = playName;
        array.order = order;
		return array;
	};
    
   	var getRotation = function() {
		return rotation;
	};
    
    var getFire = function() {
		return firePlayer;
	};
    
    var set = function(newArray) {
       
        x = newArray.x;
        y = newArray.y;       
        order = newArray.order;		
	};

	var setX = function(newX) {
		x = newX;
	};

	var setY = function(newY) {
		y = newY;
	};
    
    var setRotation = function(newRotation) {
		rotation = newRotation;
	};
    
    var setFire = function(newFire) {
		firePlayer = newFire;
	};

	// Define which variables and methods can be accessed
	return {
	    get: get,
		getX: getX,
		getY: getY,
        getRotation: getRotation,
        getFire: getFire,
        set:set,
		setX: setX,
		setY: setY,
        setRotation: setRotation,
        setFire: setFire,
        //playName: playName,
		id: id,
	}
};

// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.Player = Player;