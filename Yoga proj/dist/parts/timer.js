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