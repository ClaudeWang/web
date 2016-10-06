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
		this.bombs = [];
		this.generateObstaclesAndCoins(subEleWidth, numLateral);
		this.spawnInterval = getRandomInt(15, 20);
		this.subEleWidth = subEleWidth;
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
		var bombs = [];
		if (this.type != "safe")
			return;
		var obstacles = [];
		for (var i = 0; i < numLateral; i++) {
			if (Math.random() < 0.6 && i % 2 == 0) {
				obstacles.push(new Bush(i, obstacle_width));
				this.obstacleCells[i] = 1;
				continue;
			}
			else if (Math.random() < 0.1) {
				coins.push(new Coin(i, obstacle_width));
			} else if (Math.random() < 0.25) {
				bombs.push(new Bomb(i, obstacle_width));
			}
		}
		this.obstacles = obstacles;
		this.coins = coins;
		this.bombs = bombs;
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
		this.bombs.forEach(function(item){
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
		context.drawImage(this.image, this.pos * this.width + 8, startY + 8, this.width - 16, height - 16);
	}
}

class Bomb {
	constructor(pos, width) {
		this.image = new Image();
		this.image.src = "resources/bomb.png";
		this.width = width;
		this.pos = pos;
	}
	display(startY, height, context) {
		context.drawImage(this.image, this.pos * this.width + 8, startY + 8, this.width - 16, height - 16);
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
