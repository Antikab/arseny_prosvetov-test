const arr = [10, 12, 15, 21];


for (var i = 0; i < arr.length; i++) {
	setTimeout(function () {
		console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`);
	}, 3000);
}	/*Данный код выведет:
		Bad: undefined
		Bad: undefined
		Good: undefined
		Good: undefined
	Причина в том, что переменная i в данном случае имеет область видимости на уровне функции, 
	поэтому в каждой итерации цикла она будет иметь последнее значение, равное длине массива arr
	*/

// Первый вариант модификации кода:
arr.forEach(item => {
	setTimeout(() => {
		console.log(item > 13 ? `Good: ${item}` : `Bad: ${item}`);
	}, 3000);
}); /* В этом варианте мы заменили цикл for на метод forEach, который позволяет проходить по 
элементам массива. */

// Второй вариант модификации кода:
for (let i = 0; i < arr.length; i++) {
	setTimeout(function () {
		console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`);
	}, 3000 * (i + 1));
} /* Поскольку let имеет блочную область видимости, каждый обработчик setTimeout 
получает свое собственное значение i, что приводит к выводу чисел.  
(i + 1) - каждое значение из массива arr выводится через определенный интервал 
времени (через 3-6-9..сек) в консоль с соответствующим префиксом "Good" или "Bad" 
в порядке своей очереди. Можно вообще модернизировать первый вариант:

arr.forEach((item, i) => {
	setTimeout(() => {
		console.log(item > 13 ? `Good: ${item}` : `Bad: ${item}`);
	}, 3000 * (i + 1));
});

*/

