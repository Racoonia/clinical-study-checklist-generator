<?php

header("Content-type: text/xml");
header("Content-Disposition: attachment; filename='Checkliste_". date('Y-m-d') .".xml'");

session_start();
date_default_timezone_set('UTC');

generateChecklistXML($_SESSION['resultingElements']['checklistElement']);

function generateChecklistXML($elements) {
	$version = $_SESSION['version'];
	$date = date('d.m.Y', time());
	$numEl = count($elements);

	/* create a dom document with encoding UTF8 */
    $domtree = new DOMDocument('1.0', 'UTF-8');
    $domtree->formatOutput = true;

    $root = $domtree->createElement('document');

    $version = $domtree->createElement('version', $version);
    $root->appendChild($version);

    $date = $domtree->createElement('date', $date);
    $root->appendChild($date);

    $hash = $domtree->createElement('hashcode', $_SESSION['hashcode']);
    $root->appendChild($hash);

    $checklist = $domtree->createElement('checklist');

    $el = 0;
	foreach($elements as $key => $value) {
		$el++;
		$numSubel = count($value) - 1;
		$element = $domtree->createElement('element');
		$elementtext = $domtree->createAttribute('title');
		$elementtext->value = $value['elementtext'];
    	$element->appendChild($elementtext);
		$sub = 0;
		foreach($value as $subkey => $subvalue) {
			$sub++;
			if($subkey !== "elementtext") {
				$subelement = $domtree->createElement('subelement', $subvalue);
    			$element->appendChild($subelement);
			}
		}
		$checklist->appendChild($element);	
	}

	$root->appendChild($checklist);
	$domtree->appendChild($root);

    echo $domtree->saveXML();
}

?>