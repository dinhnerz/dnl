/**
 * 
 * @authors dinhnluong
 * @date    2017-11-06 18:17:25
 * @version 1
 */

 var tempF;
 var whatDegree = 15;
 
 var ourLocation;
 var ourTemperature;
 var ourDescription;

 var icons;

 var outputlong;
 var outputlat;

 var xLocation = document.getElementById("location");
 var xDescription = document.getElementById("description");
 var xTemperature = document.getElementById("temperature");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(parsePosition);
    } else {
        xLocation.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function parsePosition(position) {

	outputlong = position.coords.longitude;
	outputlat = position.coords.latitude;

    getJSON();
}


function getJSON() {

	var grabJSON = 'https://fcc-weather-api.glitch.me/api/current?lat=' + outputlat + '&lon=' + outputlong;

	$.getJSON(grabJSON, function(data) {

			ourLocation =  data.name;
			ourTemperature = data.main.temp;
			ourDescription = data.weather[0].main;

			xLocation.innerHTML = ourLocation;
			xTemperature.innerHTML = Math.round(ourTemperature * 9 / 5 + 32) + " °F";

			translateDescription();

			xDescription.innerHTML = ourDescription + " <i class=\"wi wi-" + icons + "\"></>";

		});


}

function translateDescription() {

	
	if (ourDescription == "Mist") {
		return icons = "fog";
	}
	if (ourDescription == "Clouds") {
		return icons = "cloud";
	}
	if (ourDescription == "Rain") {
		return icons = "rain";
	} else {
		return icons = ourDescription.toLowerCase();

	}

}



function addIcon(desc) {
  $('div.' + desc).removeClass('hide');
}


 $(document).ready(function() {

    $.ajax({ cache: false });
    
    getLocation();

    $(".change-degree").on("click", function() {

    	if (whatDegree === 10) {

    		tempF = Math.round(ourTemperature * 9 / 5 + 32);

    		xTemperature.innerHTML = tempF + " °F";

    		console.log(tempF); 

    		whatDegree = 15;

    		return;

    	}

    	if (whatDegree === 15) {

    		xTemperature.innerHTML = Math.round(ourTemperature) + " °C";

    		console.log(Math.round(ourTemperature)); 

    		whatDegree = 10;

    		return;
    	}


    });

 });
