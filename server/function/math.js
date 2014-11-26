
// Assorted math utilities

function Pow2(v) {
	return v*v;
}

function Lerp(a,b,t) {
	return a+(b-a)*t;
}

function Clamp(v,a,b) {
	return Math.max(a,Math.min(v,b));
}

function RandomInt(v) {
	return Math.floor(Math.random()*v);
}

function RandomIntRange(a,b) {
	return Math.floor(Math.random()*(b-a)+a);
}

function RandomFloat(v) {
	return Math.random()*v;
}

function RandomFloatRange(a,b) {
	return Math.random()*(b-a)+a;
}
