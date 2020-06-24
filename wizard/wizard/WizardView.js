var WizardView = function WizardView() {
  this.buttonNextQuestion = document.getElementById("nextQuestion");
  this.buttonPreviousQuestion = document.getElementById("previousQuestion");
  this.buttonFinished = document.getElementById("finished");
  this.imgInfotext = document.getElementById("wizard_question_infotext");
  this.formAnswers = document.getElementById("wizard_answers");
  this.divQuestionnumber = document.getElementById("divQuestionnumber");
  this.divHistory = document.getElementById("wizardHistory");
  this.questionnumber = 1;

};

WizardView.prototype = {

  enableOrDisableNextbutton: function(type) {
    if (type == "single" || type == "multiple") {
      if (!$('input[name="answer"]').is(':checked')) {
        this.buttonNextQuestion.disabled = true;
        this.buttonFinished.disabled = true;
      } else {
        this.buttonNextQuestion.disabled = false;
        this.buttonFinished.disabled = false;
      }
    } else if (type == "free") {
      var textareaAnswerValue = document.getElementsByName("answer")[0].value.trim();
      if(textareaAnswerValue == "") {
        this.buttonNextQuestion.disabled = true;
        this.buttonFinished.disabled = true;
      } else {
        this.buttonNextQuestion.disabled = false;
        this.buttonFinished.disabled = false;
      }
    }

  },

  showQuestion: function(question) {
    var divQuestiontext = document.getElementById("wizard_question_text");
    divQuestiontext.innerHTML = question.questiontext;
    this.divQuestionnumber.innerHTML = "Frage "  + this.questionnumber + ":";
  },

  showAnswers: function(question, answers, givenAnswers) {
    var formAnswers = document.getElementById("wizard_answers");
    var type = question["type"];
    this.emptyForm();

    if(type == "free") {
      var element = document.createElement("textarea");
      element.setAttribute('id', answers[0].id);
      element.setAttribute('name', "answer");
      element.style.width = "100%";
      element.style.height = "10em";
      element.style.resize = "none";

      formAnswers.appendChild(element);
      formAnswers.appendChild(document.createElement("br"));

      if(givenAnswers[question["id"]]["answers"][0] != null) {
        element.value = givenAnswers[question["id"]]["answers"][0];
      }
    } else {
      for(var i = 0; i < answers.length; i++) {
          var element = document.createElement("input"); //input element, text
          element.setAttribute('name',"answer");
          element.setAttribute('id', answers[i]["id"]);
          if(type == "single") {
            element.setAttribute('type',"radio");
          } else if(type == "multiple") {
            element.setAttribute('type',"checkbox");
          }
          var label = document.createElement("label");
          label.setAttribute('for', answers[i]["id"]);
          label.value = answers[i]["answertext"];
          label.innerText = answers[i]["answertext"];
            
          formAnswers.appendChild(element);
          formAnswers.appendChild(label);
          formAnswers.appendChild(document.createElement("br"));

          for(var j = 0; j < Object.keys(givenAnswers[question["id"]]["answers"]).length; j++) {
            if(givenAnswers[question["id"]]["answers"][j] == answers[i]["id"]) {
              element.checked = true;
              break;
            }
          }
        }
    }
  },

  setUrl: function(question) {
    var link = document.getElementById("wikiUrl");
    link.href = question.url;
  },

  showInfotext: function(question) {
    var infotextTooltip = document.getElementById("infotext_tooltip");
    infotext_tooltip.innerHTML = question.infotext;
  },

  emptyForm: function() {
    var formAnswers = document.getElementById("wizard_answers");
    while (formAnswers.firstChild) {
      formAnswers.removeChild(formAnswers.firstChild);
    }
  },

  showFinishedbutton: function(isFinished) {
    this.buttonNextQuestion.style.display = "none";
    this.buttonFinished.style.display = "block";
  },

  hideFinishedbutton: function() {
    this.buttonNextQuestion.style.display = "block";
    this.buttonFinished.style.display = "none";
  },

  addToHistory: function(questionToAdd, givenAnswerId) {
    var questiontext = questionToAdd.questiontext;
    var answers = new Array(Object.keys(givenAnswerId["answers"]).length);
    if(questionToAdd.type == "single" || questionToAdd.type == "multiple") {
      for(var i=0; i<answers.length; i++) {
        for(var j=0; j<questionToAdd.answers.length; j++) {
          if(questionToAdd.answers[j].id == givenAnswerId["answers"][i]) {
            answers[i] = questionToAdd.answers[j].answertext;
            break;
          }
        }
      }
     } else if(questionToAdd.type == "free") {
          answers[0] = givenAnswerId["answers"][0];
     }
    if(document.getElementById("historyField" + questionToAdd.id) != null) {
      var field = document.getElementById("historyField" + questionToAdd.id);
      while (field.firstChild) {
        field.removeChild(field.firstChild);
      }
    } else {
      var field = document.createElement('fieldset');
      field.setAttribute('id', "historyField" + questionToAdd.id);
    }   
    var nodeQuestion = document.createTextNode(this.questionnumber + ". " + questiontext); 
    field.appendChild(nodeQuestion);
    for(var i=0; i<answers.length; i++) {
      field.appendChild(document.createElement("br"));
      field.appendChild(document.createTextNode("-> "));
      field.appendChild(document.createTextNode(answers[i]));
    }
    field.appendChild(document.createElement("br"));
    this.divHistory.appendChild(field);

    this.divHistory.scrollTop = this.divHistory.scrollHeight;
  },

  removeFromHistory: function(questionToRemove) {
    if(document.getElementById("historyField" + questionToRemove.id) != null) {
      var fieldToRemove = document.getElementById("historyField" + questionToRemove.id);
      this.divHistory.removeChild(fieldToRemove);
    }  
  }
}