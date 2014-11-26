/**************************************************
** GAME ENEMIE CLASS
**************************************************/
var Enemie = function(startX, startY, name, rotation) {
	var x = startX,
		y = startY,
        rotation = rotation,
        //firePlayer = 1,        
        array = [],
        name = name;
   
    
	// Getters and setters 
    var get = function() {       
        array.x = x;
        array.y = y;
        array.name = name;
        array.rotation = rotation;        
		return array;
	};       

	var set = function(newArray) {
		x          = newArray.x;
        y          = newArray.y;
        rotation   = newArray.rotation;
	};

	

	// Define which variables and methods can be accessed
	return {
	    get: get,		
		set: set,	
	}
};

// Export the Enemies class so you can use it in
// other files by using require("Enemies").Player
exports.Enemie = Enemie;