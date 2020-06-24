<?php
session_start();
$CONFIG = parse_ini_file("../../config.ini");

/*
	Unsets the session variable that contains a loaded session (must not be a valid session) to start a new session.
*/
if(isset($_GET['newSession'])) {
	unset($_SESSION['loadedSession']);
}

/* 
	Decrypts the content of the uploaded file and stores it in the session variable 'loadedSession'.
*/
if(isset($_FILES['file'])) {
	$key = base64_decode($CONFIG['cryptoKey']);
	$file = file_get_contents($_FILES['file']['tmp_name']);
	list($encryptedSession, $iv) = explode('::', base64_decode($file), 2);
	$decryptedSession = openssl_decrypt($encryptedSession, 'AES-256-CBC', $key, 0, $iv);
	$_SESSION['loadedSession'] = json_decode($decryptedSession, true);
	echo $decryptedSession;
}

/*
	Returns the decoded uploaded session.
*/
if (isset($_GET['loadedSession'])) {
	if (isset($_SESSION['loadedSession']) && !empty($_SESSION['loadedSession'])) {
		echo json_encode($_SESSION['loadedSession']);
	}
} 




?>