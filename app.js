$(document).ready(function(){
	
	$(".button").click(function(){

		var cityValue = $("#city").val();
		var stateValue = $("#state option:selected").val();
		var activityValue = $("#activity option:selected").val();

		$.ajax({
			url: "https://outdoor-data-api.herokuapp.com/api.json?api_key=4016165acc967a9800153c77a3528d83&q[city_eq]=" + cityValue +
			"&q[state_eq]=" + stateValue + "&q[activities_activity_type_name_cont]=" + activityValue,
			dataType: "jsonp",
			type: "GET",
			success: function(data){	
				console.log(data);

				for(var x in data.places) {
				var locate = data.places[x];
						$(".info").append("<p>" + "Place: " + locate["name"] + "</p>");
						$(".info").append("<p>" + "Location: " + locate["city"] + ", " + locate["state"] + "</p>");
						$(".info").append("<p>" + "Activities: " + locate["activities"][x]["activity_type_name"] + "</p>");
						$(".info").append("<p>" + "Description: " + locate["activities"][x]["description"] + "</p>");
						$(".image").append("<p>" + "<img src=" + locate["activities"][x]["thumbnail"] + ">" +"</p>");
				}
				/*$("#city").val("");
				$("#state").val("Alabama");
				$("#activity").val("camping");*/
			}
		
		});
	});
});