var key = '07972bd4122c20727d450154e176a55b';
var url = 'http://api.openweathermap.org/data/2.5/weather';

// function to fetch the location of the user
	function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocationWeather);
    }
    else {
        console.log("Geolocation is not supported by this browser");
    }
  }

 // calls the api with lat and long of the user
	function showLocationWeather(position) {
	    var lat = position.coords.latitude;
	    var lon =  position.coords.longitude;
	   $.ajax({
				url: url,
				dataType: 'json',
				type: 'GET',
				data: {lat:lat, lon:lon, appid:key, units:'metric'},
				success: function(data){
					var wf ='';
					$.each(data.weather, function(index, val){
						wf += '<p><b>' + data.name + '</b></p>'
						+ data.main.temp + '&deg;c' + ' ' + val.description
					});
					$('#displayWeather').html(wf);
				}
			});

	}

	$(document).ready(function(){

		getLocation();

		$('#getWeather').click(function(){
			var city = $("#city").val();
			$.ajax({
				url: url,
				dataType: 'json',
				type: 'GET',
				data: {q:city, appid:key, units:'metric'},
				success: function(data){
					var html_data ='';
					$.each(data.weather, function(index, val){
						html_data += '<p><b>' + data.name + '</b></p>'
						+ data.main.temp + '&deg;c' + ' ' + val.description
					});
					$('#displayWeather').html(html_data);
				},
				error: function (request, status, error) {
					 $('#displayWeather').html(request.responseJSON.message.toUpperCase());
		    }
			});
		});

	});