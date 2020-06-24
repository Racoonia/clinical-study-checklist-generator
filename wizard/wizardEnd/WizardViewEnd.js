var WizardViewEnd = function WizardViewEnd() {

  this.buttonDownloadDocx = document.getElementById("buttonDownloadDocx");
  this.tableResult = document.getElementById("tableResult");
  this.localStorage; 
};

WizardViewEnd.prototype = {

  showResult: function(result, localStorage) {
    //iterate over Checklistelements
    for(var i in result["checklistElement"]) {
      // iterate over subelements
      for(var sub in result["checklistElement"][i]) {
        if(sub != "elementtext") {
          var row = document.createElement("tr");
          var contentElement = document.createElement("td");
          var contentAnswers = document.createElement("td");

          var textnodeElement = document.createTextNode(result["checklistElement"][i][sub]);
          contentElement.appendChild(textnodeElement);

          for(var questionId in result["responsibleAnswers"][sub]) {
            //find questionId in localStorage
            var question = localStorage.filter(function(el) {
              return questionId == el["id"];
            })[0];
            var textnodeQuestion = document.createTextNode(question["questiontext"]);
            contentAnswers.appendChild(textnodeQuestion);
            contentAnswers.appendChild(document.createElement("br"));

            // iterate over responsible answers
            for(var k = 0; k < result["responsibleAnswers"][sub][questionId].length; k++) {
              var answerId = result["responsibleAnswers"][sub][questionId][k];
              // find answerId in localStorage
              var answer = question["answers"].filter(function(el) {
                return el["id"] == answerId;
              })[0];
              var textnodeAnswer = document.createTextNode(answer["answertext"]);
              contentAnswers.appendChild(document.createTextNode("-> "));
              contentAnswers.appendChild(textnodeAnswer);
              contentAnswers.appendChild(document.createElement("br"));
            }
          } 
          contentAnswers.appendChild(document.createElement("br"));
          row.appendChild(contentElement);
          row.appendChild(contentAnswers);
          this.tableResult.appendChild(row);
        }
      }
    }
  }

}