graph = require('./graph.js').getGraph();
rooms = require('./rooms.js').getRooms();
fs = require('fs');
corridors = require('./corridors.js').getCorridors();


function x(){

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

// path = graph.fromHereToThere(1000,1051);
// path = graph.fromHereToThere(1000,1001);
// path = graph.fromHereToThere(1000,1054);
// path = graph.fromHereToThere(432,436);

path = graph.fromHereToThere(1000, 1054);


// path = graph.fromHereToThere(1050,1051);
}
var path = [];
x();



var stepPath = graph.timeSeries(path, 0.0002);

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


