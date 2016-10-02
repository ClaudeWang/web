var curRoad = null;
window.onload = function() {
	canvas = document.getElementById("canvas");
	var app = createApp(canvas);
	setInterval(app.refresh, 50);
	setInterval(app.spawnControl, 100);
	document.onkeydown = function(e) {
		switch(e.keyCode) {
			case 37:
				app.moveMe("l");
				break;
			case 38:
				app.moveMe("f");
				break;
			case 39: 
				app.moveMe("r");
				break;
		}
	}
}

class Road {
	constructor(type, color, subEleWidth, numLateral) {
		this.image = new Image();
		this.image.src = "resources/road.jpg";
		this.type = type;
		this.color = color;
		this.obstacles = this.generateObstacles(subEleWidth, numLateral);
		this.cars = [];
		this.spawnInterval = getRandomInt(15, 20);
		this.subEleWidth = subEleWidth;
		if (Math.random() > 0.5) {
			this.direction = -1;
		}else {
			this.direction = 1;
		}
		this.speed = (Math.random() * 0.2 + 0.1) * this.direction;
	}
	generateObstacles(obstacle_width, numLateral) {
		//randomly generate obstacles.
		if (this.type != "safe")
			return [];
		var obstacles = [];
		for (var i = 0; i < numLateral; i++) {
			if (Math.random() < 0.3) {
				obstacles.push(new Bush(i, obstacle_width));
			}
		}
		return obstacles;
	}

	addCar(car_width, numLateral) {
		if (this.type == "road"){
			if (this.speed < 0)
				this.cars.push(new Car(this.speed, 0, numLateral, "resources/car_2_reverse.png", car_width));
			else
				this.cars.push(new Car(this.speed, 0, -1, "resources/car_2.png", car_width));
		}
	}

	display(startX, startY, width, height, context) {
		if (this.type == "road") {
			context.drawImage(this.image, startX - 1, startY, width + 4, height);
		} else {
			context.fillStyle=this.color;
			context.fillRect(startX, startY, width, height);
		}
		//recursively call display function on cars/obstacles.
		this.cars.forEach(function(item){
			item.display(startY, height, context);
		})

		this.obstacles.forEach(function(item){
			item.display(startY, height, context);
		})
	}
	spawn(spawnCounter, numLateral) {
		if (spawnCounter % this.spawnInterval == 0)
			this.addCar(this.subEleWidth, numLateral);
	}
}

// class River extends Road{
// 	constructor(subEleWidth, numLateral, direction, color) {
// 		this.color = color;
// 		this.spawnInterval = 15;
// 		this.subEleWidth = subEleWidth;
// 		this.direction = direction
// 		this.speed = 0.2 * this.direction; //speed of the floating logs.
// 		this.logs = [];
// 	}

// 	spawn(spawnCounter, numLateral) {
// 		if (spawnCounter % this.spawnInterval == 0)
// 			this.addLog(this.subEleWidth, numLateral);
// 	}

// 	display(startX, startY, width, height, context) {
// 		context.color = this.color;
// 		context.fillRect(startX, startY, width, height);
// 		//recursively call display function on cars/obstacles.
// 		this.logs.forEach(function(item){
// 			item.display(startY, height, context);
// 		})
// 	}

// 	addLog(width, numLateral) {
// 		if (this.speed > 0)
// 			this.logs.push(new Log(this.speed, 0, width));
// 		else
// 			this.logs.push(new Log(this.speed, numLateral, width));
// 	}
// }

class Car {
	constructor(speed, acceleration, pos, imagePath, width) {
		this.width = width;
		this.image = new Image();
		this.image.src = imagePath;
		this.speed = speed;
		this.acceleration = acceleration;
		this.pos = pos;
	}
	update() {
		this.pos += this.speed;
		this.speed += this.acceleration;
	}
	display(startY, height, context) {
		this.update();
		context.drawImage(this.image, this.pos * this.width, startY + 10, this.width , height - 20);
	}
}

class Bush {
	constructor(pos, width) {
		this.image = new Image();
		this.image.src = "resources/bush.png";
		this.width = width;
		this.pos = pos;
		//console.log(width, this.pos);
	}
	display(startY, height, context) {
		context.drawImage(this.image, this.pos * this.width, startY, this.width, height);
	}
}
class Me {
	constructor(position) {
		this.meImage = new Image();
		this.meImage.src = "resources/me.png";
		this.pos = position;
	}
	getImage() {
		return this.meImage;
	}
}

class Log {
	constructor(speed, pos, width) {
		this.width = width;
		this.speed = speed;
		this.pos = pos;
	}
	update() {
		this.pos += this.speed;
	}
	display(startY, height, context) {
		this.update();
		context.fillStyle = "brown";
		context.fillRect(this.image, this.pos * this.width, startY + 10, this.width , height - 20);
	}
}

var createApp = function(canvas) {
	var c = canvas.getContext("2d");
	const HEIGHT = canvas.height;
	const WIDTH = canvas.width;
	const NUMROADS = 10;
	const WIDTHROAD = HEIGHT/NUMROADS;
	const NUMLATERALPOS = 10;
	const LATERALOFFSET = WIDTH / NUMLATERALPOS;
	const MESIZE = LATERALOFFSET;
	
	const MEBORDER = 1;
	const SPAWNROAD = 1;
	var treeFlag = 1;
	var me = new Me(NUMLATERALPOS / 2);
	var c = canvas.getContext("2d")
	var spawnCounter = 0;

	//initialization.
	var roads = generateRoads(NUMROADS);
	curRoad = roads[0];
	//refresh(roads, canvas);
	//testing intialization.
	console.log(roads)
	function refresh() {
		//clear the canvas.
		// var r = Math.random();
		var c = canvas.getContext("2d");
		c.clearRect(0, 0, canvas.width, canvas.height);
		//go through all the roads and display them.
		roads.forEach(function(item, index) {
			displayRoad(index, item);
		})
		displayMe()
	}
	function generateRoad() {
		var rand = Math.random();
		if (rand < 0.2)
			return new Road("river", "blue", LATERALOFFSET, NUMLATERALPOS);
		else if (rand < 0.5)
			return new Road("road", "grey", LATERALOFFSET, NUMLATERALPOS);
		else
			return new Road("safe", "green", LATERALOFFSET, NUMLATERALPOS);
	}

	function generateRoads(numRoads) {
		var roads = []
		//make sure the obstacles don't take the spwan position of me.
		for (var i = 0; i < numRoads + 20; i++) {
			roads[i] = generateRoad();
		}
		roads[SPAWNROAD] = new Road("safe", "green", LATERALOFFSET, NUMLATERALPOS);
		var obstacles = roads[SPAWNROAD].obstacles.filter((e) => e.pos != me.pos);
		roads[SPAWNROAD].obstacles = obstacles;
		return roads;
	}

	function displayRoad(index, road) {
		road.display(0, (NUMROADS - 1 - index) * WIDTHROAD, WIDTH, WIDTHROAD, c);

	}
	function displayMe() {
		c.fillStyle="black";
		c.drawImage(me.meImage, me.pos * LATERALOFFSET + MEBORDER, 
			(NUMROADS - 1 - SPAWNROAD) * WIDTHROAD + MEBORDER, 
			LATERALOFFSET - 2 * MEBORDER, WIDTHROAD - 2 * MEBORDER
			)
	}
	function moveMe(direction) {
		var collision = false;
		if (direction === "l") {
			if (me.pos == 0)
				return;
			//check if there is an obstacle on the left.
			roads[SPAWNROAD].obstacles.forEach(function(item) {
				if (item.pos == me.pos - 1) {
					collision = true;
				}	
			})
			if (!collision)
				me.pos--;
		} else if (direction == "r") {
			if (me.pos == NUMLATERALPOS - 1) {
				return;
			}
			roads[SPAWNROAD].obstacles.forEach(function(item) {
				if (item.pos == me.pos + 1) {
					collision = true;
				}	
			})
			if (!collision)
				me.pos++;
		} else{
			//generate a new row and swap
			moveForward();
		}
	}

	function spawnControl() {
		spawnCounter ++;
		roads.forEach((road) => road.spawn(spawnCounter, NUMLATERALPOS));
	}

	function moveForward() {
		//only move forward if there is no obstacle ahead.
		var collision = false;
		var obstacles = roads[SPAWNROAD + 1].obstacles;
		obstacles.forEach(function(item) {
			if (item.pos == me.pos){
				collision = true;
				return;
			}
		})
		if (collision)
			return;
		var temp = roads.slice(1);
		temp.push(generateRoad());
		roads = temp;
	}
	return {
		refresh: refresh,
		moveMe: moveMe,
		spawnControl: spawnControl
	}
}

//helper functions
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

