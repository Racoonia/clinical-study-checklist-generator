$(document).ready(function(){
		var logoutLink = document.getElementById("logoutLink");
		var accountLink = document.getElementById("accountLink");

		setListeners();

	function setListeners() {
		logoutLink.addEventListener("click", function(evt) {confirmLogout();});
	}

	function logout() {
		$.ajax({
		    type: "POST",
		    url: "/git_MIO_MA/header_menu/logout.php",
		    data: {"logout": "true"},
		    success: function (data) {
		    	$.getScript("/git_MIO_MA/header_menu/loadHeaderLoginRegister.js");
		    },
		    error: function(xhr, textStatus, errorThrown) {
		        console.log(xhr.responseText); 
		    }
		});
	}

	function confirmLogout() {
		if(window.location.href == "http://localhost/git_MIO_MA/account/account.html" || window.location.href == "http://localhost/git_MIO_MA/administration/administration.php") {
			window.location.href = "/git_MIO_MA/home.html";
			logout();
		}
		if(window.location.href == "http://localhost/git_MIO_MA/editor/editor.php") {
			var logoutConfirmed = confirm("Wollen Sie sich wirklich abmelden? Alle nicht gespeicherten Änderungen gehen verloren, wenn Sie sich jetzt abmelden.");
			if(logoutConfirmed) {
				window.location.href = "/git_MIO_MA/home.html";
				logout();
			}
		} else {
			logout();
		}
	}



});