$(function () {

	var model = new WizardModel();
	var view = new WizardView();
	var controller = new WizardController(model, view);

	$.when(model.init()).then(_ => controller.init());
    		
});