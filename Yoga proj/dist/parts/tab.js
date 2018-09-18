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