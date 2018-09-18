function ajax() {

	ES6Promise.polyfill();
	
	let message = new Object(); 

	message.loading = "Загрузка...";
	message.success = "Спасибо! Скоро мы с Вами свяжемся";
	message.failture = "Что-то пошло не так...";

	let form = document.getElementsByClassName('main-form')[0],
		bottomForm = document.getElementById('form');
	

		

		function ajaxRequest(e) {
			e.preventDefault();
			let input = this.getElementsByTagName('input');
			let statusMessage = document.createElement('div');
			let statusIcon = document.createElement('div');
			
			statusIcon.classList.add('status');	
			this.appendChild(statusMessage);
			this.appendChild(statusIcon);

			let formData = new FormData(this);
			
			//AJAX
			function postData(data) {
				return new Promise(function(resolve, rejsect) {
					let request = new XMLHttpRequest();

					request.open("POST", "server.php");

					request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

					request.onreadystatechange = function() {
						if (request.readyState < 4) {
							resolve();
						} else if (request.readyState == 4) {
							if (request.status == 200 && request.status < 300) {
								resolve();
							}
							else {
								reject();
							}
						}
					}
					request.send(data);
				}) 
			}

			function clearInput() {
				for (let i = 0; i < input.length; i++) {
					input[i].value = '';
				}
			}

			postData(formData)
				.then(() => statusMessage.innerHTML = message.loading)	
				.then(() => {
					setTimeout(() => {
						statusIcon.classList.add('status-animated');
					}, 200);
					statusMessage.innerHTML = message.success;
					setTimeout(() => {
						statusMessage.innerHTML = "";
					}, 2000);
				})
				.catch(() => statusMessage.innerHTML = message.failture)
				.then(clearInput)
	}

		form.addEventListener('submit', ajaxRequest);
		bottomForm.addEventListener('submit', ajaxRequest); 
}

module.exports = ajax;