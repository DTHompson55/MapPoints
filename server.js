#!/usr/bin/env node
/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';


require('dotenv').config({silent: true});

var app = require('./app');

var server = require('http').createServer(app);  

var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

server.listen(port, function() {
  // eslint-disable-next-line
  console.log('Wheelchair server running on port: %d', port);
});

var io = require('socket.io').listen(server);
var socketClient;

io.on('connection', function(client){
	app.registerSocketClient(client);		
});

