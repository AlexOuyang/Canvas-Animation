$(document).ready(function(){
	$('body').keydown(function (e) {
		if (e.keyCode == 49) {
			addShadow = ! addShadow;
		}
		if (e.keyCode == 50) {
			addDarkShadow = ! addDarkShadow;
		}
	});
});