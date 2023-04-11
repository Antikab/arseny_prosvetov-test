function showData() {
	fetch('https://jsonplaceholder.typicode.com/posts')
		.then(response => response.json())
		.then(data => {
			const table = document.createElement('table');
			const thead = document.createElement('thead');
			const tbody = document.createElement('tbody');

			// Создаем заголовок таблицы
			const headerRow = document.createElement('tr');
			const header1 = document.createElement('th');
			header1.innerText = 'ID';
			headerRow.appendChild(header1);
			const header2 = document.createElement('th');
			header2.innerText = 'Title';
			headerRow.appendChild(header2);
			const header3 = document.createElement('th');
			header3.innerText = 'Body';
			headerRow.appendChild(header3);
			thead.appendChild(headerRow);

			// Создаем строки таблицы для каждой записи
			data.forEach(item => {
				const row = document.createElement('tr');
				const cell1 = document.createElement('td');
				cell1.innerText = item.id;
				row.appendChild(cell1);
				const cell2 = document.createElement('td');
				cell2.innerText = item.title;
				row.appendChild(cell2);
				const cell3 = document.createElement('td');
				cell3.innerText = item.body;
				row.appendChild(cell3);
				tbody.appendChild(row);
			});

			// Добавляем таблицу на страницу
			table.appendChild(thead);
			table.appendChild(tbody);
			document.getElementById('table-container').appendChild(table);
		})
		.catch(error => {
			const errorMessage = document.createElement('p');
			errorMessage.innerText = `Произошла ошибка: ${error.message}`;
			document.getElementById('table-container').appendChild(errorMessage);
			console.error(error);
		});
}

// Добавляем обработчик события для кнопки
document.getElementById('load-data').addEventListener('click', showData);
