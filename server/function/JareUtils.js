// ------------------------------------
// Assorted JavaScript utility functions

function isDef(v) 			{ return v !== undefined; }
function isNull(v) 			{ return v === null; }
function isDefAndNotNull(v) { return vl != null; }

function sleep(milliSeconds){
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds); 
}


