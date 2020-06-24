<?php

	if (isset($_POST['localStorages']) && isset($_POST['versiondetails'])) {
		$localStorages = json_decode($_POST['localStorages'], true);
		$versiondetails = json_decode($_POST['versiondetails'], true);
		$date = date("d.m.Y H:i:s");
		$versiondetails["release"] = $date;

		writeVersion($versiondetails, "versions.json");
		writeData($localStorages[0], "v" . $versiondetails["version"] . "_questions.json");
		writeData($localStorages[1], "v" . $versiondetails["version"] . "_questiongroups.json");
		writeData($localStorages[2], "v" . $versiondetails["version"] . "_checklistElements.json");
		writeData($localStorages[3], "v" . $versiondetails["version"] . "_checklistElementgroups.json"); 
	}

	function writeData($data, $filename) {
		$path = "../data/";
		file_put_contents($path.$filename, json_encode($data));
	}

	function writeVersion($versiondetails) {
		$path = "../data/";
		$content = json_decode(file_get_contents($path . "versions.json"));
		$file = fopen($path . "versions.json", "wb");
		array_push($content, $versiondetails);
		fwrite($file, json_encode($content));
		fclose($file);
	}
?>