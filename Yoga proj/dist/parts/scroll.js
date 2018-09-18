'use strict';

function scroll() {
	var mainNav = document.getElementById('main-nav');

	mainNav.addEventListener('click', function (e) {
		var target = e.target;

		if (e.target.tagName === "A") {
			var links = mainNav.querySelectorAll('[href^="#"]'),
			    V = 0.4;

			e.preventDefault();
			var anchor = target.href.replace(/.*(#.*)/, '$1'),
			    coords = document.querySelector(anchor).getBoundingClientRect().top,
			    w = window.pageYOffset,
			    start = null;

			var tick = function tick(now) {
				if (start === null) start = now;

				var progress = now - start,
				    position = coords < 0 ? Math.max(w - progress / V, w + coords) : Math.min(w + progress / V, w + coords);

				window.scrollTo(0, position);

				if (position != coords + w) {
					requestAnimationFrame(tick);
				}
			};

			requestAnimationFrame(tick);
		}
	});
}

module.exports = scroll;