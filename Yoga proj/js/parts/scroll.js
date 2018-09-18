function scroll() {
	let mainNav = document.getElementById('main-nav');

	mainNav.addEventListener('click', (e) => {
		let target = e.target;
			

		if (e.target.tagName === "A") {
			let links = mainNav.querySelectorAll('[href^="#"]'),
				V = 0.4;

			e.preventDefault();
			let anchor = target.href.replace(/.*(#.*)/, '$1'),
				coords = document.querySelector(anchor).getBoundingClientRect().top,
				w = window.pageYOffset,
				start  = null;

			let tick = (now) => {
				if (start === null) start = now;

				let progress = now - start,
  					position = (coords < 0 ? Math.max(w - progress/V, w + coords) : Math.min(w + progress/V, w + coords));
  				
  				window.scrollTo(0,position);

				if (position != coords + w) {
					requestAnimationFrame(tick);
				} 
			};

			requestAnimationFrame(tick);
		}
	});
}

module.exports = scroll;