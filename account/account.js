$(document).ready(function(){

	var formAccount = document.getElementById("formAccount");
	var spanUsername = document.getElementById("username");
	var spanRole = document.getElementById("role");
	var inputEmail = document.getElementById("email");
	var inputPassword = document.getElementById("password");
	var inputPasswordRepeat = document.getElementById("passwordRepeat");
	var buttonDeleteAccount = document.getElementById("deleteAccount");
	var account;
	var msg = "";

	setAccountinformation();

	formAccount.addEventListener("submit", function(evt) { evt.preventDefault();
															if(inputPassword.value != "" && inputPassword.value !== inputPasswordRepeat.value) {
																alert("Die Änderungen konnten nicht gespeichert werden: Die Passwörter müssen übereinstimmen.");
																return;
															}
															alterInformation();


	});

	buttonDeleteAccount.addEventListener("click", function(evt) { if(confirm("Wollen Sie Ihr Konto wirklich löschen?")) {
																		deleteAccount();
																	}
																});

	function setAccountinformation() {
		$.ajax({
			url: "accountinformation.php",
			type: "GET",
			data: "accountinfo",
			success: function(data) {
				account = JSON.parse(data);
				spanUsername.textContent = account["username"];
				inputEmail.value = account["email"];
				var role = account["role"];
				if(role == "Admin") {
					spanRole.textContent = "Adminrechte";
				} else if(role == "Editor") {
					spanRole.textContent = "Bearbeitungsrechte (Zugriff auf Editor)";
				} else {
					spanRole.textContent = "keine";
				}
			},
			error: function(xhr, textStatus, errorThrown) {
		        console.log(xhr.responseText);
			}
		});
	}

	function alterInformation() {
		var password = inputPassword.value.trim();
		var email = inputEmail.value.trim();
		var data = {};
		if(password != "") {
			data["password"] = password;
		}
		if(email != account["email"]) {
			data["email"] = email;
		}
		if(Object.keys(data).length > 0) {
			$.ajax({
				url: "accountinformation.php",
				type: "POST",
				data: {"newData": JSON.stringify(data)},
				success: function(errors) {
					errors = JSON.parse(errors);
					var msg = "";
					if(errors.length == 0) {
						inputPassword.value = "";
						inputPasswordRepeat.value = "";
						alert("Die Änderungen wurden erfolgreich gespeichert.");
					} else {
						if(!errors.includes("ERROR_PWD_EXECUTE") && password != "") {
							msg += "Das Passwort wurde erfolgreich geändert.\n";
							inputPassword.value = "";
							inputPasswordRepeat.value = "";
						} 
						for(var i = 0; i < errors.length; i++) {
							switch (errors[i]) {
								case "ERROR_PWD_EXECUTE":
									msg += "Das Passwort konnte nicht geändert werden, da ein Fehler aufgetreten ist.\n";
									break;
								case "ERROR_EMAIL_INVALID":
									msg += "Die E-Mail-Adresse konnte nicht geändert werden, da sie nicht gültig ist.\n";
									break;
								case "ERROR_EMAIL_ALREADY_EXISTS":
									msg += "Die E-Mail-Adresse konnte nicht geändert werden, da sie bereits vergeben ist.\n";
									break;
								case "ERROR_EMAIL_EXECUTE":
									msg += "Die E-Mail-Adresse konnte nicht geändert werden, da ein Fehler aufgetreten ist.\n";
									break;
							}
						}
						alert(msg);
					}
				},
				error: function(xhr, textStatus, errorThrown) {
			        console.log(xhr.responseText);
				}
			});
		}
	}
	
	function deleteAccount() {
		return $.ajax({
			url: "accountinformation.php",
			type: "GET",
			data: "deleteAccount",
			success: function(response) {
				if(response == false) {
	    			alert("Beim Löschen des Accounts ist ein Fehler aufgetreten.");
	    		} else {
	    			window.location.href = "../home/home.html";
	    		}
			},
			error: function(xhr, textStatus, errorThrown) {
		        console.log(xhr.responseText);
			}
		});
	}

	
});