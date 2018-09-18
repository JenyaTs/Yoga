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