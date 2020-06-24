$(document).ready(function(){
	$.ajax({
		url: '../header_menu/setHeaderMenu.js',
		type: 'GET',
		async: false,
		success: function() {
			var model = new EditorModel();
			var view = new EditorView();
			var controller = new EditorController(model, view);

			view.init();
			$.when(model.init()).then(_ => controller.init());
		}
	}); 		
});