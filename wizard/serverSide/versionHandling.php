<?php
	session_start();

	$versions = json_decode(file_get_contents("../../data/versions.json"), true);
	$version = end($versions)["version"];
	$_SESSION['version'] = $version;

	echo json_encode($version);
	exit;
?>