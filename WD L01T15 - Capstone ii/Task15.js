// JavaScript source code for Task15.html - part thereof

//pic click fade out over 3sec and back on click:
$("#fadeEffect").on('click', function(){
    $(".evilpar").fadeToggle(2000);
});

$(".ikillyou").on('click', function(){
	$(this).slideDown();
}