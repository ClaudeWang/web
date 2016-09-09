'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");
	var buildings = []
	var sun_position = [50, 50]
	var carimg = new Image
	carimg.src = "car.png"
	// Create the ground
	var floor = canvas.height/2
	var car_position = [0, floor - 43]
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2
		var building_color = Math.floor(Math.random()*blgColors.length)

		//drawSun();
		buildings.push([x0, blgWidth, blgHeight, building_color])
		renderBuildings(x0, blgWidth, blgHeight, building_color)
	}

	var renderBuildings = function(x0, blgWidth, blgHeight, building_color) {
		var randomNum;
		c.fillStyle= blgColors[building_color]
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		c.fillStyle="yellow"
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				randomNum = Math.random()
				if (randomNum > 0.5)
					c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
			}
		}	
	}
	var controlHeight = function(e) {
		buildings.forEach(function(item, index) {
			var x0 = item[0]
			var blgWidth = item[1]
			var blgHeight = item[2]
			var building_color = item[3]
			if (e.clientX >= x0 && e.clientX <= x0 + blgWidth && e.clientY - 50 <= floor && e.clientY - 50 >= floor - blgHeight){
				delete buildings[index]
				buildings[index] = [x0, blgWidth, blgHeight + 10, building_color]
			}
		});
	}

	var drawSun = function() {
		sun_position[0] =  (sun_position[0] + 5) % canvas.width;
		c.fillStyle="yellow"
		c.beginPath()
		c.arc(sun_position[0], sun_position[1], 30, 30, Math.PI * 2, true)
		c.closePath()
		c.fill()
	}

	var drawCar = function() {
		c.drawImage(carimg, car_position[0], car_position[1], 100, 50)
		car_position[0] = (car_position[0] + 10) % canvas.width
	}

	var refresh = function() {
		c.clearRect(0, 0, canvas.width, canvas.height)
		drawSun()
		var floor = canvas.height/2
		var grad = c.createLinearGradient(0,floor,0,canvas.height)
		grad.addColorStop(0, "green")
		grad.addColorStop(1, "black")
		c.fillStyle = grad
		c.fillRect(0, floor, canvas.width, canvas.height)
		buildings.forEach(function(item, index) {
			var x0 = item[0]
			var blgWidth = item[1]
			var blgHeight = item[2]
			var building_color = item[3]
			renderBuildings(x0, blgWidth, blgHeight, building_color)
		});
		drawCar() 
	}

	return {
		build: build,
		controlHeight: controlHeight,
		refresh: refresh
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
	document.getElementById("canvas").addEventListener("mousedown", app.controlHeight)
	setInterval(app.refresh, 200)
}