//Note there are 6 images, which is the same as the number of cards.
const NUMIMAGES = 6;
var enabled = [];
var cardsImage = [0, 1, 2, 3, 4, 5];
var timeInterval = [];
var intervalFunctions = [];
window.onload = function(){
	//bind all the functions.
	cardsImage.forEach(function(item, i) {
		document.getElementById("btn-" + i).onclick = function() {disableMe(i)};
	});
}
//set interval function for each card.
cardsImage.forEach(function(item, i) {
	enabled[i] = true;
	timeInterval[i] = Math.random() * 4000 + 1000;
	var timer = setInterval(function(){changeImage(i)}, timeInterval[i]);
	intervalFunctions[i] = timer;
});
//disable the interval function by setting the flag and switch to a new handler.
function disableMe(which) {
	enabled[which] = false;
	var button = document.getElementById("btn-" + which);
	button.onclick = null;
	button.onclick = function() {enableMe(which)};
	button.innerHTML = "Start";
	clearInterval(intervalFunctions[which]);

	//trick to generate number between 1000 to 5000.
	var randomInterval = Math.random() * 4000 + 1000;
	timeInterval[which] = randomInterval;
	var timer = setInterval(function(){changeImage(which)}, randomInterval);
	intervalFunctions[which] = timer;
}
//enable the interval function by setting the flag and switch to a new handler.
function enableMe(which) {
	enabled[which] = true;
	var button = document.getElementById("btn-" + which);
	button.onclick = null;
	button.onclick = function() {disableMe(which)};
	button.innerHTML = "Stop";
}
//change the image to the one indicated by the new index.
function changeImage(i) {
	if (enabled[i]) {
		cardsImage[i] = (cardsImage[i] + 1) % NUMIMAGES;
		document.getElementById("img" + i).src = "resources/" + cardsImage[i] + ".jpg";
	}
}