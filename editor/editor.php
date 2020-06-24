<?php
	session_start();
	if(!isset($_SESSION['userId']) || !($_SESSION['role'] == "Editor" || $_SESSION['role'] == "Admin")) {
		header('Location: ../access_denied.html');
		exit();
	}

	$CONFIG = parse_ini_file("../config.ini");
	$db = new PDO('mysql:host='. $CONFIG['db_host'] .';dbname='. $CONFIG['db_database'], $CONFIG['db_user'], $CONFIG['db_pass']);

	$userId = $_SESSION['userId'];
	$stmt = $db->query("SELECT * FROM users WHERE writeaccess = 1");
	$busy = $stmt->fetch();
	
	if($busy['ID'] == $userId) { // user refreshed page -> withdraw writeaccess and redirect to mainpage
		$stmt = $db->prepare('UPDATE users SET writeaccess = 0 WHERE ID = :userId');
		$stmt->execute(['userId' => intval($userId)]);
		header('Location: ../home.html');
		exit();
	} else if($busy !== false) { // editor is already in use by someone else
		header('Location: ../access_denied.html');
		exit(); 
	} else { // grant writeaccess
		$stmt = $db->prepare('UPDATE users SET writeaccess = 1 WHERE ID = :userId');
		$stmt->execute(['userId' => intval($userId)]);
	}  
?>

<!DOCTYPE html>
 <html lang="de">
 <head>

 <title>Editor</title>
 <meta http-equiv="content-type" content="text/html; charset=utf-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/base/jquery-ui.css">
 <link rel="stylesheet" type="text/css" href="styleEditor.css">
 <link rel="stylesheet" type="text/css" href="../header_menu/styleHeaderMenu.css">
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
 <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> 
 <script type="text/javascript" src="EditorMain.js"></script>
 <script type="text/javascript" src="EditorModel.js"></script>
 <script type="text/javascript" src="EditorView.js"></script>
 <script type="text/javascript" src="EditorController.js"></script>

 </head>
 	<body>
 		<div id="header"></div>
		<div id="menu"></div>

		<div class="content">
	 		<div class="tab">
			  <button class="tablinks" id="buttonTabQuestion">Fragen verwalten</button>
			  <button class="tablinks" id="buttonTabGroup">Fragegruppen verwalten</button>
			  <button class="tablinks" id="buttonTabChecklist">Checklisten-Elemente verwalten</button>
			  <button class="tablinks" id="buttonTabElementgroup">Elementgruppen verwalten</button>
			  <button class="tablinks" id="buttonTabVersions">Versions-Log</button>
			</div>

			<!-- Tab content -->
			<div id="tabQuestion" class="tabcontent">
				<div id="questionLegend">
					Klicken Sie auf eine Frage oder Antwort um ihre Abhängigkeiten zu anderen Fragen und Antworten anzeigen zulassen.
					<br><br>
					<div>
						<span><img src="../resources/dot_blue.svg" width="15" height="15">
						selektierte Frage/Antwort</span>
						<span><img src="../resources/dot_red.svg" width="15" height="15">
						enthalten in Bedingung von selektierter Frage/Antwort</span>
					</div>
				</div>

				<div id="overviewQuestion">
					<table id="treeviewQuestions">
					</table>

					<br>
					<button type="button" id="newQuestion" class="addButton" title="neue Frage erstellen"></button>

				</div>
			</div>


			<div id="tabGroup" class="tabcontent">

				<div class="flex">
					<select id="selectGroup"></select>
					<button id="buttonRenameGroup" class="renameButton" title="Gruppe umbenennen"></button>
					<button id="buttonDeleteGroup" class="deleteButton" title="Gruppe löschen"></button>
					<button id="buttonNewGroup" class="addButton" title="neue Gruppe erstellen"></button>
				</div>
				<br>
				<h3>Bedingung:</h3>
				<img src="../resources/info_circle.svg" id="infoQuestiongroupCondition" width="18" height="18" class="infoIcon tooltip" title="">
					<div id="conditionGroupContainer" class="condContainer">
						<button id="buttonConditionGroup" class="editButton" title="Bedingung bearbeiten"></button>
						<div id="divConditionGroup" class="tooltip divCond" title=""></div> 
				  		<div class="condDefault">keine Bedingung</div>
					</div>
				<br>
				<div id="divGrouping">
					<div class="divSelectionQuestions">
						<h3>nicht zugeordnete Fragen</h3>
						<select id="selectNotGrouped" class="selectionQuestion" size="20" multiple="multiple"></select>
					</div>
					<div id="divAssignButtons">
						<button id="buttonAssignToGroup" class="arrowRight"></button><br>
						<button id="buttonRemoveFromGroup" class="arrowLeft"></button>
					</div>
					<div class="divSelectionQuestions">
						<h3>zugeordnete Fragen</h3>
						<select id="selectGrouped" class="selectionQuestion" size =20 multiple="multiple"></select>
					</div>
				</div>
				<div id="buttonbarQuestiongroup" class="buttonbarSubmitCancel">
					<button type="button" id="cancelEditQuestiongroup">Abbrechen</button>
					<button type="button" id="submitEditQuestiongroup">OK</button>
				</div>

			</div>

			
			<div id="tabElement" class="tabcontent">
				<div id="overviewElement">
					<table id="treeviewElements">
					</table>
					<br>
					<button type="button" id="newElement" class="addButton" title="neues Element erstellen"></button>
				</div>
			</div>

			<div id="tabElementgroup" class="tabcontent">

				<div class="flex">
					<select id="selectElementGroup"></select>
					<button id="buttonRenameElementGroup" class="renameButton" title="Gruppe umbenennen"></button>
					<button id="buttonDeleteElementGroup" class="deleteButton" title="Gruppe löschen"></button>
					<button id="buttonNewElementGroup" class="addButton" title="neue Gruppe erstellen"></button>
				</div>
				<br>
				<h3>Bedingung:</h3>
				<img src="../resources/info_circle.svg" id="infoElementgroupCondition" width="18" height="18" class="infoIcon tooltip" title="">
				<div id="conditionElementgroupContainer" class="condContainer">
					<button id="buttonConditionElementGroup" class="editButton" title="Bedingung bearbeiten"></button>
					<div id="divConditionElementGroup" class="tooltip divCond" title=""></div>
					<div class="condDefault">keine Bedingung</div>
				</div>
			 	<br> 
				<div id="divElementGrouping">
					<div class="divSelectionElements">
						<h3>nicht zugeordnete Elemente</h3>
						<select id="selectElementsNotGrouped" class="selectionElement" size="20" multiple="multiple"></select>
					</div>
					<div id="divAssignElementsButtons">
						<button id="buttonAssignElementToGroup" class="arrowRight"></button><br>
						<button id="buttonRemoveElementFromGroup" class="arrowLeft"></button>
					</div>
					<div class="divSelectionElements">
						<h3>zugeordnete Elemente</h3>
						<select id="selectElementsGrouped" class="selectionElement" size =20 multiple="multiple"></select>
					</div>
				</div>
				<div id="buttonbarElementgroup" class="buttonbarSubmitCancel">
					<button type="button" id="cancelEditElementgroup">Abbrechen</button>
					<button type="button" id="submitEditElementgroup">OK</button>
				</div>
				
			</div>

			<div id="tabVersions" class="tabcontent">

				<div class="centeredContent">
					<h3>Versions-Zurücksetzung</h3>
					<br>
					Wählen Sie die Version aus, auf die das System zurückgesetzt werden soll: 
					<select id="selectVersionRestore"></select> 
					<button id="submitVersionRestore">OK</button>
					<br>
					<font color="red">Achtung!</font> Alle Änderungen späterer Versionen werden gelöscht. Dieser Prozess kann nicht rückgängig gemacht werden.
				<hr>
				<!--<h3>Einstellungen</h3>
				<br>
				Wählen Sie nachfolgend die Anzahl der älteren Versionen (d.h. exklusive der aktuellen Version), die auf dem Server gespeichert werden sollen. Für das Zurücksetzen des Systems auf einen früheren Stand stehen nur Versionen zur Verfügung, die noch auf dem Server vorhanden sind und somit nicht aufgrund der Limitierung an vorgehaltenen Versionen gelöscht wurden.<br>
				Hauptversionen beinhalten größere Änderungen (z.B. Änderung der Logik), die die Versionsnummer in den beiden führenden Ziffern ändern (z.B. 01.00).<br>
				Nebenversionen beinhalten kleinere Änderungen (z.B. Rechtschreibkorrekturen), die die Versionsnummer in den letzten beiden Ziffern ändern (z.B. 01.01). 
				<br><br>
				Anzahl der Hauptversionen: 
				<input type="number" name="inpuLimitVersionstorage" min="0">
				<input type="checkbox" name="" id="limitVersionstorageAllMajor">
				<label for="limitVersionstorageAllMajor">alle Hauptversionen speichern</label>
				<br>
				Anzahl der Nebenversionen pro Hauptversion:
				<input type="number" name="inpuLimitVersionstorage" min="0">
				<input type="checkbox" name="" id="limitVersionstorageAllMinor">
				<label for="limitVersionstorageAllMinor">alle Nebenversionen speichern</label>
				<br>
				<button id="submitLimitVersionstorage">OK</button>
				<br>
				<hr> -->
					<h3>Versionsübersicht</h3>
					<table id="tableVersions">
						<thead>
						  <tr>
						    <th>Versionsnummer</th>
						    <th>Release</th> 
						    <th>Änderungshinweise</th>
						    <th>Committer</th>
						  </tr>
					  	</thead>
					</table>
				</div>

			</div>


			<div id="editQuestion" class="modal">
				  	<h3>Fragenummer:</h3> 
				  	<img src="../resources/info_circle.svg" id="infoQuestionNumber" width="18" height="18" class="infoIcon tooltip" title="">
				  	<select id="selectPosition">
					</select>
					<br>

				  	<h3>Fragetyp:</h3>
				  	<img src="../resources/info_circle.svg" id="infoQuestionType" width="18" height="18" class="infoIcon tooltip" title="">
				  	<fieldset >
			    		<input type="radio" id="single" name="questiontype" value="single">
			    		<label for="single"> Einfachantwort </label>
			    		<input type="radio" id="multiple" name="questiontype" value="multiple">
			    		<label for="multiple"> Mehrfachantwort </label>
			    		<input type="radio" id="freetext" name="questiontype" value="free">
			    		<label for="freetext"> Freitext </label>
			  		</fieldset>
				  	<br>
				  	<h3>Frage:</h3>
				  		<textarea id="inputQuestiontext" class="textareaTabQuestion"></textarea>
				 	 <br>
				  	<h3>Bedingung: </h3>
				  	<img src="../resources/info_circle.svg" id="infoQuestionCondition" width="18" height="18" class="infoIcon tooltip" title="">
				  	<div id="conditionQuestionContainer" class="condContainer">
						<button id="buttonCondition" class="editButton" title="Bedingung bearbeiten"></button>
						<div id="divCondition" class="tooltip divCond" title=""></div>
						<div class="condDefault">keine Bedingung</div>
					</div>
				 	<br>
				  	<h3 id="headerAnswers" class="divInline">Antworten:</h3>
				  	<div id=answers></div>
				  	<br>
				  	<h3>Infobox:</h3>
				  		<img src="../resources/info_circle.svg" id="infoQuestionInfobox" width="18" height="18" class="infoIcon tooltip" title="">
				  		<textarea id="inputInfobox" class="textareaTabQuestion"></textarea>
				  	<br>
				  	<h3>Wiki-URL:</h3> 
				  		<img src="../resources/info_circle.svg" id="infoQuestionUrl" width="18" height="18" class="infoIcon tooltip" title="">
				  		<input type="text" id="inputUrl" class="textinputTabQuestion">
					<div class="buttonbarSubmitCancel">
						<button type="button" id="cancelEditQuestion">Abbrechen</button>
						<button type="button" id="saveEditQuestion">Speichern</button>
						<button type="button" id="submitEditQuestion">OK</button>
					</div>
			</div>

			<div id="editElement" class="modal">
				  	<h3>Elementnummer:</h3> 
				  	<img src="../resources/info_circle.svg" id="infoElementNumber" width="18" height="18" class="infoIcon tooltip" title="">
				  	<select id="selectPositionElement">
					</select>
					<br>
				  	<h3>Elementtext:</h3>
				  	<img src="../resources/info_circle.svg" id="infoElement" width="18" height="18" class="infoIcon tooltip" title="">
				  		<textarea id="inputElementtext" class="textareaTabQuestion"></textarea>
				 	 <br>
				 	 <div class="divInline">
					  	<h3 id="headerSubelements">Unterelemente:</h3>
					  	<img src="../resources/info_circle.svg" id="infoSubelement" width="18" height="18" class="infoIcon tooltip" title="">
				  	</div>
				  	<div id=subelements></div>
				  	<br>
					<div class="buttonbarSubmitCancel">
						<button type="button" id="cancelEditElement">Abbrechen</button>
						<button type="button" id="saveEditElement">Speichern</button>
						<button type="button" id="submitEditElement">OK</button>
					</div>
			</div>


			<div id="divEditCondition" class="modal" data-type="">
				<div id="conditionSearch" class="flex">
					<input type="text" id="inputSearchCondition">
					<button type="button" id="buttonSearch" class="searchButton" title="suchen"></button> 
				</div> 
					<br>

					<select id="selectOperandCondition" size="5">
					</select>

					<div id="divOperatorsCondition" class="flex">
						<button type="button" id="buttonSelectOperandCondition" class="arrowDown" title="einfügen"></button>
						<button type="button" id="condAnd">UND (&)</button>
						<button type="button" id="condOr">ODER (|)</button>
						<button type="button" id="condNot">NICHT (!)</button>
						<button type="button" id="condBraces">()</button>
					</div>
					<textarea id="inputCondition" class="textareaTabQuestion"></textarea>
					<br>
				<div class="buttonbarSubmitCancel">
					<button type="button" id="cancelEditCondition">Abbrechen</button>
					<button type="button" id="submitEditCondition">Speichern</button>
				</div>

			</div>

			<div id="divGroupname" class="modal" data-function="renameGroup">
				Geben Sie einen Gruppennamen ein:<br>
				<input type="text" id="inputGroupname">

				<div class="buttonbarSubmitCancel">
					<button type="button" id="submitGroupname">OK</button>
					<button type="button" id="cancelGroupname">Abbrechen</button>
				</div>
			</div>

			<div id="divElementGroupname" class="modal" data-function="renameElementGroup">
				Geben Sie einen Gruppennamen ein:<br>
				<input type="text" id="inputElementGroupname">

				<div class="buttonbarSubmitCancel">
					<button type="button" id="submitElementGroupname">OK</button>
					<button type="button" id="cancelElementGroupname">Abbrechen</button>
				</div>
			</div>

			<div id="divVersion" class="modal">
				Bitte wählen Sie die Versionsnummer:
				<br>
				<input type="radio" name="version" id="versionMajor" value="">
				<label for="versionMajor" id="labelVersionMajor"></label>
				- Update auf neue Hauptversion
				<img src="../resources/info_circle.svg" id="infoVersionMajor" width="18" height="18" class="infoIcon tooltip" title="">
				<br>
				<input type="radio" name="version" id="versionMinor" value="">
				<label for="versionMinor" id="labelVersionMinor"></label>
				- Update auf neue Nebenversion
				<img src="../resources/info_circle.svg" id="infoVersionMinor" width="18" height="18" class="infoIcon tooltip" title="">
				<br><br>
				Änderungshinweise:
				<br>
				<textarea id="inputCommitmessage"></textarea>
				<div class="buttonbarSubmitCancel">
					<button type="button" id="submitVersiondetails">OK</button>
					<button type="button" id="cancelVersiondetails">Abbrechen</button>
				</div>

			</div>
	 		
	 		<div class="footer">
				<button type="button" id="sendToServer" class="button">Übertragung an Server</button>
			</div>

			<div id="confirmDialog" class="modal">
				<div id="confirmText">Wollen Sie die Änderungen vor dem Verlassen speichern?</div>
				<div class="buttonbarConfirm">
					<button type="button" id="confirmYes">Speichern</button>
					<button type="button" id="confirmNo">Nicht speichern</button>
					<button type="button" id="confirmCancel">Abbrechen</button>
				</div>
			</div>

			<div id="timeoutDialog" class="modal">
				<img src="../resources/warningTriangle.svg" class=floatImg>
				
				<p>Ihre Sitzung wird bei Inaktivität in <span id="idleCountdown"></span> Sekunden beendet und Sie werden auf die Startseite weitergeleitet. Ihre Änderungen gehen dabei verloren.<br><br>
				Drücken Sie auf "Sitzung fortsetzen" oder schließen Sie diesen Dialog, um Ihre Sitzung fortzusetzen.
				</p>
				
				<div class="centeredContent">
					<button type="button" id="cancelTimeout">Sitzung fortsetzen</button>
				</div>
			</div>

		</div>
 	</body>

 </html>