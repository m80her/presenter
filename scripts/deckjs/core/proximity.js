$(function() {
	
	function BlockMove(event) {
		// Tell Safari not to move the window.
		event.preventDefault() ;
	 }
	


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
	
	
	
	/* responsive css perspective
	function perpectiveResize() {
		
		var width = $('html').width();
		var perspective = (width);
		var transform = (width / 2.5);
		
		$('.csstransitions.csstransforms').css({'-webkit-perspective': perspective + 'px'});
		$('.csstransitions.csstransforms .deck-container:not(.deck-menu) > .deck-previous:not(.deck-child-current),	.csstransitions.csstransforms .deck-container:not(.deck-menu) > .deck-before:not(.deck-child-current)').css({'-webkit-transform': 'rotateY(-90deg) translateZ(' + transform + 'px) translateX(-' + transform + 'px)'});
		$('.csstransitions.csstransforms .deck-container:not(.deck-menu) .deck-next:not(.deck-child-current), .csstransitions.csstransforms .deck-container:not(.deck-menu) .deck-after:not(.deck-child-current)').css({'-webkit-transform': 'rotateY(90deg) translateZ(' + transform + 'px) translateX(' + transform + 'px)'});
		
		// alert(perspective);
		// alert(transform);
								
	}
	*/
	
		
	
	// responsive font sizes
	function fontResize() {
		
		var viewport = $('html').width();
		var fontSize = (viewport / 10) + '%';
		var discWidth = $('.discs span').width();
		
		$('body').css({'font-size': fontSize + '%'});
		$('.discs span b').css({'font-size': (discWidth * 2) + '%'})
									
	}
	
	// responsize discs
	function discDimensions() {
		
		var discWidth = $('.discs span').width();
		
		$('.discs span').css({'height': discWidth + 'px'});
		$('.discs span b').css({'line-height': discWidth + 'px'});
				
	}
	
	if ($('html').hasClass('touch')) {
		
		// run functions on pageload
		discDimensions();
		// perpectiveResize();

		$(window).resize(function() {

			// and on voewport resize
			discDimensions();
			// perpectiveResize();

		});
	} else {
		
		// run functions on pageload
		fontResize();
		discDimensions();
		// perpectiveResize();

		$(window).resize(function() {

			// and on voewport resize
			fontResize();
			discDimensions();
			// perpectiveResize();

		});
		
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
		
		$('.intro_4 .discs .icon_1').delay(100).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});		
		$('.intro_4 .discs .icon_2').delay(200).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});
		$('.intro_4 .discs .icon_3').delay(300).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});
		$('.intro_4 .discs .icon_4').delay(400).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});
		$('.intro_4 .discs .icon_5').delay(500).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});
		$('.intro_4 .discs .icon_6').delay(600).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});
		$('.intro_4 .discs .icon_7').delay(700).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});
		$('.intro_4 .discs .icon_8').delay(800).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});
		$('.intro_4 .discs .icon_9').delay(900).queue(function() {
			$(this).addClass('animate');
			$(this).dequeue();
		});
		$('.intro_4 .discs .icon_10').delay(1000).queue(function() {
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
	//  animate changing world
	//

	// hide boxes on page load
	$('.changing_world img').each( function() {
	   // $(this).css({'opacity': '0'});
	});
	
	function changingWorldIn() {
		
		// select first box
		var box = $('.changing_world img').first();

		// go through each box fading them in
		var $id = setInterval(function() {
		   box.delay(1000).addClass('animate');
		   box = box.next();
		   if(box.length == 0) {
		      clearInterval($id);
		   }
		}, 500); // set delay between each animation
						
	}
	
	function changingWorldOut() {
		$('.changing_world img').removeClass('animate', 500);
	}
	
	//  end animate changing world

	
	
	// 
	//  animate brand shots
	//

	// hide boxes on page load
	$('.brands img').each( function() {
	   // $(this).css({'opacity': '0'});
	});
	
	function brandsFadeIn() {
		
		// select first box
		var box = $('.brands img').first();

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
		$('.brands img').removeClass('animate', 500);
	}
	
	//  end animate brand shots

	
	
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
	



	// 
	//  dynamic height for innovation page (proximity)
	//

	function innovate() {
		
		var width = $('.global.innovation .vcenter').width();
		var height = Math.round((width / 100) * 85) + 'px';
		
		$('.global.innovation .vcenter').css({'height': height});
		// alert(logosHeight);
		
	}
	
	innovate();
	
	$(window).resize(function() {

		innovate();

	});
	//  end dynamic height for innovation page (proximity)
	
	


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
		// animate changing world
		//
		if ($entering.hasClass('changing_world')) {
			$(this).delay(500).queue(function() {
				changingWorldIn();
				$(this).dequeue();
			});
		}

		if ($leaving.hasClass('changing_world')) {
			$(this).delay(500).queue(function() {
				changingWorldOut();
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
