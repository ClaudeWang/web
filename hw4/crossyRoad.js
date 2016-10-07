window.onload = function() {
	canvas = document.getElementById("canvas");
	var app = createApp(canvas);
	//set app refreshing rate.

	setInterval(app.refresh, 50);
	setInterval(app.spawnControl, 100);
	//bind key to control.
	document.onkeydown = function(e) {
		switch(e.keyCode) {
			case 37:
				e.preventDefault();
				app.moveMe("l");
				break;
			case 38:
				e.preventDefault();
				app.moveMe("f");
				break;
			case 39:
				e.preventDefault(); 
				app.moveMe("r");
				break;
			case 32:
				e.preventDefault();
				app.restartGame();
				break;
			case 40:
				e.preventDefault();
				break;
		}
	}
	//simlutate keyboard control on the user interface.
	document.getElementById("up").onclick = ()=>app.moveMe("f")
	document.getElementById("left").onclick = ()=>app.moveMe("l")
	document.getElementById("right").onclick = ()=>app.moveMe("r")
	document.getElementById("start").onclick = ()=>app.restartGame()
}
var createApp = function(canvas) {
	
	const HEIGHT = canvas.height;
	const WIDTH = canvas.width;
	const NUMROADS = 10;
	const WIDTHROAD = HEIGHT/NUMROADS;
	const NUMLATERALPOS = 10;
	const LATERALOFFSET = WIDTH / NUMLATERALPOS;
	const MESIZE = LATERALOFFSET;
	
	const MEBORDER = 1;
	const SPAWNROAD = 1;

	var c = canvas.getContext("2d");
	var treeFlag = 1;
	var me = new Me(NUMLATERALPOS / 2);
	var spawnCounter = 0;
	var log_direction = 1;
	var currentlog = null;
	var distance = 0;
	var coin = 0;
	var gameOver = false;
	var numMoves = 0;

	//initialization.
	var roads = generateRoads(NUMROADS);
	var curRoad = roads[0];
	var controlDir = 1;


	var highscore = 0;
	var highDistance = 0;
	function reinit() {
		c = canvas.getContext("2d");
		treeFlag = 1;
		me = new Me(NUMLATERALPOS / 2);
		spawnCounter = 0;
		log_direction = 1;
		currentlog = null;
		distance = 0;
		coin = 0;
		gameOver = false;
		numMoves = 0;
		//initialization.
		roads = generateRoads(NUMROADS);
		curRoad = roads[0];
		controlDir = 1;
	}
	//testing intialization.
	function refresh() {
		if (gameOver)
			return
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
			checkBombs();
		}
		if (gameOver)
			return
		//display score on the screen.
		c.fillStyle = "white";
		c.font = "bold 30px sans-serif"
		c.fillText("Score: " + coin, WIDTH - 180, 30)
		c.fillText("Distance: " + distance, WIDTH - 180, 60)
		c.fillText("Moves: " + numMoves, WIDTH - 180, 90)

		c.fillStyle = "white";
		c.fillText("High Score: " + highscore, 30, 30)
	}
	function generateRoad() {
		var rand = Math.random();
		var direction = 1;
		if (rand < 0.2){
			log_direction *= -1;
			return new Road("river", "blue", LATERALOFFSET, 
				NUMLATERALPOS, log_direction);
		}
		else if (rand < 0.5){
			log_direction *= -1;
			return new Road("road", "grey", LATERALOFFSET, 
				NUMLATERALPOS, log_direction);
		}
		else
			return new Road("safe", "green", LATERALOFFSET, 
				NUMLATERALPOS, 1);
	}

	function generateRoads(numRoads) {
		var roads = Array(numRoads + 20).fill();
		var obstacles = [];
		// make sure the obstacles don't take the spwan position of me.
		roads.forEach(function(item, i) {
			roads[i] = generateRoad();
			if (i != 0 && roads[i - 1].type == "river" 
				&& roads[i].type != "river") {
				roads[i]=new Road("safe","green",LATERALOFFSET,NUMLATERALPOS,1);
			}
		})
		//take out the sprite on Me postion.
		roads[SPAWNROAD] = new Road("safe","green",LATERALOFFSET,NUMLATERALPOS);
		obstacles = roads[SPAWNROAD].obstacles.filter((e) => e.pos != me.pos);
		var bombs = roads[SPAWNROAD].bombs.filter((e) => e.pos != me.pos);
		roads[SPAWNROAD].obstacles = obstacles;
		roads[SPAWNROAD].bombs = bombs;
		return roads;
	}

	function displayRoad(index, road) {
		road.display(0, (NUMROADS - 1 - index) * WIDTHROAD, WIDTH, WIDTHROAD,c);

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
			if (currentlog != null) {
				terminateGame();
				return;
			}
			//check if at boudary.
			if ((me.pos == 0 && controlDir == 1) || 
				(me.pos == NUMLATERALPOS - 1 && controlDir == -1))
				return;
			//check if there is an obstacle on the left.
			roads[SPAWNROAD].obstacles.forEach(function(item) {
				if (item.pos == me.pos - controlDir) {
					collision = true;
				}	
			})
			if (!collision){
				me.pos -= controlDir;
				numMoves++;
			}
		} else if (direction == "r") {
			if (currentlog != null) {
				terminateGame();
				return;
			}
			//check if at boudary.
			if ((me.pos == NUMLATERALPOS - 1 && controlDir == 1) || 
				(me.pos == 0 && controlDir == -1)) {
				return;
			}
			//check obstacles
			roads[SPAWNROAD].obstacles.forEach(function(item) {
				if (item.pos == me.pos + controlDir) {
					collision = true;
				}	
			})
			if (!collision) {
				me.pos += controlDir;
				numMoves++;
			}
		} else{
			//generate a new row and swap
			moveForward();
		}
	}

	function spawnControl() {
		//control the spawn of cars and logs.
		spawnCounter ++;
		roads.forEach((road) => road.spawn(spawnCounter, NUMLATERALPOS));
	}

	function moveForward() {
		// check if should release me from the moving log.
		if (currentlog != null) {
			currentlog.releaseMe();
			currentlog = null;
		}
		var collision = false;
		var obstacles = roads[SPAWNROAD + 1].obstacles;
		//only move forward if there is no obstacle ahead.
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
		//adding a new road.
		var temp = roads.slice(1);
		var newRoad = generateRoad();
		if (temp[temp.length - 1].type == "river" && newRoad.type != "river") {
			newRoad = new Road("safe","green",LATERALOFFSET,NUMLATERALPOS,1);
		}
		//create a valid path.
		var oldRoad = temp[temp.length - 1];	
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
			terminateGame()
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
		// terminate the ganem if the player falls into water. 
		if (inWater) {
			terminateGame("You have fallen into the river.");
		}
		//check if me has reached either end of the bound.
		if (me.pos < 0 || me.pos >= NUMLATERALPOS)
			terminateGame();
	}

	function checkCoins() {
		//check the coins on the cureent road.
		roads[SPAWNROAD].coins.forEach(function(item, index) {
			if (roundOffsetCollide(me, item)) {
				//update the score accordingly and reverse back the control.
				coin ++;
				controlDir = 1;
				roads[SPAWNROAD].coins.splice(index, 1);
			}
		});
	}

	function checkBombs() {
		//check if the play hits any bomb.
		roads[SPAWNROAD].bombs.forEach(function(item, index) {
			if (roundOffsetCollide(me, item)) {
				//reverse the control.
				controlDir = -1;
				coin--;
				roads[SPAWNROAD].bombs.splice(index, 1);
			}
		});
	}

	function collide(item1, item2) {
		if ((item1.pos > item2.pos + 1) || (item1.pos + 1 < item2.pos))
			return false;
		return true;
	}

	function roundOffsetCollide(item1, item2) {
		//helper function for checking the position equality.
		if (Math.round(item1.pos) == Math.round(item2.pos))
			return true;
		return false;
	}

	function terminateGame() {
		c.clearRect(0, 0, canvas.width, canvas.height);
		if (highscore < coin){
			highscore = coin;
		}
		if (highDistance < distance){
			highDistance = distance;
		}
		c.font = "bold 30px sans-serif"	
		gameOver = true;
		c.fillStyle = "white";
		c.fillRect(0, 0, WIDTH, HEIGHT);
		c.fillStyle = "red";
		c.fillText("GAME OVER", 300, HEIGHT / 2);
		c.font = "bold 15px sans-serif";
		c.fillText("Press space to restart the game.",290, HEIGHT / 2 + 30)

		//print score
		c.fillStyle = "red";
		c.font = "bold 30px sans-serif"
		c.fillText("Score: " + coin, WIDTH - 180, 30)
		c.fillText("Distance: " + distance, WIDTH - 180, 60)
		c.fillText("Moves: " + numMoves, WIDTH - 180, 90)

		c.fillStyle = "red";
		c.fillText("High Score: " + highscore, 30, 30)
	}

	function restartGame() {
		if (gameOver)
			reinit();
	}
	return {
		refresh: refresh,
		moveMe: moveMe,
		spawnControl: spawnControl,
		restartGame: restartGame
	}
}

//helper functions
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

