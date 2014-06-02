$(document).ready(function(){
	
	$(".button").click(function(){
		var city=$("#city").val();
		var state=$("#state option:selected").val();
		var activity=$("#activity option:selected").val();
		alert(state);
	});
});