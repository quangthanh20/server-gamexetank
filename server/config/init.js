
/**************************************************
** GAME VARIABLES
**************************************************/

// ----------------------------------
// global

var socket,		// Socket controller
	players,	// Array of connected players
    bullets,	// Array of connected bullets
    gameClass,       // game in server
    map = [],        // map in server
    room,       // room in server
    numberRoom = 0,       // so room in server
    numberPlayer = 0,       // so player in server
    enemies;            // Array of connected Enemies
    //numberEnemies = 0;            // so Enemies in server
    
var numberEnemies = [];// s? lu?ng quái xu?t hi?n 1 l?n
var maxEnemies = [];      // so luong quai cua 1 man
var currentEnemies = [];      // so luong quai chua xu?t hi?n

//maxEnemies = currentEnemies = 20;   

var enemiesRotation; 

// rooms which are currently available in chat
var rooms = ['room1','room2','room3'];
var playersRoom;
var numberPlayerRoom;       // so player in room in server

var gameClass = [];

