$(document).ready(function(){
	
	$(".info").error(function(){
		alert("error");
	})
	$(".info div").text( "no pic");

	$(".button").click(function(){
		$(".info").html(" ");
		$(".image").html(" ");
		search();
	});

	
});

var search = function(){

	var cityValue = $("#city").val();
	var stateValue = $("#state option:selected").val();
	var activityValue = $("#activity option:selected").val();
	
		$.ajax({
			url: "https://outdoor-data-api.herokuapp.com/api.json?api_key=4016165acc967a9800153c77a3528d83&q[city_cont]=" + cityValue +
			"&q[state_eq]=" + stateValue + "&q[activities_activity_type_name_eq]=" + activityValue,
			dataType: "jsonp",
			type: "GET",
			success: function(data){	
				console.log(data);

				for(var x in data["places"]) {	
					var locate = data["places"][x];
						$(".info").append("<hr>");
						$(".info").append("<div>" + "<img src=" + locate["activities"][0]["thumbnail"] + ">" +"</div>");
						$(".info").append("<p>" + "Place: " + locate["name"] + "</p>");
						$(".info").append("<p>" + "Location: " + locate["city"] + ", " + locate["state"] + "</p>");
						$(".info").append("<p>" + "Activity: " + "<a href=" + locate["activities"][0]["url"] + " target=_blank" + ">" + locate["activities"][0]["activity_type_name"] + "</a>" + "</p>");
						$(".info").append("<p>" + "Description: " + locate["activities"][0]["description"] + "</p>");						
				}
				/*var pic = (locate["activities"][0]["thumbnail"]);
				if ( pic === null ) {
					$(".info div").text( "no pic");
				}*/
					
				if (data["places"].length === 0) {
					console.log("no results");
					$(".info").append("Sorry, no results! Try a different location or activity.");
				}	

							
			}		
		});
}