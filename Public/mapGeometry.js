module.exports = {
		init:init,
		getClosestRoom:getClosestRoom,
		getRoomPath:getRoomPath
}

var graph = require('./graph.js').getGraph();
var roomUtil = require('./rooms.js');
var corridors = require('./corridors.js').getCorridors();

var rooms = roomUtil.getRooms();

var util  = require('./pointchecker.js');
var fs = require('fs');

//
// returns the closest room to the point given
//
function getClosestRoom(aPoint){
	var min = {distance: 1, index: 0};
	for (var i = 0 ; i < rooms.length; i++){
		var d = util.distance(util.convert(aPoint), util.convert(rooms[i]));
		//console.log(i,d,min);
		if ( d < min.distance){
			min.distance = d;
			min.index = i;
		}
	}
	return rooms[min.index];
}

//
//returns the closest room to the point given
//
function getRoomPath(roomNameA, roomNameB){
	var a = roomUtil.findIndex(roomNameA);
	var b = roomUtil.findIndex(roomNameB);
	console.log(roomNameA, a, roomNameB, b);
	var path = graph.fromHereToThere(a,b);
	var stepPath = graph.timeSeries(path, 0.00005);
	return stepPath;
}
//
//
//
function init(){

for (var i = 0; i < corridors.points.length; i++){
	graph.addPoint(corridors.points[i]);
}
for (var i = 0 ; i < corridors.connections.length; i++){
	// console.log("Corridor ",i,corridors.connections[i]);
	graph.addCorridors(corridors.connections[i]);
}
for (var i = 0; i < rooms.length; i++){	
   graph.addRoom({id: 1000+i, lat: rooms[i].lat, lng: rooms[i].lng, name: rooms[i].room});
// break;
}
graph.initPaths();
}

//
//
//
function testPath(){
	var path = [];
	console.log(roomUtil.findIndex("W121"));
	console.log(roomUtil.findIndex("C134"));
	
	path = graph.fromHereToThere(roomUtil.findIndex("C135"),roomUtil.findIndex("W121"));
	
	//path = graph.fromHereToThere(1000,1051);
	
	// path = graph.fromHereToThere(1000,1051);
	// path = graph.fromHereToThere(1000,1001);
	// path = graph.fromHereToThere(1000,1054);
	// path = graph.fromHereToThere(432,436);
	// path = graph.fromHereToThere(1000, 1051);
	// path = graph.fromHereToThere(1050,1051);
	
	console.log(path);
	
var stepPath = graph.timeSeries(path, 0.00005);

var fNam = "/Users/DanT/Projects/workspace/MapPoints/Public/path.js";
var fd = fs.open(fNam, 'w', (err, fd) => {
  if (err) {
    if (err.code === 'EEXIST') {
  console.error('path.js already exists');
      return;
    }

    throw err;
  }
  
  fs.write(fd,"var path = ",(err, written, buffer)=>{
  fs.write(fd,JSON.stringify(stepPath), (err, written, buffer)=>{
  fs.write(fd,";\n", (err, written, buffer)=>{
			  console.log(err,written,buffer);;
  });
  });
  });

});

}

init();
//testPath();
