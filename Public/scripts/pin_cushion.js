console.log("pins is installed");

var pins = {
		lookup: function(aPin){
			if (this.hash[aPin.id]) 
				return this.hash[aPin.id]
			return null;
		},
		put: function(pin){
			this.hash[pin.id] = pin;
		},
		remove: function(pin){
			delete this.hash[pin.id];
		},
		hash: {}
};
		
function pinTester(){
	var aPin = {id:2, body:"xyzzy"};
	var bPin = {id:3, body:"xyzzy3"};
	var cPin = {id:2, body:"xyzzy2"};
	var dPin = {id:4, body:"xyzzy4"};
	pins.put(aPin);
	pins.put(bPin);
	pins.put(cPin);
	pins.put(dPin);
	pins.remove(bPin);
	
	console.log("Pin A = ",pins.lookup(aPin).id == 2, pins.lookup(aPin).body !== "xyzzy");
	console.log("Pin B = ",pins.lookup(bPin) == null );
	console.log("Pin C = ",pins.lookup(cPin) !== null , pins.lookup(aPin).body == "xyzzy2");
	console.log("Pin D = ",pins.lookup(dPin) );
	console.log(pins.hash);
}

//pinTester();
		