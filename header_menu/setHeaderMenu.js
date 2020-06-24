$(document).ready(function(){

	checkSession();

	function checkSession() {
		return $.ajax({
			type: "GET",
			url: "/git_MIO_MA/header_menu/isSessionSet.php",
			dataType: "json",
			success: function(isSet) {
				if(isSet) {
					 $.getScript("/git_MIO_MA/header_menu/loadHeaderLogoutAccount.js");
				} else {
					 $.getScript("/git_MIO_MA/header_menu/loadHeaderLoginRegister.js");
				}
			},
			error: function(xhr, textStatus, errorThrown) {
	            alert(xhr.responseText); 
	      	}
		});
	}

	
	

	
});