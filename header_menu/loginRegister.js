$(document).ready(function(){
 		var divLogin = document.getElementById("loginDialog");
		var divRegistration = document.getElementById("registrationDialog");

		var loginLink = document.getElementById("loginLink");
		var registrationLink = document.getElementById("registrationLink");
	
		var formLogin = document.getElementById("formLogin");
		var formRegistration = document.getElementById("formRegistration");
		var inputRegistrationPassword = document.getElementById("registrationPassword");
		var inputRegistrationPasswordRepeat = document.getElementById("registrationPasswordRepeat");
		var buttonCancelLogin = document.getElementById("cancelLogin");
		var buttonCancelRegistration = document.getElementById("cancelRegistration");

		initDialogs();
		setListeners();

	function initDialogs() {
		$(divLogin).dialog({modal: true, height: "auto", maxHeight: $(window).height(), width: "auto", autoOpen: false, resizable: false, draggable: true, position:{at:"top", of: window, collision: "fit"}, title: "Anmelden"});
		$(divRegistration).dialog({modal: true, height: "auto", maxHeight: $(window).height(), width: $(window).width()*0.3, autoOpen: false, resizable: false, draggable: true, position:{at:"top", of: window, collision: "fit"}, title: "Registrieren"});
	}

	function setListeners() {
		loginLink.addEventListener("click", openLoginDialog);
		registrationLink.addEventListener("click", openRegistrationDialog);
		formLogin.addEventListener("submit", function(evt) { evt.preventDefault(); 
															 login(); 
														});

		formRegistration.addEventListener("submit", function(evt) { evt.preventDefault(); 
																	register();
																});

		buttonCancelLogin.addEventListener("click", closeLoginDialog);
		buttonCancelRegistration.addEventListener("click", closeRegistrationDialog);
	}

	function checkSession() {
		return $.ajax({
			type: "GET",
			url: "/git_MIO_MA/header_menu/isSessionSet.php",
			dataType: "json",
			success: function(data) {	
			},
			error: function(xhr, textStatus, errorThrown) {
	            alert(xhr.responseText); 
	      	}
		});
	}

	function openLoginDialog() {
		formLogin.reset();
		$(divLogin).dialog("open");
	}

	function openRegistrationDialog() {
		formRegistration.reset();
		$(divRegistration).dialog("open");
	}

	function closeLoginDialog() {
		$(divLogin).dialog("close");
	}

	function closeRegistrationDialog() {
		$(divRegistration).dialog("close");
	}

	function login() {
		$.ajax({
    		type: "POST",
    		url: '/git_MIO_MA/header_menu/loginRegister.php',
    		dataType: "json",
    		data: $(formLogin).serialize(),
    		success: function(validData) {
    			if(validData) {
    				formLogin.reset();
    				closeLoginDialog();
    				$.getScript("/git_MIO_MA/header_menu/loadHeaderLogoutAccount.js");
    			} else {
    				alert("Falscher Nutzername oder Passwort.");
    			}
            },
            error: function(xhr, textStatus, errorThrown) {
        		console.log(xhr.responseText);
      		}
		});
	}

	function register() {
		var registrationPassword = inputRegistrationPassword.value;
		var registrationPasswordRepeat = inputRegistrationPasswordRepeat.value;
		if(registrationPassword != registrationPasswordRepeat) {
			alert("Die Passwörter müssen übereinstimmen.");
		} else {
			$.ajax({
	    		type: "POST",
	    		url: '/git_MIO_MA/header_menu/loginRegister.php',
	    		data: $(formRegistration).serialize(),
	    		success: function (response) {
	    			if(response == "ERROR_INVALID") {
	    				alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
	    			} else if(response == "ERROR_ALREADY_EXISTS") {
	    				alert("Diese E-Mail-Adresse ist bereits vergeben.");
	    			} else if(response) {
	    				formRegistration.reset();
	    				alert("Sie haben sich erfolgreich registriert.\n Bitte senden Sie eine E-Mail an medizininformatik@uni-oldenburg, um die Rechte für den Zugang zum Editor zu beantragen.");
	    				closeRegistrationDialog();
	    			}
	            },
	            error: function(xhr, textStatus, errorThrown) {
	        		console.log(xhr.responseText); 
	      		}
			});
		}
	}
});