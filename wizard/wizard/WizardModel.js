var WizardModel = function WizardModel() {
  this.questioncount = 0;
  this.indexNextQuestion = 0;
  // numerical index
  this.localQuestionStorage = [];
  // indexed by id
  this.localQuestiongroupStorage = [];
  this.givenAnswers = {};
  this.isStoredSession = false;
  this.currVersion;
  this.currGroups = {};
};

WizardModel.prototype = {

  init: function() {
    var dfd = $.Deferred();
    this.getCurrVersion().then(_ => {
      var questionPromise = this.getQuestions(this.currVersion);
      var questiongroupPromise = this.getQuestiongroups(this.currVersion);

      Promise.all([questionPromise, questiongroupPromise]).then(_ => this.getStoredSession()).then(session => {if(this.isStoredSession) {
                                                                                                                  var storedSession = JSON.parse(session);
                                                                                                                  this.setCurrGroups(storedSession["currGroups"]);
                                                                                                                }
                                                                                                                this.initGivenAnswers(storedSession); 
                                                                                                              }).then(_ => dfd.resolve());
    });
    return dfd.promise();
  },

  getCurrVersion: function() {
    var model = this;
    return $.ajax({
      type: "GET",
      url: '../serverSide/versionHandling.php',
      dataType: "json",
      success: function(data) {
        model.currVersion = data;
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log(xhr.responseText); 
      }
    });
  },

  getQuestions: function() {
    var model = this;
    return $.ajax({
      url: '../../data/v' + this.currVersion + '_questions.json',
      success: function(data) {
        for (var i = 0; i < Object.keys(data).length; i++) {
          model.localQuestionStorage[i] = data[i];
        }
        model.sortByPosition(model.localQuestionStorage);
      }
    });
    
  }, 

   getQuestiongroups: function() {
    var model = this;
    return $.ajax({
      url: '../../data/v' + this.currVersion + '_questiongroups.json',
      success: function(data) {
        for(var i = 0; i < Object.keys(data).length; i++) {
          model.localQuestiongroupStorage[data[i]["id"]] = data[i];
        }
      }
    });
    
  }, 

  setLocalQuestionStorage: function(data) {
    for (var i = 0; i < Object.keys(data).length; i++) {
      this.localQuestionStorage[i] = data[i];
    }
    this.sortByPosition(this.localQuestionStorage);
  },

  setLocalQuestiongroupStorage: function(data) {
    for(var i = 0; i < Object.keys(data).length; i++) {
      this.localQuestiongroupStorage[data[i]["id"]] = data[i];
    }
  },

  setQuestionReferences: function() {
    var model = this;
    for(var i = 0; i < this.localQuestionStorage.length; i++) {
      for(var q = 0; q < this.localQuestionStorage[i]["groups"].length; q++) {
        this.localQuestionStorage[i]["groups"][q] = this.localQuestiongroupStorage[this.localQuestionStorage[i]["groups"][q]];
      }
    }
  },

  sortByPosition: function(arr) {
    arr.sort(function (a, b) {
      return a.position - b.position;
    });
  },

  initGivenAnswers: function(storedSession) {	
    if(this.isStoredSession) {
    	this.givenAnswers = storedSession["givenAnswers"];
      var lastStoredQuestion = this.localQuestionStorage.filter(function(question) {
                                                                  return question["id"] == storedSession["lastQuestion"];
                                                                })[0];
    	this.questioncount = lastStoredQuestion["position"] - 1;
    } else {
    	for (var i = 0; i < this.localQuestionStorage.length; i++) {
      		this.givenAnswers[this.localQuestionStorage[i]["id"]] = {answers: [], active: false};
   		 }
    }
  },

  setCurrGroups: function(currGroups) {
    this.currGroups = currGroups;
  },

  getStoredSession: function() {
    var model = this;
  	return $.ajax({
            type: 'GET',
            url: '../serverSide/ImportSession.php',
            data: 'loadedSession',
               
            success: function(session){
              if(session != "") {
                model.isStoredSession = true;
              }
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log(xhr.responseText); 
            }
        }); 
  },

  storeAnswer: function(answer, isActive) {
    this.givenAnswers[this.getCurrentQuestion()["id"]]["answers"] = answer;
    this.setActive(this.getCurrentQuestion()["id"], isActive);
  },

  setActive: function(id, isActive) {
    this.givenAnswers[id]["active"] = isActive;
  },

  getNextQuestion: function() {
    this.questioncount = this.indexNextQuestion;
    return this.localQuestionStorage[this.questioncount];
  },

  getPreviousQuestion: function() {
    this.questioncount--;
    var previousQuestion = this.localQuestionStorage[this.questioncount];
    while(this.givenAnswers[previousQuestion["id"]]["active"] == false) {
      this.questioncount--;
      previousQuestion = this.localQuestionStorage[this.questioncount];
    }
    for(var group in this.currGroups) {
      if(this.currGroups[group]["startIndex"] > this.questioncount) {
        delete this.currGroups[group];
      }
    }
    return previousQuestion;

  },

  calculateIndexNextQuestion: function() {
    var model = this;
    if(this.questioncount == this.localQuestionStorage.length - 1) {
      return -1;
    }
    this.indexNextQuestion = this.questioncount;
    var nextQuestion;
    while(this.indexNextQuestion < this.localQuestionStorage.length - 1) {
       this.indexNextQuestion++;
        nextQuestion = this.localQuestionStorage[this.indexNextQuestion]; 
      for(var key in this.currGroups) {
        if(!nextQuestion["groups"].includes(key)) {
          delete this.currGroups[key];
        }
      }
      //check groupcondition
      var groupconditionsFulfilled = true;
      for(var i = 0; i < nextQuestion["groups"].length; i++) {
        var groupId = nextQuestion["groups"][i];
        if(!(groupId in this.currGroups)) {
          this.currGroups[groupId] = {};
          this.currGroups[groupId]["condition"] = this.checkCondition(this.localQuestiongroupStorage[groupId]["condition"]);
          this.currGroups[groupId]["startIndex"] = this.indexNextQuestion;
        }
        if(this.currGroups[groupId]["condition"] == false) {
          groupconditionsFulfilled = false;
        }
      }

      // all group conditions are true
      if(groupconditionsFulfilled && this.checkCondition(nextQuestion["condition"])) {
        return this.indexNextQuestion;
      }
    }
     return -1;
  },

  getAnswers: function(question) {
    var model = this;
    var answers = question["answers"].filter(function(answer) {
      var condIsFulfilled = model.checkCondition(answer["condition"]);
      var indexOfAnswer = model.givenAnswers[question["id"]]["answers"].indexOf(answer["id"]);
      // delete Answer from given answers if its not shown
      if(indexOfAnswer > -1 && !condIsFulfilled) {
        model.givenAnswers[question["id"]]["answers"].splice(indexOfAnswer, 1);
      }
      return condIsFulfilled;
    });
    return answers;
  },

  getCurrentQuestion: function() {
    return this.localQuestionStorage[this.questioncount];
  },

  checkCondition: function(cond) {
    if(cond == "" || cond == null || cond == undefined) {
      return true;
    }
    cond = this.parseToBoolean(cond);
    var res = cond;
    var res = eval(cond);
    return res;
  },

  parseToBoolean: function(condition) {
    var model = this;
    var booleanCondition = condition;
    var idPattern = /[F]\d{3}\-[A]\d{2}/g;
    booleanCondition = booleanCondition.replace(idPattern, function(id) {
      var key = id.split("-")[0];
      if(model.givenAnswers[key]["answers"].includes(id) && model.givenAnswers[key]["active"]) {
        return "true";
      } 
      return "false";
    });
    return booleanCondition;
  },

  isLastQuestion: function(question) {
    var next = this.calculateIndexNextQuestion();
    if(next == this.questioncount) {
      return true;
    }
    return false;
  },

}


