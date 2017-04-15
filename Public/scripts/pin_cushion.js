console.log("pins is installed");

var pins = {
		lookup: function(aPin){
			for ( let  i = 0 ; i < this.list.length; i++){
				if ((this.list[i] ) && (this.list[i].id == aPin.id)) return this.list[i];
			} return null;
		},
		find: function(id){
			for ( let i = 0 ; i < this.list.length; i++){
				if ((this.list[i] ) && (this.list[i].id == id)) return i;
			} return -1;
		},
		put: function(pin){
		    let pinId = this.find(pin.id);	
			if (pinId >= 0){
				this.list[pinId] = pin;
			} else {
				this.list.push(pin);
			}
		},
		remove: function(pin){
		    let pinId = this.find(pin.id);	
			if (pinId >= 0){
				delete this.list[pinId];
			} 
		},

		list:[]
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
	
	console.log(pins.lookup(aPin), pins.list.length);
	console.log(pins.lookup(bPin), pins.list.length);
	console.log(pins.lookup(dPin), pins.list.length);
	console.log(pins.list);
}


		