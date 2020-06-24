<?php
session_start();

$givenAnswers = array();

if(isset($_POST['localStorage'])) {
  $_SESSION["localStorage"] = json_decode($_POST['localStorage'], true);
}

if(isset($_POST['givenAnswers'])) {
	$_SESSION['givenAnswers'] = json_decode($_POST['givenAnswers'], true);
} 

if(isset($_GET['result'])) {
  echo json_encode($_SESSION["resultingElements"], true);
}

if(isset($_GET['localQuestionStorage'])) {
  $localQuestionStorage = json_decode(file_get_contents("data/v" . $_SESSION['version'] . "_questions.json"), true);
  echo json_encode($localQuestionStorage, true);
}

if(isset($_GET['hash'])) {
  $elements = $_SESSION["resultingElements"]['checklistElement'];
  $elementsString = "";

  foreach($elements as $key => $value) {
    $elementsString = $elementsString . "<" . $value["elementtext"] . ">";
    foreach($value as $subkey => $subvalue) {
      if($subkey !== "elementtext") {
        $elementsString = $elementsString . $subvalue . ";;";
      } 
    }
  }
  $hashcode = hash('sha256', $elementsString);
  $_SESSION['hashcode'] = $hashcode;
}

if(isset($_GET['username'])) {
  echo $_SESSION['username'];
}
exit;
?>