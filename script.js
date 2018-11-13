function initMap() {
    var icons = {
        full: {
            icon: 'full.png'
        },
        empty: {
            icon: 'empty.png'
        },
    };

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: new google.maps.LatLng(23.1587581, 72.6690627),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var infowindow = new google.maps.InfoWindow({});
	var marker;

	var config = {
		apiKey: "AIzaSyCEQph-ctpnTeDNCguEbFi-c7xiyiQ5gjU",
		authDomain: "dustbin-locator-rnx.firebaseapp.com",
		databaseURL: "https://dustbin-locator-rnx.firebaseio.com",
		projectId: "dustbin-locator-rnx",
	};
	
	firebase.initializeApp(config);
	var db = firebase.database()
	getLocations();
	function getLocations() {
		return locations = db.ref("/Locator/Locations").once('value').then(function(snapshot) {
			for(let loc in snapshot.val()) {
				jagah = snapshot.val()[loc]
				marker = new google.maps.Marker({
					icon: icons[jagah.status].icon,
					position: new google.maps.LatLng(jagah.lat, jagah.long),
					map: map
				});
		
				google.maps.event.addListener(marker, 'click', (function (marker, jagah) {
					return function () {
						infowindow.setContent(`<strong>${jagah.info}</strong><br>	Dustbin: ${jagah.status.}`);
						infowindow.open(map, marker);
					}
				})(marker, jagah));
			}
		});
	}
}
