$(function () {
    var buttonNewSession = document.getElementById("buttonNewSession");
    var buttonImportSession = document.getElementById("sendSession");
    var importSessionForm = document.getElementById("importSessionForm");
    var inputFile = document.getElementById("sessionFile");

    buttonNewSession.addEventListener("click", newSession);
    buttonImportSession.addEventListener("click", uploadFile);
	
    /*
	 	Starts a new session and redirects to the mainpage of the wizard.
    */
    function newSession() {
        $.ajax({
            type: 'GET',
            url: '../ServerSide/ImportSession.php',
            data: 'newSession',
            success: function(){
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log(xhr.responseText); 
            }
        })
    	window.location.href = "../wizard/wizard.html";
    }

	/*
		Sends the uploaded file to 'ImportSession.php' and calls 'verifySession' on success 
		with the echoed data from the php file (the decoded session) as parameter.
	*/
    function uploadFile() {
        var file = new FormData();
        file.append('file', inputFile.files[0]);
         $.ajax({
            type: 'POST',
            url: '../ServerSide/ImportSession.php',
            data: file,
            processData: false,
            contentType: false,
            success: function(session){
                verifySession(session);
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log(xhr.responseText); 
            }
        });   
    }

    /*
		Verifys the passed string by checking the JSON syntax and comparing the version with the latest version on the server.
		If it's a valid session the redirect to the wizard mainpage follows.
	*/
    function verifySession(loadedSession) {
        //try to parse json
        try {
            var loadedSession = JSON.parse(loadedSession);
        } catch(e) {
            alert("Die Datei konnte nicht gelesen werden, da sie fehlerhaft ist.");
            return;
        }
        // check version
        $.ajax({
            url: '../../data/versions.json',
            dataType: 'json',
            success: function(data){
                // slice to get only the first two numbers
                if(data[data.length-1]["version"].slice(0,2) != loadedSession["version"].slice(0,2)) {
                    alert("Die Datei ist nicht kompatibel mit der aktuellen Version des Wizards. Bitte wählen Sie eine neuere Datei oder beginnen Sie eine neue Sitzung.")
                } else {
                    window.location.href = "../wizard/wizard.html";
                }
            },
            error: function(xhr, textStatus, errorThrown) {;
                console.log(xhr.responseText); 
            }
        }); 

    }

 });

