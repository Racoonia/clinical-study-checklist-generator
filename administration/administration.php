<?php
	session_start();
	if(!isset($_SESSION['userId']) || $_SESSION['role'] !== "Admin") {
		header('Location: ../access_denied.html');
		exit();
	}
?>

<!DOCTYPE html>
 <html lang="de">
 <head>

 <title>Administration</title>
 <meta http-equiv="content-type" content="text/html; charset=utf-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/base/jquery-ui.css">
 <link rel="stylesheet" type="text/css" href="../header_menu/styleHeaderMenu.css">
 <link rel="stylesheet" type="text/css" href="styleAdministration.css">
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
 <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> 
 <script src="../header_menu/setHeaderMenu.js"></script>
 <script src="administration.js"></script>

 </head>
 	<body>
 		<div id="header"></div>
		<div id="menu"></div>

		<div class="content">

			<table id="tableUsers">
				<tr>
    				<th>ID</th>
    				<th>Nutzername</th> 
    				<th>E-Mail-Adresse</th>
    				<th>Rechte</th>
  				</tr>
			</table>

			<div class="centered">
				<button type="button" id="submitAdministration">Speichern</button>
			</div>
	 		

		</div>

 	</body>
 </html>