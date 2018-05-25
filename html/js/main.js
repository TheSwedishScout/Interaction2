$(document).ready(function() {
	$('#loginopen').click(function(event) {
		$('#step1').addClass('left')
		$('#step2').removeClass();
	});
	$('#forgotpassword').click(function (e) {
		e.preventDefault()
		$('#step2').addClass('up');
		$('#step3').removeClass();

	});
	$("#step3 form").submit(function(e) {
		e.preventDefault();
		/*
			Check the feald
		*/

		$('#step3').addClass('left');
		$('#step4').removeClass();
	});
	$("#step4 a").click(function(e) {
		e.preventDefault();
		$('#step4').addClass('down');
		$('#step2').removeClass();
	});
	$("#step2 form").submit(function(e) {
		e.preventDefault();
		// check feilds
		$('#step2').addClass('left');
		$('#step5').removeClass();

	});

});
