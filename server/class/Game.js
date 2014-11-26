/**************************************************
** GAME CLASS
**************************************************/
var Game = function() {
	var score = 0,
		restart = 0,
        paused = 0,
        numberPlay = 0,
        numberConnection = 0,
        numberMax = 0,
        countRestart = 0,
        array = [];       

    // Getters and setters
	var get = function() {
	    array.score        = score;
        array.restart       = restart;
        array.paused          = paused;   
        array.countRestart  = countRestart; 
        array.numberPlay  = numberPlay;
        array.numberConnection  = numberConnection;
        array.numberMax  = numberMax;    
		return array;        
	};
	
	var set = function(newArray) {		
        restart       = newArray.restart;
        paused        = newArray.paused;
        countRestart  = newArray.countRestart;                
	};
    
    var setScore = function(newScore) {		
        score       = newScore;               
	};
    
    var setRestart = function(newRestart) {
        restart = newRestart;
    }
    
    var setMax = function(newMax) {
        numberMax = newMax;
    }
    var setPlay = function(newPlay) {
        if ( newPlay == 0 ) {
            if ( numberPlay > 0 ) {
                numberPlay--;
            }
        }else {
            if ( newPlay == 1 ) {
               numberPlay++; 
            }else {
               if ( newPlay == 2 ) {
                    numberPlay = numberConnection; 
               } 
            }
        }       
    }
    
    var setConnection = function(newConnection) {
        numberConnection = newConnection
    }
    	


	// Define which variables and methods can be accessed
	return {
		get: get,		
		set: set,
        setScore: setScore,	
        setMax: setMax,
        setPlay: setPlay,
        setRestart:setRestart,	
        setConnection:setConnection,	
	}
};

// Export the Game class so you can use it in
// other files by using require("Game").Game
exports.Game = Game;