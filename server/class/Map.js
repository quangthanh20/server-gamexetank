/**************************************************
** MAP CLASS
**************************************************/
var fs = require('fs');
    
var Map = function(filepath) {
	var filepath = "./server/map/" + filepath,
        array = [],        
        isLoaded = false;
        locationEnemie = [],        
        locationPlayer = [],
        maxEnemiesMap = 0;
    
	// Getters and setters
	var get = function() {	   
        array.locationPlayer = locationPlayer;
        array.locationEnemie = locationEnemie;
        array.max = maxEnemiesMap;
		return array;
	};       
	
    var init = function() {    	              
        var temp = [];          
        var json = JSON.parse(fs.readFileSync(filepath, 'utf8')); 
        initMap(json);     	
    };

    var initMap = function(map) {              
 	    var x;
        for (x in map) {
            if ( x == 'max' ) {
                maxEnemiesMap = map[x];                
            }else {
                if ( x != ' max' ) {
                    var y;
                    for (y in map[x]) {                    
                        var temp = [];
                        temp.x = map[x][y].x;
                        temp.y = map[x][y].y;
                        if ( x == 'Enemies' ) {
                            locationEnemie.push(temp);
                        }
                        
                        if ( x == 'player' ) {
                            locationPlayer.push(temp);
                        }                
                    }
                }
           }
       } 
    };
    
    /*var createObject = function(Object,) {
        
    };*/

	// Define which variables and methods can be accessed
	return {
		get: get,       
        init: init,	        				
	}
};

// Export the Map class so you can use it in
// other files by using require("Map").Player
exports.Map = Map;