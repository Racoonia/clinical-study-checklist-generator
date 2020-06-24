var WizardController = function WizardController(wizardModel, wizardView) {
  this.wizardModel = wizardModel;
  this.wizardView = wizardView;

  this.buttonNextQuestion = document.getElementById("nextQuestion");
  this.buttonPreviousQuestion = document.getElementById("previousQuestion");
  this.buttonFinished = document.getElementById("finished");
  this.imgInfotext = document.getElementById("wizard_question_infotext");
  this.formAnswers = document.getElementById("wizard_answers"); 
  this.textareaAnswer = document.getElementsByName("answer");
  this.exportSessionForm = document.getElementById("exportSessionForm");
  this.buttonExportSession = document.getElementById("buttonExportSession");
  this.inputExportSession = document.getElementById("inputExportSession");
  this.buttonSessionCancel = document.getElementById("buttonSessionCancel");

};

WizardController.prototype = {

  init: function() {
    this.setupHandlers();
    if(this.wizardModel.isStoredSession) {
      this.rebuildHistory();
    }
    var currQuestion = this.wizardModel.getCurrentQuestion()
    this.renderContainers(currQuestion, this.wizardModel.getAnswers(currQuestion));
  },

  setupHandlers: function() {
    this.showNextQuestion = this.showNextQuestion.bind(this);
    this.showPreviousQuestion = this.showPreviousQuestion.bind(this);
    this.renderContainers = this.renderContainers.bind(this);
    this.getInfotext = this.getInfotext.bind(this);
    this.enableOrDisableNextbutton = this.enableOrDisableNextbutton.bind(this);
    this.getCurrentQuestion = this.getCurrentQuestion.bind(this);
    this.storeAnswer = this.storeAnswer.bind(this);
    this.getFormInput = this.getFormInput.bind(this);
    this.showEndpage = this.showEndpage.bind(this);
    this.sendAnswersToServer = this.sendAnswersToServer.bind(this);
    this.exportSession = this.exportSession.bind(this);
    this.rebuildHistory = this.rebuildHistory.bind(this);
    this.handleButtons = this.handleButtons.bind(this);

    var ctr = this;
    this.buttonNextQuestion.addEventListener("click", this.showNextQuestion);
    this.buttonPreviousQuestion.addEventListener("click", this.showPreviousQuestion)
    this.buttonFinished.addEventListener("click", this.showEndpage);
    this.imgInfotext.addEventListener("mouseover", this.getInfotext);
    this.formAnswers.addEventListener("change", function(evt) {ctr.storeAnswer(true); ctr.handleButtons();});
    this.formAnswers.addEventListener("input", function(evt) {if(ctr.wizardModel.getCurrentQuestion()["type"] == "free") { // store freetext answer only when focus is lost
                                                                ctr.handleButtons();
                                                                }
                                                              });
    this.buttonExportSession.addEventListener("click", this.exportSession);
    this.buttonSessionCancel.addEventListener("click", this.redirectStartpage);

    return this;
  },

  getFormInput: function() {
    var question = this.getCurrentQuestion();
    var input = [];
    if (question.type == "free") {
        input[0] = this.textareaAnswer[0].value.trim();
    } else if (question.type == "single") {
        input[0] = $('input[name=answer]:checked').attr('id');
    } else if (question.type == "multiple") {
        var checkedBoxes = document.querySelectorAll('input[name=answer]:checked');
        for(var i = 0; i < checkedBoxes.length; i++) {
          input[i] = checkedBoxes[i].getAttribute('id');
        }
    }
    return input;
  },

  storeAnswer: function(isActive) {
    answer = this.getFormInput();
    // store answer only if not empty (in case of 'prev question' without choosing answer of current question)
    if(answer.length > 0) {
      this.wizardModel.storeAnswer(answer, isActive);
    } else {
      this.wizardModel.storeAnswer(answer, false);
    }
  },

  rebuildHistory: function() {
    var givenAnswers = this.wizardModel.givenAnswers;
    for(var i = 0; i < this.wizardModel.questioncount; i++) {
      var question = this.wizardModel.localQuestionStorage[i];
      if(givenAnswers[question["id"]]["active"] == true) {
        this.wizardView.addToHistory(question, givenAnswers[question["id"]]);
        this.wizardView.questionnumber++;
      }
    }
  },

  showNextQuestion: function() {
    this.storeAnswer(true);
    this.wizardView.addToHistory(this.wizardModel.getCurrentQuestion(), this.wizardModel.givenAnswers[this.wizardModel.getCurrentQuestion()["id"]]);
    var nextQuestion = this.wizardModel.getNextQuestion();
    var nextAnswers = this.wizardModel.getAnswers(nextQuestion);
    this.wizardView.questionnumber++;
    if(Object.keys(this.wizardModel.givenAnswers[nextQuestion["id"]]["answers"]).length > 0) {
      this.wizardModel.setActive(nextQuestion["id"], true);
    }
    this.renderContainers(nextQuestion, nextAnswers);
  },

  showPreviousQuestion: function() {
    this.storeAnswer(false);
    this.wizardView.removeFromHistory(this.wizardModel.getCurrentQuestion());
    var previousQuestion = this.wizardModel.getPreviousQuestion();
    var previousAnswers = this.wizardModel.getAnswers(previousQuestion);
    this.wizardView.questionnumber--;
    this.renderContainers(previousQuestion, previousAnswers);
  },

  renderContainers: function(question, answers) {
    if (this.getCurrentQuestion()["position"] == 1) {
      this.buttonPreviousQuestion.disabled = true;
    } else {
      this.buttonPreviousQuestion.disabled = false;
    }
    this.wizardView.showQuestion(question);
    this.wizardView.showAnswers(question, answers, this.wizardModel.givenAnswers);
    this.wizardView.setUrl(question);
    this.wizardView.showInfotext(question);
    this.handleButtons(); 
  },

  getInfotext: function() {
    var currentQuestion = this.wizardModel.getCurrentQuestion();
    this.wizardView.showInfotext(currentQuestion);
  },

  getCurrentQuestion: function() {
    var currentQuestion = this.wizardModel.getCurrentQuestion();
    return currentQuestion;
  },

  enableOrDisableNextbutton: function() {
    var type = this.getCurrentQuestion()["type"];
    this.wizardView.enableOrDisableNextbutton(type);
  },

  handleButtons: function() {
    this.enableOrDisableNextbutton();
    var next = this.wizardModel.calculateIndexNextQuestion();
    if(next == -1) {
      this.wizardView.showFinishedbutton();
    } else {
      this.wizardView.hideFinishedbutton();
    }
  },

  showEndpage: function() {
    this.storeAnswer(true);
    this.sendAnswersToServer();
  },

  exportSession: function() {
    this.storeAnswer(true);
    var version = this.wizardModel.currVersion;
    var lastQuestion = this.wizardModel.getCurrentQuestion()["id"];
    var currGroups = this.wizardModel.currGroups;
    var sessionExport = {"version": version, "lastQuestion": lastQuestion, "givenAnswers": this.wizardModel.givenAnswers, "currGroups": currGroups};
    this.inputExportSession.value = JSON.stringify(sessionExport);
    this.exportSessionForm.submit();
  },

  redirectStartpage: function() {
    window.location.href = "../wizardStart/wizardStart.html";
  },

  sendAnswersToServer: function() {
    var givenAnswers = JSON.stringify(this.wizardModel.givenAnswers);
    $.ajax({ 
      type: 'POST',
      url: '../../sessionVariables.php',
      data: {'givenAnswers': givenAnswers},
      success: function(data) {
                  window.location.href = "../wizardEnd/wizardEnd.html";
      },
      error: function(xhr, textStatus, errorThrown) {
                console.log(xhr.responseText); 
      }
    }); 
  }

}

