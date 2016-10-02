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
	constructor(type, color, subEleWidth, numLateral, direction) {
		this.image = new Image();
		this.image.src = "resources/road.jpg";
		this.type = type;
		this.color = color;
		this.obstacles = [];
		this.cars = [];
		this.logs = [];
		this.coins = [];
		this.obstacleCells = [];
		this.generateObstaclesAndCoins(subEleWidth, numLateral);
		this.spawnInterval = getRandomInt(15, 20);
		this.subEleWidth = subEleWidth;
		//this.speed = 0.1;
		if (type == "river") {
			this.speed = 0.1 * direction;
		}else {
			this.speed = (Math.random() * 0.1 + 0.1) * direction;
		}
	}
	generateObstaclesAndCoins(obstacle_width, numLateral) {
		//randomly generate obstacles and coins.
		var obstacles = [];
		var coins = [];
		if (this.type != "safe")
			return;
		var obstacles = [];
		for (var i = 0; i < numLateral; i++) {
			this.obstacleCells.push(0);
			if (Math.random() < 0.6 && i % 2 == 0) {
				obstacles.push(new Bush(i, obstacle_width));
				this.obstacleCells[i] = 1;
				continue;
			}
			if (Math.random() < 0.001) {
				coins.push(new Coin(i, obstacle_width));
			}
		}
		this.obstacles = obstacles;
		this.coins = coins;
	}

	addSprite(width, numLateral) {
		if (this.type == "road"){
			if (this.speed < 0)
				this.cars.push(new Car(this.speed, 0, numLateral, "resources/car_3_reverse.png", width));
			else
				this.cars.push(new Car(this.speed, 0, -1, "resources/car_2.png", width));
		}
		else if (this.type == "river") {
			if (this.speed < 0)
				this.logs.push(new Log(this.speed, numLateral, width))
			else
				this.logs.push(new Log(this.speed, -1, width))
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
		this.coins.forEach(function(item){
			item.display(startY, height, context);
		})
		this.logs.forEach(function(item){
			item.display(startY, height, context);
		})
	}
	spawn(spawnCounter, numLateral) {
		if (spawnCounter % this.spawnInterval == 0)
			this.addSprite(this.subEleWidth, numLateral);
	}
}

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
		context.drawImage(this.image, this.pos * this.width - 3, startY + 10, this.width + 6, height - 20);
	}
}

class Bush {
	constructor(pos, width) {
		this.image = new Image();
		this.image.src = "resources/bush.png";
		this.width = width;
		this.pos = pos;
	}
	display(startY, height, context) {
		context.drawImage(this.image, this.pos * this.width, startY, this.width, height);
	}
}
class Coin {
	constructor(pos, width) {
		this.image = new Image();
		this.image.src = "resources/coin.png";
		this.width = width;
		this.pos = pos;
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
	reposition() {
		this.pos = Math.round(this.pos);
	}
}

class Log {
	constructor(speed, pos, width) {
		this.width = width;
		this.speed = speed;
		this.pos = pos;
		this.carry = null;
		this.image = new Image();
		this.image.src = "resources/log.png";
	}
	update() {
		this.pos += this.speed;
		if (this.carry != null)
			this.carry.pos = this.pos;
	}
	display(startY, height, context) {
		this.update();
		context.drawImage(this.image, this.pos * this.width, startY + 10, this.width , height - 20);
	}
	carryMe(me) {
		this.carry = me;
	}
	releaseMe() {
		this.carry = null;
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
	var log_direction = 1;
	var currentlog = null;
	var distance = 0;
	var coin = 0;
	var gameOver = false;
	var numMoves = 0;
	//initialization.
	var roads = generateRoads(NUMROADS);
	curRoad = roads[0];
	//testing intialization.
	function refresh() {
		//clear the canvas.
		var c = canvas.getContext("2d");
		c.clearRect(0, 0, canvas.width, canvas.height);
		//go through all the roads and display them.
		roads.forEach(function(item, index) {
			displayRoad(index, item);
		})
		displayMe();
		if (roads[SPAWNROAD].type == "road"){
			checkRoadValidity();
		}
		else if(roads[SPAWNROAD].type == "river") {
			checkRiverValidity();
		}
		else {
			checkCoins();
		}
		//score
		c.fillStyle = "white";
		c.font="30px Georgia";
		c.fillText("Score: " + coin, WIDTH - 180, 30)
		c.fillText("Distance: " + distance, WIDTH - 180, 60)
		c.fillText("Moves: " + numMoves, WIDTH - 180, 90)
	}
	function generateRoad() {
		var rand = Math.random();
		var direction = 1;
		if (rand < 0.2){
			log_direction *= -1;
			return new Road("river", "blue", LATERALOFFSET, NUMLATERALPOS, log_direction);
		}
		else if (rand < 0.5){
			log_direction *= -1;
			return new Road("road", "grey", LATERALOFFSET, NUMLATERALPOS, log_direction);
		}
		else
			return new Road("safe", "green", LATERALOFFSET, NUMLATERALPOS, 1);
	}

	function generateRoads(numRoads) {
		var roads = []
		//make sure the obstacles don't take the spwan position of me.
		for (var i = 0; i < numRoads + 20; i++) {
			roads[i] = generateRoad();
			if (i != 0 && roads[i - 1].type == "river" && roads[i].type != "river") {
				roads[i] = new Road("safe", "green", LATERALOFFSET, NUMLATERALPOS, 1);
			}
		}
		roads[SPAWNROAD] = new Road("safe", "green", LATERALOFFSET, NUMLATERALPOS);
		var obstacles = roads[SPAWNROAD].obstacles.filter((e) => e.pos != me.pos);
		roads[SPAWNROAD].obstacles = obstacles;

		// //go through the roads to make sure there is always a valid path.
		// roads.forEach(function(item, index) {
		// 	//exclude the first row, both roads must be safe.
		// 	if (index != 0 && item.type == "safe" && roads[index - 1].type == "safe") {
		// 		roads[index].obstacleCells.forEach(function(item, i) {
		// 			if (i == 0 && roads[index].obstacleCells[0] == 1 && roads[index - 1].obstacleCells[0] == 0) {
		// 				//the obstacle must be cleared.
		// 				roads[index].obstacles = roads[index].obstacles.filter((obs) => obs.pos != 0);
		// 				roads[index].obstacleCells[0] = 0;
		// 			}
		// 			else if (i == NUMLATERALPOS-1 && roads[index].obstacleCells[NUMLATERALPOS-1] == 1 && roads[index-1].obstacleCells[NUMLATERALPOS - 1] == 0) {
		// 				//the obstacle must be cleared.
		// 				roads[index].obstacles = roads[index].obstacles.filter((obs) => obs.pos != NUMLATERALPOS - 1);
		// 				roads[index].obstacleCells[NUMLATERALPOS - 1] = 0;
		// 			}
		// 			else if (roads[index].obstacleCells[i] == 1 && roads[index - 1].obstacleCells[i] == 1) {
		// 				roads[index].obstacles = roads[index].obstacles.filter((obs) => obs.pos != i);
		// 				roads[index].obstacleCells[i] = 0;
		// 			}
		// 		});
		// 	}
		// })
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
			if (!collision){
				me.pos--;
				numMoves++;
			}
		} else if (direction == "r") {
			if (me.pos == NUMLATERALPOS - 1) {
				return;
			}
			roads[SPAWNROAD].obstacles.forEach(function(item) {
				if (item.pos == me.pos + 1) {
					collision = true;
				}	
			})
			if (!collision) {
				me.pos++;
				numMoves++;
			}
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
		if (currentlog != null) {
			currentlog.releaseMe();
			currentlog = null;
		}
		var collision = false;
		var obstacles = roads[SPAWNROAD + 1].obstacles;
		obstacles.forEach(function(item) {
			if (roundOffsetCollide(item, me)){
				collision = true;
			}
		})
		if (collision)
			return;
		//repposition me.
		distance ++;
		me.reposition();
		var temp = roads.slice(1);
		var newRoad = generateRoad();
		if (temp[temp.length - 1].type == "river" && newRoad.type != "river") {
			newRoad = new Road("safe", "green", LATERALOFFSET, NUMLATERALPOS, 1);
		}
		//create a valid path.
		var oldRoad = temp[temp.length - 1];
		// if (newRoad.type == "safe" && oldRoad.type == "safe"){
		// 	newRoad.obstacleCells.forEach(function(item, i) {
		// 		if (i == 0 && newRoad.obstacleCells[0] == 1 && oldRoad.obstacleCells[1] == 0) {
		// 			//the obstacle must be cleared.
		// 			newRoad.obstacles = newRoad.obstacles.filter((obs) => obs.pos != 0);
		// 			newRoad.obstacleCells[0] = 0;
		// 		}
		// 		else if (i == NUMLATERALPOS-1 && newRoad.obstacleCells[NUMLATERALPOS-1] == 1 && old.obstacleCells[NUMLATERALPOS - 1] == 0) {
		// 			//the obstacle must be cleared.
		// 			newRoad.obstacles = newRoad.obstacles.filter((obs) => obs.pos != NUMLATERALPOS - 1);
		// 			newRoad.obstacleCells[NUMLATERALPOS - 1] = 0;
		// 		}
		// 		else if (newRoad.obstacleCells[i] == 1 && oldRoad.obstacleCells[i] == 1) {
		// 			newRoad.obstacles = newRoad.obstacles.filter((obs) => obs.pos != i);
		// 			newRoad.obstacleCells[i] = 0;
		// 		}
		// 	});
		// }	
		temp.push(newRoad);
		roads = temp;
		numMoves++;
	}

	function checkRoadValidity() {
		//check if there is any invalid state. If so, terminate the game.
		//check collision with the cars.
		var car_collision = false;
		var cars = roads[SPAWNROAD].cars;
		cars.forEach(function(item) {
			if (collide(me, item))
				car_collision = true;
		})
		if (car_collision)
			console.log("GameOver:collide");
		//check if in water.

	}
	function checkRiverValidity() {
		//check if me is in water.
		var inWater = true;
		roads[SPAWNROAD].logs.forEach(function(item){
			if (collide(item, me)){
				inWater = false;
				currentlog = item;
				item.carryMe(me);
			}
		}); 
		if (inWater) {
			console.log("GameOver: in water")
		}
		//check if me has reached either end of the bound.
		if (me.pos < 0 || me.pos >= NUMLATERALPOS)
			console.log("GameOver: reached the bounds.")
	}

	function checkCoins() {
		roads[SPAWNROAD].coins.forEach(function(item, index) {
			if (roundOffsetCollide(me, item)) {
				coin ++;
				roads[SPAWNROAD].coins.splice(index, 1);
			}
		});
	}

	function collide(item1, item2) {
		if ((item1.pos > item2.pos + 1) || (item1.pos + 1 < item2.pos))
			return false;
		return true;
	}

	function roundOffsetCollide(item1, item2) {
		if (Math.round(item1.pos) == Math.round(item2.pos))
			return true;
		return false;
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

