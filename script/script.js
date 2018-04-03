
function initMap() {
    var uluru = {lat: 52.310539, lng: 4.768274};
    var map = new google.maps.Map(document.getElementById('map'),{
        zoom: 11,
        center: uluru,
        styles: myStyles
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
    // Icon markers
		var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var icons = {
          parking: {
            icon: iconBase + 'parking_lot_maps.png'
          },
          library: {
            icon: iconBase + 'library_maps.png'
          },
          info: {
            icon: iconBase + 'info-i_maps.png'
          }
        };

        var features = [
          {
            position: new google.maps.LatLng(52.310364, 4.763151),
            type: 'parking'
          }, {
            position: new google.maps.LatLng(52.375833, 4.908389),
            type: 'library'
          }, {
            position: new google.maps.LatLng(52.307543, 4.764317),
            type: 'info'
          },
        ];

		  // Create markers.
        features.forEach(function(feature) {
          var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map
          });
        });
}


/**
 * Fetch API data
 */
function getAPIdata() {

	// get latest weather
	fetch('http://api.openweathermap.org/data/2.5/forecast?q=the%20Hague,nl&appid=b0c8dafa512a0134e90df6ece3c2b7a2')

	// parse to JSON format
	.then(function(response) {
		return response.json();
	})

	// render weather per day
	.then(function(response) {

		// render weatherCondition
		onAPISucces(response);
	})

	// catch error
	.catch(function (error) {
		// onAPIError();
		console.error('Request failed', error);
	});
}

/**
 * Render weather listing
 */
function onAPISucces(response) {

	var weatherList = response.list;
	var weatherBox = document.getElementById('weather');

	for(var i=0; i< weatherList.length; i++){
		//console.log(weatherList[i].main.temp - 273.15);

		var dateTime = new Date(weatherList[i].dt_txt);
		var date = formDate(dateTime);
		var time = formTime(dateTime);
		var temp = Math.floor(weatherList[i].main.temp - 273.15);
		var iconUrl = 'http://openweathermap.org/img/w/'+weatherList[i].weather[0].icon+'.png';

		forecastMessage =  '<div class="forecastMoment">';
		forecastMessage +=   '<div class="date"> '+date+' </div>';
		forecastMessage +=	 '<div class="time"> '+ time +' </div>';
		forecastMessage +=	 '<div class="temp"> '+temp+'&#176;C </div>';
		forecastMessage +=	 '<div class="icon"> <img src="'+iconUrl+'"> </div>';
		forecastMessage += '</div>';

		weatherBox.innerHTML += forecastMessage;
	}
}

/**
 * Error
 */
function updateUIError() {
	var weatherBox = document.getElementById('weather');
	weatherBox.className = 'hidden';
}

/**
 * Format date
 */
function formDate(date) {
	var day = date.getDate();
	var month = date.getMonth() + 1;
	return day +'/'+ month;
}

/**
 * Format time
 */
function formTime(date) {
	var hours = date.getHours();
	if(hours<10){
		hours = '0'+hours;
	}
	var minutes = date.getMinutes();
	if(minutes < 10){
		minutes = '0'+ minutes;
	}
	return hours +':'+ minutes;
}

// init data stream
getAPIdata();
