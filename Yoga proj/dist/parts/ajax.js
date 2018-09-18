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