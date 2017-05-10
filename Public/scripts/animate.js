var animationCounter = 0;
var timer;
var states = 
	[
	{wheelChairNumber:0, state:'good', lastLoc: "W1", waitLoc: "W1"},
	{wheelChairNumber:1, state:'good', lastLoc: "W2", waitLoc: "W2"},
	{wheelChairNumber:2, state:'good', lastLoc: "W3", waitLoc: "W3"},
	{wheelChairNumber:3, state:'good', lastLoc: "W4", waitLoc: "W4"},
	];
var paths = [];
var path = {index:0, path:[]};

function stateChange(data){
	states[data.wheelChairNumber].state = data.state;
}

function animate(){
//	animationCounter++;
//	if ( animationCounter > 300){
//		clearInterval(timer);
//		 timer = null;
//		 animationCounter = 0;
//	}
	for (var i = 0 ; (i < paths.length); i++){
		
		path = paths[i];
		if ( path == null) continue;
		
		if (path.index == null){
			path.index = 0;
		}
		
		// console.log("I =",i, path.path[path.index]);
		if (path.path[path.index].id == null) path.path[path.index].id = path.index;
		path.path[path.index].itemType = "Point";
		path.path[path.index].itemId = "P" + path.path[path.index].id;
		path.path[path.index].colorId = getColor(path.wheelChairNumber);
//		console.log(path.path[path.index].colorId);
		
		marker = mark(path.path[path.index]);
		socket.emit("location",{
			wheelChairNumber:path.wheelChairNumber, 
			lastLoc:path.path[path.index]});				

		path.path[path.index].lastMarker = marker;
		if (states[path.wheelChairNumber].lastMarker){
			// console.log("previous mark was
			// ",path.path[path.index].lastMarker);
			// change this to a property of the wheelchair state
			states[path.wheelChairNumber].lastMarker.setMap(null);
		}
		states[path.wheelChairNumber].lastMarker = marker;
		
		path.index++;
		if ( path.index >= path.path.length){
			paths[i] = null;
			socket.emit("arrived",{wheelChairNumber:path.wheelChairNumber});				
		} 
	}			
}

function start_stop(){
	if ( timer == null) {
	 timer = setInterval(animate, 1000);
	 }
	else {
	 clearInterval(timer);
	 timer = null;
	}
}
	
var pin_colors = [ 
	["images/blue.png",  "images/blue-A.png",  "images/blue-B.png",  "images/blue-C.png"],
	["images/green.png", "images/green-A.png", "images/green-B.png", "images/green-C.png"],
	["images/yellow.png","images/yellow-A.png","images/yellow-B.png","images/yellow-C.png"],
	["images/red.png",   "images/red-A.png",   "images/red-B.png",   "images/red-C.png"]
	 ];

function getColor(wheelChairNumber) {
	var i = 1;
	//console.log("The wheelchair number is", wheelChairNumber);
	if (states[wheelChairNumber].state == 'idle') i = 0;
	if (states[wheelChairNumber].state == 'good') i = 1;
	if (states[wheelChairNumber].state == 'warn') i = 2;
	if (states[wheelChairNumber].state == 'bad')  i = 3;
	
	//console.log("Get Color is",wheelChairNumber,states[wheelChairNumber].state,i);
	return pin_colors[i][wheelChairNumber+1];
}
	
function mark(msg) {
//console.log("Marking This ",msg,map);
	var marker_pos = new google.maps.LatLng(msg.lat, msg.lng);
	var marker = new google.maps.Marker({
		position : marker_pos,
		icon : new google.maps.MarkerImage(msg.colorId),
		title : msg.itemType + " #" + msg.itemId,
		map : map
	});
	return marker;
}
