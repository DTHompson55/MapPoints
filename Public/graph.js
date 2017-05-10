pointChecker = require('./pointchecker.js');


module.exports = {
		getGraph:getGraph};

function getGraph(){
	return graph;
}

var graph = {

		createTrack(path){
			var track = [];
			var distance = path.distance;			
		},
		addSegment(a,b){
			var seg = {id:"seg"+a.id+b.id, a:a, b:b };
			if ( a.id > b.id) seg.id = "seg"+b.id+a.id;
			if (this.segments[seg.id] == null)	{
				this.segments.list.push(seg);
				seg.index = this.segments.list.length-1;
				this.segments[seg.id] = seg;
			}
		},
		removeSegment(a,b){
			var seg = {id:"seg"+a.id+b.id};
				if ( a.id > b.id) seg.id = "seg"+b.id+a.id;
			if (this.segments[seg.id] != null)	{
				var index = this.segments[seg.id].index;
				// console.log("Index = ",index);
				this.segments.list[index] = null;
				delete this.segments[seg.id];
			}
		},

		lookupId: function(id){
			// console.log("lookupId",id);
			return this.hash[id];
		},
		put: function(node){
			this.hash[node.id] = node;
		},
		disconnect: function(a, b){

			this.removeSegment(a,b);
		},
		connect: function(a, b){		
			this.addSegment(a,b);
			// console.log("Connect A",a);
			// console.log("Connect B",b);
			// add j to k's connections
			// add k to j's connections
		},
		connectTheDots(a,b){
			// console.log("connecting", a.id, b.id);
			
			if (a.has(b)){
				// console.log("A has B", a.id, b.id);
			} else {
				a.connections.push(b.id);	
				a.hash[b.id] = b.id;
				// console.log("Pushing b to a",a.id,a.connections);
			}
			if (b.has(a)){
				
			} else {
				b.connections.push(a.id);
				b.hash[a.id] = a.id;
				// console.log("Pushing a to b",b.id,b.connections);
			}
		},
		has(n){ 
			 // console.log("Does this ", this, "have ->",n.id,
				// (this.connections[n.id] != null));
			 // if ((this.connections[n.id] != null)) throw "Found one";
			 // console.log(" A has B ?", this.id, this.hash,
				// this.connections, n.id, this.hash[n.id]);
			 return (this.hash[n.id] != null);
// return (this.connections.indexOf(n.id)>=0);
			 },
			 navigate(a,b,previous,trail,paths){
// console.log("navigating ", a);
					let found = false;
					if  (trail.indexOf(a.id) >= 0) {
// console.log("visited here once", a.id);
						return false;
					}
					trail.push(a.id);
// console.log("Entering Nav ",a,b, trail);
					if ( a.has(b)){	
						trail.push(b.id);
// console.log("Found Path", trail);
						paths.push({path:trail});
						return true;
					} else {
						for (var i = 0 ; i < a.connections.length; i++){
						   var trailB = [];
						   for ( var n = 0 ; n < trail.length; n++){
							   trailB[n] = trail[n];
						   }
						   // console.log (a.connections[i])
						   if (this.navigate(this.lookupId(a.connections[i]),b, previous, trailB, paths)){
							// return true;
						   }
						   if ( trailB.length > 500) {
							   console.log("Runaway path",trailB);
							   throw "Runaway Path";
							   return;
						   }
						}
					}
				},
				// first, load all points,
				// then connect the points,
		
				addPoint: function (aPoint){ // points must have id, lat, lng
												// and anything else they want
												// is optional
					aPoint.connections = [];
				    aPoint.hash = {};
				    aPoint.has = this.has;
					if ( this.lookupId(aPoint.id) ){
						// console.log("Exists",y);
					} else {
						// console.log("Did not Exist",y);
					   this.put(aPoint);
					}
				},
				addRoom: function (aRoom){ // points must have id, lat, lng and
											// anything else they want is
											// optional
					this.addPoint(aRoom);
					var min = {distance: 1, lat: 0, lng: 0};
					for (var i = 0 ; i < this.segments.list.length; i++){
						if ( this.segments.list[i] == null ) {
							// console.log("Skipped ",this.segments.list[i].id);
							continue; // don't attach to room segments
						}
						// console.log( this.segments.list[i]);
						var sid = this.segments.list[i].id;
						if ((sid.length == 11 ) && (sid.charAt(3) == '1')) continue;
						var geo = pointChecker.check(this.segments.list[i].a, this.segments.list[i].b, aRoom);
						//console.log(geo);
						if ( geo.fits ){
							//console.log("FIT ---");
							if (min.distance > geo.distance){
								
								// console.log("The Geo ",geo);
								min.distance = geo.distance;
								min.lat = geo.intersect.lat;
								min.lng = geo.intersect.lng;
								min.onsegment = this.segments.list[i].id;
								min.segid = i;
								
							}
						}
					}
					
					min.type="calculated";
					min.id = aRoom.id + 1000;
					this.addPoint(min);
					// console.log("MIN = ",min);
					this.connect(min, this.lookupId(this.segments.list[min.segid].a.id));
					this.connect(min, this.lookupId(this.segments.list[min.segid].b.id));
					this.disconnect(this.lookupId(this.segments.list[min.segid].a.id), 
							this.lookupId(this.segments.list[min.segid].b.id));
					this.connect(min, aRoom);
					// console.log(aRoom);
					// console.log(min);
					// console.log(this.segments.list[min.segid].a);
					// console.log(this.segments.list[min.segid].b);
					// console.log(this.segments);
					// throw "--Segments";

				},addCorridors: function(rP){ // takes a list of pointIDs and
												// connects them as corridors
					// console.log(rP[0]);
					var a = this.lookupId(rP[0]);
					a.type = 'cor';
					for (var i = 1 ; i < rP.length; i++){
						var b = this.lookupId(rP[i]);
						b.type = 'cor';
						this.connect(this.lookupId(rP[0]), this.lookupId(rP[i]));
					}
				},
				setPointsFromSegment(segment){
					// console.log(segment);
					var a = segment.a;
					var b = segment.b;
					
					if (a.has(b)){
						// console.log("A has B", a.id, b.id);
					} else {
						a.connections.push(b.id);	
						a.hash[b.id] = b.id;
						// console.log("Pushing b to a",a.id,a.connections);
					}
					if (b.has(a)){
						
					} else {
						b.connections.push(a.id);
						b.hash[a.id] = a.id;
						// console.log("Pushing a to b",b.id,b.connections);
					}
				},
				initPaths(){
					// console.log(this.segments);
					for (var i = 0; i < this.segments.list.length; i++){
						var seg = this.segments.list[i];
						if (seg)
 						 this.setPointsFromSegment(this.segments.list[i]);
					}
				},
		fromName1ToName2: function (x, y){ // works with IDs of locations
			// console.log("Segments are ",this.segments);
			let a = this.lookupId(x);
			let b = this.lookupId(y);
			return this.fromPointA_PointB(a,b);
		},
		fromHereToThere: function (x, y){ // works with IDs of locations
			// console.log("Segments are ",this.segments);
			let a = this.lookupId(x);
			let b = this.lookupId(y);
			return this.fromPointA_PointB(a,b);
		},
		fromPointA_PointB: function(a,b){	// works with Points of locations
			var paths = [];
			// console.log("from here a ",x,a);
			// console.log("from here b ",7,b);
			this.navigate(a,b,[],[],paths);
			
			
			var min = 1;
			var imin = 0;
			for (var i = 0 ; i < paths.length; i++){
				var dist = 0;
				for (var j = 0 ; j < paths[i].path.length-1; j++){
					dist += this.distanceAB(paths[i].path[j],paths[i].path[j+1]);
					// this.addSegment(paths[i].path[j],paths[i].path[j+1]);
					if ( paths[i].path[j] === undefined){
						console.log("Whooops undefined",i,j,paths[i].path[j]);
					}
				}paths[i].distance = dist;
				if ( dist < min) {
					min = dist;
					imin = i;
				}
			}
			
			// console.log(paths.length);
			// console.log(this.segments);
			//
			// we could sort this to get the shortest, or longest, or randomize
			// the path
			//
			var path = paths[imin].path;
			for (var i = 0 ; i < path.length; i++){
				var point = this.lookupId(path[i]);
				point.iteration = i;
				path[i] = point;
			}
			return path;
			},
			distance: function(x,y){
				return Math.sqrt((Math.pow((x.lng-y.lng),2))+(Math.pow((x.lat-y.lat),2)));
			},
			distanceAB: function(a,b){
				return this.distance(this.lookupId(a), this.lookupId(b));
			},
			lookupID(a){
			for (var i = 0 ; i < this.points.length ; i++){
				if (this.points[i].id == a) return(this.points[i]);
				}
			return null;
			},
		timeSeries(originalPath ,stepSize) {
			path = []; // make a copy of the important parts of the original path
			for (var i = 0 ; i < originalPath.length; i++){
			  path.push({id:i, 
				  lat:originalPath[i].lat,
				  lng:originalPath[i].lng,
				  distance:originalPath[i].distance,
				  has:originalPath[i].has,
				  name:originalPath[i].name,
				  room:originalPath[i].room,
				  connections:originalPath[i].connections,
				  hash:originalPath[i].connections});
			}
			var dist = 0;
			for (var i = 0 ; i < path.length; i++){
				if (path[i].distance)
				dist += path[i].distance;
			}
		stepSize = stepSize || 0.0001;
		var floatfix = 0.000001;
		var maxSteps = Math.ceil(dist/stepSize)+1;
		var stepCount = 1;
		var stepPath= [];
		stepPath.push({id:0, lat:path[0].lat,lng:path[0].lng});
		
		var dPrev = 0     // accumlated distance of previous points up to the
							// current
							// point.
		var dCurrent = 0; // accumulated distance of current
		
		for (var i = 0 ; i < path.length-1 ; i++){
			var dSegment = this.distance(path[i], path[i+1]);       // distance for this segment
			dCurrent += dSegment;                                   // accumulated distance of all segments
			if ( dCurrent  > stepSize ){ // if the traveled distance is more
											// than the
											// step size
				
				var partialStep = (stepSize - dPrev); // this is how much of the step hangs into this segment
				
				var stepPoint = {};
				//console.log("B",i,stepCount,dCurrent,dSegment,partialStep,partialStep/dSegment);
				stepPoint.x = path[i].lat+((path[i+1].lat-path[i].lat)*((partialStep/dSegment)));
				stepPoint.y = path[i].lng+((path[i+1].lng-path[i].lng)*((partialStep/dSegment)));

				stepPath.push({id: stepCount,lat:stepPoint.x,lng:stepPoint.y, i: i});
				stepCount++;

				path[i].lat = stepPoint.x; // muddle the current point in the array to be the 
				path[i].lng = stepPoint.y; // point we just calculated.
				i--;                       // and redo this iteration
				
				dPrev = 0;
				dCurrent = 0;

			} else {
				dPrev = dCurrent; // if we didn't take a step, then update previous distance traveled for next inteation
			}
		}
		// add the last point to the time Series
		stepPath.push({id: stepCount+1,
			lat:path[path.length-1].lat,
			lng:path[path.length-1].lng, 
			name:path[path.length-1].name,
			lastOne:"LastOne"});
		
		for (var i = 1 ; i < stepPath.length; i++){
			stepPath[i].distance = this.distance(stepPath[i-1],stepPath[i]);
		}
				
		return stepPath;
		},

		hash: {},
		segments: {list:[]}
		
};


function tester(){
	var x = graph;
	
var test_connections = [
	[411, 415, 418],
	[415, 416, 413],
	[413, 412, 414],
	[418, 419],
	[419, 416, 423],
	[416, 421],
	[421, 414, 424],
	[414, 450, 421],
	[423, 424],
	[424, 443],
	[443, 427, 445],
	[427, 425, 428],
	[425, 422, 426],
	[432, 436],
	[436, 440],
	[440, 439],
	[439, 438],
	[444, 445], 
	[445, 447], 
	[447, 449], 
	[449, 450],
	[428, 432]];

x.init(test_connections, function(n){
 return {lat: 'fake', lng: 'fake', comment: "fake coordinates"};
});
}

// tester();
