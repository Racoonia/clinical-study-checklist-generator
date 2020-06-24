var WizardControllerEnd = function WizardControllerEnd(wizardViewEnd) {
  this.wizardViewEnd = wizardViewEnd;
  this.localQuestionStorage;
  this.result;

  this.buttonDownloadDocx = document.getElementById("buttonDownloadDocx");
  this.buttonDownloadXML = document.getElementById("buttonDownloadXML");
  this.downloadDocxForm = document.getElementById("downloadDocxForm");
  this.downloadXMLForm = document.getElementById("downloadXMLForm");
  this.inputElementsDocx = document.getElementById("inputElementsDocx");
  this.inputElementsXML = document.getElementById("inputElementsXML");
};

WizardControllerEnd.prototype = {

  init: function() { 
    this.setupHandlersEnd();
    var promiseLocalQuestionStorage = this.getLocalQuestionStorage();
    promiseLocalQuestionStorage.then(data => this.setLocalQuestionStorage(data));
    var promiseResult = this.getResult();
    promiseResult.then(_ => {this.wizardViewEnd.showResult(this.result, this.localQuestionStorage); this.generateHash();});
  },

  setupHandlersEnd: function() {
    this.downloadDocx = this.downloadDocx.bind(this);
    this.downloadXML = this.downloadXML.bind(this);
    this.getResult = this.getResult.bind(this);

    this.buttonDownloadDocx.addEventListener("click", this.downloadDocx);
    this.buttonDownloadXML.addEventListener("click", this.downloadXML);
    
    return this;
  },

  setLocalQuestionStorage: function(data) {
    this.localQuestionStorage = data;
  },

  downloadXML: function() {
    this.downloadXMLForm.submit(); 
  },

  downloadDocx: function() {
    this.downloadDocxForm.submit(); 
  },

  generateHash: function() {
    $.ajax({
      type: 'GET',
      url: '../../sessionVariables.php',
      data: 'hash',
      success: function (data) {
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log(xhr.responseText); 
       }
    }); 
  },

  getResult: function() {
    var ctr = this;
    return $.ajax({
                    type: 'GET',
                    url: '../serverSide/CalculatingComponent.php',
                    data: 'result',
                    dataType: 'json',
                    success: function (data) {
                      ctr.result = data;
                    },
                    error: function(xhr, textStatus, errorThrown) {
                      console.log(xhr.responseText); 
                    }
    }); 
  },

  getLocalQuestionStorage: function() {
    var ctr = this;
    return  $.ajax({
              type: 'GET',
              url: '../../sessionVariables.php',
              data: 'localQuestionStorage',
              dataType: 'json',
              success: function (data) {
                        ctr.localQuestionStorage = data;
                      },
              error: function(xhr, textStatus, errorThrown) {
                      console.log(xhr.responseText); 
                    }
            }); 
  }

}