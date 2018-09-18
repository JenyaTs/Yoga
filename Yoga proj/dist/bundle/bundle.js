(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

window.addEventListener('DOMContentLoaded', function () {

	var tab = require('../parts/tab.js');
	var timer = require('../parts/timer.js');
	var scroll = require('../parts/scroll.js');
	var modal = require('../parts/modal.js');
	var ajax = require('../parts/ajax.js');
	var slider = require('../parts/slider.js');
	var calc = require('../parts/calc.js');

	tab();
	modal();
	scroll();
	ajax();
	slider();
	calc();
	timer();
});
},{"../parts/ajax.js":2,"../parts/calc.js":3,"../parts/modal.js":4,"../parts/scroll.js":5,"../parts/slider.js":6,"../parts/tab.js":7,"../parts/timer.js":8}],2:[function(require,module,exports){
"use strict";

function ajax() {

	ES6Promise.polyfill();

	var message = new Object();

	message.loading = "Загрузка...";
	message.success = "Спасибо! Скоро мы с Вами свяжемся";
	message.failture = "Что-то пошло не так...";

	var form = document.getElementsByClassName('main-form')[0],
	    bottomForm = document.getElementById('form');

	function ajaxRequest(e) {
		e.preventDefault();
		var input = this.getElementsByTagName('input');
		var statusMessage = document.createElement('div');
		var statusIcon = document.createElement('div');

		statusIcon.classList.add('status');
		this.appendChild(statusMessage);
		this.appendChild(statusIcon);

		var formData = new FormData(this);

		//AJAX
		function postData(data) {
			return new Promise(function (resolve, rejsect) {
				var request = new XMLHttpRequest();

				request.open("POST", "server.php");

				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

				request.onreadystatechange = function () {
					if (request.readyState < 4) {
						resolve();
					} else if (request.readyState == 4) {
						if (request.status == 200 && request.status < 300) {
							resolve();
						} else {
							reject();
						}
					}
				};
				request.send(data);
			});
		}

		function clearInput() {
			for (var i = 0; i < input.length; i++) {
				input[i].value = '';
			}
		}

		postData(formData).then(function () {
			return statusMessage.innerHTML = message.loading;
		}).then(function () {
			setTimeout(function () {
				statusIcon.classList.add('status-animated');
			}, 200);
			statusMessage.innerHTML = message.success;
			setTimeout(function () {
				statusMessage.innerHTML = "";
			}, 2000);
		}).catch(function () {
			return statusMessage.innerHTML = message.failture;
		}).then(clearInput);
	}

	form.addEventListener('submit', ajaxRequest);
	bottomForm.addEventListener('submit', ajaxRequest);
}

module.exports = ajax;
},{}],3:[function(require,module,exports){
'use strict';

function calc() {
	var persons = document.getElementsByClassName('counter-block-input')[0],
	    restDays = document.getElementsByClassName('counter-block-input')[1],
	    place = document.getElementById('select'),
	    totalValue = document.getElementById('total'),
	    personsSum = 0,
	    daysSum = 0,
	    timerId = void 0;

	totalValue.innerHTML = 0;

	function checkNumbers(e) {
		//проверка на числа
		var charCode = e.which ? e.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			e.preventDefault();
		};
	};

	function calc() {
		//калькулятор
		if (persons.value == '' || restDays.value == '' || persons.value == 0 || restDays.value == 0) {
			totalValue.innerHTML = '0';
		} else {
			clearInterval(timerId);
			var total = +totalValue.innerHTML; //прошлое вычисленное значение
			var sum = (personsSum + daysSum) * 4000; //новое значение

			sum = sum * place.options[place.selectedIndex].value;

			timerId = setTimeout(function z() {

				if (total < sum) {
					//если прошлое значение меньше нового, увеличивать его до нового по 100 единиц за раз

					total += 100;
					totalValue.innerHTML = total;
				} else if (total > sum) {
					//если прошлое значение больше нового, уменьшать его до нового по 100 единиц за раз

					total -= 100;
					totalValue.innerHTML = total;
				} else if (total == sum) {
					//если значения равны - закончить интервал/ничего не делать
					clearTimeout(timerId);
				}
				timerId = setTimeout(z, 5);
			}, 5);
		}
	}

	persons.addEventListener('keypress', checkNumbers);

	restDays.addEventListener('keypress', checkNumbers);

	persons.addEventListener('change', function () {

		personsSum = +this.value;
		calc();
	});

	restDays.addEventListener('change', function () {

		daysSum = +this.value;
		calc();
	});

	place.addEventListener('change', function () {

		clearInterval(timerId);
		calc();
	});
}

module.exports = calc;
},{}],4:[function(require,module,exports){
'use strict';

function modal() {
  var more = document.querySelector('.more'),
      overlay = document.querySelector('.overlay'),
      infoContainer = document.querySelector('.info'),
      close = document.querySelector('.popup-close');

  function addPopup() {
    // показать модальное окно

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || document.documentElement.clientWidth < 576) {
      return;
    }

    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
      this.classList.add('more-splash');
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    } else {
      this.classList.add('more-splash');

      var time = {
        start: performance.now(),
        total: 500
      };

      var tick = function tick(now) {
        time.elapsed = now - time.start;
        var progress = time.elapsed / time.total;
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    }
  };

  function closePopup() {
    // скрыть модальное окно
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
  };

  more.addEventListener('click', addPopup);

  close.addEventListener('click', closePopup);

  infoContainer.addEventListener('click', function (e) {
    var target = e.target;

    if (target.classList.contains('description-btn')) {
      addPopup.call(more);
    }
  });
}

module.exports = modal;
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
'use strict';

function slider() {
	var slideIndex = 1,
	    slides = document.getElementsByClassName('slider-item'),
	    prev = document.querySelector('.prev'),
	    next = document.querySelector('.next'),
	    dotsWrap = document.querySelector('.slider-dots'),
	    dots = document.getElementsByClassName('dot');

	showSlides(slideIndex);

	function showSlides(n) {

		if (n > slides.length) {
			slideIndex = 1;
		};
		if (n < 1) {
			slideIndex = slides.length;
		};

		for (var i = 0; i < slides.length; i++) {
			slides[i].style.display = 'none';
		}

		for (var _i = 0; _i < dots.length; _i++) {
			dots[_i].classList.remove('dot-active');
		}

		slides[slideIndex - 1].style.display = 'block';
		dots[slideIndex - 1].classList.add('dot-active');
	}

	function plusSliders(n) {
		showSlides(slideIndex += n);
	}

	function currentSlide(n) {
		showSlides(slideIndex = n);
	}

	prev.addEventListener('click', function () {
		plusSliders(-1);
	});

	next.addEventListener('click', function () {
		plusSliders(1);
	});

	dotsWrap.addEventListener('click', function (e) {
		for (var i = 0; i < dots.length + 1; i++) {
			if (e.target.classList.contains('dot') && e.target == dots[i - 1]) {
				currentSlide(i);
			}
		}
	});
}

module.exports = slider;
},{}],7:[function(require,module,exports){
'use strict';

function tab() {
	var tab = document.getElementsByClassName('info-header-tab'),
	    tabContent = document.getElementsByClassName('info-tabcontent'),
	    tabButtons = document.querySelectorAll('.description-btn'),
	    infoContainer = document.querySelector('.info'),
	    info = document.getElementsByClassName('info-header')[0];

	function hideTabContent(a) {

		for (var i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}
	hideTabContent(1);

	function showTabContent(b) {

		if (tabContent[b].classList.contains('hide')) {
			hideTabContent(0);
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('shwo');
		}
	}

	info.addEventListener('click', function (e) {

		var target = e.target;

		if (target.className == 'info-header-tab') {
			for (var i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					showTabContent(i);
					break;
				}
			}
		}
	});
}

module.exports = tab;
},{}],8:[function(require,module,exports){
'use strict';

function timer() {
	var deadline = '2018-09-05';

	function getTimeRemaining(endtime) {

		var t = Date.parse(endtime) - Date.parse(new Date());

		var seconds = Math.floor(t / 1000 % 60);
		if (seconds < 10) seconds = '0' + seconds;

		var minutes = Math.floor(t / 1000 / 60 % 60);
		if (minutes < 10) minutes = '0' + minutes;

		var hours = Math.floor(t / (1000 * 60 * 60));
		if (hours < 10) hours = '0' + hours;

		return {
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	};

	function setClock(id, endtime) {

		var timer = document.getElementById(id),
		    hours = timer.querySelector('.hours'),
		    minutes = timer.querySelector('.minutes'),
		    seconds = timer.querySelector('.seconds');

		var timerId = setTimeout(function updateClock() {

			var t = getTimeRemaining(endtime);
			hours.innerHTML = t.hours;
			minutes.innerHTML = t.minutes;
			seconds.innerHTML = t.seconds;
			timerId = setTimeout(updateClock, 1000);

			if (t.total <= 0) {
				hours.innerHTML = '00';
				minutes.innerHTML = '00';
				seconds.innerHTML = '00';
				clearInterval(timerId);
			}
		}, 5);
	}

	setClock('timer', deadline);
}

module.exports = timer;
},{}]},{},[1]);
