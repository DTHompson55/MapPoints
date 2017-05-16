module.exports = {
		init:init,
		getClosestRoom:getClosestRoom,
		getRoomPath:getRoomPath,
		getReturnPath: getReturnPath
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
		if ( rooms[i].type == 'wait' ) continue;
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
function getRoomPath(startRoom, roomNameA, roomNameB){
	var s = roomUtil.findIndex(startRoom);
	var a = roomUtil.findIndex(roomNameA);
	var b = roomUtil.findIndex(roomNameB);
//	console.log(roomNameA, a, roomNameB, b);
	var path1 = graph.fromHereToThere(s,a);
	path1[0].event = "toPickup";
	path1[path1.length-1].event = "atPickup";
	console.log(path1.length, path1[path1.length-1]);
	
	var path2 = graph.fromHereToThere(a,b);
	console.log(path1.length, path1[path1.length-1].event,path2.length, path2[path2.length-1].event);

	path2[0].event = "toDropoff";
	console.log(path1.length, path1[path1.length-1],path2.length, path2[path2.length-1].event);

	path2[path2.length-1].event = "atDropoff";
	
	console.log(path1.length, path1[path1.length-1].event);

	var path = path1.concat(path2);
	//console.log("Room Path is ",path);
	var stepPath = graph.timeSeries(path, 0.00005);
	//console.log("Step Path is ",stepPath);
	return stepPath;
}
//
//returns the closest room to the point given
//
function getReturnPath(nameA, nameB){
//	console.log(roomNameA, a, roomNameB, b);
	var path = graph.fromHereToThere(roomUtil.findIndex(nameA), roomUtil.findIndex(nameB));
	path[0].event = "toWaitLoc";
	path[path.length-1].event = "atWaitLoc";

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
