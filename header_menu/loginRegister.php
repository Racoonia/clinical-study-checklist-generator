<?php  
	session_start();

	$CONFIG = parse_ini_file("../config.ini");
	$db = new PDO('mysql:host='. $CONFIG['db_host'] .';dbname='. $CONFIG['db_database'], $CONFIG['db_user'], $CONFIG['db_pass']);

	// login
	if(isset($_POST['loginUsername']) && isset($_POST['loginPassword'])) {
		$username = $_POST['loginUsername'];
		$password = $_POST['loginPassword'];

		$stmt = $db->prepare('SELECT password, ID, role FROM users WHERE username = :username');
		$stmt->execute(['username' => $username]);
		$user = $stmt->fetch(PDO::FETCH_ASSOC);

		$passwordHash = $user['password'];
		$userId = $user['ID'];
		$role = $user['role'];
		$validPassword = password_verify($password, $passwordHash);

		if($validPassword) {
			$_SESSION['userId'] = $userId;
			$_SESSION['role'] = $role;
			$_SESSION['username'] = $username;

		} 
		echo json_encode($validPassword);
	}

	// registration
	if(isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['email']) && isset($_POST['registrationPassword'])) {
		$firstName = $_POST['firstName'];
		$lastName = $_POST['lastName'];
		$email = $_POST['email'];
		$password = $_POST['registrationPassword'];

		$error = false;
		if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        	$error = true;
        	echo "ERROR_INVALID";
    	} 

    	// check if email address is already registered
    	if(!$error) { 
	        $stmt = $db->prepare('SELECT * FROM users WHERE email = :email');
	        $result = $stmt->execute(['email' => $email]);
	        $user = $stmt->fetch();
	        if($user !== false) {
	            $error = true;
	            echo "ERROR_ALREADY_EXISTS";
	        }    
    	}

    	if(!$error) {
    		$passwordHash = password_hash($password, PASSWORD_DEFAULT);
			$stmt = $db->prepare('INSERT INTO users(first_name, last_name, email, password) VALUES (:first_name, :last_name, :email, :password)');
			$stmt->execute(['first_name' => $firstName, 'last_name' => $lastName, 'email' => $email, 'password' => $passwordHash]);
			echo true;
    	}
	}

	exit();
?>