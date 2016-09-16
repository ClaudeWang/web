/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _particle = __webpack_require__(1);
	
	var _particle2 = _interopRequireDefault(_particle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.onload = function () {
	    var canvas = document.getElementById('app');
	    var c = canvas.getContext("2d");
	
	    var frameUpdate = function frameUpdate(cb) {
	        var rAF = function rAF(time) {
	            requestAnimationFrame(rAF);
	            var diff = ~~(time - (rAF.lastTime || 0)); // ~~ is like floor
	            cb(diff);
	            rAF.lastTime = time;
	        };
	        rAF(); // go!
	    };
	
	    var log = function log(msg) {
	        if (!msg) {
	            log.x = 30;log.y = canvas.height;
	        }
	        var pt = 16;
	        c.font = pt + 'px Courier';
	        c.fillStyle = "white";
	        c.fillText(msg, log.x, log.y);
	        log.y = log.y - (4 + pt);
	    };
	
	    var particles = Array(5).fill(true).map(function () {
	        return (0, _particle2.default)();
	    });
	
	    frameUpdate(function (dt) {
	        particles = particles.map(function (p) {
	            return (0, _particle.update)(p, dt, canvas);
	        });
	
	        log();
	        c.fillStyle = '#000';
	        c.fillRect(0, 0, canvas.width, canvas.height);
	
	        particles.forEach(function (_ref) {
	            var position = _ref.position;
	            var mass = _ref.mass;
	
	            var _position = _slicedToArray(position, 2);
	
	            var x = _position[0];
	            var y = _position[1];
	
	            c.fillStyle = 'red';
	            c.beginPath();
	            c.arc(x, y, mass, 0, 2 * Math.PI);
	            c.fill();
	            log('(' + mass.toFixed(2) + ') @ (' + x.toFixed(6) + ', ' + y.toFixed(6) + ')');
	        });
	    });
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
					value: true
	});
	var random = function random() {
					var min = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
					var max = arguments.length <= 1 || arguments[1] === undefined ? 800 : arguments[1];
					return Math.random() * (max - min) + min;
	};
	
	// default values
	var particle = function particle() {
					var mass = arguments.length <= 0 || arguments[0] === undefined ? random(5, 30) : arguments[0];
					var position = arguments.length <= 1 || arguments[1] === undefined ? [random(), random()] : arguments[1];
					var velocity = arguments.length <= 2 || arguments[2] === undefined ? [random(-0.1, 0.1), random(-0.1, 0.1)] : arguments[2];
					var acceleration = arguments.length <= 3 || arguments[3] === undefined ? [0, 0] : arguments[3];
	
					return { acceleration: acceleration, velocity: velocity, position: position, mass: mass };
	};
	
	var update = function update(_ref, delta, canvas) {
					var acceleration = _ref.acceleration;
					var velocity = _ref.velocity;
					var position = _ref.position;
					var mass = _ref.mass;
	
					//console.log(typeof(acceleration));
					// if (canvas != undefined) {
					// 	position[0] = (position[0] + velocity[0] * delta) % canvas.width;
					// 	position[1] = (position[1] + velocity[1] * delta) % canvas.height;
					// }
	
					var new_velocity = [0, 0];
					new_velocity[0] = velocity[0] + acceleration[0] * delta;
					new_velocity[1] = velocity[1] + acceleration[1] * delta;
					// var newPos = 
					return { mass: mass, acceleration: acceleration, new_velocity: new_velocity, position: position };
	};
	
	exports.default = particle;
	exports.update = update;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map