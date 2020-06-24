<?php

	if(isset($_POST['versionnumber'])) {
		$versionnumber = $_POST['versionnumber'];
		$content = json_decode(file_get_contents('../data/versions.json'));
		foreach ($content as $key => $value) {
			if($value->version === $versionnumber) {
				$versionIndex = $key;
				break;
			}
		}

		$len = count($content);
		for($i = $versionIndex + 1; $i < $len; $i++) {
			$content = deleteVersion($content, $i);
		}

		file_put_contents('../data/versions.json', json_encode($content));
	}

	function deleteVersion($array, $versionIndex) {
		$version = $array[$versionIndex]->version;
		$path = '../data/';
		unlink($path . 'v' . $version . '_questions.json');
		unlink($path . 'v' . $version . '_questiongroups.json');
		unlink($path . 'v' . $version . '_checklistElements.json');
		unlink($path . 'v' . $version . '_checklistElementgroups.json');
		unset($array[$versionIndex]);
		return $array;
	} 

?>