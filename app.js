$(document).ready(function(){
//clear any previous search results and load new search results//
	$(".button").click(function(){
		$(".info").html(" ");
		$(".image").html(" ");
		search();
	});	
});
	var search = function(){
//get search values from input and dropdown//
		var cityValue = $("#city").val();
		var stateValue = $("#state option:selected").val();
		var activityValue = $("#activity option:selected").val();

//get api from TrailAPI.com and append array properties to html//	
		$("#loading").show();
		$.ajax({
			url: "https://outdoor-data-api.herokuapp.com/api.json?api_key=1add6ce6b3fb7c72550bc3b5060a7565&q[city_cont]=" + cityValue +
			"&q[state_eq]=" + stateValue + "&q[activities_activity_type_name_eq]=" + activityValue,
			dataType: "jsonp",
			type: "GET",
			success: function(data){	
				console.log(data);

				for(var x in data["places"]) {	
					var locate = data["places"][x];
						$(".info").append("<hr>");
						/*$(".info").append("<div>" + "<img src=" + locate["activities"][0]["thumbnail"] + ">" +"</div>");*/
						$(".info").append("<p>" + "Place: " + "<a href=" + locate["activities"][0]["url"] + " target=_blank" + ">" + locate["name"] + "</a>" + "</p>");
						$(".info").append("<p>" + "Location: " + locate["city"] + ", " + locate["state"] + "</p>");
						$(".info").append("<p>" + "Activity: " +  locate["activities"][0]["activity_type_name"] + "</p>");
						$(".info").append("<p>" + "Description: " + locate["activities"][0]["description"] + "</p>");						
				}
				if (data["places"].length === 0) {
					console.log("no results");
					$(".info").append("Sorry, no results! Please try a new activity or location.");
				}
				$("#loading").hide();	
				/*var pic = (locate["activities"][0]["thumbnail"]);
				if ( pic === null ) {
					$(".info div").text( "no pic available");
				}*/
											
			}		
		});
}