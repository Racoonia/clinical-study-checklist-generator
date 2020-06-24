<?php
	$CONFIG = parse_ini_file("../config.ini");

	$db = new PDO('mysql:host='. $CONFIG['db_host'] .';dbname='. $CONFIG['db_database'], $CONFIG['db_user'], $CONFIG['db_pass']);

	if(isset($_GET['getUsers'])) {
		$stmt = $db->query('SELECT id, username, email, role FROM users');
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($res);
	}

	if(isset($_POST['changes'])) {
		$changes = json_decode($_POST['changes'], true);
		for($i = 0; $i < sizeof($changes); $i++) {
			$stmt = $db->prepare('UPDATE users SET role=:newRole WHERE ID=:userId');
			$stmt->execute(['newRole' => $changes[$i]['newRole'], 'userId' => intval($changes[$i]['userId'])]);
			if(!$stmt->rowCount()) {
				echo false;
			}
		}
		echo true;
	}
	exit;
?>