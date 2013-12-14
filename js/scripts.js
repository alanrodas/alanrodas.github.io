jQuery(document).ready(function ($) {

	// top of page (action)
	$('#scrolltop').click(function (e) {
		e.preventDefault();
		var documentBody = (($.browser.chrome)||($.browser.safari)) ? document.body : document.documentElement;
	    $(documentBody).animate({scrollTop: $('#header').offset().top}, 1000,'easeInOutCubic');
	});
	
	// top of page (show link)
	$(window).scroll(function () {
		var scrollPosition = $(window).scrollTop();
		var position = 300;
		
		if(scrollPosition >= position) {
			$('#scrolltop').fadeIn();
		} else {
			$('#scrolltop').fadeOut();
		}
	});
	
}(jQuery));
	