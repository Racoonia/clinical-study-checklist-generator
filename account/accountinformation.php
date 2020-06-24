<?php
	session_start();

	$CONFIG = parse_ini_file("../config.ini");

	$db = new PDO('mysql:host='. $CONFIG['db_host'] .';dbname='. $CONFIG['db_database'], $CONFIG['db_user'], $CONFIG['db_pass']);

	$userId = $_SESSION['userId'];

	if(isset($_GET['accountinfo'])) {
		$stmt = $db->prepare('SELECT username, email, role FROM users WHERE ID = :userId');
		$stmt->execute(['userId' => intval($userId)]);
		$account = $stmt->fetch(PDO::FETCH_ASSOC);

		echo json_encode($account, true);
	}

	if(isset($_POST['newData'])) {
		$data = json_decode($_POST['newData'], true);
		$errors = [];
		if(array_key_exists('password', $data)) {
			$passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);
			$stmt = $db->prepare('UPDATE users SET password=:password WHERE ID=:userId');
			$stmt->execute(['password' => $passwordHash, 'userId' => intval($userId)]);
			if(!$stmt->rowCount()) {
				$errors[] = 'ERROR_PWD_EXECUTE';
			}
		}

		if(array_key_exists('email', $data)) {
			$email = $data['email'];
			$invalid = false;
			if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
	        	$errors[] = 'ERROR_EMAIL_INVALID';
	        	$invalid = true;
	    	} else {
			    $stmt = $db->prepare('SELECT * FROM users WHERE email = :email');
			    $result = $stmt->execute(['email' => $email]);
			    $user = $stmt->fetch();
			    if($user !== false) {
			        $errors[] = 'ERROR_EMAIL_ALREADY_EXISTS';
			        $invalid = true;
		    	}    
	    	}
	    	if(!$invalid) {
	    		$stmt = $db->prepare('UPDATE users SET email = :email WHERE ID = :userId');
				$stmt->execute(['email' => $email, 'userId' => intval($userId)]);
				if(!$stmt->rowCount()) {
					$errors[] = 'ERROR_EMAIL_EXECUTE';
				}
	    	}		
	    }
	    echo json_encode($errors);	
	}

	if(isset($_GET['deleteAccount'])) {
		unset($_SESSION['userId']);
	    unset($_SESSION['role']);
		$stmt = $db->prepare('DELETE FROM users WHERE ID = :userId');
		$stmt->execute(['userId' => intval($userId)]);
		if(!$stmt->rowCount()) {
			echo false;
		}
		echo true;
	}

	exit;
?>