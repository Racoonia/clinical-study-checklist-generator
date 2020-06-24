<?php
	session_start();
	
	$CONFIG = parse_ini_file("../config.ini");
	$db = new PDO('mysql:host='. $CONFIG['db_host'] .';dbname='. $CONFIG['db_database'], $CONFIG['db_user'], $CONFIG['db_pass']);
	
	$userId = $_SESSION['userId'];
	$stmt = $db->prepare('UPDATE users SET writeaccess = 1 WHERE ID = :userId');
	$stmt->execute(['userId' => intval($userId)]);
?>