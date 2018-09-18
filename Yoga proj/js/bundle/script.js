window.addEventListener('DOMContentLoaded', () => {

	let tab    = require('../parts/tab.js');
	let timer  = require('../parts/timer.js');
	let scroll = require('../parts/scroll.js');
	let modal  = require('../parts/modal.js');
	let ajax   = require('../parts/ajax.js');
	let slider = require('../parts/slider.js');
	let calc   = require('../parts/calc.js');

	tab();
	modal();
	scroll();
	ajax();
	slider();
	calc();
	timer();
	
});