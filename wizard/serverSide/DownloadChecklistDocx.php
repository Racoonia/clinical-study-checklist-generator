<?php
require_once __DIR__ . '../../vendor/autoload.php';
use Endroid\QrCode\QrCode;

header("Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document");
header("Content-Disposition: attachment; filename='Checkliste_". date('Y-m-d') .".docx'");

date_default_timezone_set('UTC');
session_start();

generateChecklist($_SESSION['resultingElements']['checklistElement']);

function generateChecklist($resultElements) {
	$elements = $resultElements;
	$templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor('../../resources/Template.docx');

	$numEl = count($elements);
	$templateProcessor->cloneBlock('block', $numEl);
	$el = 0;
	foreach($elements as $key => $value) {
		$el++;
		$numSubel = count($value) - 1;
		$templateProcessor->cloneRow('subelement#' . $el, $numSubel);
		$sub = 0;
		foreach($value as $subkey => $subvalue) {
			$sub++;
			if($subkey == "elementtext") {
				$templateProcessor->setValue('element#' . $el, $subvalue);
			} else {
				$templateProcessor->setValue('subelement#' . $el . "#" . $sub, $subvalue);
			}
		}
	}

	if(isset($_SESSION['hashcode'])) {
		$hash = $_SESSION['hashcode'];
		$qrCode = new QrCode($hash);
		$qrCode->writeFile($hash . '.png');
		$templateProcessor->setImageValue('image1.png', $hash . '.png');
	}
	

	$version = $_SESSION['version'];
	$date = date('d.m.Y', time());

	$templateProcessor->setValue('date', $date);
	$templateProcessor->setValue('version', $version);
	ob_clean();

	$templateProcessor->saveAs("php://output"); 
	unlink($hash . '.png');
}

?>