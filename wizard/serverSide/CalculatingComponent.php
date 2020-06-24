<?php
session_start();

if(isset($_GET['result'])) {
  $_SESSION["resultingElements"]["checklistElement"] = [];
  $_SESSION["resultingElements"]["responsibleAnswers"] = [];
  $result = determineChecklistElements();
  echo json_encode($result, true);
}

function determineChecklistElements() {
  $groupConditions = [];
  $version = $_SESSION['version'];
	$checklistElements = json_decode(file_get_contents("../../data/v" . $version . "_checklistElements.json"), true);
  $checklistElementgroups = json_decode(file_get_contents("../../data/v" . $version . "_checklistElementgroups.json"), true);
	for($i = 0; $i < count($checklistElements); $i++) {
    for($sub = 0; $sub < count($checklistElements[$i]["subelements"]); $sub++) {
      $subelement = $checklistElements[$i]["subelements"][$sub];
      $groupconditionsFulfilled = true;
      // check group conditions
      for($g = 0; $g < count($subelement["groups"]); $g++) {
        $gId = $subelement["groups"][$g];
        if(!array_key_exists($gId, $groupConditions)) {
          for($objIndex = 0; $objIndex < count($checklistElementgroups); $objIndex++) {
            if($checklistElementgroups[$objIndex]["id"] == $gId) {
              $group = $checklistElementgroups[$objIndex];
              break;
            }
          }
          $groupConditions[$gId] = checkCondition($group, false);
        }
        if($groupConditions[$gId] == false) {
          $groupconditionsFulfilled = false;
          break;
        }
      }
      if($groupconditionsFulfilled) {
        $conditionBool = checkCondition($subelement, true);
        if($conditionBool) {
          $_SESSION["resultingElements"]["checklistElement"][$checklistElements[$i]["id"]][$subelement["id"]] = $subelement["elementtext"];
        } else {
          array_pop($_SESSION["resultingElements"]["responsibleAnswers"]);
        }
      }
    }
    if(array_key_exists($checklistElements[$i]["id"], $_SESSION["resultingElements"]["checklistElement"])) {
      $_SESSION["resultingElements"]["checklistElement"][$checklistElements[$i]["id"]]["elementtext"] = $checklistElements[$i]["elementtext"];
    }
	}
	return $_SESSION["resultingElements"];
}

function checkCondition($element, $setAnswers) {
  $condition = $element["condition"];
  if($condition == "") {
    return true;
  }
  
  $givenAnswers = $_SESSION['givenAnswers'];
  $responsibleAnswers = [];
  $booleanCondition = $condition;
  $pattern = '/\b[F]\d{3}\-[A]\d{2}\b/';

  $booleanCondition = preg_replace_callback($pattern, 
                                      function($match) use ($givenAnswers, &$responsibleAnswers, $setAnswers) {
                                        $match = $match[0];
                                        $questionId = explode("-", $match)[0];
                                        for($answers = 0; $answers < sizeof($givenAnswers[$questionId]["answers"]); $answers++) {
                                          $currAnswer = $givenAnswers[$questionId]["answers"][$answers];
                                          if($currAnswer == $match && $givenAnswers[$questionId]["active"] == true) {
                                            if($setAnswers) {
                                              $responsibleAnswers[$questionId] = [];
                                              if(!in_array($currAnswer, $responsibleAnswers[$questionId])) {
                                                $responsibleAnswers[$questionId][] = $givenAnswers[$questionId]["answers"][$answers];
                                              }
                                            }
                                            return "true";
                                          } 
                                        } 
                                        return "false";
                                      }, $booleanCondition);

  if($setAnswers) {
    $_SESSION["resultingElements"]["responsibleAnswers"][$element["id"]] = $responsibleAnswers; 
  }
  $res = eval("return $booleanCondition;");
  return $res;
}
exit;
?>