/* custom js */

$(document).ready(function() {

	// BBDO nav
	$('.nav-primary-item').hover(
		function() {
			$(this).children('.nav-primary-item-allwork').animate({'width': '120px'}, 150);
		},
		function() {
			$(this).children('.nav-primary-item-allwork').animate({'width': '0px'}, 150);
		}
	);

	// share modal - init & options
	$('#shareModal').modal({
		show: false
	});
	
	// autocomplete (typeahead) init & options
	$('.typeahead').typeahead({
		source: ['test contact 1', 'test contact 2', 'test contact 3']
	});
	
	// view presentaion iframe
	function responsiveIframe() {
		
		var iframeWidth = $('.previewIframe').width();
		var iframeHeight = (iframeWidth * 0.75) + 'px';
		
		$('.previewIframe').css({'height': iframeHeight });
		
		// alert(iframeHeight);
		
	}
	
	responsiveIframe();
	
	$(window).resize(function() {

		responsiveIframe();

	});
	
});