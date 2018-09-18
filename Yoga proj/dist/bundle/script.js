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