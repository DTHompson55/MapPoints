//
// This initializes a map to a lat,lng and sets the zoom value.
// It also defines a mouseclick action, which I would kind of like to externalize
// right now it has some dependencies on the HTML form
//
var lastRoom = "";
var start_stop_g;
var map;
var dialog;

var initmapvalues = {
	center : {
		lat : 43.6607598,
		lng : -79.3936388
	},
	zoom : 20
};

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), initmapvalues);

	google.maps.event.addListener(map, 'click', function(event) {
		// console.log(event.latLng.lat(),event.latLng.lng());

		// start_stop_g();

		$.post('mouseclick', {
			lat : event.latLng.lat(),
			lng : event.latLng.lng()
		}, function(data) {
			room = JSON.parse(data);
			document.getElementById('fRoom').value = room.room;
			if (lastRoom != "") {
				document.getElementById('tRoom').value = lastRoom;
			}
			lastRoom = room.room;

			// console.log(data);
			dialog.dialog("open");

		});
	});
}
