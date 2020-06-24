<?php
	session_start();

	$CONFIG = parse_ini_file("../config.ini");
	$db = new PDO('mysql:host='. $CONFIG['db_host'] .';dbname='. $CONFIG['db_database'], $CONFIG['db_user'], $CONFIG['$db_pass']);

	$userId = $_SESSION['userId'];

	if(isset($_POST['logout'])) { 
		// withdraw writeaccess
		$stmt = $db->prepare('UPDATE users SET writeaccess = 0 WHERE ID = :userId');
		$stmt->execute(['userId' => intval($userId)]);
		if($_POST['logout'] == "true") { // logout
			 unset($_SESSION['userId']);
			 unset($_SESSION['username']);
			 unset($_SESSION['role']);
		}
	}
	exit;
?>