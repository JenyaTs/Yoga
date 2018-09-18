function modal() {
	let more = document.querySelector('.more'),
  		overlay = document.querySelector('.overlay'),
      infoContainer = document.querySelector('.info'),
  		close = document.querySelector('.popup-close');

  	function addPopup() { // показать модальное окно

  		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || document.documentElement.clientWidth < 576) {
 			return;
		}

  		if (document.documentMode || /Edge/.test(navigator.userAgent)) {
    		this.classList.add('more-splash');
		  	overlay.style.display = 'block';
		  	document.body.style.overflow = 'hidden'; 
		}
		else{
			this.classList.add('more-splash');                                                                                 

			let time = {
			  start: performance.now(),
			  total: 500
			};

			let tick = now => {
			  time.elapsed = now - time.start;
			  let progress = time.elapsed / time.total;
			  overlay.style.display = 'block';
			  document.body.style.overflow = 'hidden';
			  if (progress < 1) requestAnimationFrame(tick);
			};

			requestAnimationFrame(tick);
	
  		}
  	};

  	function closePopup() { // скрыть модальное окно
  		overlay.style.display = 'none';
  		more.classList.remove('more-splash');
  		document.body.style.overflow = '';
  	};

  	more.addEventListener('click', addPopup);

  	close.addEventListener('click', closePopup);

  	infoContainer.addEventListener('click', (e) => {
  		let target = e.target;
  		
  		if (target.classList.contains('description-btn')){
  			addPopup.call(more); 
  		}
  	});
}

module.exports = modal;