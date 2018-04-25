(function($, deck, undefined) {
	var $d = $(document),

	toggleHorizon = function(base, fn) {
		var slides = $[deck]('getSlides'),
		opts = $[deck]('getOptions'),
		min = base - opts.horizon,
		max = base + opts.horizon,
		i;

		min = min < 0 ? 0 : min;
		max = max > slides.length ? slides.length : max;

		for (i = 0; i < min; i++) {
			slides[i][fn](opts.classes.horizon);
		}
		for (i = max; i < slides.length; i++) {
			slides[i][fn](opts.classes.horizon);
		}
	},

	updateHorizon = function(e, from, to) {
		if (from || from === 0) {
			toggleHorizon(from, 'removeClass');
		}

		if (to || to === 0) {
			toggleHorizon(to, 'addClass');
		}
	};

	$.extend(true, $[deck].defaults, {
		classes: {
			horizon: 'deck-horizon'
		},

		horizon: 16
	});

	$d.bind('deck.init', function() {
		updateHorizon(null, null, 0);
	})
	.bind('deck.change', updateHorizon);
})(jQuery, 'deck');