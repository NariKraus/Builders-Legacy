/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./static/assets/ts/app.ts":
/*!*********************************!*\
  !*** ./static/assets/ts/app.ts ***!
  \*********************************/
/***/ (() => {



function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Room = /*#__PURE__*/function () {
  function Room(paths, coordinates) {
    var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    _classCallCheck(this, Room);
    this.paths = paths;
    this.coordinates = coordinates;
    this.start = start;
  }
  return _createClass(Room, [{
    key: "createRoomElement",
    value: function createRoomElement() {
      var roomElement = document.createElement('div');
      roomElement.classList.add('room');
      if (this.start) roomElement.classList.add('start');
      // Set position variables as CSS custom properties
      roomElement.style.setProperty('--pos-x', this.coordinates.X.toString());
      roomElement.style.setProperty('--pos-y', this.coordinates.Y.toString());
      var roomContents = [];
      // Loop through each row
      for (var i = 0; i < 3; i++) {
        // Loop through each column
        for (var j = 0; j < 3; j++) {
          var element = document.createElement('div');
          if ((i === 0 || i === 2) && (j === 0 || j === 2)) {
            element.className = 'corner';
          } else if (i === 1 && j === 1) {
            element.className = 'center';
          } else {
            element.className = 'path';
            if (i === 0) element.dataset.path = String(this.paths.N);else if (i === 2) element.dataset.path = String(this.paths.S);else if (j === 0) element.dataset.path = String(this.paths.W);else if (j === 2) element.dataset.path = String(this.paths.E);
          }
          roomContents.push(element);
        }
      }
      roomElement.append.apply(roomElement, roomContents);
      // Hide borders based on paths
      if (this.paths.N) roomElement.style.borderTop = 'none';
      if (this.paths.S) roomElement.style.borderBottom = 'none';
      if (this.paths.E) roomElement.style.borderRight = 'none';
      if (this.paths.W) roomElement.style.borderLeft = 'none';
      return roomElement;
    }
  }]);
}();
function generateMap(gridWidth, gridHeight) {
  var grid = [];
  for (var y = 0; y < gridHeight; y++) {
    for (var x = 0; x < gridWidth; x++) {
      grid.push(new Room({
        N: false,
        S: false,
        E: false,
        W: false
      }, {
        X: x + 1,
        Y: y + 1
      }));
    }
  }
  var visited = new Set();
  var unvisited = new Set();
  var start_x = Math.ceil(gridWidth / 2);
  var start_y = Math.ceil(gridHeight / 2);
  var start_room = grid.find(function (room) {
    return room.coordinates.X === start_x && room.coordinates.Y === start_y;
  }) || new Room({
    N: false,
    S: false,
    E: false,
    W: false
  }, {
    X: 0,
    Y: 0
  });
  start_room.start = true;
  while (Object.values(start_room.paths).filter(function (item) {
    return item === true;
  }).length < 2) {
    unvisited.clear();
    start_room.paths = {
      N: generatePath(start_room, 'N'),
      S: generatePath(start_room, 'S'),
      E: generatePath(start_room, 'E'),
      W: generatePath(start_room, 'W')
    };
  }
  visited.add(start_room);
  function generatePath(room, direction) {
    var path_open = false;
    if (room.paths[direction]) return true;
    var new_room_coords = Object.assign({}, room.coordinates);
    if (direction === 'N' || direction === 'North') new_room_coords.Y--;
    if (direction === 'S' || direction === 'South') new_room_coords.Y++;
    if (direction === 'E' || direction === 'East') new_room_coords.X++;
    if (direction === 'W' || direction === 'West') new_room_coords.X--;
    var room_to_test = grid.find(function (grid_room) {
      return grid_room.coordinates.X === new_room_coords.X && grid_room.coordinates.Y === new_room_coords.Y;
    });
    if (room_to_test) {
      path_open = !visited.has(room_to_test) && !unvisited.has(room_to_test) && Math.random() > 0.6;
      if (path_open) {
        if (direction === 'N' || direction === 'North') room_to_test.paths.S = true;
        if (direction === 'S' || direction === 'South') room_to_test.paths.N = true;
        if (direction === 'E' || direction === 'East') room_to_test.paths.W = true;
        if (direction === 'W' || direction === 'West') room_to_test.paths.E = true;
        unvisited.add(room_to_test);
      }
    }
    return path_open;
  }
  while (_toConsumableArray(unvisited).length > 0) {
    _toConsumableArray(unvisited).forEach(function (u_room) {
      unvisited["delete"](u_room);
      visited.add(u_room);
      u_room.paths = {
        N: generatePath(u_room, 'N'),
        S: generatePath(u_room, 'S'),
        E: generatePath(u_room, 'E'),
        W: generatePath(u_room, 'W')
      };
    });
  }
  return grid;
}
// Usage example
var gridWidth = 15;
var gridHeight = 15;
var map = generateMap(gridWidth, gridHeight);
var container = document.querySelector('.grid-container');
// console.log(map);
map.forEach(function (room) {
  return container === null || container === void 0 ? void 0 : container.appendChild(room.createRoomElement());
});

/***/ }),

/***/ "./static/assets/scss/app.scss":
/*!*************************************!*\
  !*** ./static/assets/scss/app.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/static/assets/js/app": 0,
/******/ 			"static/assets/css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkgrid"] = self["webpackChunkgrid"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["static/assets/css/app"], () => (__webpack_require__("./static/assets/ts/app.ts")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["static/assets/css/app"], () => (__webpack_require__("./static/assets/scss/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;