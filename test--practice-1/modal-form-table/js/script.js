const form = document.querySelector('.form');
const modal = document.querySelector('.modal');
const modalOpenButton = document.querySelector('.button_modal-open');
const modalCloseButton = document.querySelector('.button_cancel');
const submitButton = document.querySelector('.button_submit');
const requiredInputs = form.querySelectorAll('input[required]');

function isFormValid() {
	for (const input of requiredInputs) {
		if (!input.value) {
			return false;
		}
	}
	return true;
}

function toggleSubmitButton() {
	submitButton.disabled = !isFormValid();
}

// Открытие и закрытие модального окна по клику
document.addEventListener('click', function (event) {
	if (event.target.classList.contains('button_modal-open')) {
		modal.classList.add('modal_opened');
	}

	if (event.target.classList.contains('button_cancel')) {
		event.preventDefault();
		modal.classList.remove('modal_opened');
	}
});


// Включение/выключение кнопки отправки при вводе в обязательные поля
form.addEventListener('input', toggleSubmitButton);

// Проверяем, включена ли кнопка отправки и если она выключена, мы добавляем класс
function toggleSubmitButton() {
	submitButton.disabled = !isFormValid();
	if (submitButton.disabled) {
		submitButton.classList.add('button_disabled');
	} else {
		submitButton.classList.remove('button_disabled');
	}
}

// Отправка формы
function formSubmit(event) {
	event.preventDefault();
	if (isFormValid()) {
		alert('Форма отправлена');
		form.reset();
	}
}

form.addEventListener('submit', formSubmit);