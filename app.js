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

var express = require('express'); // app server
var bodyParser = require('body-parser'); // parser for post requests																		// sdk

var app = express();

// Bootstrap application settings
app.use(express.static('./public')); // load UI from public folder
//configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var socketClient;
app.registerSocketClient = function(client){
	//console.log("register client in app",client);
	socketClient = client;
	console.log("socket  connected!");
	client.emit('message', 'socket connected');

	client.on('message', function(message){
    	console.log('socket message :');//,message);
	});

    client.on('disconnect', function() {
		console.log("socket disconnect");
		socketClient = null;
    });
}


function schedule(path, params){
	console.log("Schedule",path);
 if ( socketClient ){
	 socketClient.emit('path', path);
 }	
}

// Endpoint to be call from the client side
app.post('/mouseclick',
	function(req, res) {
		var workspace = process.env.WORKSPACE_ID || '<workspace-id>';

		var closest = mapGeometry.getClosestRoom(req.body);
		//return res.status(err.code || 500).json(err);
		res.send(JSON.stringify(closest));

	});

app.post('/orderDlg',
		function(req, res) {
			var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
			var path = mapGeometry.getRoomPath(req.body.froom, req.body.troom);
			schedule(path, req.body);
			res.send(JSON.stringify({"retval": path != null}));
		});

var socketClient;
app.registerSocketClient = function(client){
	socketClient = client;
	console.log("socket  connected!");
	client.emit('message', 'socket connected');

	client.on('message', function(message){
    	console.log('socket message :');//,message);
	});

    client.on('disconnect', function() {
		console.log("socket disconnect");
    });
}

module.exports = app;







