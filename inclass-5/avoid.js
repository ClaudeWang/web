var enableAvoid = true;
window.onload = function(){
	//bind functions.
	document.getElementById("clickMe").addEventListener("click", self.gameOver_func, true);
	document.getElementById("clickMe").addEventListener("mouseover", self.moveAway_func, true);
	window.onkeydown = disable;
	window.onkeyup = enable;
}
var moveAway_func = function moveAway() {
	if (enableAvoid) {
		//randomly choose a position to move the button to.
		var btn = document.getElementById("clickMe");
		btn.style["top"] = window.innerWidth * Math.random() + "px";
		btn.style["left"] = window.innerHeight * Math.random() + "px";
	}
}
var gameOver_func = function gameOver() {
	var button = document.getElementById("clickMe");
	//change the event handler.
	button.innerHTML = "Restart Game"
	button.removeEventListener("mouseover", self.moveAway_func, true);
	button.removeEventListener("click", self.gameOver_func, true);
	button.addEventListener("click", self.restart_func, true);
	document.getElementById("gameOver").style["display"] = "block";
}
var restart_func = function restart() {
	var button = document.getElementById("clickMe");
	//change the event handler back to the inital state.
	button.addEventListener("mouseover", self.moveAway_func, true);
	button.removeEventListener("click", self.restart_func, true);
	button.addEventListener("click", self.gameOver_func, true);
	button.innerHTML="Click me";
	document.getElementById("gameOver").style["display"] = "none";
}
function disable(e) {
	console.log(e.keyCode)
	if (e.keyCode == 16){
		enableAvoid = false;
	}
}
function enable(e) {
	if (e.keyCode == 16){
		enableAvoid = true;
	}
}