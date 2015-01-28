(function(module) {
	"use strict";

	var YoutubeLite = {},
		embed = '<div class="js-lazyYT" data-youtube-id="$2" data-width="640" data-height="360">Loading...</div>',
		link = '<div class="youtube-lite"><i class="fa fa-film youtube-lite-play"></i> <a class="youtube-lite-link" href="https://youtube.com/watch?=v=$2">$3</a>' + embed + '</div>',

		expressions = [
			/(!?)<a href="(?:https?:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)(.+)">(.+)<\/a>/g,
			/(!?)<a href="(?:https?:\/\/)?(?:www\.)?(?:youtu\.be)\/(.+)">(.+)<\/a>/g,
			/(!?)<a href="(?:https?:\/\/)?(?:www\.)youtube.com\/embed\/([\w\-_]+)">(.+)<\/a>/
		];

	YoutubeLite.parse = function(data, callback) {
		if (!data || !data.postData || !data.postData.content) {
			return callback(null, data);
		}

		var matches, html, content = data.postData.content;

		for (var i = 0, l = expressions.length; i < l; i++) {
			matches = expressions[i].exec(content);
			if (matches) {
				html = matches[1].length ? link : embed;
				content = content.replace(expressions[i], html);
			}
		}

		data.postData.content = content;

		callback(null, data);
	};

	module.exports = YoutubeLite;
}(module));
