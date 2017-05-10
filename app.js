/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

'use strict';

var  mapGeometry = require('./Public/mapGeometry.js');
var roomUtil = require('./Public/rooms.js');

var express = require('express'); // app server
var bodyParser = require('body-parser'); // parser for post requests // sdk

var app = express();

// Bootstrap application settings
app.use(express.static('./public')); // load UI from public folder
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var wheelChairNumber = -1;

function schedule(wheelChairNumber, path){
	console.log("Schedule", path[0]);
 if ( socketClient ){
	 socketClient.emit('Path', {wheelChairNumber: wheelChairNumber, path:path});
 }	
}

//
// Where the Server keeps track of state and state changes
//
var states = 
	[
	{wheelChairNumber:0, state:'idle', lastLoc: "W1", waitLoc: "W1"},
	{wheelChairNumber:1, state:'idle', lastLoc: "W2", waitLoc: "W2"},
	{wheelChairNumber:2, state:'idle', lastLoc: "W3", waitLoc: "W3"},
	{wheelChairNumber:3, state:'idle', lastLoc: "W4", waitLoc: "W4"},
	];

function stateChange(wheelChairNumber, state){
	// console.log("Schedule",path);
	states[wheelChairNumber].state = state;
 if ( socketClient ){
	 socketClient.emit('StateChange', {wheelChairNumber: wheelChairNumber, state: state});
 }	
}

// Endpoint to be call from the client side
app.post('/mouseclick',
	function(req, res) {
		var workspace = process.env.WORKSPACE_ID || '<workspace-id>';

		var closest = mapGeometry.getClosestRoom(req.body);
		// return res.status(err.code || 500).json(err);
		res.send(JSON.stringify(closest));

	});


app.post('/orderDlg',
		function(req, res) {
	
			wheelChairNumber++;
			wheelChairNumber %= 3;
	
			var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
			var path = mapGeometry.getRoomPath(states[wheelChairNumber].waitLoc, req.body.froom, req.body.troom);
			schedule(wheelChairNumber, path);
			stateChange(wheelChairNumber, 'good');	

			res.send(JSON.stringify({"retval": path != null}));
		});


var socketClient;
app.registerSocketClient = function(client){
	socketClient = client;
	console.log("socket  connected!");
	client.emit('message', 'socket connected');

	client.on('message', function(message){
    	console.log('socket message :');// ,message);
	});
	
	client.on('arrived', function(message){
		stateChange(message.wheelChairNumber, 'idle');
		if ( states[message.wheelChairNumber].lastLoc == states[message.wheelChairNumber].waitLoc)
			return;
		
		var path = mapGeometry.getReturnPath(states[message.wheelChairNumber].lastLoc, states[message.wheelChairNumber].waitLoc);
		schedule(message.wheelChairNumber, path);
		
	});
	
	client.on('location', function(message){
		// console.log("location", message);
		states[message.wheelChairNumber].lastLoc = message.lastLoc.name;
	});
		
    client.on('disconnect', function() {
		console.log("socket disconnect");
    });
}

module.exports = app;







