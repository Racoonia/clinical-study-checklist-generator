var EditorController = function EditorController(editorModel, editorView) {
  this.editorModel = editorModel;
  this.editorView = editorView;

  this.buttonTabQuestion = document.getElementById("buttonTabQuestion");
  this.buttonTabGroup = document.getElementById("buttonTabGroup");
  this.buttonTabChecklist = document.getElementById("buttonTabChecklist");
  this.buttonTabElementgroup = document.getElementById("buttonTabElementgroup");
  this.buttonTabVersions = document.getElementById("buttonTabVersions");

  this.buttonNewQuestion = document.getElementById("newQuestion");

  this.divEditQuestion = document.getElementById("editQuestion");
  this.radioSingle = document.getElementById("single");
  this.radioMultiple = document.getElementById("multiple");
  this.radioFree = document.getElementById("freetext");
  this.selectPosition = document.getElementById("selectPosition");
  this.divAnswers = document.getElementById("answers");
  this.divCondition = document.getElementById("divCondition");
  this.inputQuestiontext = document.getElementById("inputQuestiontext");
  this.inputInfobox = document.getElementById("inputInfobox");
  this.inputUrl = document.getElementById("inputUrl");
  this.buttonCondition = document.getElementById("buttonCondition");

  this.divEditCondition = document.getElementById("divEditCondition");
  this.conditionQuestionContainer = document.getElementById("conditionQuestionContainer");
  this.buttonSearch = document.getElementById("buttonSearch");
  this.inputSearchCondition = document.getElementById("inputSearchCondition");
  this.buttonSelectOperandCondition = document.getElementById("buttonSelectOperandCondition");
  this.selectOperandCondition = document.getElementById("selectOperandCondition");
  this.buttonCondAnd = document.getElementById("condAnd");
  this.buttonCondOr = document.getElementById("condOr");
  this.buttonCondNot = document.getElementById("condNot");
  this.buttonCondBraces = document.getElementById("condBraces");
  this.inputCondition = document.getElementById("inputCondition");

  this.buttonCancelEditQuestion = document.getElementById("cancelEditQuestion");
  this.buttonSubmitEditQuestion = document.getElementById("submitEditQuestion");
  this.buttonSaveEditQuestion = document.getElementById("saveEditQuestion");

  this.buttonCancelEditCondition = document.getElementById("cancelEditCondition");
  this.buttonSubmitEditCondition = document.getElementById("submitEditCondition");

  this.treeviewQuestions = document.getElementById("treeviewQuestions");

  // Tab: Group
  this.selectGroup = document.getElementById("selectGroup");
  this.buttonRenameGroup = document.getElementById("buttonRenameGroup");
  this.buttonDeleteGroup = document.getElementById("buttonDeleteGroup");
  this.buttonNewGroup = document.getElementById("buttonNewGroup");
  this.divConditionGroup = document.getElementById("divConditionGroup");
  this.conditionGroupContainer = document.getElementById("conditionGroupContainer");
  this.buttonConditionGroup = document.getElementById("buttonConditionGroup");
  this.hoverConditionGroup = document.getElementById("hoverConditionGroup");
  this.buttonConditionGroup = document.getElementById("buttonConditionGroup");
  this.selectNotGrouped = document.getElementById("selectNotGrouped");
  this.selectGrouped = document.getElementById("selectGrouped");
  this.buttonAssignToGroup = document.getElementById("buttonAssignToGroup");
  this.buttonRemoveFromGroup = document.getElementById("buttonRemoveFromGroup");

  this.buttonCancelQuestiongroup = document.getElementById("cancelEditQuestiongroup");
  this.buttonSubmitQuestiongroup = document.getElementById("submitEditQuestiongroup");

  this.divGroupname = document.getElementById("divGroupname");
  this.inputGroupname = document.getElementById("inputGroupname");
  this.buttonSubmitGroupname = document.getElementById("submitGroupname");
  this.buttonCancelGroupname = document.getElementById("cancelGroupname");

  // Tab: Elements
  this.divSubelements = document.getElementById("subelements");
  this.treeviewElements = document.getElementById("treeviewElements");

  this.tabElements = document.getElementById("tabElement");
  this.overviewElements = document.getElementById("overviewElements");

  this.buttonNewElement = document.getElementById("newElement");
  this.divEditElement = document.getElementById("editElement");
  this.selectPositionElement = document.getElementById("selectPositionElement");
  this.inputElementtext = document.getElementById("inputElementtext");

  this.buttonCancelEditElement = document.getElementById("cancelEditElement");
  this.buttonSubmitEditElement = document.getElementById("submitEditElement");
  this.buttonSaveEditElement = document.getElementById("saveEditElement");

  // Tab: Elementgroups
  this.selectElementGroup = document.getElementById("selectElementGroup");
  this.buttonRenameElementGroup = document.getElementById("buttonRenameElementGroup");
  this.buttonDeleteElementGroup = document.getElementById("buttonDeleteElementGroup");
  this.buttonNewElementGroup = document.getElementById("buttonNewElementGroup");
  this.divConditionElementGroup = document.getElementById("divConditionElementGroup");
  this.conditionElementgroupContainer = document.getElementById("conditionElementgroupContainer");
  this.buttonConditionElementGroup = document.getElementById("buttonConditionElementGroup");
  //this.hoverConditionElementGroup = document.getElementById("hoverConditionElementGroup");
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

  this.buttonSendToServer = document.getElementById("sendToServer");
  this.divVersion = document.getElementById("divVersion");
  this.inputCommitmessage = document.getElementById("inputCommitmessage");
  this.buttonSubmitVersiondetails = document.getElementById("submitVersiondetails");
  this.buttonCancelVersiondetails = document.getElementById("cancelVersiondetails");

  this.tableVersions = document.getElementById("tableVersions");
  this.buttonSubmitVersionRestore = document.getElementById("submitVersionRestore");
  this.selectVersionRestore = document.getElementById("selectVersionRestore");

  this.divConfirmDialog = document.getElementById("confirmDialog");
  this.buttonConfirmYes = document.getElementById("confirmYes");
  this.buttonConfirmNo = document.getElementById("confirmNo");
  this.buttonConfirmCancel = document.getElementById("confirmCancel");

  this.buttonCancelTimeout = document.getElementById("cancelTimeout");
  this.divTimeoutDialog = document.getElementById("timeoutDialog");
  this.spanCountdown = document.getElementById("idleCountdown"); 

  this.createdObject = {};
  this.answerCount = 1;
  this.subelementCount = 1;
  this.isQuestionFreetext = false;
  this.inconsistentQuestions = [];
  this.inconsistentAnswers = [];
  this.inconsistentQuestiongroups = [];
  this.inconsistentElementgroups = [];
  this.inconsistentSubelements = [];

  this.logoutClicked = false;
  this.idle = false;
};

EditorController.prototype = {

  init: function() {
    this.initQuestionTab();
    this.initElementTab();
    this.initQuestiongroupTab();
    this.initElementgroupTab();
    this.initVersionsTab();
    this.setupHandlers();   
    this.buttonTabQuestion.click();
    this.setTimer();
  },

  setupHandlers: function() {
    this.initQuestionTab = this.initQuestionTab.bind(this);
    this.createAnswer = this.createAnswer.bind(this);
    this.showAnswers = this.showAnswers.bind(this);
    this.renumberAnswers = this.renumberAnswers.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
    this.submitEditQuestion = this.submitEditQuestion.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.setTreeviewQuestionsHandlers = this.setTreeviewQuestionsHandlers.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.searchString = this.searchString.bind(this);
    this.filterOperands = this.filterOperands.bind(this);
    this.verifyCondition = this.verifyCondition.bind(this);
    this.submitEditCondition = this.submitEditCondition.bind(this);
    this.assignQuestionToGroup = this.assignQuestionToGroup.bind(this);
    this.removeQuestionFromGroup = this.removeQuestionFromGroup.bind(this);
    this.submitQuestiongroup = this.submitQuestiongroup.bind(this);

    this.submitGroupname = this.submitGroupname.bind(this);
    this.generateGroupId = this.generateGroupId.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.createElement = this.createElement.bind(this);
    this.createSubelement = this.createSubelement.bind(this);
    this.generateSubelementId = this.generateSubelementId.bind(this);
    this.deleteSubelement = this.deleteSubelement.bind(this);
    this.submitEditElement = this.submitEditElement.bind(this);
    this.validateInputElement = this.validateInputElement.bind(this);
    this.initElementgroupTab = this.initElementgroupTab.bind(this);
    this.submitElementgroup = this.submitElementgroup.bind(this);

    this.assignElementToGroup = this.assignElementToGroup.bind(this);
    this.removeElementFromGroup = this.removeElementFromGroup.bind(this);
    this.submitElementGroupname = this.submitElementGroupname.bind(this);
    this.deleteElementGroup = this.deleteElementGroup.bind(this);

    this.sendToServer = this.sendToServer.bind(this);
    this.submitVersiondetails = this.submitVersiondetails.bind(this);
    this.convertLocalStorages = this.convertLocalStorages.bind(this);

    this.initVersionsTab = this.initVersionsTab.bind(this);
    this.restoreVersion = this.restoreVersion.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.cancelSession = this.cancelSession.bind(this);

    var ctr = this; 
    this.buttonTabQuestion.addEventListener("click", function(){ctr.editorView.openTabContent(this, "tabQuestion")});
    this.buttonTabGroup.addEventListener("click", function(){ctr.initQuestiongroupTab(); ctr.editorView.openTabContent(this, "tabGroup")});
    this.buttonTabChecklist.addEventListener("click", function(){ctr.editorView.openTabContent(this, "tabElement")});
    this.buttonTabElementgroup.addEventListener("click", function(){ctr.initElementgroupTab(); ctr.editorView.openTabContent(this, "tabElementgroup")});
    this.buttonTabVersions.addEventListener("click", function(){ctr.editorView.openTabContent(this, "tabVersions")});

    this.buttonNewQuestion.addEventListener("click", function() {var question = ctr.createQuestion();
                                                                ctr.editorView.setQuestionDialogContent(question, ctr.editorModel.localQuestionStorage);
                                                                ctr.editorView.openQuestionDialog(question["id"]);
                                                                });
    this.buttonCreateAnswer.addEventListener("click", function(){ctr.createAnswer()});
    this.radioSingle.addEventListener("click", this.showAnswers);
    this.radioMultiple.addEventListener("click", this.showAnswers);
    this.radioFree.addEventListener("click", this.editorView.hideAnswers);

    this.buttonCondition.addEventListener("click", function() {ctr.divEditCondition.dataset.type="question"; ctr.divEditCondition.dataset.id=ctr.divEditQuestion.dataset.id; ctr.editorView.openConditionDialog(ctr.editorModel.localQuestionStorage)});
    this.buttonSearch.addEventListener("click", this.filterOperands);
    this.buttonSelectOperandCondition.addEventListener("click", this.editorView.addSelectedOperand);
    this.buttonCondAnd.addEventListener("click", function() {ctr.editorView.addSelectedOperator(this.id)});
    this.buttonCondOr.addEventListener("click", function() {ctr.editorView.addSelectedOperator(this.id)});
    this.buttonCondNot.addEventListener("click", function() {ctr.editorView.addSelectedOperator(this.id)});
    this.buttonCondBraces.addEventListener("click", this.editorView.bracketExpression);

    this.buttonSubmitEditQuestion.addEventListener("click", function() {var valid = ctr.validateInput(); if(valid) {ctr.editorView.closeEditQuestion();}});
    this.buttonCancelEditQuestion.addEventListener("click", this.editorView.closeEditQuestion);
    this.buttonSaveEditQuestion.addEventListener("click", this.validateInput);

    this.buttonSubmitEditCondition.addEventListener("click", this.submitEditCondition);
    this.buttonCancelEditCondition.addEventListener("click", this.editorView.closeEditCondition);

    this.treeviewQuestions.addEventListener("click", function(evt) {if(evt.target.classList.contains("toggle")) {ctr.editorView.toggleTreeView(evt.target)}});
    this.treeviewQuestions.addEventListener("click", function(evt) {if(evt.target.classList.contains("selectableTd")) {ctr.editorView.highlightCells(evt.target, ctr.editorModel.localQuestionStorage)}});

    this.inputGroupname.addEventListener("input", this.editorView.checkGroupname);
    this.buttonSubmitGroupname.addEventListener("click", this.submitGroupname);
    this.buttonCancelGroupname.addEventListener("click", this.editorView.closeGroupnameDialog);

    this.buttonRenameGroup.addEventListener("click", function() {ctr.divGroupname.dataset.function="renameGroup"; ctr.editorView.openGroupnameDialog()});
    this.buttonNewGroup.addEventListener("click", function() {ctr.divGroupname.dataset.function="newGroup"; ctr.editorView.openGroupnameDialog()});
    this.buttonDeleteGroup.addEventListener("click", this.deleteGroup);

    this.buttonConditionGroup.addEventListener("click", function() {ctr.divEditCondition.dataset.type="questiongroup"; ctr.divEditCondition.dataset.id=ctr.selectGroup.value; ctr.editorView.openConditionDialog(ctr.editorModel.localQuestionStorage)});

    var prevQuestiongroup;
    this.selectGroup.addEventListener("focus", function() {prevQuestiongroup = ctr.selectGroup.value;});
    this.selectGroup.addEventListener("change", function() {ctr.divConfirmDialog.dataset.type="questiongroup";
                                                            if(ctr.buttonSubmitQuestiongroup.disabled == false) {
                                                                ctr.editorView.openConfirmDialog();
                                                            } else {
                                                              ctr.editorView.setGroupContent(ctr.selectGroup.value, ctr.editorModel.localQuestiongroupStorage, ctr.editorModel.localQuestionStorage);
                                                              ctr.editorView.highlightInconsistentQuestiongroupCond(ctr.selectGroup.value, ctr.inconsistentQuestiongroups);
                                                            }
                                                  });

    this.buttonConfirmYes.addEventListener("click", function() {var type = ctr.divConfirmDialog.dataset.type;
                                                                switch(type) {
                                                                  case "questiongroup":
                                                                    ctr.submitQuestiongroup(prevQuestiongroup); 
                                                                    ctr.editorView.disableQuestiongroupButtonbar(); 
                                                                    ctr.editorView.setGroupContent(ctr.selectGroup.value, ctr.editorModel.localQuestiongroupStorage, ctr.editorModel.localQuestionStorage);
                                                                    ctr.editorView.closeConfirmDialog();
                                                                    break;
                                                                  case "elementgroup":
                                                                    ctr.submitElementgroup(prevElementgroup); 
                                                                    ctr.editorView.disableElementgroupButtonbar(); 
                                                                    ctr.editorView.setElementGroupContent(ctr.selectElementGroup.value, ctr.editorModel.localElementgroupStorage, ctr.editorModel.localElementStorage, ctr.editorModel.localQuestionStorage);
                                                                    ctr.editorView.closeConfirmDialog();
                                                                    break;
                                                                }});

    this.buttonConfirmNo.addEventListener("click", function() {var type = ctr.divConfirmDialog.dataset.type;
                                                                switch(type) {
                                                                  case "questiongroup":
                                                                    ctr.editorView.setGroupContent(ctr.selectGroup.value, ctr.editorModel.localQuestiongroupStorage, ctr.editorModel.localQuestionStorage);
                                                                    ctr.editorView.closeConfirmDialog();
                                                                    break;
                                                                  case "elementgroup":
                                                                    ctr.editorView.setElementGroupContent(ctr.selectElementGroup.value, ctr.editorModel.localElementgroupStorage, ctr.editorModel.localElementStorage, ctr.editorModel.localQuestionStorage);
                                                                    ctr.editorView.closeConfirmDialog();
                                                                    break;
                                                                }});

     this.buttonConfirmCancel.addEventListener("click", function() {var type = ctr.divConfirmDialog.dataset.type;
                                                                switch(type) {
                                                                  case "questiongroup":
                                                                    ctr.selectGroup.value = prevQuestiongroup; 
                                                                    ctr.editorView.closeConfirmDialog();
                                                                    break;
                                                                  case "elementgroup":
                                                                    ctr.selectElementGroup.value = prevElementgroup; 
                                                                    ctr.editorView.closeConfirmDialog();
                                                                    break;
                                                                }});
    
    this.buttonAssignToGroup.addEventListener("click", this.assignQuestionToGroup);
    this.buttonRemoveFromGroup.addEventListener("click", this.removeQuestionFromGroup);

    this.buttonSubmitQuestiongroup.addEventListener("click", function() {ctr.submitQuestiongroup(ctr.selectGroup.value); ctr.editorView.disableQuestiongroupButtonbar();});
    this.buttonCancelQuestiongroup.addEventListener("click", function() {var group = ctr.selectGroup.value; ctr.editorView.initQuestiongroupSelection(ctr.editorModel.localQuestiongroupStorage[group], ctr.editorModel.localQuestionStorage); ctr.editorView.disableQuestiongroupButtonbar();});

    // Elements
    this.treeviewElements.addEventListener("click", function(evt) {if(evt.target.classList.contains("toggle")) {ctr.editorView.toggleTreeView(evt.target)}});
    this.buttonNewElement.addEventListener("click", function() {var el = ctr.createElement();
                                                                ctr.editorView.setElementDialogContent(el, ctr.editorModel.localElementStorage, ctr.editorModel.localQuestionStorage);
                                                                ctr.editorView.openElementDialog(el["id"]);
                                                                });
    this.buttonCreateSubelement.addEventListener("click", function() {ctr.createSubelement()});

    this.buttonSubmitEditElement.addEventListener("click", function() {var valid = ctr.validateInputElement(); if(valid) {ctr.editorView.closeEditElement();}});
    this.buttonCancelEditElement.addEventListener("click", this.editorView.closeEditElement);
    this.buttonSaveEditElement.addEventListener("click", this.validateInputElement);

    // Elementgroups
    this.inputElementGroupname.addEventListener("input", this.editorView.checkElementGroupname);
    this.buttonSubmitElementGroupname.addEventListener("click", this.submitElementGroupname);
    this.buttonCancelElementGroupname.addEventListener("click", this.editorView.closeElementGroupnameDialog);

    this.buttonRenameElementGroup.addEventListener("click", function() {ctr.divElementGroupname.dataset.function="renameGroup"; ctr.editorView.openElementGroupnameDialog()});
    this.buttonNewElementGroup.addEventListener("click", function() {ctr.divElementGroupname.dataset.function="newGroup"; ctr.editorView.openElementGroupnameDialog()});
    this.buttonDeleteElementGroup.addEventListener("click", this.deleteElementGroup);

    this.buttonConditionElementGroup.addEventListener("click", function() {ctr.divEditCondition.dataset.type="elementgroup"; ctr.divEditCondition.dataset.id=ctr.selectElementGroup.value; ctr.editorView.openConditionDialog(ctr.editorModel.localQuestionStorage)});

    this.buttonAssignElementToGroup.addEventListener("click", this.assignElementToGroup);
    this.buttonRemoveElementFromGroup.addEventListener("click", this.removeElementFromGroup);

    var prevElementgroup;
    this.selectElementGroup.addEventListener("focus", function() {prevElementgroup = ctr.selectElementGroup.value;});
    this.selectElementGroup.addEventListener("change", function() {ctr.divConfirmDialog.dataset.type="elementgroup";
                                                                    if(ctr.buttonSubmitElementgroup.disabled == false) { 
                                                                    ctr.editorView.openConfirmDialog();
                                                                    } else {
                                                                      ctr.editorView.setElementGroupContent(ctr.selectElementGroup.value, ctr.editorModel.localElementgroupStorage, ctr.editorModel.localElementStorage, ctr.editorModel.localQuestionStorage);
                                                                      ctr.editorView.highlightInconsistentElementgroupCond(ctr.selectElementGroup.value, ctr.inconsistentElementgroups);
                                                                    }
                                                                  });

    this.buttonSubmitElementgroup.addEventListener("click", function() {ctr.submitElementgroup(ctr.selectElementGroup.value); ctr.editorView.disableElementgroupButtonbar()});
    this.buttonCancelElementgroup.addEventListener("click", function() {var group = ctr.selectElementGroup.value; ctr.editorView.initElementgroupSelection(ctr.editorModel.localElementgroupStorage[group], ctr.editorModel.localElementStorage); ctr.editorView.disableElementgroupButtonbar();});

    this.buttonSendToServer.addEventListener("click", function() {
                                              if(Object.keys(ctr.inconsistentQuestions).length == 0 && Object.keys(ctr.inconsistentAnswers).length == 0 && Object.keys(ctr.inconsistentSubelements).length == 0
                                                && Object.keys(ctr.inconsistentQuestiongroups).length == 0 && Object.keys(ctr.inconsistentElementgroups).length == 0) {
                                                var currVersion = ctr.editorModel.versions[ctr.editorModel.versions.length-1]["version"]; 
                                                ctr.editorView.openVersionDialog(currVersion);
                                              } else {
                                                window.alert("Es sind noch inkonsistente Bedingungen vorhanden. Bearbeiten Sie diese zuerst um Fortzufahren.");
                                              }
                                            });
    this.buttonSubmitVersiondetails.addEventListener("click", this.submitVersiondetails);
    this.buttonCancelVersiondetails.addEventListener("click", this.editorView.closeVersionDialog);

    this.buttonSubmitVersionRestore.addEventListener("click", function() {if(confirm("Wollen Sie die Version wirklich zurücksetzen? Der Vorgang kann nicht rückgängig gemacht werden.")) {ctr.restoreVersion();}});

    $(this.divTimeoutDialog).dialog({modal: true, height: "auto", width: $(window).width()*0.45, maxHeight: $(window).height(), autoOpen: false, title: "Warnung: Beendung der Sitzung", resizable: false, draggable: true, position:{at:"center", of: window, collision: "fit"}});
    $(this.divTimeoutDialog).on("dialogbeforeclose", this.resetTimer);
    this.buttonCancelTimeout.addEventListener("click", function() {ctr.editorView.closeTimeoutDialog();
                                                                   ctr.resetTimer();
                                                                  });

    document.getElementById("logoutLink").addEventListener("click", function(evt) {ctr.logoutClicked = true;});

    window.addEventListener("beforeunload", function(evt) {
      if(!(ctr.logoutClicked || ctr.idle)) {
        var confirmationMessage = "\o/";
        evt.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
        return confirmationMessage;              // Gecko, WebKit, Chrome <34
      }
      return;
    });

    window.addEventListener("unload", function(evt) {
        $.ajax({
          url: '../logout.php',
          type: 'POST',
          data: {"logout": ctr.logoutClicked},
          async: false,
          success: function(data) {
          },
          error:function(xhr, textStatus, errorThrown) {
            console.log(xhr.responseText); 
          }
        });
    }); 

    return this;
  },

  initQuestionTab: function() {
    this.buttonCreateAnswer = document.createElement("button");
    this.buttonCreateAnswer.type = "button";
    this.buttonCreateAnswer.id = "buttonNewAnswer";
    this.buttonCreateAnswer.title = "neue Antwort erstellen";
    this.buttonCreateAnswer.classList.add("addButton");

    this.editorView.renderTreeviewQuestions(this.editorModel.orderQuestions);
    this.setTreeviewQuestionsHandlers();
  },

  initQuestiongroupTab: function() {
    this.editorView.setSelectGroup(this.editorModel.localQuestiongroupStorage);
    this.editorView.setGroupContent(this.selectGroup.value, this.editorModel.localQuestiongroupStorage, this.editorModel.localQuestionStorage);
    this.editorView.showInconsistency(this.inconsistentQuestions, this.inconsistentAnswers, this.inconsistentSubelements, this.inconsistentQuestiongroups, this.inconsistentElementgroups);
    this.editorView.highlightInconsistentQuestiongroupCond(this.selectGroup.value, this.inconsistentQuestiongroups);
  },

  initElementTab: function() {
     this.buttonCreateSubelement = document.createElement("button");
     this.buttonCreateSubelement.id = "buttonNewSubelement";
     this.buttonCreateSubelement.type = "button";
     this.buttonCreateSubelement.title = "neues Unterelement erstellen";
     this.buttonCreateSubelement.classList.add("addButton");

     this.editorView.renderTreeviewElements(this.editorModel.orderElements);
     this.setTreeviewElementsHandlers();
  },

  initElementgroupTab: function() {
    this.editorView.setSelectElementGroup(this.editorModel.localElementgroupStorage);
    this.editorView.setElementGroupContent(this.selectElementGroup.value, this.editorModel.localElementgroupStorage, this.editorModel.localElementStorage, this.editorModel.localQuestionStorage);
    this.editorView.showInconsistency(this.inconsistentQuestions, this.inconsistentAnswers, this.inconsistentSubelements, this.inconsistentQuestiongroups, this.inconsistentElementgroups);
    this.editorView.highlightInconsistentElementgroupCond(this.selectElementGroup.value, this.inconsistentElementgroups);
  },

  initVersionsTab: function() {
    this.editorView.emptyTableVersions();
    for(var i = 0; i < this.editorModel.versions.length; i++) {
      this.editorView.insertVersion(this.editorModel.versions[i]);
    }
    this.editorView.fillSelectVersionRestore(this.editorModel.versions);
  },

  setTreeviewQuestionsHandlers: function() {
    this.buttonsDeleteQuestion = document.getElementsByClassName("buttonDeleteQuestion");
    this.buttonsEditQuestion = document.getElementsByClassName("buttonEditQuestion");

    var ctr = this;
    for(var i=0; i<this.buttonsDeleteQuestion.length; i++) {
      this.buttonsDeleteQuestion[i].addEventListener("click", 
        function() {
          if(confirm("Wollen Sie diese Frage wirklich löschen? Alle Bedingungen in den sie enthalten ist, werden gelöscht.")) {
            ctr.deleteQuestion($(this).data("id"));
          }
        }
      );
      this.buttonsEditQuestion[i].addEventListener("click", function() {ctr.editQuestion($(this).data("id"))});
    }
  },

  setTreeviewElementsHandlers: function() {
    this.buttonsDeleteElement = document.getElementsByClassName("buttonDeleteElement");
    this.buttonsEditElement = document.getElementsByClassName("buttonEditElement");

    var ctr = this;
    for(var i=0; i<this.buttonsDeleteElement.length; i++) {
      this.buttonsDeleteElement[i].addEventListener("click", 
        function() {
          if(confirm("Wollen Sie dieses Element wirklich löschen?")) {
            ctr.deleteElement($(this).data("id"));
          }
        }
      );
      this.buttonsEditElement[i].addEventListener("click", function() {ctr.editElement($(this).data("id"))});
    }
  },

  restoreVersion: function() {
    var ctr = this;
    var version = this.selectVersionRestore.value;  
    $.ajax({
      type: 'POST',
      url: 'restoreVersion.php',
      data: {'versionnumber': version},
      success: function(data){
         ctr.editorModel.init().then(_ => ctr.init());
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log(xhr.responseText); 
      }
    }); 
  },

  deleteGroup: function() {
    if(confirm("Wollen Sie diese Gruppe wirklich löschen?")) {
      var id = this.selectGroup.value;
      for(var key in this.inconsistentQuestiongroups) {
        if(this.inconsistentQuestiongroups[key].includes(id)) {
          this.inconsistentQuestiongroups[key].splice(this.inconsistentQuestiongroups[key].indexOf(id), 1);
        }
        if(this.inconsistentQuestiongroups[key].length == 0) {
          delete this.inconsistentQuestiongroups[key];
        }
      }
      this.editorModel.deleteQuestiongroup(id);
      this.initQuestiongroupTab();
    }
  },

  deleteElementGroup: function() {
    if(confirm("Wollen Sie diese Gruppe wirklich löschen?")) {
      var id = this.selectElementGroup.value;
      for(var key in this.inconsistentElementgroups) {
        if(this.inconsistentElementgroups[key].includes(id)) {
          this.inconsistentElementgroups[key].splice(this.inconsistentElementgroups[key].indexOf(id), 1);
        }
        if(this.inconsistentElementgroups[key].length == 0) {
          delete this.inconsistentElementgroups[key];
        }
      }
      this.editorModel.deleteElementgroup(id);
      this.initElementgroupTab();
    }
  },

  submitGroupname: function() {
    var name = this.inputGroupname.value;
    // rename group
    if(this.divGroupname.dataset.function == "renameGroup") {
      var id = this.selectGroup.value;
      this.editorModel.localQuestiongroupStorage[id]["name"] = name;
    } else { //create new group
      var id = this.generateGroupId();
      this.editorModel.localQuestiongroupStorage[id] = {"id": id, "name": name, "condition": "", "members": []};
      this.editorView.setGroupContent(id, this.editorModel.localQuestiongroupStorage, this.editorModel.localQuestionStorage);
    }
    this.editorView.setSelectGroup(this.editorModel.localQuestiongroupStorage);
    this.editorView.setSelectedGroup(id);
    this.editorView.closeGroupnameDialog();
  },

  submitElementGroupname: function() {
    var name = this.inputElementGroupname.value;
    // rename group
    if(this.divElementGroupname.dataset.function == "renameGroup") {
      var id = this.selectElementGroup.value;
      this.editorModel.localElementgroupStorage[id]["name"] = name;
    } else { //create new group
      var id = this.generateElementgroupId();
      this.editorModel.localElementgroupStorage[id] = {"id": id, "name": name, "condition": "", "members": []};
      this.editorView.setElementGroupContent(id, this.editorModel.localElementgroupStorage, this.editorModel.localElementStorage, this.editorModel.localQuestionStorage);
    }
    this.editorView.setSelectElementGroup(this.editorModel.localElementgroupStorage);
    this.editorView.setSelectedElementGroup(id);
    this.editorView.closeElementGroupnameDialog();
  },

  assignQuestionToGroup: function() {
    var selectedQuestions = $(this.selectNotGrouped).val();
    if(selectedQuestions.length != 0) {
      this.editorView.assignQuestionsToGroup(selectedQuestions);
      this.editorView.enableQuestiongroupButtonbar(); 
    }
  },

  removeQuestionFromGroup: function() {
    var selectedQuestions = $(this.selectGrouped).val();
    if(selectedQuestions.length != 0) {
      this.editorView.removeQuestionsFromGroup(selectedQuestions); 
      this.editorView.enableQuestiongroupButtonbar(); 
    }
  },

  submitQuestiongroup: function(group) {
    if(group == undefined || group == null) {
       group = this.selectGroup.value;
    }
    var assignedQuestions = [];
    var members = [];
    $("#" + this.selectGrouped.id+ " > option").each(function(){
      assignedQuestions.push(this.value);
    });
    for(var i = 0; i < this.editorModel.localQuestiongroupStorage[group]["members"].length; i++) {
      var questionId = this.editorModel.localQuestiongroupStorage[group]["members"][i]["id"];
      if(!assignedQuestions.includes(this.editorModel.localQuestiongroupStorage[group]["members"][i]["id"])) { // remove group from question
        var indexOfGroup = this.editorModel.localQuestionStorage[questionId]["groups"].indexOf(this.editorModel.localQuestiongroupStorage[group]);
        this.editorModel.localQuestionStorage[questionId]["groups"].splice(indexOfGroup, 1);
      } else { // push question to members
        members.push(this.editorModel.localQuestiongroupStorage[group]["members"][i]);
        assignedQuestions.splice(assignedQuestions.indexOf(questionId), 1);
      }
    }
    for(var i = 0; i < assignedQuestions.length; i++) { 
        members.push(this.editorModel.localQuestionStorage[assignedQuestions[i]]); // push question to members
        this.editorModel.localQuestionStorage[assignedQuestions[i]]["groups"].push(this.editorModel.localQuestiongroupStorage[group]); // assign group to remaining questions
    }
    this.editorModel.localQuestiongroupStorage[group]["members"] = members;
  },

  assignElementToGroup: function() {
    var selectedElements = $(this.selectElementsNotGrouped).val();
    if(selectedElements.length != 0) {
      this.editorView.assignElementsToGroup(selectedElements);
      this.editorView.enableElementgroupButtonbar(); 
    }
  },

  removeElementFromGroup: function() {
    var selectedElements = $(this.selectElementsGrouped).val();
    if(selectedElements.length != 0) {
      this.editorView.removeElementsFromGroup(selectedElements); 
      this.editorView.enableElementgroupButtonbar(); 
    }
  },

  submitElementgroup: function(group) {
    if(group == undefined || group == null) {
       group = this.selectElementGroup.value;
    }
    var assignedElements = [];
    var members = [];
    $("#" + this.selectElementsGrouped.id+ " > option").each(function(){
      assignedElements.push(this.value);
    });
    for(var i = 0; i < this.editorModel.localElementgroupStorage[group]["members"].length; i++) {
      var subelId = this.editorModel.localElementgroupStorage[group]["members"][i]["id"];
      var elementId = subelId.substring(0, 5);
      if(!assignedElements.includes(this.editorModel.localElementgroupStorage[group]["members"][i]["id"])) {
        var indexOfSubel = this.getIndexOfSubelement(this.editorModel.localElementStorage[elementId]["subelements"], subelId);
        var indexOfGroup = this.editorModel.localElementStorage[elementId]["subelements"][indexOfSubel]["groups"].indexOf(this.editorModel.localElementgroupStorage[group]);
        this.editorModel.localElementStorage[elementId]["subelements"][indexOfSubel]["groups"].splice(indexOfGroup, 1);  // remove group from subelement
      } else { // push subelement to members
        members.push(this.editorModel.localElementgroupStorage[group]["members"][i]);
        assignedElements.splice(assignedElements.indexOf(subelId), 1);
      }
    }
    for(var i = 0; i < assignedElements.length; i++) { 
      var subelId = assignedElements[i];
      var elementId = subelId.substring(0, 5);
      var indexOfSubel = this.getIndexOfSubelement(this.editorModel.localElementStorage[elementId]["subelements"], subelId);
      members.push(this.editorModel.localElementStorage[elementId]["subelements"][indexOfSubel]); // push subelement to members
      this.editorModel.localElementStorage[elementId]["subelements"][indexOfSubel]["groups"].push(this.editorModel.localElementgroupStorage[group]); // assign group to remaining subelements
    }
    this.editorModel.localElementgroupStorage[group]["members"] = members;
  },

  getIndexOfSubelement: function(arr, id) {
    for(var i = 0; i < arr.length; i++) {
      if(arr[i]["id"] == id) {
        return i;
      }
    }
  },

  submitEditCondition: function(type) {
    var id = this.divEditCondition.dataset.id;
    var isValid = this.verifyCondition();
    var condition = this.inputCondition.value;
    var replacedCondition = condition.replace(/&/g, "&&");
    replacedCondition = replacedCondition.replace(/\|/g, "||");
    var type = this.divEditCondition.dataset.type;
    
    if(isValid) {
      if(type == "question") {
        for(var key in this.inconsistentQuestions) {
          if(this.inconsistentQuestions[key].includes(id)) {
            this.inconsistentQuestions[key].splice(this.inconsistentQuestions[key].indexOf(id), 1);
          }
          if(this.inconsistentQuestions[key].length == 0) {
            delete this.inconsistentQuestions[key];
          }
        }
        if(id in this.editorModel.localQuestionStorage) {
          this.editorModel.localQuestionStorage[id]["condition"] = replacedCondition;
        } else {
          this.createdObject["condition"] = replacedCondition;
        }
        this.editorView.updateCondition(this.conditionQuestionContainer.id, condition, this.editorModel.localQuestionStorage);
      } else if(type == "answer") {
          var questionId = id.substring(0, 4);
          for(var key in this.inconsistentAnswers) {
            if(this.inconsistentAnswers[key].includes(id)) {
              this.inconsistentAnswers[key].splice(this.inconsistentAnswers[key].indexOf(id), 1);
            }
            if(this.inconsistentAnswers[key].length == 0) {
              delete this.inconsistentAnswers[key];
            }
          }
          var storageVariable;
          if(questionId in this.editorModel.localQuestionStorage) {
            storageVariable = this.editorModel.localQuestionStorage[questionId];
          } else {
            storageVariable = this.createdObject;
          }
          for(var a = 0; a < storageVariable["answers"].length; a++) {
            if(storageVariable["answers"][a]["id"] == id) {
              storageVariable["answers"][a]["condition"] = replacedCondition;
              break;
            }
          }
          this.editorView.updateCondition("conditionAnswerContainer" + id, condition, this.editorModel.localQuestionStorage);
      } else if (type == "questiongroup") {
          this.editorModel.localQuestiongroupStorage[id]["condition"] = replacedCondition;
          this.editorView.updateCondition(this.conditionGroupContainer.id, condition, this.editorModel.localQuestionStorage);
          for(var key in this.inconsistentQuestiongroups) {
            if(this.inconsistentQuestiongroups[key].includes(id)) {
              this.inconsistentQuestiongroups[key].splice(this.inconsistentQuestiongroups[key].indexOf(id), 1);
              this.editorView.hideQuestiongroupInconsisty(id);
            }
            if(this.inconsistentQuestiongroups[key].length == 0) {
              delete this.inconsistentQuestiongroups[key];
            }
          }        
      } else if(type == "subelement") {
          var elementId = id.substring(0, 5);
          var storageVariable;
          if(elementId in this.editorModel.localElementStorage) {
            storageVariable = this.editorModel.localElementStorage[elementId];
          } else {
            storageVariable = this.createdObject;
          }
          for(var sub = 0; sub < storageVariable["subelements"].length; sub++) {
            if(storageVariable["subelements"][sub]["id"] == id) {
              storageVariable["subelements"][sub]["condition"] = replacedCondition;
              break;
            }
          }
          for(var key in this.inconsistentSubelements) {
            if(this.inconsistentSubelements[key].includes(id)) {
              this.inconsistentSubelements[key].splice(this.inconsistentSubelements[key].indexOf(id), 1);
            }
            if(this.inconsistentSubelements[key].length == 0) {
              delete this.inconsistentSubelements[key];
            }
          }
          this.editorView.updateCondition("conditionSubelementContainer" + id, condition, this.editorModel.localQuestionStorage);
      } else if(type == "elementgroup") {
          var id = this.selectElementGroup.value;
          this.editorModel.localElementgroupStorage[id]["condition"] = replacedCondition;
          this.editorView.updateCondition(this.conditionElementgroupContainer.id, condition, this.editorModel.localQuestionStorage);
          for(var key in this.inconsistentElementgroups) {
            if(this.inconsistentElementgroups[key].includes(id)) {
              this.inconsistentElementgroups[key].splice(this.inconsistentElementgroups[key].indexOf(id), 1);
              this.editorView.hideElementgroupInconsisty(id);
            }
            if(this.inconsistentElementgroups[key].length == 0) {
              delete this.inconsistentElementgroups[key];
            }
          }
      }
      this.editorView.closeEditCondition();
    }
  },

  verifyCondition: function() {
    var cond = this.inputCondition.value.trim();

    if(cond == "") {
      return true;
    }

    var brackets = cond.match(/\(|\)/g);
    var leftBracketCount = 0;
    var rightBracketCount = 0;

    cond = cond.replace(/\s/g,"");
    var condSplit = cond.split(/&|\|/);
    var regExpId = new RegExp(/^\(*\!?F\d{3}-A\d{2}\)*$/);

    var msg = "Ungültige Eingabe:\n";
    var errorBracket = false;
    var errorOp = false;
    var errorNeg = false;
    var error = false;

    for(var i=0; i<condSplit.length; i++) {
      if(condSplit[i] == "") {  // no expression between two operators
        errorOp = true;
      } else if(condSplit[i] == "!") { // negation without ID
        errorNeg = true;
      } else if (!regExpId.test(condSplit[i])) { // invalid String (including wrong brackets)
        msg += "Ungültige Zeichenkette gefunden: " + condSplit[i] + "\n";
        error = true;
      } else {
        // check if answerId exists
        idExists = false;
        var answerId = condSplit[i].match(regExpId)[0];
        answerId = answerId.replace("!", "");
        answerId = answerId.replace(/\(/g, "");
        answerId = answerId.replace(/\)/g, "");
        var questionId = answerId.substring(0, 4);
        for(var id in this.editorModel.localQuestionStorage) {
          for(var a = 0; a < this.editorModel.localQuestionStorage[id]["answers"].length; a++) {
            if(this.editorModel.localQuestionStorage[id]["answers"][a]["id"] == answerId) {
              idExists = true;
              break;
            }
          }
        }
        if(!idExists) {
          msg += answerId + " existiert nicht.\n";
          error = true;
        }
      }
    }

    if(brackets != null) {
      for(var i = 0; i < brackets.length; i++) {
        if(brackets[i] == "(") {
          leftBracketCount++;
        } else {
          rightBracketCount++;
        }
        // closing bracket before opening bracket
        if((leftBracketCount < rightBracketCount)) {
          errorBracket = true;
          break;
        }
      }
    }

    if(errorOp) {
      msg += "Fehlerhaftes Setzen von Operatoren.\n";
    }
    if(errorNeg) {
      msg += "Nach einer Negation(!) muss eine ID folgen.\n";
    }
    if(leftBracketCount != rightBracketCount) {
      msg += "Anzahl der öffnenden und schließenden Klammern stimmt nicht überein.\n";
      error = true;
    } else if(errorBracket) {
      msg += "Schließende Klammer vor öffnender Klammer gefunden.\n";
    }
    if(error|errorOp|errorNeg|errorBracket) {
      window.alert(msg);
      return false;
    }
    return true;
  },

  filterOperands: function() {
    // parameter "i" for case insensitiveness
    var search = new RegExp(this.inputSearchCondition.value, "i");
    var matches = this.searchString(search);
    this.editorView.renderSelectOperands(matches);
  },

  searchString: function(regExp) {
    var matches = [];
    for(var id in this.editorModel.localQuestionStorage) {
      if(this.editorModel.localQuestionStorage[id]["type"] != "free") {
        if(regExp.test(this.editorModel.localQuestionStorage[id]["questiontext"])) {
          matches.push(this.editorModel.localQuestionStorage[id]);
        } else {
          for(var j = 0; j < this.editorModel.localQuestionStorage[id]["answers"].length; j++) {
            if(regExp.test(this.editorModel.localQuestionStorage[id]["answers"][j]["answertext"])) {
              matches.push(this.editorModel.localQuestionStorage[id]);
              break;
            }
          }
        }
      } 
    }
    return matches;
  },

  generateQuestionId: function() {
    var isUnique = false;
    while(!isUnique) {
      var id = "F" + ('00' + Math.floor(Math.random() * (1000))).slice(-3);
      if(!(id in this.editorModel.localQuestionStorage)) {
        isUnique = true;
      }
    }
    return id;
  },

  generateAnswerId: function() {
    var isUnique = false;
    while(!isUnique) {
      var id = this.divEditQuestion.dataset.id + "-A" + ('0' + Math.floor(Math.random() * (100))).slice(-2);
      isUnique = true;
      for(var i=0; i < this.divAnswers.childNodes.length; i++) {
        if(this.divAnswers.childNodes[i].nodeName == "DIV") {
          if(this.divAnswers.childNodes[i].id == "divAnswer" + id) {
            isUnique = false;
            break;
          } 
        }   
      }
    }
    return id;
  },

  generateElementId: function() {
    var isUnique = false;
    while(!isUnique) {
      var id = "CE" + ('00' + Math.floor(Math.random() * (1000))).slice(-3);
      if(!(id in this.editorModel.localElementStorage)) {
        isUnique = true;
      }
    }
    return id;
  },

  generateSubelementId: function() {
    var isUnique = false;
    while(!isUnique) {
      var id = this.divEditElement.dataset.id + "-" + ('0' + Math.floor(Math.random() * (100))).slice(-2);
      isUnique = true;
      for(var i=0; i<this.divSubelements.childNodes.length; i++) {
        if(this.divSubelements.childNodes[i].nodeName == "DIV") {
          if(this.divSubelements.childNodes[i].id == "divSubelement" + id) {
            isUnique = false;
            break;
          } 
        }
      }   
    }
    return id;
  },

  generateGroupId: function() {
    var isUnique = false;
    while(!isUnique) {
      var id = "FG" + ('00' + Math.floor(Math.random() * (1000))).slice(-3);
      if(!(id in this.editorModel.localQuestiongroupStorage)) {
        isUnique = true;
      }
    }
    return id;
  },

  generateElementgroupId: function() {
    var isUnique = false;
    while(!isUnique) {
      var id = "CEG" + ('00' + Math.floor(Math.random() * (1000))).slice(-3);
      if(!(id in this.editorModel.localElementgroupStorage)) {
        isUnique = true;
      }
    }
    return id;
  },

  createQuestion: function() {
    var id = this.generateQuestionId();
    this.divEditQuestion.dataset.id = id;
    this.answerCount = 1;

    $(this.divAnswers).empty();
    this.divAnswers.appendChild(this.buttonCreateAnswer);

    var question = {id: id,
                    position: Object.keys(this.editorModel.localQuestionStorage).length + 1,
                    type: "single",
                    questiontext: "",
                    infotext: "",
                    url: "",
                    condition: "",
                    groups: [],
                    answers: [this.createAnswer(), this.createAnswer()]
    }
    this.createdObject = question;
    return question;
  },

  createElement: function() {
    this.subelementCount = 1;
    var id = this.generateElementId();
    this.divEditElement.dataset.id = id; 
    $(this.divSubelements).empty();
    this.divSubelements.appendChild(this.buttonCreateSubelement);

    var el = {id: this.divEditElement.dataset.id,
              position: Object.keys(this.editorModel.localElementStorage).length + 1,
              elementtext: "",
              subelements: [this.createSubelement(), this.createSubelement()]
              }
    this.createdObject = el;
    return el;
  },

    // id is optional
  createAnswer: function(id) {
    if(id === undefined) {
      var id = this.generateAnswerId();
    }
    var answer = {id: id,
                  answertext: "",
                  condition: ""
    }

    // main container
    var divAnswer = document.createElement("div");
    divAnswer.id = "divAnswer" + id; //this.answerCount;
    divAnswer.classList.add("flex");
    
    // label and textfield
    var labelStrong = document.createElement("strong");
    var labelAnswer = document.createTextNode("Antwort " + this.answerCount + ": ");
    labelStrong.appendChild(labelAnswer);
    var textAnswer = document.createElement("input");
    textAnswer.type = "text";
    textAnswer.id = "textAnswer" + id; //this.answerCount;
    textAnswer.classList.add("inputAnswer");

    // flex container for editbutton and condition string
    var conditionAnswerContainer = document.createElement("div");
    conditionAnswerContainer.id = "conditionAnswerContainer" + id;
    conditionAnswerContainer.classList.add("condContainer");

    // label for condition
    var labelCondStrong = document.createElement("strong");
    var labelCond = document.createTextNode("Bedingung: ");
    labelCondStrong.appendChild(labelCond);
    
    // displayed in case answer has no condition
    var condDefault = document.createElement("div");
    condDefault.innerText = "keine Bedingung";
    condDefault.classList.add("condDefault");
    condDefault.classList.add("visible");
    
    // displayed in case answer has a condition
    var divConditionAnswer = document.createElement("div");
    divConditionAnswer.id = "divConditionAnswer" + id;
    divConditionAnswer.classList.add("tooltip");
    divConditionAnswer.classList.add("divCond");
    divConditionAnswer.classList.add("hidden");
    divConditionAnswer.title = "";
    $(divConditionAnswer).tooltip();

    var buttonDeleteAnswer = document.createElement("button");
    buttonDeleteAnswer.type = "button";
    buttonDeleteAnswer.classList.add("deleteButton");
    buttonDeleteAnswer.title = "Antwort löschen";

    var buttonCondition = document.createElement("button");
    buttonCondition.type = "button";
    buttonCondition.classList.add("editButton");
    buttonCondition.title = "Bedingung bearbeiten";

    var infoIcon = new Image();
    infoIcon.src = "../resources/info_circle.svg";
    infoIcon.height = "18";
    infoIcon.width = "18";
    infoIcon.classList.add("infoIcon");
    infoIcon.classList.add("tooltip");
    infoIcon.title = "";
    $(infoIcon).tooltip({content: "Die Bedingung besteht aus einem booleschen Ausdruck, welcher zu wahr ausgewertet werden muss, damit die Antwort im Wizard bei der entsprechenden Frage angezeigt wird.\n" + 
                                  "Bsp.: 'F001-A01 & !F002-A03' bedeutet, dass bei Frage F001 Antwort F001-A01 gewählt und bei Frage F002 nicht Antwort F002-A03 gewählt worden sein muss."});

    var divlabelCond = document.createElement("div");
    divlabelCond.appendChild(labelCondStrong);
    divlabelCond.appendChild(infoIcon);

    conditionAnswerContainer.appendChild(buttonCondition);
    conditionAnswerContainer.appendChild(divConditionAnswer);
    conditionAnswerContainer.appendChild(condDefault);

    // answer content (labels, textfield, condition)
    var divAnswerContent = document.createElement("div");
    divAnswerContent.classList.add("divContent");
    divAnswerContent.appendChild(labelStrong);
    divAnswerContent.appendChild(document.createElement("br"));
    divAnswerContent.appendChild(textAnswer);
    divAnswerContent.appendChild(document.createElement("br"));
    divAnswerContent.appendChild(divlabelCond);
    divAnswerContent.appendChild(conditionAnswerContainer);

    divAnswer.appendChild(buttonDeleteAnswer);
    divAnswer.appendChild(divAnswerContent);

    
    this.divAnswers.insertBefore(divAnswer, this.buttonCreateAnswer);

    var ctr = this;
    buttonDeleteAnswer.addEventListener("click", function() {
      ctr.deleteAnswer(this); 
    })

    buttonCondition.addEventListener("click", function() {
      ctr.divEditCondition.dataset.type = "answer"; 
      ctr.divEditCondition.dataset.id = id; 
      ctr.editorView.openConditionDialog(ctr.editorModel.localQuestionStorage, id);
    })
               
    this.answerCount++;
    return answer;
  },

  // id is optional
  createSubelement: function(id) {
    if(id === undefined) {
      var id = this.generateSubelementId();
    }

    var subelement = {id: id,
                  elementtext: "",
                  condition: "",
                  groups: []
    }

    // main container
    var divSubelement = document.createElement("div");
    divSubelement.id = "divSubelement" + id;
    divSubelement.classList.add("flex");

    // label and textfield
    var labelStrong = document.createElement("strong");
    var labelSubelement = document.createTextNode("Unterelement " + this.subelementCount + ": ");
    labelStrong.appendChild(labelSubelement);
    var textSubelement = document.createElement("textarea");
    textSubelement.type = "text";
    textSubelement.id = "textSubelement" + id;
    textSubelement.classList.add("textareaSubelement");

    // flex container for editbutton and condition string
    var conditionSubelementContainer = document.createElement("div");
    conditionSubelementContainer.id = "conditionSubelementContainer" + id;
    conditionSubelementContainer.classList.add("condContainer");

    // label for condition
    var labelCondStrong = document.createElement("strong");
    var labelCond = document.createTextNode("Bedingung: ");
    labelCondStrong.appendChild(labelCond);
    
    // displayed in case subelemnt has no condition
    var condDefault = document.createElement("div");
    condDefault.classList.add("condDefault");
    condDefault.innerText = "keine Bedingung";

    // displayed in case subelement has a condition
    var divConditionSubelement = document.createElement("div");
    divConditionSubelement.id = "divConditionSubelement" + id;
    divConditionSubelement.classList.add("tooltip");
    divConditionSubelement.classList.add("divCond");
    divConditionSubelement.title = "";
    $(divConditionSubelement).tooltip();

    var buttonDeleteSubelement = document.createElement("button");
    buttonDeleteSubelement.type = "button";
    buttonDeleteSubelement.classList.add("deleteButton");
    buttonDeleteSubelement.title = "Unterelement löschen";

    var buttonCondition = document.createElement("button");
    buttonCondition.type = "button";
    buttonCondition.classList.add("editButton");
    buttonCondition.title = "Bedingung bearbeiten";

    var infoIcon = new Image();
    infoIcon.src = "../resources/info_circle.svg";
    infoIcon.height = "18";
    infoIcon.width = "18";
    infoIcon.classList.add("infoIcon");
    infoIcon.classList.add("tooltip");
    infoIcon.title = "";
    $(infoIcon).tooltip({content: "Die Bedingung besteht aus einem booleschen Ausdruck, welcher zu wahr ausgewertet werden muss, damit die Anforderung auf der Checkliste aufgenommen wird.\n" + 
                                  "Bsp.: 'F001-A01 & !F002-A03' bedeutet, dass bei Frage F001 Antwort F001-A01 gewählt und bei Frage F002 nicht Antwort F002-A03 gewählt worden sein muss."});

    var divlabelCond = document.createElement("div");
    divlabelCond.appendChild(labelCondStrong);
    divlabelCond.appendChild(infoIcon);

    conditionSubelementContainer.appendChild(buttonCondition);
    conditionSubelementContainer.appendChild(divConditionSubelement);
    conditionSubelementContainer.appendChild(condDefault);

    // subelement content (labels, textarea, condition)
    var divSubelementContent = document.createElement("div");
    divSubelementContent.classList.add("divContent");
    divSubelementContent.appendChild(labelStrong);
    divSubelementContent.appendChild(document.createElement("br"));
    divSubelementContent.appendChild(textSubelement);
    divSubelementContent.appendChild(document.createElement("br"));
    divSubelementContent.appendChild(divlabelCond);
    divSubelementContent.appendChild(conditionSubelementContainer);

    divSubelement.appendChild(buttonDeleteSubelement);
    divSubelement.appendChild(divSubelementContent);
    
    this.divSubelements.insertBefore(divSubelement, this.buttonCreateSubelement);

    var ctr = this;
    buttonDeleteSubelement.addEventListener("click", function() {
      ctr.deleteSubelement(this); 
    })

    buttonCondition.addEventListener("click", function() {
      ctr.divEditCondition.dataset.type = "subelement"; 
      ctr.divEditCondition.dataset.id = id; 
      ctr.editorView.openConditionDialog(ctr.editorModel.localQuestionStorage, id);
    })
               
    this.subelementCount++;
    return subelement;
  },

  validateInput: function() {
    var isInvalid = false;
    var answercount = 0;
    var msg = "Bitte geben Sie Folgendes ein um fortzufahren:\n";
    
    if (this.inputQuestiontext.value == '' || this.inputQuestiontext.value == undefined) {
      isInvalid = true;
      msg += "\• Fragetext\n";
    }

    if(!this.radioFree.checked) {
      for(var i = 0; i < this.divAnswers.children.length - 1; i++) {
        var currId = this.divAnswers.childNodes[i].id.substring(9, 17);
        if(document.getElementById("textAnswer" + currId).value == '' || document.getElementById("textAnswer" + currId).value == undefined) {
            isInvalid = true;
            msg += "\• Antworttext\n";
            break;
        }
      } 

      if(this.divAnswers.children.length-1 < 2) {
        isInvalid = true;
        msg+= "\• mindestens zwei Antworten\n";
      }
    }

    if(isInvalid) {
      window.alert(msg);
      return false;
    } else {
      this.submitEditQuestion(this.divEditQuestion.dataset.id);
      return true;
    }
  },

  validateInputElement: function() {
    var isInvalid = false;
    var msg = "Bitte geben Sie Folgendes ein um fortzufahren:\n";

    if (this.inputElementtext.value == '' || this.inputElementtext.value == undefined) {
      isInvalid = true;
      msg += "\• Elementtext\n";
    }

    for(var i = 0; i < this.divSubelements.children.length - 1; i++) {
      var currId = this.divSubelements.childNodes[i].id.substring(13, 23);
      if(document.getElementById("textSubelement" + currId).value == '' || document.getElementById("textSubelement" + currId).value == undefined) {
          isInvalid = true;
          msg += "\• Unterelementtext\n";
          break;
      }
    } 

    if(isInvalid) {
      window.alert(msg);
      return false;
    } else {
      this.submitEditElement(this.divEditElement.dataset.id);
      return true;
    }
  },

  submitEditQuestion: function(id) {
    var position = parseInt(this.selectPosition.value, 10);
    var type = $('input[name="questiontype"]:checked').val();
    var questiontext = this.inputQuestiontext.value.trim();
    var infotext = this.inputInfobox.value.trim();
    var url = this.inputUrl.value.trim();
    var condition = this.divCondition.innerText;
    condition = condition.replace(/&/g, "&&");
    condition = condition.replace(/\|/g, "\|\|");
    var answers = [];
    var oldAnswers;
    var oldType;

    if(id in this.editorModel.localQuestionStorage) {
      oldAnswers = this.editorModel.localQuestionStorage[id]["answers"];
      oldType = this.editorModel.localQuestionStorage[id]["type"];
    } else {
      oldAnswers = [];
      oldType = "";
    }

    if(type == "free" && oldType != "free") {
      for(var i = 0; i < oldAnswers.length; i++) {
        this.addInconsistency(oldAnswers[i]["id"]);
      }
      answers.push({"id": this.generateAnswerId()});
    } else if(type == "free" && oldType == "free") {
      answers = oldAnswers;
    } else {
      for(var i = 0; i < this.divAnswers.childNodes.length; i++) {
        if(this.divAnswers.childNodes[i].nodeName == "DIV") {
         //var answerId = this.divAnswers.childNodes[i].dataset.id;
         var answerId = this.divAnswers.childNodes[i].id.substring(9, 17);
         //var answertext = document.getElementById("textAnswer" + (i+1)).value;
         var answertext = document.getElementById("textAnswer" + answerId).value;
         var answerCondition = document.getElementById("divConditionAnswer" + answerId).innerText;
         answerCondition = answerCondition.replace(/&/g, "&&");
         answerCondition = answerCondition.replace(/\|/g, "||");
         answers.push({"id": answerId, "answertext": answertext, "condition": answerCondition});
        }
      }
    }
    for(var i = 0; i < oldAnswers.length; i++) {
      var match = answers.filter(function(el) {
        return el["id"] == oldAnswers[i]["id"];
      });
      if(!match.length > 0) {
        this.addInconsistency(oldAnswers[i]["id"]);
      }
    }

     var question = {"id": id,
                    "position": position,
                    "type": type,
                    "questiontext": questiontext,
                    "infotext": infotext,
                    "url": url,
                    "condition": condition,
                    "groups": [],
                    "answers": answers
                    }
    this.createdObject = {};
    this.editorModel.storeQuestion(question);
    this.editorView.renderTreeviewQuestions(this.editorModel.orderQuestions);
    this.setTreeviewQuestionsHandlers();
    this.editorView.showInconsistency(this.inconsistentQuestions, this.inconsistentAnswers, this.inconsistentSubelements, this.inconsistentQuestiongroups, this.inconsistentElementgroups);
  },

  submitEditElement: function(id) {
    var position = parseInt(this.selectPositionElement.value, 10);
    var elementtext = this.inputElementtext.value.trim();
    var subelements = [];

    for(var i=0; i<this.divSubelements.childNodes.length; i++) {
      if(this.divSubelements.childNodes[i].nodeName == "DIV") {
        var subelementId = this.divSubelements.childNodes[i].id.substring(13, 23);
        var subelementtext = document.getElementById("textSubelement" + subelementId).value;
        var subelementCondition = document.getElementById("divConditionSubelement" + subelementId).innerText;
        subelementCondition = subelementCondition.replace(/&/g, "&&");
        subelementCondition = subelementCondition.replace(/\|/g, "||");
        subelements.push({"id": subelementId, "elementtext": subelementtext, "condition": subelementCondition, "groups": []});
      }
    }

     var element = {"id": id,
                    "position": position,
                    "elementtext": elementtext,
                    "subelements": subelements
                    }

    this.createdObject = {};
    this.editorModel.storeElement(element);
    this.editorView.renderTreeviewElements(this.editorModel.orderElements);
    this.setTreeviewElementsHandlers();
    this.editorView.showInconsistency(this.inconsistentQuestions, this.inconsistentAnswers, this.inconsistentSubelements, this.inconsistentQuestiongroups, this.inconsistentElementgroups);
  },

  addInconsistency: function(id) {
    // inconsistency in question conditions
    for(qId in this.editorModel.localQuestionStorage) {
      var question = this.editorModel.localQuestionStorage[qId];
      if(question["condition"].includes(id)) {
        if(!this.inconsistentQuestions.hasOwnProperty(id)) {
          this.inconsistentQuestions[id] = [];
        }
        this.inconsistentQuestions[id].push(question["id"]);
      }
      // inconsistency in answer conditions
      for(var i = 0; i < question["answers"].length; i++) {
        if(question["answers"][i].hasOwnProperty("condition") && question["answers"][i]["condition"].includes(id)) {
          if(!this.inconsistentAnswers.hasOwnProperty(id)) {
            this.inconsistentAnswers[id] = [];
          }
          this.inconsistentAnswers[id].push(question["answers"][i]["id"]);
        }
      }
    }
    // inconsistency in subelement conditions
    for(var elId in this.editorModel.localElementStorage) {
      for(var sub = 0; sub < this.editorModel.localElementStorage[elId]["subelements"].length; sub++) {
        if(this.editorModel.localElementStorage[elId]["subelements"][sub]["condition"].includes(id)) {
          if(!this.inconsistentSubelements.hasOwnProperty(id)) {
            this.inconsistentSubelements[id] = [];
          }
          this.inconsistentSubelements[id].push(this.editorModel.localElementStorage[elId]["subelements"][sub]["id"]);
        }
      }
    }
    // inconsistency in questiongroup conditions
    for(var qgId in this.editorModel.localQuestiongroupStorage) {
       var group = this.editorModel.localQuestiongroupStorage[qgId];
      if(group["condition"].includes(id)) {
        if(!this.inconsistentQuestiongroups.hasOwnProperty(id)) {
          this.inconsistentQuestiongroups[id] = [];
        }
        this.inconsistentQuestiongroups[id].push(qgId);
      }
    }
    // inconsistency in elementgroup conditions
    for(var egId in this.editorModel.localElementgroupStorage) {
      var group = this.editorModel.localElementgroupStorage[egId];
      if(group["condition"].includes(id)) {
        if(!this.inconsistentElementgroups.hasOwnProperty(id)) {
          this.inconsistentElementgroups[id] = [];
        }
        this.inconsistentElementgroups[id].push(egId);
      }
    }
  },

  deleteQuestion: function(id) {
    var question = this.editorModel.localQuestionStorage[id];
    for(var i = 0; i < question["answers"].length; i++) {
      this.addInconsistency(question["answers"][i]["id"]);
      // if question has inconsistent condition -> remove id from inconsistentQuestions
      for(var key in this.inconsistentAnswers) {
        if(this.inconsistentAnswers[key].includes(question["answers"][i]["id"])) {
          this.inconsistentAnswers[key].splice(this.inconsistentAnswers[key].indexOf(question["answers"][i]["id"]), 1);
        }
        if(this.inconsistentAnswers[key].length == 0) {
          delete this.inconsistentAnswers[key];
        }
      }
    }
    for(var key in this.inconsistentQuestions) {
      if(this.inconsistentQuestions[key].includes(id)) {
        this.inconsistentQuestions[key].splice(this.inconsistentQuestions[key].indexOf(id), 1);
      }
      if(this.inconsistentQuestions[key].length == 0) {
        delete this.inconsistentQuestions[key];
      }
    }

    this.editorModel.deleteQuestion(id);
    this.editorView.renderTreeviewQuestions(this.editorModel.orderQuestions);
    this.setTreeviewQuestionsHandlers();
    this.editorView.showInconsistency(this.inconsistentQuestions, this.inconsistentAnswers, this.inconsistentSubelements, this.inconsistentQuestiongroups, this.inconsistentElementgroups);
  },

  deleteElement: function(id) {
    for(var sub = 0; sub < this.editorModel.localElementStorage[id]["subelements"].length; sub++) {
      var subelement = this.editorModel.localElementStorage[id]["subelements"][sub];
      for(var key in this.inconsistentSubelements) {
        if(this.inconsistentSubelements[key].includes(subelement["id"])) {
          this.inconsistentSubelements[key].splice(this.inconsistentSubelements[key].indexOf(subelement["id"]), 1);
        }
        if(this.inconsistentSubelements[key].length == 0) {
          delete this.inconsistentSubelements[key];
        }
      }
    }
    this.editorModel.deleteElement(id);
    this.editorView.renderTreeviewElements(this.editorModel.orderElements);
    this.setTreeviewElementsHandlers();
    this.editorView.showInconsistency(this.inconsistentQuestions, this.inconsistentAnswers, this.inconsistentSubelements, this.inconsistentQuestiongroups, this.inconsistentElementgroups);
  },

  editQuestion: function(id) {
    this.divEditQuestion.dataset.id = id;
    var question = this.editorModel.localQuestionStorage[id];

    if(question.type == "free") {
      this.isQuestionFreetext = true;
    }
    $(this.divAnswers).empty();
    this.answerCount = 1;
    this.divAnswers.appendChild(this.buttonCreateAnswer);
    for(var answer = 0; answer < question["answers"].length; answer++) {
      this.createAnswer(question["answers"][answer]["id"]);
      //document.getElementById("divAnswer" + (answer+1)).dataset.id = question["answers"][answer]["id"];
    }
    this.editorView.setQuestionDialogContent(question, this.editorModel.localQuestionStorage);
    this.editorView.setTooltip(this.divCondition.id, this.editorModel.localQuestionStorage);
    for(var a = 0; a < question["answers"].length; a++) {
      this.editorView.setTooltip("divConditionAnswer" + question["answers"][a]["id"], this.editorModel.localQuestionStorage);
    }
    this.editorView.highlightInconsistentQuestionCond(id, this.inconsistentQuestions);
    for(var i = 0; i < question["answers"].length; i++) {
      this.editorView.highlightInconsistentAnswerCond(question["answers"][i]["id"], this.inconsistentAnswers);
    }
    this.editorView.openQuestionDialog(id);
  },

  editElement: function(id) {
    var element = this.editorModel.localElementStorage[id];

    this.divEditElement.dataset.id = id;
    $(this.divSubelements).empty();
    this.subelementCount = 1;

    this.divSubelements.appendChild(this.buttonCreateSubelement);
    for(var subelement = 0; subelement < element["subelements"].length; subelement++) {
      this.createSubelement(element["subelements"][subelement]["id"]);
    }
    this.editorView.setElementDialogContent(element, this.editorModel.localElementStorage, this.editorModel.localQuestionStorage);
    for(var sub = 0; sub < element["subelements"].length; sub++) {
      this.editorView.setTooltip("divConditionSubelement" + element["subelements"][sub]["id"], this.editorModel.localQuestionStorage);
      this.editorView.highlightInconsistentSubelementCond(element["subelements"][sub]["id"], this.inconsistentSubelements);
    }
    this.editorView.openElementDialog(id);
  },

   showAnswers: function() {
    if (this.isQuestionFreetext){
      this.createAnswer();
      this.isQuestionFreetext = false;     
    }  
    this.editorView.showAnswers();    
  },

  deleteAnswer: function(btn) {
    var id = btn.parentNode.id;
    var answerId = id.substring(9, 17);
    var pos;
    for (var i = 0; i < this.answerCount; i++) {
      if(this.divAnswers.childNodes[i].id == id) {
        pos = i;
        break;
      }
    }
    btn.parentNode.parentNode.removeChild(btn.parentNode);
    this.answerCount--;
    this.renumberAnswers(pos);

    for(var key in this.inconsistentAnswers) {
      if(this.inconsistentAnswers[key].includes(answerId)) {
        this.inconsistentAnswers[key].splice(this.inconsistentAnswers[key].indexOf(answerId), 1);
        }
      if(this.inconsistentAnswers[key].length == 0) {
        delete this.inconsistentAnswers[key];
      }
    }
  },

  deleteSubelement: function(btn) {
    var id = btn.parentNode.id;
    var subId = id.substring(13, 21);
    var pos;
    for (var i = 0; i < this.subelementCount; i++) {
      if(this.divSubelements.childNodes[i].id == id) {
        pos = i;
        break;
      }
    }
    btn.parentNode.parentNode.removeChild(btn.parentNode);
    this.subelementCount--;
    this.renumberSubelements(pos);

    for(var key in this.inconsistentSubelements) {
      if(this.inconsistentSubelements[key].includes(subId)) {
        this.inconsistentSubelements[key].splice(this.inconsistentSubelements[key].indexOf(subId), 1);
      }
      if(this.inconsistentSubelements[key].length == 0) {
        delete this.inconsistentSubelements[key];
      }
    }
  },

  renumberAnswers: function(pos) {
    for(var i = pos + 1; i < this.answerCount; i++) {
      var currId = this.divAnswers.childNodes[i-1].id;
      this.divAnswers.childNodes[i-1].childNodes[1].childNodes[0].childNodes[0].nodeValue = "Antwort " + i + ": ";  
    }    
  },

  renumberSubelements: function(pos) {
    for (var i = pos + 1; i < this.subelementCount; i++) {  
      var currId = this.divSubelements.childNodes[i-1].id;
      this.divSubelements.childNodes[i-1].childNodes[1].childNodes[0].childNodes[0].nodeValue = "Unterelement " + i + ": ";            
    }   
  },

  submitVersiondetails: function() {
    var ctr = this;
    var newVersion = $('input[name="version"]:checked').val();
    var commitmessage = this.inputCommitmessage.value.trim();
    var committer = $.ajax({
      url: "../sessionVariables.php",
      type: "GET",
      data: "username",
      success: function(committer) {
        ctr.sendToServer(newVersion, commitmessage, committer);
        ctr.editorView.closeVersionDialog();
      }, 
      error: function(xhr, textStatus, errorThrown) {
        console.log(xhr.responseText); 
      }
    });
  },

  sendToServer: function(version, commitmessage, committer) {
    var ctr = this;
    var localStorages = this.convertLocalStorages();
    var versiondetails = JSON.stringify({"version": version, "commitmessage": commitmessage, "committer": committer});
    $.ajax({
      type: 'POST',
      url: 'WriteData.php',
      data: {'versiondetails': versiondetails, 'localStorages': localStorages},
      success: function(data){
        ctr.editorModel.getVersions().then(data => ctr.editorModel.setVersions(data)).then(_ => {var versions = ctr.editorModel.versions; ctr.editorView.insertVersion(versions[versions.length-1]); ctr.editorView.fillSelectVersionRestore(versions)});
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log(xhr.responseText); 
      }
    }); 
  },

  convertLocalStorages: function() {
    var copyQuestions = [];
    var copyQuestiongroups = [];
    var copyElements = [];
    var copyElementgroups = [];

    for(key in this.editorModel.localQuestionStorage) {
      copyQuestions.push({"id": this.editorModel.localQuestionStorage[key]["id"],
                          "position": this.editorModel.localQuestionStorage[key]["position"],
                          "type": this.editorModel.localQuestionStorage[key]["type"],
                          "questiontext": this.editorModel.localQuestionStorage[key]["questiontext"],
                          "infotext": this.editorModel.localQuestionStorage[key]["infotext"],
                          "url": this.editorModel.localQuestionStorage[key]["url"],
                          "condition": this.editorModel.localQuestionStorage[key]["condition"],
                          "answers": this.editorModel.localQuestionStorage[key]["answers"],
                          "groups": []
                          });
      // replace group references in copy of localQuestionStorage by id
      for(var i = 0; i < this.editorModel.localQuestionStorage[key]["groups"].length; i++) {
        copyQuestions[copyQuestions.length-1]["groups"][i] = this.editorModel.localQuestionStorage[key]["groups"][i]["id"];
      }
    }

    for(key in this.editorModel.localQuestiongroupStorage) {
      copyQuestiongroups.push({"id": this.editorModel.localQuestiongroupStorage[key]["id"],
                              "name": this.editorModel.localQuestiongroupStorage[key]["name"],
                              "condition": this.editorModel.localQuestiongroupStorage[key]["condition"],
                              "members": []
                              });
      // replace question references in copy of localQuestiongroupStorage by id
      for(var i = 0; i < this.editorModel.localQuestiongroupStorage[key]["members"].length; i++) {
        copyQuestiongroups[copyQuestiongroups.length-1]["members"][i] = this.editorModel.localQuestiongroupStorage[key]["members"][i]["id"];
      }
    }

    for(key in this.editorModel.localElementStorage) {
      copyElements.push({"id": this.editorModel.localElementStorage[key]["id"],
                          "position": this.editorModel.localElementStorage[key]["position"],
                          "elementtext": this.editorModel.localElementStorage[key]["elementtext"],
                          "condition": this.editorModel.localElementStorage[key]["condition"],
                          "subelements": []
                        });
      for(var i = 0; i < this.editorModel.localElementStorage[key]["subelements"].length; i++) {
          copyElements[copyElements.length-1]["subelements"].push({"id": this.editorModel.localElementStorage[key]["subelements"][i]["id"],
                                            "elementtext": this.editorModel.localElementStorage[key]["subelements"][i]["elementtext"],
                                            "condition": this.editorModel.localElementStorage[key]["subelements"][i]["condition"],
                                            "groups": []
                                          });
          // replace group references in copy of localElementStorage by id
          for(var j = 0; j < this.editorModel.localElementStorage[key]["subelements"][i]["groups"].length; j++) {
            copyElements[copyElements.length-1]["subelements"][i]["groups"][j] = this.editorModel.localElementStorage[key]["subelements"][i]["groups"][j]["id"];
          }
      }
    }

    for(key in this.editorModel.localElementgroupStorage) {
      copyElementgroups.push({"id": this.editorModel.localElementgroupStorage[key]["id"],
                              "name": this.editorModel.localElementgroupStorage[key]["name"],
                              "condition": this.editorModel.localElementgroupStorage[key]["condition"],
                              "members": []
                              });
      // replace element references in copy of localElementgroupStorage by id
      for(var i = 0; i < this.editorModel.localElementgroupStorage[key]["members"].length; i++) {
        copyElementgroups[copyElementgroups.length-1]["members"][i] = this.editorModel.localElementgroupStorage[key]["members"][i]["id"];
      }
    }
    return JSON.stringify([copyQuestions, copyQuestiongroups, copyElements, copyElementgroups]);
  },

  setTimer: function() {
    var ctr = this;
    this.idle = false;
    window.setTimeout(function() {
                        ctr.editorView.openTimeoutDialog();
                        countdownId = ctr.setCountdown(60000);
                      }, 1800000);
  },

  resetTimer: function() {
    window.clearInterval(countdownId);
    this.setTimer();
  },

  cancelSession: function() {
    this.idle = true;
    window.location.href = "../Mainpage.html";
  },

  setCountdown: function(time) {
    var ctr = this;
    var timeleft = (time/1000);
    var countdown = setInterval(function(){
                                  ctr.spanCountdown.textContent = timeleft;
                                  if(timeleft == 0 || ctr.idle) {
                                    clearInterval(countdown);
                                    ctr.cancelSession();
                                  }
                                  timeleft--;
                                }, 1000); 
    return countdown;
  }

}




