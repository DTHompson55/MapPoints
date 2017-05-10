var socket = io();

socket.on('Path', function(data) {
	//console.log(data);
	var path = {index:0, wheelChairNumber: data.wheelChairNumber, path:data.path};
	//console.log("path ",path)
	paths.push(path);
	if ( timer == null){
		start_stop();
	}
});

socket.on('message', function(data) {
console.log("Message was:",data);
});

socket.on('StateChange', function(data) {
	stateChange(data);
	console.log("StateChange :",data);
});
