$(document).ready(function(){

	var tableUsers = document.getElementById("tableUsers");
	var buttonSubmitRoles = document.getElementById("submitAdministration");
	var users;

	getUsers().then(data => setUsers(data)).then(_ => buildTable());

	buttonSubmitRoles.addEventListener("click", storeRoles);


	function getUsers() {
		return $.ajax({
			url: "roleAssignment.php",
			type: "GET",
			data: "getUsers",
			dataType: "json",
			success: function(data) {
			},
			error: function(xhr, textStatus, errorThrown) {
		        console.log(xhr.responseText);
			}
		});
	}

	function setUsers(data) {
		users = data;
	}

	function storeRoles() {
		var changes = [];
		for(var i = 0; i < users.length; i++) {
			oldRole = users[i]["role"];
			if(oldRole == undefined || oldRole == null || oldRole == "") {
				oldRole = "none";
			}
			var box = document.getElementById("selectBox" + i);
			newRole = box.options[box.selectedIndex].value;
			if(oldRole != newRole) {
				changes.push({"userId": users[i]["id"], "newRole": newRole});
			}
		}

		$.ajax({
			url: "roleAssignment.php",
			type: "POST",
			data: {"changes": JSON.stringify(changes)},
			success: function(success) {
				if(success) {
					alert("Die Änderungen wurden erfolgreich gespeichert.");
				} else {
					alert("Bei der Übertragung ist ein Fehler aufgetreten, die Änderungen konnten nicht gespeichert werden.");
				}
			},
			error: function(xhr, textStatus, errorThrown) {
		        console.log(xhr.responseText);
			}
		});
	}

	function buildTable() {
		var cellNum = Object.keys(users[0]).length;

		for(var i = 0; i < users.length; i++) {
			var row  = tableUsers.insertRow(tableUsers.length);
			for(var key in users[i]) {
				var cell = row.insertCell(row.length);
				if(key == "role") {
					var selectBox = document.createElement("select");
					selectBox.setAttribute("id", "selectBox" + i);
					var optionAdmin = document.createElement("option");
					optionAdmin.value = "Admin";
					optionAdmin.text = "Admin";
					var optionEditor = document.createElement("option");
					optionEditor.value = "Editor";
					optionEditor.text = "Editor";
					var optionNone = document.createElement("option");
					optionNone.value = "none";
					optionNone.text = "keine";
					selectBox.appendChild(optionAdmin);
					selectBox.appendChild(optionEditor);
					selectBox.appendChild(optionNone);
					cell.append(selectBox);
				} else {
					var content = document.createTextNode(users[i][key]);
					cell.appendChild(content);
				}
			}
			
			if(users[i]["role"] == "Admin") {
				selectBox.value = "Admin";
			} else if(users[i]["role"] == "Editor") {
				selectBox.value = "Editor";
			} else {
				selectBox.value = "none";
			}
		}	
	}
});