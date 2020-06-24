var EditorView = function EditorView() {

        // Tab: Questions
    this.divAnswers = document.getElementById("answers");
    this.tableTreeviewQuestions = document.getElementById("treeviewQuestions");
    this.tabQuestion = document.getElementById("tabQuestion");
    this.overviewQuestion = document.getElementById("overviewQuestion");
    this.divEditQuestion = document.getElementById("editQuestion");
    this.selectPosition = document.getElementById("selectPosition");
    this.radioSingle = document.getElementById("single");
    this.radioMultiple = document.getElementById("multiple");
    this.radioFree = document.getElementById("freetext");
    this.inputQuestiontext = document.getElementById("inputQuestiontext");
    this.divCondition = document.getElementById("divCondition");
    this.conditionQuestionContainer = document.getElementById("conditionQuestionContainer");
    this.headerAnswers = document.getElementById("headerAnswers");
    this.divAnswers = document.getElementById("answers");
    this.inputInfobox = document.getElementById("inputInfobox");
    this.inputUrl = document.getElementById("inputUrl");
    this.divEditCondition = document.getElementById("divEditCondition");
    this.selectOperandCondition = document.getElementById("selectOperandCondition");
    this.inputCondition = document.getElementById("inputCondition");
    this.inputSearchCondition = document.getElementById("inputSearchCondition");

      // Tab: Group
    this.selectGroup = document.getElementById("selectGroup");
    this.buttonRenameGroup = document.getElementById("buttonRenameGroup");
    this.buttonDeleteGroup = document.getElementById("buttonDeleteGroup");
    this.buttonNewGroup = document.getElementById("buttonNewGroup");
    this.divConditionGroup = document.getElementById("divConditionGroup");
    this.conditionGroupContainer = document.getElementById("conditionGroupContainer");
    this.buttonConditionGroup = document.getElementById("buttonConditionGroup");
    this.selectNotGrouped = document.getElementById("selectNotGrouped");
    this.selectGrouped = document.getElementById("selectGrouped");
    this.buttonAssignToGroup = document.getElementById("buttonAssignToGroup");
    this.buttonRemoveFromGroup = document.getElementById("buttonRemoveFromGroup");
    this.divGroupname = document.getElementById("divGroupname");
    this.inputGroupname = document.getElementById("inputGroupname");
    this.buttonSubmitGroupname = document.getElementById("submitGroupname");
    this.buttonCancelQuestiongroup = document.getElementById("cancelEditQuestiongroup");
    this.buttonSubmitQuestiongroup = document.getElementById("submitEditQuestiongroup");

    // Tab: Elements
    this.divSubelements = document.getElementById("subelements");
    this.tableTreeviewElements = document.getElementById("treeviewElements");

    this.tabElements = document.getElementById("tabElement");
    this.overviewElements = document.getElementById("overviewElements");

    this.divEditElement = document.getElementById("editElement");
    this.selectPositionElement = document.getElementById("selectPositionElement");
    this.inputElementtext = document.getElementById("inputElementtext");
    this.divSubelements = document.getElementById("subelements");

    // Tab: Elementgroups
    this.selectElementGroup = document.getElementById("selectElementGroup");
    this.buttonRenameElementGroup = document.getElementById("buttonRenameElementGroup");
    this.buttonDeleteElementGroup = document.getElementById("buttonDeleteElementGroup");
    this.buttonNewElementGroup = document.getElementById("buttonNewElementGroup");
    this.divConditionElementGroup = document.getElementById("divConditionElementGroup");
    this.conditionElementgroupContainer = document.getElementById("conditionElementgroupContainer");
    this.buttonConditionElementGroup = document.getElementById("buttonConditionElementGroup");
    this.selectElementsNotGrouped = document.getElementById("selectElementsNotGrouped");
    this.selectElementsGrouped = document.getElementById("selectElementsGrouped");
    this.buttonAssignElementToGroup = document.getElementById("buttonAssignElementToGroup");
    this.buttonRemoveElementFromGroup = document.getElementById("buttonRemoveElementFromGroup");

    this.buttonCancelElementgroup = document.getElementById("cancelEditElementgroup");
    this.buttonSubmitElementgroup = document.getElementById("submitEditElementgroup");

    this.divElementGroupname = document.getElementById("divElementGroupname");
    this.inputElementGroupname = document.getElementById("inputElementGroupname");
    this.buttonSubmitElementGroupname = document.getElementById("submitElementGroupname");
    this.buttonCancelElementGroupname = document.getElementById("cancelElementGroupname");

    this.divVersion = document.getElementById("divVersion");
    this.radioVersionMajor = document.getElementById("versionMajor");
    this.radioVersionMinor = document.getElementById("versionMinor");
    this.labelVersionMajor = document.getElementById("labelVersionMajor");
    this.labelVersionMinor = document.getElementById("labelVersionMinor");
    this.inputCommitmsg = document.getElementById("inputCommitmessage");

    this.tableVersions = document.getElementById("tableVersions");
    this.selectVersionRestore = document.getElementById("selectVersionRestore");

    this.divConfirmDialog = document.getElementById("confirmDialog");
    this.buttonConfirmYes = document.getElementById("confirmYes");
    this.buttonConfirmCancel = document.getElementById("confirmCancel");

    this.divTimeoutDialog = document.getElementById("timeoutDialog");
}

EditorView.prototype = {

  init: function() {
    this.setupHandlers();
    $(this.divEditQuestion).dialog({modal: true, height: "auto", maxHeight: $(window).height(), width: $(window).width()*0.5, autoOpen: false, resizable: false, draggable: true, position:{at:"top", of: window, collision: "fit"}});
    $(this.divEditCondition).dialog({modal: true, height: "auto", width: $(window).width()*0.45, maxHeight: $(window).height(), autoOpen: false, title: "Bedingung bearbeiten", resizable: false, draggable: true, position:{at:"center", of: window, collision: "fit"}});
    $(this.divGroupname).dialog({modal: true, width:400, height:"auto", autoOpen: false, title: "Gruppenname festlegen", draggable: true, position: {at:"bottom", of: this.buttonNewGroup, collision: "fit"}});
    $(this.divEditElement).dialog({modal: true, height: "auto", maxHeight: $(window).height(), width: $(window).width()*0.5, autoOpen: false, resizable: false, draggable: true, position:{at:"top", of: window, collision: "fit"}});
    $(this.divElementGroupname).dialog({modal: true, width:400, height:"auto", autoOpen: false, title: "Gruppenname festlegen", draggable: true, position: {at:"bottom", of: this.buttonNewElementGroup, collision: "fit"}});
    $(this.divVersion).dialog({modal: true, width:600, height: "auto", autoOpen: false, title: "Versionsangaben", draggable: true, position: {at:"top", of: window, collision: "fit"}});
    $(this.divConfirmDialog).dialog({modal: true, height: "auto", width: $(window).width()*0.45, maxHeight: $(window).height(), autoOpen: false, title: "Änderungen speichern", resizable: false, draggable: true, position:{at:"center", of: window, collision: "fit"}});

    $(this.divCondition).tooltip();
    $(this.divConditionGroup).tooltip();
    $(this.divConditionElementGroup).tooltip();

    $(document.getElementById("infoQuestionNumber")).tooltip({content: "Durch die Fragenummer wird die Reihenfolge der Fragen bestimmt. D.h. durch die Nummer wird bestimmt an welcher Position die Frage im Frageverlauf steht."});
    $(document.getElementById("infoQuestionType")).tooltip({content: "Durch den Fragetyp wird die Art und Anzahl der auswählbaren Antworten festgelegt.\n- Einfachantwort: Im Wizard muss genau eine Antwort ausgewählt werden.\n" +  
                                                                    "- Mehrfachantwort: Im Wizard können beliebig viele Antworten (jedoch mindestens eine) gewählt werden.\n- Freitext: Es werden keine Antworten vorgegeben, stattdessen " + 
                                                                    " erfolgt die Beantwortung durch einen Freitext vom Nutzer."});
    $(document.getElementById("infoQuestionCondition")).tooltip({content: "Die Bedingung besteht aus einem booleschen Ausdruck, welcher zu wahr ausgewertet werden muss, damit die Frage im Wizard gestellt wird.\n" + 
                                                                          "Bsp.: 'F001-A01 & !F002-A03' bedeutet, dass bei Frage F001 Antwort F001-A01 gewählt und bei Frage F002 nicht Antwort F002-A03 gewählt worden sein muss."});
    $(document.getElementById("infoQuestionInfobox")).tooltip({content: "Die Infobox kann im Wizard durch das Hovern über ein Info-Icon angezeigt werden und stellt dem Nutzer Informationen und/oder Beispiele zu der Frage und den Antworten zur Verfügung."});
    $(document.getElementById("infoQuestionUrl")).tooltip({content: "Die angegebene URL wird im Wizard verlinkt und soll den Nutzer zu einem Wiki-Eintrag weiterleiten, der ausführlicherer Informationen zu der Frage und den Antworten bereitstellt."});
    
    $(document.getElementById("infoQuestiongroupCondition")).tooltip({content: "Die Bedingung besteht aus einem booleschen Ausdruck, welcher zu wahr ausgewertet werden muss, damit die Fragen, die in der Gruppe enthalten sind, im Wizard gestellt werden.\n" + 
                                                                          "Bsp.: 'F001-A01 & !F002-A03' bedeutet, dass bei Frage F001 Antwort F001-A01 gewählt und bei Frage F002 nicht Antwort F002-A03 gewählt worden sein muss."});

    $(document.getElementById("infoElementNumber")).tooltip({content: "Durch die Elementnummer wird die Reihenfolge der Elemente bestimmt. D.h. durch die Nummer wird bestimmt an welcher Position das Element auf der Checkliste steht."});
    $(document.getElementById("infoElement")).tooltip({content: "Ein Element dient als übergeordneter Begriff (\"Überschrift\"), der aus Unterelementen (d.h. die eigentlichen Anforderungen) besteht. Das Element wird auf der Checkliste abgebildet sobald die Bedingung von mindestens einem Unterelement erfüllt ist."});
    $(document.getElementById("infoSubelement")).tooltip({content: "Ein Unterelement stellt eine Anforderung dar, welche bei erfüllter Bedingung auf der resultierenden Checkliste aufgenommen wird."});

    $(document.getElementById("infoElementgroupCondition")).tooltip({content: "Die Bedingung besteht aus einem booleschen Ausdruck, welcher zu wahr ausgewertet werden muss, damit die Elemente, die in der Gruppe enthalten sind, auf der Checkliste abgebildet werden.\n" + 
                                                                          "Bsp.: 'F001-A01 & !F002-A03' bedeutet, dass bei Frage F001 Antwort F001-A01 gewählt und bei Frage F002 nicht Antwort F002-A03 gewählt worden sein darf."});

    $(document.getElementById("infoVersionMajor")).tooltip({content: "Update auf neue Hauptversion:\nWählen Sie diese Versionsnummer, wenn Sie Änderungen gemacht haben, die die Logik der Anwendung beeinflusst. Hierzu gehören z.B.:\n- Hinzufügen/Entfernen von Fragen, Antworten oder (Unter-)Elementen" + 
                                                                      "\n- Bearbeitung von Bedingungen\n- Änderung der Fragereihenfolge\n- Hinzufügen/Entfernen von Fragen oder Elementen zu einer Gruppe"});
    $(document.getElementById("infoVersionMinor")).tooltip({content: "Update auf neue Nebenversion:\nWählen Sie diese Versionsnummer, wenn Sie nur kleine Änderungen gemacht haben, wie z.B.:\n- Korrektur von Rechtsschreib- und Grammatikfehlern\n- Umformulierungen von Texten \n- Umbenennung von Gruppen"});


  },

  setupHandlers: function() {
    this.openTabContent = this.openTabContent.bind(this);
    this.showAnswers = this.showAnswers.bind(this);
    this.hideAnswers = this.hideAnswers.bind(this);
    this.toggleTreeView = this.toggleTreeView.bind(this);
    this.renderTreeviewQuestions = this.renderTreeviewQuestions.bind(this);
    this.renderTreeviewElements = this.renderTreeviewElements.bind(this);
    this.closeEditQuestion = this.closeEditQuestion.bind(this);
    this.closeEditCondition = this.closeEditCondition.bind(this);
    this.openConditionDialog = this.openConditionDialog.bind(this);
    this.addSelectedOperand = this.addSelectedOperand.bind(this);
    this.addSelectedOperator = this.addSelectedOperator.bind(this);
    this.bracketExpression = this.bracketExpression.bind(this);
    this.setCondString = this.setCondString.bind(this);
    this.openGroupnameDialog = this.openGroupnameDialog.bind(this);
    this.closeGroupnameDialog = this.closeGroupnameDialog.bind(this);
    this.checkGroupname = this.checkGroupname.bind(this);
    this.initQuestiongroupSelection = this.initQuestiongroupSelection.bind(this);
    this.initElementgroupSelection = this.initElementgroupSelection.bind(this);
    this.closeEditElement = this.closeEditElement.bind(this);

    this.closeElementGroupnameDialog = this.closeElementGroupnameDialog.bind(this);
    this.openElementGroupnameDialog = this.openElementGroupnameDialog.bind(this);
    this.checkElementGroupname = this.checkElementGroupname.bind(this);

    this.openVersionDialog = this.openVersionDialog.bind(this);
    this.closeVersionDialog = this.closeVersionDialog.bind(this);
    this.fillSelectVersionRestore = this.fillSelectVersionRestore.bind(this);

    this.emptyTableVersions = this.emptyTableVersions.bind(this);

    this.highlightCells = this.highlightCells.bind(this);

    this.openConfirmDialog = this.openConfirmDialog.bind(this);
    this.closeConfirmDialog = this.closeConfirmDialog.bind(this);
    this.openTimeoutDialog = this.openTimeoutDialog.bind(this);
    this.closeTimeoutDialog = this.closeTimeoutDialog.bind(this);
  },

  showInconsistency: function(inconsistentQuestions, inconsistentAnswers, inconsistentSubelements, inconsistentQuestiongroups, inconsistentElementgroups) {
    for(id in inconsistentQuestions) {
      for(var i = 0; i < inconsistentQuestions[id].length; i++) {
      var questionrow = document.getElementById(inconsistentQuestions[id][i]);
      questionrow.childNodes[0].classList.add("warningCell");
      }
    }
    for(var id in inconsistentAnswers) {
      for(var i = 0; i < inconsistentAnswers[id].length; i++) {
        var qId = inconsistentAnswers[id][i].substring(0, 4);
        var questionrow = document.getElementById(qId);
        if(!questionrow.childNodes[0].classList.contains("warningCell")) {
           questionrow.childNodes[0].classList.add("warningCell");
        }
      }
    }
    for(var id in inconsistentSubelements) {
      for(var i = 0; i < inconsistentSubelements[id].length; i++) {
        var elId = inconsistentSubelements[id][i].substring(0, 5);
        var elementrow = document.getElementById(elId);
        if(!elementrow.childNodes[0].classList.contains("warningCell")) {
           elementrow.childNodes[0].classList.add("warningCell");
        }
      }
    }
    for(var id in inconsistentQuestiongroups) {
      for(var i = 0; i < inconsistentQuestiongroups[id].length; i++) {
        var groupId = inconsistentQuestiongroups[id][i];
        document.querySelector('#selectGroup option[value= ' + groupId + ']').innerHTML = "<span class='highlighted'>! </span>" +  document.querySelector('#selectGroup option[value= ' + groupId + ']').innerHTML;
      }
    }
    for(var id in inconsistentElementgroups) {
      for(var i = 0; i < inconsistentElementgroups[id].length; i++) {
        var groupId = inconsistentElementgroups[id][i];
        document.querySelector('#selectElementGroup option[value= ' + groupId + ']').innerHTML = "! " +  document.querySelector('#selectElementGroup option[value= ' + groupId + ']').innerHTML;
      }
    }
  },

  hideQuestiongroupInconsisty: function(id) {
    document.querySelector('#selectGroup option[value= ' + id + ']').innerHTML = document.querySelector('#selectGroup option[value= ' + id + ']').innerText.substring(1);
  },

  hideElementgroupInconsisty: function(id) {
    document.querySelector('#selectElementGroup option[value= ' + id + ']').innerHTML = document.querySelector('#selectElementGroup option[value= ' + id + ']').innerText.substring(1);
  },

  highlightInconsistentQuestionCond: function(id, inconsistentQuestions) {
    for(removedId in inconsistentQuestions) {
      if(inconsistentQuestions[removedId].includes(id)) {
        var divCond = this.conditionQuestionContainer.getElementsByClassName("divCond")[0];
        divCond.innerHTML = divCond.innerHTML.replace(new RegExp(removedId,"g"), "<span class='highlighted'>" + removedId + "</span>");
      }
    }
  },

  highlightInconsistentAnswerCond: function(id, inconsistentAnswers) {
    for(removedId in inconsistentAnswers) {
      if(inconsistentAnswers[removedId].includes(id)) {
        var divCond = document.getElementById("conditionAnswerContainer" + id).getElementsByClassName("divCond")[0];
        divCond.innerHTML = divCond.innerHTML.replace(new RegExp(removedId,"g"), "<span class='highlighted'>" + removedId + "</span>");
      }
    }
  },

  highlightInconsistentSubelementCond: function(id, inconsistentSubelements) {
    for(removedId in inconsistentSubelements) {
      if(inconsistentSubelements[removedId].includes(id)) {
        var divCond = document.getElementById("conditionSubelementContainer" + id).getElementsByClassName("divCond")[0];
        divCond.innerHTML = divCond.innerHTML.replace(new RegExp(removedId,"g"), "<span class='highlighted'>" + removedId + "</span>");
      }
    }
  },

  highlightInconsistentQuestiongroupCond: function(id, inconsistentQuestiongroups) {
    for(removedId in inconsistentQuestiongroups) {
      if(inconsistentQuestiongroups[removedId].includes(id)) {
        var divCond = document.getElementById("conditionGroupContainer").getElementsByClassName("divCond")[0];
        divCond.innerHTML = divCond.innerHTML.replace(new RegExp(removedId,"g"), "<span class='highlighted'>" + removedId + "</span>");
      }
    }
  },

  highlightInconsistentElementgroupCond: function(id, inconsistentElementgroups) {
    for(removedId in inconsistentElementgroups) {
      if(inconsistentElementgroups[removedId].includes(id)) {
        var divCond = document.getElementById("conditionElementgroupContainer").getElementsByClassName("divCond")[0];
        divCond.innerHTML = divCond.innerHTML.replace(new RegExp(removedId,"g"), "<span class='highlighted'>" + removedId + "</span>");
      }
    }
  },

  disableQuestiongroupButtonbar: function() {
    this.buttonCancelQuestiongroup.disabled = true;
    this.buttonSubmitQuestiongroup.disabled = true;
  },

  enableQuestiongroupButtonbar: function() {
    this.buttonCancelQuestiongroup.disabled = false;
    this.buttonSubmitQuestiongroup.disabled = false;
  },

  disableElementgroupButtonbar: function() {
    this.buttonCancelElementgroup.disabled = true;
    this.buttonSubmitElementgroup.disabled = true;
  },

  enableElementgroupButtonbar: function() {
    this.buttonCancelElementgroup.disabled = false;
    this.buttonSubmitElementgroup.disabled = false;
  },

  openConfirmDialog: function() {
    $(this.divConfirmDialog).dialog("open");
  },

  openVersionDialog: function(currVersion) {
    var currMajor = currVersion.split(".")[0];
    var currMinor = currVersion.split(".")[1];
    var newMajor = (parseInt(currMajor) + 1).toString().padStart(2, "0") + ".00";
    var newMinor = currMajor + "." + (parseInt(currMinor) + 1).toString().padStart(2, "0");
    this.radioVersionMajor.value = newMajor;
    this.radioVersionMinor.value = newMinor;
    this.labelVersionMajor.innerHTML = newMajor;
    this.labelVersionMinor.innerHTML = newMinor;
    this.inputCommitmsg.value = "";
    this.radioVersionMajor.checked = true;
    $(this.divVersion).dialog("open");
  },

  closeVersionDialog: function() {
    $(this.divVersion).dialog("close");
  },

  checkGroupname: function() {
    var name = this.inputGroupname.value.trim();
    if(!name.length > 0) {
      this.buttonSubmitGroupname.disabled = true;
    } else {
      this.buttonSubmitGroupname.disabled = false;
    }
  },

  checkElementGroupname: function() {
    var name = this.inputElementGroupname.value.trim();
    if(!name.length > 0) {
      this.buttonSubmitElementGroupname.disabled = true;
    } else {
      this.buttonSubmitElementGroupname.disabled = false;
    }
  },

  setSelectedGroup: function(id) {
    document.querySelector('#selectGroup option[value= ' + id + ']').selected = true;
  },

  setSelectedElementGroup: function(id) {
    document.querySelector('#selectElementGroup option[value= ' + id + ']').selected = true;
  },

  openGroupnameDialog: function() {
    this.inputGroupname.value = "";
    // display old name
    if(this.divGroupname.dataset.function == "renameGroup") {
      var name = this.selectGroup.options[this.selectGroup.selectedIndex].innerText.substring(7);
      this.inputGroupname.value = name;
    } 
    $(this.divGroupname).dialog("open");
    this.buttonSubmitGroupname.disabled = true;
  },

  openElementGroupnameDialog: function() {
    this.inputElementGroupname.value = "";
    // display old name
    if(this.divElementGroupname.dataset.function == "renameGroup") {
      var name = this.selectElementGroup.options[this.selectElementGroup.selectedIndex].innerText.substring(8);
      this.inputElementGroupname.value = name;
    } 
    $(this.divElementGroupname).dialog("open");
    this.buttonSubmitElementGroupname.disabled = true;
  },

  assignQuestionsToGroup: function(selectedQuestions) {
    for(var i = 0; i < selectedQuestions.length; i++) {
        var opt = document.querySelector('#selectNotGrouped option[value= ' + selectedQuestions[i] + ']');
        this.selectNotGrouped.removeChild(opt);
        this.selectGrouped.appendChild(opt);
    }
  },

  removeQuestionsFromGroup: function(selectedQuestions) {
    for(var i = 0; i < selectedQuestions.length; i++) {
        var opt = document.querySelector('#selectGrouped option[value= ' + selectedQuestions[i] + ']');
        this.selectGrouped.removeChild(opt);
        this.selectNotGrouped.appendChild(opt);
    }
  },

  assignElementsToGroup(selectedElements) {
    for(var i = 0; i < selectedElements.length; i++) {
      var opt = document.querySelector('#selectElementsNotGrouped option[value= ' + selectedElements[i] + ']');
      this.selectElementsNotGrouped.removeChild(opt);
      this.selectElementsGrouped.appendChild(opt);
      }
  },

  removeElementsFromGroup(selectedElements) {
    for(var i = 0; i < selectedElements.length; i++) {
        var opt = document.querySelector('#selectElementsGrouped option[value= ' + selectedElements[i] + ']');
        this.selectElementsGrouped.removeChild(opt);
        this.selectElementsNotGrouped.appendChild(opt);
      }
  },

  setGroupContent: function(group, localQuestiongroupStorage, localQuestionStorage) {
    var cond = "";
    if(group != "") {
      cond = localQuestiongroupStorage[group]["condition"];
      cond = cond.replace(/&&/g, "&");
      cond = cond.replace(/\|\|/g, "|");
      this.initQuestiongroupSelection(localQuestiongroupStorage[group], localQuestionStorage);
      this.disableGroupButtons(false);
    } else {
      $(this.selectGrouped).empty();
      $(this.selectNotGrouped).empty();
      this.disableGroupButtons(true);
    }
    this.updateCondition(this.conditionGroupContainer.id, cond, localQuestionStorage);
    this.disableQuestiongroupButtonbar();
  },

  disableGroupButtons: function(disable) {
    this.buttonConditionGroup.disabled = disable;
    this.buttonDeleteGroup.disabled = disable;
    this.buttonRenameGroup.disabled = disable;
  },

  initQuestiongroupSelection: function(group, localQuestionStorage) {
    $(this.selectGrouped).empty();
    $(this.selectNotGrouped).empty();
    for(var id in localQuestionStorage) {
        var opt = document.createElement("option");
        opt.innerHTML = id + ": " + localQuestionStorage[id]["questiontext"];
        opt.value = id;
      if(group["members"].includes(localQuestionStorage[id])) {
        this.selectGrouped.appendChild(opt);
      } else {
        this.selectNotGrouped.appendChild(opt);
      }
    }
  },

  setElementGroupContent: function(group, localElementgroupStorage, localElementStorage, localQuestionStorage) {
    var cond = "";
    if(group != "") {
      cond = localElementgroupStorage[group]["condition"];
      cond = cond.replace(/&&/g, "&");
      cond = cond.replace(/\|\|/g, "|");
      this.initElementgroupSelection(localElementgroupStorage[group], localElementStorage);
      this.disableElementgroupButtons(false);
    } else {
      $(this.selectElementsGrouped).empty();
      $(this.selectElementsNotGrouped).empty();
      this.disableElementgroupButtons(true);
    }
    this.updateCondition(this.conditionElementgroupContainer.id, cond, localQuestionStorage);
    this.disableElementgroupButtonbar();
  },

  disableElementgroupButtons: function(disable) {
    this.buttonConditionElementGroup.disabled = disable;
    this.buttonDeleteElementGroup.disabled = disable;
    this.buttonRenameElementGroup.disabled = disable;
  },

  initElementgroupSelection: function(group, localElementStorage) {
    $(this.selectElementsGrouped).empty();
    $(this.selectElementsNotGrouped).empty();
    for(var id in localElementStorage) {
      for(var sub = 0; sub < localElementStorage[id]["subelements"].length; sub++) {
        var idSub = localElementStorage[id]["subelements"][sub]["id"];
        var opt = document.createElement("option");
        opt.innerHTML = idSub + ": " + localElementStorage[id]["subelements"][sub]["elementtext"];
        opt.value = idSub;
        if(group["members"].includes(localElementStorage[id]["subelements"][sub])) {
          this.selectElementsGrouped.appendChild(opt);
        } else {
          this.selectElementsNotGrouped.appendChild(opt);
        }
      }
    }
  },

  setSelectGroup: function(localQuestiongroupStorage) {
    $(this.selectGroup).empty();
    for(var key in localQuestiongroupStorage) {
        var opt = document.createElement("option");
        opt.innerHTML = key + ": " + localQuestiongroupStorage[key]["name"];
        opt.value = key;
        this.selectGroup.appendChild(opt);
    }
  },

  setSelectElementGroup: function(localElementgroupStorage) {
    $(this.selectElementGroup).empty();
    for(var id in localElementgroupStorage) {
        var opt = document.createElement("option");
        opt.innerHTML = id + ": " + localElementgroupStorage[id]["name"];
        opt.value = id;
        this.selectElementGroup.appendChild(opt);
    }
  },

  setQuestionDialogContent: function(question, localQuestionStorage) {
    $(this.selectPosition).empty();
    var newQuestion = 0;
     // insert additional opt for new element
    if(!localQuestionStorage.hasOwnProperty(question["id"])) {
      newQuestion = 1;
    }
    this.divEditQuestion.dataset.id = question["id"];
    for(var i = 0; i < Object.keys(localQuestionStorage).length + newQuestion; i++) {
      var opt = document.createElement('option');
      opt.innerHTML = i+1;
      opt.value = i+1;
      this.selectPosition.appendChild(opt);
    }
    this.selectPosition.value = question["position"];

    var type = question["type"];
    if(type == "single" || type == "multiple") {
        if(type == "single") {
            this.radioSingle.checked = true;
        } else {
            this.radioMultiple.checked = true;
        }
        for(var i = 0; i < question["answers"].length; i++) {
            var answer = question["answers"][i];
            var textAnswer = document.getElementById("textAnswer" + answer["id"]); 
            textAnswer.value = answer["answertext"];
            condAnswer = answer["condition"].replace(/&&/g, "&");
            condAnswer = condAnswer.replace(/\|\|/g, "|");
            this.updateCondition("conditionAnswerContainer" + answer["id"], condAnswer, localQuestionStorage);
          }
          this.showAnswers();

    } else if(type == "free") {
        this.radioFree.checked = true;
        this.hideAnswers();
    }
    var replacedCondition = question["condition"].replace(/&&/g, "&");
    replacedCondition = replacedCondition.replace(/\|\|/g, "|");
    this.updateCondition(this.conditionQuestionContainer.id, replacedCondition, localQuestionStorage);

    this.inputQuestiontext.value = question["questiontext"];
    this.inputInfobox.value = question["infotext"];
    this.inputUrl.value = question["url"];
  },

  setTooltip: function(divId, localStorage) {
    var div = document.getElementById(divId);
    var content = this.setCondString(div.innerText, localStorage);
    $(div).tooltip("option", "content", content);
  },

  openQuestionDialog: function(id) {
    $(this.divEditQuestion).dialog("option", "title", "Frage " + id);
    $(this.divEditQuestion).dialog("open");
  },

  setElementDialogContent: function(element, localElementStorage, localQuestionStorage) {
    var newEl = 0;
    $(this.selectPositionElement).empty();
    // insert additional opt for new element
    if(!localElementStorage.hasOwnProperty(element["id"])) {
      newEl = 1;
    }
    for(var i = 0; i < Object.keys(localElementStorage).length + newEl; i++) {
      var opt = document.createElement('option');
      opt.innerHTML = i+1;
      opt.value = i+1;
      this.selectPositionElement.appendChild(opt);
    }
    this.selectPositionElement.value = element["position"];
    this.inputElementtext.value = element["elementtext"];
    
    for(var i = 0; i < element["subelements"].length; i++) {
      var subelement = element["subelements"][i];
      var textElement = document.getElementById("textSubelement" + subelement["id"]);
      textElement.value = element["subelements"][i]["elementtext"];
      condSub = subelement["condition"].replace(/&&/g, "&");
      condSub = condSub.replace(/\|\|/g, "|");
      this.updateCondition("conditionSubelementContainer" + subelement["id"], condSub, localQuestionStorage);
    }
  },

  openElementDialog: function(id) {
    $(this.divEditElement).dialog("option", "title", "Element " + id);
    $(this.divEditElement).dialog("open");
  },

  setCondString: function(cond, localQuestionStorage) {
    var regExpId = new RegExp(/F\d{3}-A\d{2}/g);
    var ids = new Set(cond.match(regExpId));

    cond = cond.replace(/&/g, "\nUND");
    cond = cond.replace(/\|/g, "\nODER");
    cond = cond.replace(/!/g, "NICHT ");

    for(let id of ids) {
      var qId = id.substring(0, 4);
      if(localQuestionStorage.hasOwnProperty(qId)) {
        var questiontext = localQuestionStorage[qId]["questiontext"];
        var answer = localQuestionStorage[qId]["answers"].filter(function(el) {
          return el["id"] == id;
        });
        if(answer.length == 0) {
          var answertext = id;
        } else {
          var answertext = answer[0]["answertext"];
        }
      } else {
        var questiontext = qId;
        var answertext = id;
      }
      
      var idString = questiontext + " -> " + answertext;
      regExpId = new RegExp(id, "g");
      cond = cond.replace(regExpId, idString);
    }
    return cond;
  },

  bracketExpression: function() {
    var bracketedText = this.inputCondition.value;
    var start = this.inputCondition.selectionStart;
    var end = this.inputCondition.selectionEnd;
    bracketedText = (bracketedText.slice(0, start) + "(" + bracketedText.slice(start));
    bracketedText = (bracketedText.slice(0, end+1) + ")" + bracketedText.slice(end+1));
    this.inputCondition.value = bracketedText;
  },

  addSelectedOperator: function(operator) {
    var cursorPos = this.inputCondition.selectionStart;
    var text = this.inputCondition.value;
    switch (operator) {
      case "condAnd":
        this.inputCondition.value = (text.slice(0, cursorPos) + " & " + text.slice(cursorPos));
        var len = 3;
        break;
      case "condOr":
        this.inputCondition.value = (text.slice(0, cursorPos) + " | " + text.slice(cursorPos));
        var len = 3;
        break;
      case "condNot":
        this.inputCondition.value = (text.slice(0, cursorPos) + "!" + text.slice(cursorPos));
        var len = 1;
        break;
    }
    this.inputCondition.setSelectionRange(cursorPos+len, cursorPos+len);
    this.inputCondition.focus();
  },

  addSelectedOperand: function() {
    var cursorPos = this.inputCondition.selectionStart;
    var text = this.inputCondition.value;
    var operand = this.selectOperandCondition.value;
    this.inputCondition.value = (text.slice(0, cursorPos) + operand + text.slice(cursorPos));
    this.inputCondition.setSelectionRange(cursorPos+operand.length, cursorPos+operand.length);
    this.inputCondition.focus();
  },

  toggleContainer: function(divShow, divHide) {
      divShow.classList.remove("hidden");
      divShow.classList.add("visible");
      divHide.classList.remove("visible");
      divHide.classList.add("hidden");
  },

  updateCondition: function(divId, condition, localStorage) {
    var div = document.getElementById(divId);
    var divCond = div.getElementsByClassName("divCond")[0];
    var divDefault = div.getElementsByClassName("condDefault")[0];
    divCond.innerText = condition;
    if(condition.length > 0) {
      this.toggleContainer(divCond, divDefault);
      this.setTooltip(divCond.id, localStorage);
    } else {
      this.toggleContainer(divDefault, divCond);
    }
  },

  // id is optional
  openConditionDialog: function(localStorage, id) {
    this.inputSearchCondition.value = "";
    this.inputCondition.value = "";
    var type = this.divEditCondition.dataset.type;
    if(type == "question") {
      if(divCondition.classList.contains("visible")) {
        this.inputCondition.value = this.divCondition.innerText; 
      } 
    } else if(type == "answer") {
        if(document.getElementById("divConditionAnswer" + id).classList.contains("visible")) {
          this.inputCondition.value = document.getElementById("divConditionAnswer" + id).innerText;
        }
    } else if (type == "questiongroup") {
        if(divConditionGroup.classList.contains("visible")) {
          this.inputCondition.value = this.divConditionGroup.innerText;
        }
    } else if(type == "subelement") {
        if(document.getElementById("divConditionSubelement" + id).classList.contains("visible")) {
          this.inputCondition.value = document.getElementById("divConditionSubelement" + id).innerText;
        }
    } else if(type == "elementgroup") {
        if(this.divConditionElementGroup.classList.contains("visible")) {
          this.inputCondition.value = this.divConditionElementGroup.innerText;
        }
    }
    this.renderSelectOperands(localStorage); 
    $(this.divEditCondition).dialog("open");
  },

  renderSelectOperands: function(operands) {
    var idAfter = false;
    $(this.selectOperandCondition).empty();
    for(var id in operands) {
        if(id == this.divEditQuestion.dataset.id) {
          idAfter = true;
        } 
      if(operands[id]["type"] != "free" && id != this.divEditQuestion.dataset.id) {
        var optGroup = document.createElement("optgroup");
        optGroup.label = id + ": " + operands[id]["questiontext"];
        this.selectOperandCondition.appendChild(optGroup);
        for(var j = 0; j < operands[id]["answers"].length; j++) {
          var opt = document.createElement("option");
          opt.innerHTML = operands[id]["answers"][j]["id"] + ": " + operands[id]["answers"][j]["answertext"];
          opt.value = operands[id]["answers"][j]["id"];
          optGroup.appendChild(opt);
        }
        if(idAfter) {
          optGroup.className = "selectOperandAfter";
        }
      }
    }
  },

  removeQuestion: function(id, numberOfAnswers) {
    var rowToRemove = document.getElementById(id);
    var rowIndex = rowToRemove.rowIndex;
    this.tableTreeviewQuestions.deleteRow(rowIndex);
    //remove Answers
    for(var i = 0; i < numberOfAnswers; i++) {
      this.tableTreeviewQuestions.deleteRow(rowIndex);
    }
  },

  removeElement: function(id, numberOfSubelements) {
    var rowToRemove = document.getElementById(id);
    var rowIndex = rowToRemove.rowIndex;
    this.tableTreeviewElements.deleteRow(rowIndex);
    //remove subelements
    for(var i = 0; i < numberOfSubelements; i++) {
      this.tableTreeviewElements.deleteRow(rowIndex);
    }
  },

  renumberQuestion: function(question) {
    var renumberRow = document.getElementById(question.id);
    renumberRow.cells[1].childNodes[1].nodeValue = question["position"] + ". " + question["questiontext"];
  },

  renumberElement: function(element) {
    var renumberRow = document.getElementById(element.id);
    renumberRow.cells[1].childNodes[1].nodeValue = element["position"] + ". " + element["elementtext"];
  },

  openTabContent: function(btn, tab) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tab).style.display = "block";
    btn.className += " active";
  },

  hideAnswers: function() {
    this.headerAnswers.style.display = "none";
    this.divAnswers.style.display = "none";
  },

  showAnswers: function() {   
    this.headerAnswers.style.display = '';
    this.divAnswers.style.display = "inline";
  },

  openTimeoutDialog: function() {
    $(this.divTimeoutDialog).dialog("open");
  },

  closeTimeoutDialog: function() {
    $(this.divTimeoutDialog).dialog("close");
  },

  closeEditQuestion: function() {
    $(this.divEditQuestion).dialog("close");
  },

  closeEditElement: function() {
    $(this.divEditElement).dialog("close");
  },

  closeEditCondition: function() {
    $(this.divEditCondition).dialog("close");
  },

  closeGroupnameDialog: function() {
    $(this.divGroupname).dialog("close");
  },

  closeElementGroupnameDialog: function() {
    $(this.divElementGroupname).dialog("close");
  },

  closeConfirmDialog: function() {
    $(this.divConfirmDialog).dialog("close");
  },

  insertVersion: function(version) {
    var row = this.tableVersions.insertRow(1);
    $(row).attr("class", "versionsRow");
    var cellNumber = row.insertCell(0);
    var cellRelease = row.insertCell(1);
    var cellCommitmsg = row.insertCell(2);
    var cellCommitter = row.insertCell(3);

    $(cellNumber).attr("class", "versionNumber");
    $(cellRelease).attr("class", "versionRelease");
    $(cellCommitter).attr("class", "versionCommitter");

    cellNumber.innerHTML = version["version"];
    cellRelease.innerHTML = version["release"];
    cellCommitmsg.innerHTML = version["commitmessage"];
    cellCommitter.innerHTML = version["committer"];
  },

  emptyTableVersions: function() {
    $('#' + this.tableVersions.id + ' tr.versionsRow').remove();
  },

  fillSelectVersionRestore: function(versions) {
    $(this.selectVersionRestore).empty();
    for(var i = 0; i < versions.length; i++) {
      var opt = document.createElement("option");
      opt.innerHTML = versions[i]["version"];
      opt.value = versions[i]["version"];
      this.selectVersionRestore.appendChild(opt);
    }
  },

  toggleHighlightedCell: function(cell, expand, localQuestionStorage) {
    cell.classList.toggle("selectedCell");
    var id = cell.parentNode.id;
    if(cell.parentNode.getAttribute("data-depth") == "0") {
      var cond = localQuestionStorage[id]["condition"];
    } else {
      var answer = localQuestionStorage[id.substring(0, 4)]["answers"].filter(function(answer) {
        return answer["id"] == id;
      });
      var cond = answer[0]["condition"];
    }
    var regExpId = new RegExp(/F\d{3}-A\d{2}/g);
    var correspondingIds = cond.match(regExpId) || 0;
    for(var i = 0; i < correspondingIds.length; i++) {
      var correspondingRow = document.getElementById(correspondingIds[i]);
      var correspondingCell = $(correspondingRow).find("td.selectableTd")[0];
      correspondingCell.classList.toggle("correspondingCell");
      var parentRow = this.getParentRow(correspondingRow);
      if(expand) {
        this.toggleTreeView(parentRow.cells[0]);
      }
    }
  },

  highlightCells: function(cell, localQuestionStorage) {
    var view = this;
    var isSameRow = cell.classList.contains("selectedCell");
    var expandedCells = this.tableTreeviewQuestions.querySelectorAll("tr");

    // collapse all expanded cells
    Array.from(expandedCells).forEach(function(el) {  
      if(el.classList.contains("collapse")) {
        view.toggleTreeView(el.cells[0]);
      }

    });
    // unselect previous selection if it exists
    if(document.getElementsByClassName("selectedCell").length > 0) {
      var currSelectedCell = document.getElementsByClassName("selectedCell")[0];
      this.toggleHighlightedCell(currSelectedCell, false, localQuestionStorage); 
    }
    if(!isSameRow) {
      this.toggleHighlightedCell(cell, true, localQuestionStorage);
    }
    if(cell.parentNode.getAttribute("data-depth") == "1") {
      var parentRow = this.getParentRow(cell.parentNode);
      this.toggleTreeView(parentRow.cells[0]);
    }
  },

  getParentRow: function(childRow) {
    var parentRow;
      var rowIndex = childRow.rowIndex;
      for(var r = rowIndex-1; r >= 0; r--) {
        if(this.tableTreeviewQuestions.rows[r].getAttribute("data-depth") == "0") {
          parentRow = this.tableTreeviewQuestions.rows[r];
          break;
        }
      }
    return parentRow;
  },

  renderTreeviewElements: function(orderElements) {
    $(this.tableTreeviewElements).empty();

    for(var i = 0; i < orderElements.length; i++) {
        var element = orderElements[i];
        var elementRow  = this.tableTreeviewElements.insertRow(this.tableTreeviewElements.rows.length);
        //elementRow.id = element["id"];
        elementRow.id = orderElements[i]["id"];
        $(elementRow).attr("class", "collapse level0");
        $(elementRow).attr("data-depth", "0");

        var warningCell = elementRow.insertCell(0);
        var buttonCell = elementRow.insertCell(1);

        var buttonEditElement = document.createElement("button");
        buttonEditElement.type = "button";
        buttonEditElement.classList.add("editButton");
        $(buttonEditElement).attr("data-id", element["id"]);
        buttonEditElement.classList.add("buttonEditElement");
        buttonEditElement.title = "Element bearbeiten";
        buttonCell.appendChild(buttonEditElement);

        var buttonDeleteElement = document.createElement("button");
        buttonDeleteElement.type = "button";
        buttonDeleteElement.classList.add("deleteButton");
        $(buttonDeleteElement).attr("data-id", element["id"]);
        buttonDeleteElement.classList.add("buttonDeleteElement");
        buttonDeleteElement.title = "Element löschen";
        buttonCell.appendChild(buttonDeleteElement);

        var expandCell  = elementRow.insertCell(2);
        var expandSpan = document.createElement("span");
        $(expandSpan).attr("class", "toggle collapse");
        expandCell.appendChild(expandSpan);

        var elementNumberCell = elementRow.insertCell(3);
        var num = document.createTextNode((i+1) + ".");
        elementNumberCell.appendChild(num);

        var elementCell  = elementRow.insertCell(4);
        var elementtext  = document.createTextNode(element["elementtext"]);
        elementCell.appendChild(elementtext);
        
        var elementIdCell  = elementRow.insertCell(5);
        var elementId = document.createTextNode(element["id"]);
        elementIdCell.appendChild(elementId);

        for(var subelement = 0; subelement < element["subelements"].length; subelement++) {

          var subelementRow = this.tableTreeviewElements.insertRow(this.tableTreeviewElements.rows.length);
          subelementRow.id = orderElements[i]["subelements"][subelement]["id"];
          $(subelementRow).attr("class", "level1");
          $(subelementRow).attr("data-depth", "1");

          subelementRow.insertCell(0);
          subelementRow.insertCell(1);
          subelementRow.insertCell(2);
          subelementRow.insertCell(3);

          var subelementCell  = subelementRow.insertCell(4);
          var subelementtext  = document.createTextNode(element["subelements"][subelement]["elementtext"]);
          subelementCell.appendChild(subelementtext);

          var subelementIdCell = subelementRow.insertCell(5);
          var subelementId = document.createTextNode(element["subelements"][subelement]["id"]);
          subelementIdCell.appendChild(subelementId);
        }
        // collapse answers
        this.toggleTreeView(elementCell);
    }
  },

  renderTreeviewQuestions: function(orderQuestions) {
    $(this.tableTreeviewQuestions).empty();

    for (var q = 0; q < orderQuestions.length; q++) {

        var questionRow  = this.tableTreeviewQuestions.insertRow(this.tableTreeviewQuestions.rows.length);
        questionRow.id = orderQuestions[q]["id"];
        $(questionRow).attr("class", "collapse level0");
        $(questionRow).attr("data-depth", "0");

        var warningCell = questionRow.insertCell(0);
        var buttonCell = questionRow.insertCell(1);

        var buttonEditQuestion = document.createElement("button");
        buttonEditQuestion.type = "button";
        buttonEditQuestion.classList.add("editButton");
        $(buttonEditQuestion).attr("data-id", orderQuestions[q]["id"]);
        buttonEditQuestion.classList.add("buttonEditQuestion");
        buttonEditQuestion.title = "Frage bearbeiten";
        buttonCell.appendChild(buttonEditQuestion);

        var buttonDeleteQuestion = document.createElement("button");
        buttonDeleteQuestion.type = "button";
        buttonDeleteQuestion.classList.add("deleteButton");
        $(buttonDeleteQuestion).attr("data-id", orderQuestions[q]["id"]);
        buttonDeleteQuestion.classList.add("buttonDeleteQuestion");
        buttonDeleteQuestion.title = "Frage löschen";
        buttonCell.appendChild(buttonDeleteQuestion);


        var expandCell = questionRow.insertCell(2);
        var expandSpan = document.createElement("span");
        $(expandSpan).attr("class", "toggle collapse");
        expandCell.appendChild(expandSpan);

        var questionNumberCell = questionRow.insertCell(3);
        var num = document.createTextNode((q+1) + ".");
        questionNumberCell.appendChild(num);

        var questionCell = questionRow.insertCell(4);
        var questiontext = document.createTextNode(orderQuestions[q]["questiontext"]);
        questionCell.classList.add("selectableTd");
        questionCell.appendChild(questiontext);

        var questionIdCell  = questionRow.insertCell(5);
        var questionId = document.createTextNode(orderQuestions[q]["id"]);
        questionIdCell.appendChild(questionId);

        for(var a = 0; a < orderQuestions[q]["answers"].length; a++) {
          var answerRow = this.tableTreeviewQuestions.insertRow(this.tableTreeviewQuestions.rows.length);
          answerRow.id = orderQuestions[q]["answers"][a]["id"];
          $(answerRow).attr("class", "level1");
          $(answerRow).attr("data-depth", "1");

          answerRow.insertCell(0);
          answerRow.insertCell(1);
          answerRow.insertCell(2);
          answerRow.insertCell(3);

          var answerCell  = answerRow.insertCell(4);
          if(orderQuestions[q]["type"] == "free") {
            var answertext = document.createTextNode("Freitext");
          } else {
            var answertext  = document.createTextNode(orderQuestions[q]["answers"][a]["answertext"]);
          }
          answerCell.classList.add("selectableTd");
          answerCell.appendChild(answertext);

          var answerIdCell = answerRow.insertCell(5);
          var answerId = document.createTextNode(answerRow.id);
          answerIdCell.appendChild(answerId);
        }
        // collapse answers
        this.toggleTreeView(questionCell);
    }
  },

  hideAllWarnings: function() {
    var warningElements = document.getElementsByClassName("warningCell");
    for(var i = 0; i < warningElements.length; i++) {
      warningElements[i].classList.add("warningHidden");
    }
  },

  toggleTreeView: function(target) {
        //Gets all <tr>'s  of greater depth below element in the table
        var findChildren = function (tr) {
            var depth = tr.data('depth');
            return tr.nextUntil($('tr').filter(function () {
                return $(this).data('depth') <= depth;
            }));
        };

        var el = $(target);
        var tr = el.closest('tr'); //Get <tr> parent of toggle button
        var children = findChildren(tr);

        //Remove already collapsed nodes from children so that we don't
        //make them visible. 
        var subnodes = children.filter('.expand');
        subnodes.each(function () {
            var subnode = $(this);
            var subnodeChildren = findChildren(subnode);
            children = children.not(subnodeChildren);
        }); 

        //Change icon and hide/show children
        if (tr.hasClass('collapse')) {
            tr.removeClass('collapse').addClass('expand');
            children.hide();
        } else {
            tr.removeClass('expand').addClass('collapse');
            children.show();
        }
        return children;
  }
}