<?php
	session_start();

	$active = false;
	if(isset($_SESSION['userId'])) {
		$active = true;
	}
	echo json_encode($active);
	exit();
?>