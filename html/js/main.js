$(document).ready(function() {
	$('input[required = "required"').blur(CheckFeild);
	/*$('input[type = "email"').blur(CheckFeild);
	$('input[type = "password"').blur(CheckFeild);*/
	var transEnd = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";
	$('#loginopen').click(function(event) {
		$('#step1').addClass('left')
		$('#step2').removeClass();
		
		var username = $('#username')[0];
		/*$("#step2").one(transEnd, function() {
			username.focus();
			$(this).off(transEnd);
		});*/

		
	});
	$('#forgotpassword').click(function (e) {
		e.preventDefault()
		$('#step2').addClass('up');
		$('#step3').removeClass();
				var username = $('#askUsername')[0];
		/*$("#step3").one(transEnd, function() {
			username.focus();
			$(this).off(transEnd);
		});*/


	});
	$("#step3 form").submit(function(e) {
		e.preventDefault();
		/*
			Forgot password
			Check the feald
		*/
		var promblems = 0
		var username = $('#askUsername')[0];
		for (var i = 0; i < this.length; i++) {
			if(this[i].required == true){
				var check = CheckFeild(this[i])
				if(!check.sucsess){
					promblems++
				}
			}
		}
		//ajax
		$.ajax({
			url: './js/users.json',
			type: 'get',
			dataType: 'json',
			
		})
		.done(function(data) {
			console.log("success");
			var inventory = data;

			function findUsername(fruit) { 
			    return fruit.username === username.value;
			}

			var founduser = inventory.find(findUsername); 
			if(founduser == "" || founduser == null || founduser == undefined){
				promblems++
				var elem = $('#ResetPassError')[0];
				$('#ResetPassError').addClass('error');
				
				elem.innerHTML = "user not found";

				//display error user not found	


			}
		})
		.fail(function() {
			console.log("error");
			promblems++
		})
		.always(function() {
			console.log("complete");
			if(promblems == 0){
				$('#step3').addClass('left');
				$('#step4').removeClass();
			}
		});
		

	});
	$("#step4 a").click(function(e) {
		e.preventDefault();
		$('#step4').addClass('down');
		$('#step2').removeClass();
	});
	$("#step2 form").submit(function(e) {
		e.preventDefault();
		// check feilds
		var promblems = 0
		for (var i = 0; i < this.length; i++) {
			if(this[i].required == true){
				var check = CheckFeild(this[i])
				if(!check.sucsess){
					promblems++
				}
			}
		}
		//ajax
		$.ajax({
			url: './js/users.json',
			type: 'get',
			dataType: 'json',
			
		})
		.done(function(data) {
			console.log("success");
			var inventory = data;

			function findUsername(fruit) { 
			    return fruit.username === username.value;
			}

			var founduser = inventory.find(findUsername); 
				var elem = $('#LoginError')[0];
			if(founduser == "" || founduser == null || founduser == undefined){
				promblems++
				$('#LoginError').addClass('error');
				elem.innerHTML = "user not found";
				//display error user not found	
			}else{
				if(founduser.password !== $('#password')[0].value){
					promblems++
				$('#LoginError').addClass('error');
				elem.innerHTML = "Username or password is wrong";
					
				}
			}
		})
		.fail(function() {
			console.log("error");
			promblems++
		})
		.always(function() {
			console.log("complete");
			if(promblems == 0){
				$('#step2').addClass('left');
				$('#step5').removeClass();
			}
		});
	});

	function CheckFeild(falt) {
		var fel = {};
		if(falt.target){
			falt = this
		}
		falt.parentElement.parentElement.classList.remove('error')
		
		
		if(falt.value == "" || falt.value == null || falt.value == undefined){
			fel.sucsess = false;
			fel.reasson = "Please enter your "+falt.name;
		}
		if(falt.type == 'email'){
			if (!isEmail(falt.value)) {
				fel.sucsess = false;
				fel.reasson = "I think we need an email adress.";	
			}
		}
		if(Object.keys(fel).length !== 0 && fel.constructor === Object){
			falt.parentElement.parentElement.classList.add('error')
			falt.parentElement.nextElementSibling.innerText= fel.reasson
		}else{
			fel.sucsess = true
		}

		return fel;
	}
	function isEmail(email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	}
});
