$.when(
    $.get('/git_MIO_MA/header_menu/headerLoginRegister.html', function(data) {
        $('#header').html(data);
    }),
    $.get('/git_MIO_MA/header_menu/menu.html', function(data) {
        $('#menu').html(data);
    }),
    $.Deferred(function(deferred) {
        $(deferred.resolve);
    })
).done(function() {
    $.getScript("/git_MIO_MA/header_menu/loginRegister.js");
});