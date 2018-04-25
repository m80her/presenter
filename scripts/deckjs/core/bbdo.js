$(function() {
	
	/* nav arrow / deck status colours
	if ($('.deck-current').hasClass('red')) {
		arrowsWhiteAdd();
	}
	
	function arrowsWhiteAdd() {
		$('.deck-next-link, .deck-prev-link, .deck-status').addClass('navWhite');
	}
	
	function arrowsWhiteRemove() {
		$('.deck-next-link, .deck-prev-link, .deck-status').removeClass('navWhite');
	}
	*/



	// responsive font sizes
	function fontResize() {
		
		var viewport = $('html').width();
		var fontSize = (viewport / 10) + '%';
		
		$('body').css({'font-size': fontSize + '%'});
									
	}
	
	if ($('html').hasClass('touch')) {
		
		// no nothing
		
	} else {
		
		// run functions on pageload
		fontResize();

		$(window).resize(function() {

			// and on voewport resize
			fontResize();

		});
		
	}



	// 
	//  animate client logos
	//

	// hide boxes on page load
	$('.clients_transition ul li').each( function() {
	   // $(this).css({'opacity': '0'});
	});
	
	function logosFadeIn() {
		
		// select first box
		var box = $('.clients_transition ul li').first();

		// go through each box fading them in
		var $id = setInterval(function() {
		   box.delay(1000).addClass('animate');
		   box = box.next();
		   if(box.length == 0) {
		      clearInterval($id);
		   }
		}, 80); // set delay between each animation
						
	}
	
	function logosFadeOut() {
		$('.clients_transition ul li').removeClass('animate', 500);
	}
	
	//  end animate client logos
	
	


	//
	// using deck.change to detect when a slides with certain classes becomes active, and fire the animations
	//
	
	$(document).bind('deck.change', function(event, from, to) {
		
		var $entering = $.deck('getSlide', to);
			$leaving = $.deck('getSlide', from);

		
		
		
		//
		// nav arrow / deck status colours
		//
		if ($entering.hasClass('red')) {
			arrowsWhiteAdd();
		}

		if ($leaving.hasClass('red')) {
			arrowsWhiteRemove();
		}

		
		
		
		//
		// animate client logos
		//
		if ($entering.hasClass('clients_transition')) {
			$(this).delay(1000).queue(function() {
				logosFadeIn();
				$(this).dequeue();
			});
		}

		if ($leaving.hasClass('clients_transition')) {
			$(this).delay(500).queue(function() {
				logosFadeOut();
				$(this).dequeue();
			});
		}
						
	});
				
});
