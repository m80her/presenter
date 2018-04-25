$(function() {
	
	//
	//  initialize the deck
	//
	$.deck('.slide');
	
	
	//  nav arrow / deck status colours
	if ($('.deck-current').hasClass('red')) {
		arrowsWhiteAdd();
	}
	
	function arrowsWhiteAdd() {
		$('.deck-next-link, .deck-prev-link, .deck-status').addClass('navWhite');
	}
	
	function arrowsWhiteRemove() {
		$('.deck-next-link, .deck-prev-link, .deck-status').removeClass('navWhite');
	}




	//
	//  animate discs (proximity)
	//

	// initiate discAnimate in each row at interval
	$.fn.discRows = function() {
		var row = $('.deck-current .discs').first();
		var $id = setInterval(function() {
			row.discAnimate();
			row = row.next();
			if (row.length == 0) {
				clearInterval($id);
			}
		}, 80);
	}	

	// animate each <span> at interval
	$.fn.discAnimate = function() {
		var disc = $(this).children('span').first();
		var $id = setInterval(function() {
			disc.addClass('animate');
			disc = disc.next();
			if (disc.length == 0) {
				clearInterval($id);
			}
		}, 80);
	}
	
	// animate in reverse - primarily for 'PROXIMUS' in intro_3
	$.fn.discAnimateReverse = function() {
		var disc = $(this).children('span').last();
		var $id = setInterval(function() {
			disc.addClass('animate');
			disc = disc.prev();
			if (disc.length == 10) {
				clearInterval($id);
			}
		}, 100);
	}
	
	// animate disc icons in intro_4
	$.fn.discIcons = function() {
		
		$('.intro_4 .discs .icon_1').delay(150).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});		
		$('.intro_4 .discs .icon_2').delay(300).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});
		$('.intro_4 .discs .icon_3').delay(450).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});
		$('.intro_4 .discs .icon_4').delay(600).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});
		$('.intro_4 .discs .icon_5').delay(750).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});
		$('.intro_4 .discs .icon_6').delay(900).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});
		$('.intro_4 .discs .icon_7').delay(1050).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});
		$('.intro_4 .discs .icon_8').delay(1200).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});
		$('.intro_4 .discs .icon_9').delay(1350).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});
		$('.intro_4 .discs .icon_10').delay(1500).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});
	}
	
	// reset functions	
	function discReset() {
		$('.discs span').removeClass('animate');
	}
	
	function discRotateReset_1() {
		$('.intro_1 .discs span').removeClass('animate');
	}
	
	function discRotateReset_2() {
		$('.intro_2 .discs span').removeClass('animate');
	}
	
	function discRotateReset_3() {
		$('.intro_3 .discs span').removeClass('animate');
	}
	
	function discRotateReset_4() {
		$('.intro_4 .discs span').removeClass('animate');
	}
			
	// TEMP: trigger the animation on click
	$('.intro').bind('click', function() {
		discReset();
		$(this).delay(500).queue(function() {
			// $(this).discRows();
			$(this).discIcons();
			$(this).dequeue();
		});
	});
	// end TEMP
		
	//  end animate discs (proximity)


	
	
	// 
	//  animate brand shots
	//

	// hide boxes on page load
	$('.brands ul li').each( function() {
	   // $(this).css({'opacity': '0'});
	});
	
	function brandsFadeIn() {
		
		// select first box
		var box = $('.brands ul li').first();

		// go through each box fading them in
		var $id = setInterval(function() {
		   box.delay(1000).addClass('animate');
		   box = box.next();
		   if(box.length == 0) {
		      clearInterval($id);
		   }
		}, 100); // set delay between each animation
						
	}
	
	function brandsFadeOut() {
		$('.brands ul li').removeClass('animate', 500);
	}
	
	//  end animate client logos

	
	
	// 
	//  animate client logos
	//

	// hide boxes on page load
	$('.clients ul li').each( function() {
	   // $(this).css({'opacity': '0'});
	});
	
	function logosFadeIn() {
		
		// select first box
		var box = $('.clients ul li').first();

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
		$('.clients ul li').removeClass('animate', 500);
	}
	
	//  end animate client logos
	
	


	// 
	//  animate labs 'pages' (proximity)
	//

	$.fn.labsPages = function() {
		var page = $('.labs ul li').first();
		var $id = setInterval(function() {
			page.addClass('animate');
			page = page.next();
			if (page.length == 0) {
				clearInterval($id);
			}
		}, 150);
	}
	
	function labsPagesReset() {
		$('.labs ul li').removeClass('animate');
	}

	//  end animate labs 'pages' (proximity)

	
	
	
	//
	// using deck.change to detect when a slide with class 'labs' becomes active, and fire the animation
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
		// animate intro
		//
		
		// reset intro_1 animation
		if ($entering.hasClass('intro_1')) {
			discRotateReset_1();
		}

		// trigger intro_1 animation
		if ($leaving.hasClass('intro_1')) {
			discRotateReset_2();
			$(this).discRows();
		}

		// trigger intro_2 animation
		if ($entering.hasClass('intro_2')) {
			$(this).delay(1500).queue(function() {
				$(this).discRows();
				$(this).dequeue();
			});
		}

		if ($leaving.hasClass('intro_2')) {
			// discRotateReset_1();
		}

		// trigger intro_3 animation
		if ($entering.hasClass('intro_3')) {
			$(this).delay(500).queue(function() {
				$('.intro_3 .discs:nth-child(1)').discAnimate();
				$('.intro_3 .discs:nth-child(2)').discAnimateReverse();
				$('.intro_3 .discs:nth-child(3)').discAnimate();
				$(this).dequeue();
			});
		}

		if ($leaving.hasClass('intro_3')) {
			$(this).delay(500).queue(function() {
				discRotateReset_3();
				$(this).dequeue();
			});
		}

		// trigger intro_4 animation
		if ($entering.hasClass('intro_4')) {
			$(this).delay(500).queue(function() {
				$(this).discIcons();
				// $('.intro_4 .discs').discIcons();
				/// $('.intro_4 .discs').discIcons();
				$(this).dequeue();
			});
		}

		if ($leaving.hasClass('intro_4')) {
			$(this).delay(500).queue(function() {
				discRotateReset_4();
				$(this).dequeue();
			});
		}
		



		//
		// animate brand shots
		//
		if ($entering.hasClass('brands')) {
			$(this).delay(1000).queue(function() {
				brandsFadeIn();
				$(this).dequeue();
			});
		}

		if ($leaving.hasClass('brands')) {
			$(this).delay(500).queue(function() {
				brandsFadeOut();
				$(this).dequeue();
			});
		}
		
		
		
		
		//
		// animate client logos
		//
		if ($entering.hasClass('clients')) {
			$(this).delay(1000).queue(function() {
				logosFadeIn();
				$(this).dequeue();
			});
		}

		if ($leaving.hasClass('clients')) {
			$(this).delay(500).queue(function() {
				logosFadeOut();
				$(this).dequeue();
			});
		}
		
		
		
		
		//
		//  animate labs 'pages' (proximity)
		//
		if ($entering.hasClass('labs')) {
			$(this).delay(1000).queue(function() {
				$(this).labsPages();
				$(this).dequeue();
			});
		}

		if ($leaving.hasClass('labs')) {
			$(this).delay(1000).queue(function() {
				labsPagesReset();
				$(this).dequeue();
			});
		}
		
		
		
		
		//
		//  animate dial (proximity)
		//
		if ($entering.hasClass('dial')) {
			$(this).delay(1000).queue(function() {
				$('.dial img.dial_2').addClass('animate');
				$(this).dequeue();
			});
		}

		if ($leaving.hasClass('dial')) {
			$(this).delay(1000).queue(function() {
				$('.dial img.dial_2').removeClass('animate');
				$(this).dequeue();
			});
		}
		
		
		
		
				
	});
				
});
