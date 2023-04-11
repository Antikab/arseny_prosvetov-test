function showData() {
	let posts = [];
	let sortedBy = null;
	let sortOrder = null;

	fetch('https://jsonplaceholder.typicode.com/posts')
		.then(response => response.json())
		.then(data => {
			posts = data;
			renderTable();
			console.log("Data loaded")
		})
		.catch(error => {
			const errorMessage = document.createElement('p');
			errorMessage.innerText = `Произошла ошибка: ${error.message}`;
			document.getElementById('table-container').appendChild(errorMessage);
			console.error(error);
		});

	function filterTable(searchText) {
		const rows = document.querySelectorAll('tbody tr');
		rows.forEach(row => {
			const content = row.textContent.toLowerCase();
			if (searchText.length < 3 || content.includes(searchText)) {
				row.style.display = '';
			} else {
				row.style.display = 'none';
			}
		});
	}


	function renderTable() {
		const table = document.createElement('table');
		const thead = document.createElement('thead');
		const tbody = document.createElement('tbody');


		// Создаем строку поиска
		const searchRow = document.createElement('div');
		const searchInput = document.createElement('input');
		searchInput.type = 'text';
		searchInput.placeholder = 'Поиск';

		searchInput.addEventListener('input', () => {
			filterTable(searchInput.value.toLowerCase());
		});

		searchRow.appendChild(searchInput);
		document.getElementById('table-container').appendChild(searchRow);

		// Создаем заголовок таблицы
		const headerRow = document.createElement('tr');
		const header1 = document.createElement('th');
		header1.innerText = 'ID';
		header1.addEventListener('click', () => {
			sortTable('id');
		});
		headerRow.appendChild(header1);
		const header2 = document.createElement('th');
		header2.innerText = 'Title';
		header2.addEventListener('click', () => {
			sortTable('title');
		});
		headerRow.appendChild(header2);
		const header3 = document.createElement('th');
		header3.innerText = 'Body';
		header3.addEventListener('click', () => {
			sortTable('body');
		});
		headerRow.appendChild(header3);
		thead.appendChild(headerRow);

		// Создаем строки таблицы для каждой записи
		function createRow(item) {
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
		}
		posts.forEach(createRow);

		// Добавляем таблицу на страницу
		table.appendChild(thead);
		table.appendChild(tbody);
		document.getElementById('table-container').appendChild(table);
	}

	function sortTable(column) {
		if (sortedBy === column) {
			sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
		} else {
			sortedBy = column;
			sortOrder = 'asc';
		}

		const sortedPosts = posts.slice().sort((a, b) => {
			const aValue = a[column];
			const bValue = b[column];
			if (aValue < bValue) {
				return sortOrder === 'asc' ? -1 : 1;
			} else if (aValue > bValue) {
				return sortOrder === 'asc' ? 1 : -1;
			} else {
				return 0;
			}
		});

		const rows = document.querySelectorAll('tbody tr');
		rows.forEach((row, index) => {
			row.innerHTML = '';
			const cell1 = document.createElement('td');
			cell1.innerText = sortedPosts[index].id;
			row.appendChild(cell1);
			const cell2 = document.createElement('td');
			cell2.innerText = sortedPosts[index].title;
			row.appendChild(cell2);
			const cell3 = document.createElement('td');
			cell3.innerText = sortedPosts[index].body;
			row.appendChild(cell3);
		});
	}
}

// Добавляем обработчик события для кнопки
document.getElementById('load-data').addEventListener('click', showData);