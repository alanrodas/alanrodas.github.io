jQuery(document).ready(function ($) {
    // Cache the Window object
	$window = $(window);

    /* Parallax 
	Inspired from Parallax Scrolling Tutorial - Smashing Magazine
	* Author: Richard Shepherd
	* 		   www.richardshepherd.com
	* 		   @richardshepherd   
	*/
	
	/* fader links */
	$('img.fader, .fader img')
		.css('opacity', .6)
		.on('mouseenter', function(){
		$(this).stop(true, true).fadeTo(800, 1);
	})
		.on('mouseleave', function(){
		$(this).stop(true, true).fadeTo(400, .6);
	});
	// Cache the Y offset and the speed of each sprite
	$('.parallax').each(function() {	
		$(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
		$(this).data('Xposition', $(this).attr('data-Xposition'));
		$(this).data('speed', $(this).attr('data-speed'));
		// Store some variables based on where we are
		var $self = $(this),
			offsetCoords = $self.offset(),
			topOffset = offsetCoords.top;
		// If this section is in view
		if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
			 ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
			// Scroll the background at var speed
			// the yPos is a negative value because we're scrolling it UP!								
			var yPos = -($window.scrollTop() / $self.data('speed')); 
			// If this element has a Y offset then add it on
			if ($self.data('offsetY')) {
				yPos += $self.data('offsetY');
			}
			// Put together our final background position
			var coords = '50% '+ yPos + 'px';
			// Move the background
			$self.css({ backgroundPosition: coords });
		}; // in view
		// When the window is scrolled...
	    $(window).scroll(function() {
			// If this section is in view
			if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
				 ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
				// Scroll the background at var speed
				// the yPos is a negative value because we're scrolling it UP!								
				var yPos = ($window.scrollTop() / $self.data('speed')) + $self.data('offsetY') ; 
				// If this element has a Y offset then add it on
				if ($self.data('offsetY')) {
					yPos += $self.data('offsetY');
				}
				// Put together our final background position
				var coords = '50% '+ yPos + 'px';
				// Move the background
				$self.css({ backgroundPosition: coords });
			}; // in view
		}); // window scroll	
	});	// each .parallax item
    
}(jQuery));