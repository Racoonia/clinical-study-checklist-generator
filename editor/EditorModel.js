var EditorModel = function EditorModel() {
  // local storages, indexed by ids 
  this.localQuestionStorage = [];
  this.localQuestiongroupStorage = [];
  this.localElementStorage = [];
  this.localElementgroupStorage = [];

  // object references, ordered by position (numerical index)
  this.orderQuestions = [];
  this.orderElements = [];

  this.questionIds = [];
  this.questiongroupIds = [];

  this.versions;
};

EditorModel.prototype = {

  init: function() {
    var dfd = $.Deferred();
    this.getVersions().then(version => this.setVersions(version)).then(_ => {
      var currVersion = this.versions[this.versions.length-1]["version"];
      var questionPromise = this.getQuestions(currVersion);
      var questiongroupPromise = this.getQuestiongroups(currVersion);
      var elementPromise = this.getElements(currVersion);
      var elementgroupPromise = this.getElementgroups(currVersion);

      Promise.all([questionPromise, questiongroupPromise, elementPromise, elementgroupPromise]).then(data => { 
        this.setLocalQuestionStorage(data[0]);
        this.setLocalQuestiongroupStorage(data[1]);
        this.setQuestionReferences();

        this.setLocalElementStorage(data[2]);
        this.setLocalElementgroupStorage(data[3]);
        this.setElementReferences();

      }).then(_ => dfd.resolve());
    });
    return dfd.promise(); 
  }, 

  getVersions: function() {
    return $.ajax({
      url: '../data/versions.json',
    });
  },

  setVersions: function(data) {
    this.versions = data;
  },

  getQuestions: function(currVersion) {
    return $.ajax({
      url: '../data/v' + currVersion + '_questions.json'
    });
  }, 

   getQuestiongroups: function(currVersion) {
    return $.ajax({
      url: '../data/v' + currVersion + '_questiongroups.json'
    });
  }, 

  getElements: function(currVersion) {
    return $.ajax({
      url: '../data/v' + currVersion + '_checklistElements.json'
    });
  }, 

  getElementgroups: function(currVersion) {
    return $.ajax({
      url: '../data/v' + currVersion + '_checklistElementgroups.json'
    });
  },

  setLocalQuestionStorage: function(data) {
    for (var i = 0; i < Object.keys(data).length; i++) {
      this.localQuestionStorage[data[i]["id"]] = data[i];
      this.orderQuestions[i] = this.localQuestionStorage[data[i]["id"]];
    }
    this.sortByPosition(this.orderQuestions);
  },

  setLocalQuestiongroupStorage: function(data) {
    for(var i = 0; i < Object.keys(data).length; i++) {
      this.localQuestiongroupStorage[data[i]["id"]] = data[i];
    }
  },

  setLocalElementStorage: function(data) {
    for(var i = 0; i < Object.keys(data).length; i++) {
      this.localElementStorage[data[i]["id"]] = data[i];
      this.orderElements[i] = this.localElementStorage[data[i]["id"]];
    }
    this.sortByPosition(this.orderElements);
  },

  setLocalElementgroupStorage: function(data) {
    for(var i = 0; i < Object.keys(data).length; i++) {
          this.localElementgroupStorage[data[i]["id"]] = data[i];
        }
  },

  setElementReferences: function() {
    for(var id in this.localElementStorage) {
      for(var sub = 0; sub < this.localElementStorage[id]["subelements"].length; sub++) {
        for(var g = 0; g < this.localElementStorage[id]["subelements"][sub]["groups"].length; g++) {
          this.localElementStorage[id]["subelements"][sub]["groups"][g] = this.localElementgroupStorage[this.localElementStorage[id]["subelements"][sub]["groups"][g]];
        }
      }
    }
    for(var gId in this.localElementgroupStorage) {
      for(var sub = 0; sub < this.localElementgroupStorage[gId]["members"].length; sub++) {
        var eId = this.localElementgroupStorage[gId]["members"][sub].substring(0, 5);
        for(var i = 0; i < this.localElementStorage[eId]["subelements"].length; i++) {
          if(this.localElementStorage[eId]["subelements"][i]["id"] == this.localElementgroupStorage[gId]["members"][sub]) {
            this.localElementgroupStorage[gId]["members"][sub] = this.localElementStorage[eId]["subelements"][i];
          }
        }
      }
    }
  },

  setQuestionReferences: function() {
    for(var id in this.localQuestionStorage) {
      for(var q = 0; q < this.localQuestionStorage[id]["groups"].length; q++) {
        this.localQuestionStorage[id]["groups"][q] = this.localQuestiongroupStorage[this.localQuestionStorage[id]["groups"][q]];
      }
    }

    for(var gId in this.localQuestiongroupStorage) {
      for(var mem = 0; mem < this.localQuestiongroupStorage[gId]["members"].length; mem++) {
        this.localQuestiongroupStorage[gId]["members"][mem] = this.localQuestionStorage[this.localQuestiongroupStorage[gId]["members"][mem]];
      }
    }
  },

  storeQuestion: function(question) {
    var newPosition = question["position"];
    var oldPosition;
    // existing question was modified 
    if(question["id"] in this.localQuestionStorage) {
      oldPosition = this.localQuestionStorage[question["id"]]["position"];
      this.localQuestionStorage[question["id"]]["id"] = question["id"];
      this.localQuestionStorage[question["id"]]["position"] = question["position"];
      this.localQuestionStorage[question["id"]]["questiontext"] = question["questiontext"];
      this.localQuestionStorage[question["id"]]["type"] = question["type"];
      this.localQuestionStorage[question["id"]]["infotext"] = question["infotext"];
      this.localQuestionStorage[question["id"]]["url"] = question["url"];
      this.localQuestionStorage[question["id"]]["condition"] = question["condition"];
      this.localQuestionStorage[question["id"]]["answers"] = question["answers"];
    } else { // new question
      this.localQuestionStorage[question["id"]] = question;
      this.orderQuestions.push(this.localQuestionStorage[question["id"]]);
      oldPosition = this.orderQuestions.length;
    }
    this.reorderPosition(this.orderQuestions, oldPosition-1, newPosition-1);
  },

  storeElement: function(element) {
    var newPosition = element["position"];
    var oldPosition;
    // existing element was modified 
    if(element["id"] in this.localElementStorage) {
      oldPosition = this.localElementStorage[element["id"]]["position"];
      this.localElementStorage[element["id"]]["id"] = element["id"];
      this.localElementStorage[element["id"]]["position"] = element["position"];
      this.localElementStorage[element["id"]]["elementtext"] = element["elementtext"];
      this.localElementStorage[element["id"]]["subelements"] = element["subelements"];
    } else { // new element
      this.localElementStorage[element["id"]] = element;
      this.orderElements.push(this.localElementStorage[element["id"]]);
      oldPosition = this.orderElements.length;
    }
    this.reorderPosition(this.orderElements, oldPosition-1, newPosition-1);
  },

  deleteQuestion: function(id) {
    this.orderQuestions.splice(this.localQuestionStorage[id]["position"]-1, 1);
    this.reorderPosition(this.orderQuestions);
    delete this.localQuestionStorage[id];
  },

  deleteElement: function(id) {
    this.orderElements.splice(this.localElementStorage[id]["position"]-1, 1);
    this.reorderPosition(this.orderElements);
    delete this.localElementStorage[id];
  },

  deleteQuestiongroup: function(id) {
    // delete group from members
    for(var mem = 0; mem < this.localQuestiongroupStorage[id]["members"].length; mem++) {
      var index = this.localQuestiongroupStorage[id]["members"][mem]["groups"].indexOf(this.localQuestiongroupStorage[id]);
      this.localQuestiongroupStorage[id]["members"][mem]["groups"].splice(index, 1);
    }
    // delete group object
    delete this.localQuestiongroupStorage[id];
  },

  deleteElementgroup: function(id) {
    // delete group from members
    for(var mem = 0; mem < this.localElementgroupStorage[id]["members"].length; mem++) {
      var index = this.localElementgroupStorage[id]["members"][mem]["groups"].indexOf(this.localElementgroupStorage[id]);
      this.localElementgroupStorage[id]["members"][mem]["groups"].splice(index, 1);
    }
    // delete group object
    delete this.localElementgroupStorage[id];
  },

  sortByPosition: function(arr) {
    arr.sort(function (a, b) {
      return a.position - b.position;
    });
  },

  reorderPosition(arr, oldIndex, newIndex) {
    oldIndex = oldIndex || 0;
    newIndex = newIndex || 0;
    if(newIndex != oldIndex) {
      arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    }
    for(var i = 0; i < arr.length; i++) {
      arr[i]["position"] = i+1;
    }
  }
}