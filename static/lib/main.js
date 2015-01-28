"use strict";

$(window).on('action:widgets.loaded', function() {
	$('.js-lazyYT').lazyYT();
});

$(window).on('action:posts.loaded', function(){
	$('.js-lazyYT').delay(500).lazyYT();
});

$(document).ready(function() {
	$(document).off('click.youtube-lite', '.youtube-lite-play').on('click.youtube-lite', '.youtube-lite-play', function(e) {
		e.preventDefault();

		var el = $(e.currentTarget).parents('.youtube-lite').find('.js-lazyYT');
		if (el.css('display') !== 'none') el.hide();
		else el.show();

		return false;
	});
});

