//Обявление вспомогательных функций через методы объекта rundom
const rundom = {
	number(min, max) { //Возвращет случайное число в заданном диапазоне min-max
		return Math.floor( Math.random() * (max - min + 1)) + min;
	},
	boolean() { //Возвращает случайным убразом true или false
		const a = Math.floor( Math.random() * 2)
			
		if (a == 1) {
			return true;
		} else { return false; }
	}
};


//Обявление переменных
const floorPlan = new Array(99) /*Массив содержащий комнаты как элементы, 
индекс элеммента это координата комнаты, 
функция Array() заполняет весь масив 99тью undefined - что бы потом можно было удобней изменить*/
/*const maxRooms = 50;*/
const minRooms = rundom.number(30, 50);
let numberOfRooms = 0; //Счётчик количества комнат на плане
const roomSample = { //Образец Объекта комнаты
	coords: null,
	type: null, //Нужно что бы знать, подвергалась ли комната изменениям, и какой тип этой комнаты
	passageInformation: {
		up: null,
		right: null,
		down: null,
		left: null
	}
};
let corn = rundom.number(0, 99) //Кордината startRoom - зерно
const startRoom = {//Объект стартовой(зерновой) комнаты
	coords: corn,
	type: 'changed',
	passageInformation: {
		up: rundom.boolean(),
		right: rundom.boolean(),
		down: rundom.boolean(),
		left: rundom.boolean()
	}
};
while (startRoom.passageInformation.up == false &&
	startRoom.passageInformation.right == false &&
	startRoom.passageInformation.down == false &&
	startRoom.passageInformation.left == false) { //Проверка стартовой комнаты на наличие выходов

	startRoom.passageInformation.up = rundom.boolean();
	startRoom.passageInformation.right = rundom.boolean();
	startRoom.passageInformation.down = rundom.boolean();
	startRoom.passageInformation.left = rundom.boolean();
};


//Основные функции
const autoFillFloarPlan = () => { //Заполняет floorPlan пустыми Объектами комнат и присваетвает им координаты(порядковый номер в масиве)
	for (cordRoom = 0; cordRoom <= 99; cordRoom++) { //Клонирует roomSample в floorPlan
		if (cordRoom == corn) {
			floorPlan[cordRoom] = startRoom //Вставлю ссылку на оригинальный Объект (поэтому и присваивать координаты не нужно)
		} 
		else { 
			floorPlan[cordRoom] = JSON.parse( JSON.stringify(roomSample) )  //Двойная конвертация что бы избежать мутаци
			floorPlan[cordRoom].coords = cordRoom //Присваивание координат пустым комнатам(дальше - болванкам)
		}
	}
};
const visitRoom = () => {
	for (cordRoom = 0; cordRoom <= 99; cordRoom++) {

		let room = floorPlan[cordRoom];
		let typeRoom = floorPlan[cordRoom].type;
		let up = floorPlan[cordRoom].passageInformation.up;
		let right = floorPlan[cordRoom].passageInformation.right;
		let down = floorPlan[cordRoom].passageInformation.down;
		let left = floorPlan[cordRoom].passageInformation.left;
		let upRoom = floorPlan[cordRoom + 10];
		let rightRoom = floorPlan[cordRoom + 1];
		let downRoom = floorPlan[cordRoom - 10];
		let leftRoom = floorPlan[cordRoom - 1];


		if (cordRoom < 90) { //Проверяет только те комнаты у которы есть соседи с верху (те которыееньше 90)
			let typeUpRoom = floorPlan[cordRoom + 10].type; //для удобства

			if (typeRoom != null &&
				up == true &&
				typeUpRoom == null) { //если наша комната существует (у неё не null тип) и у нашей комнаты есть проход на верх и верхняя комната не существует (имеет null тип)
				edit.upRoom(upRoom) //тогда изменяем верхнюю комнату 
			}
		};

		if (cordRoom % 10 != 9) {
			let typeRightRoom = floorPlan[cordRoom + 1].type;

			if (typeRoom != null &&
				right == true &&
				typeRightRoom == null) {
				edit.rightRoom(rightRoom)
			}
		};


		if (cordRoom > 10) {
			let typeDownRoom = floorPlan[cordRoom - 10].type;

			if (typeRoom != null &&
				down == true &&
				typeDownRoom == null) {
				edit.downRoom(downRoom)
			}
		};

		if (cordRoom % 10 != 0) {
			let typeLeftRoom = floorPlan[cordRoom - 1].type

			if (typeRoom != null &&
				left == true &&
				typeLeftRoom == null) {
				edit.leftRoom(leftRoom)
			}
		}

	}
};
const genRing = () => {
	for (cordRoom = 12; cordRoom < 89; cordRoom++) {

		if (cordRoom % 10 != 9 && 
			cordRoom % 10 != 0) {

			let room = floorPlan[cordRoom];
			let upRoom = floorPlan[cordRoom + 10];
			let rightRoom = floorPlan[cordRoom + 1];
			let downRoom = floorPlan[cordRoom - 10];
			let leftRoom = floorPlan[cordRoom - 1];
			let typeRoom = floorPlan[cordRoom].type;
			let typeUpRoom = floorPlan[cordRoom + 10].type;
			let typeRightRoom = floorPlan[cordRoom + 1].type;
			let typeDownRoom = floorPlan[cordRoom - 10].type;
			let typeLeftRoom = floorPlan[cordRoom - 1].type;
			let typeUpRightRoom = floorPlan[cordRoom + 11].type; //Тип комнаты верху-справа (по диагонали) от заданной
			let typeRightDownRoom = floorPlan[cordRoom - 9].type; //Тип комнаты справа-снизу (по диагонали) от заданной
			let typeDownLeftRoom = floorPlan[cordRoom - 11].type; //Тип комнаты нижней-слева (по диагонали) от заданной
			let typeLeftUpRoom = floorPlan[cordRoom + 9].type; //Тип комнаты левой-сверху (по диагонали) от заданной

			if (typeRoom == 'changed' &&
				typeUpRoom == 'changed' &&
				typeRightRoom == 'changed' &&
				typeDownRoom == 'changed' &&
				typeLeftRoom == 'changed' &&
				typeUpRightRoom == 'changed' &&
				typeRightDownRoom == 'changed' &&
				typeDownLeftRoom == 'changed' &&
				typeLeftUpRoom == 'changed') {

				floorPlan[cordRoom] = JSON.parse( JSON.stringify(roomSample) ); //Замена центральной комнаты в квадрате заполненом комнатами 3х3
				floorPlan[cordRoom].coords = cordRoom;

				upRoom.passageInformation.down = false;
				rightRoom.passageInformation.left = false;
				downRoom.passageInformation.up = false;
				leftRoom.passageInformation.right = false;

				console.log('>' + cordRoom);
			}
		}
	}
};
const edit = {
	upRoom(upRoom) {
		upRoom.type = 'changed'; //Изменяет состояние комнаты что бы потом было легче отследить какие уже изменены
		upRoom.passageInformation.up = rundom.boolean();
		upRoom.passageInformation.right = rundom.boolean();
		upRoom.passageInformation.down = true; 
		/*Trut - потому что мы редактируем верхнюю комнаты от заданной в visit(),
		 поэтому автоматически в этой комнате должен быть проход с низу*/
		upRoom.passageInformation.left = rundom.boolean();

		numberOfRooms += 1;
		return
	},
	rightRoom(rightRoom) {
		rightRoom.type = 'changed';
		rightRoom.passageInformation.up = rundom.boolean();
		rightRoom.passageInformation.right = rundom.boolean();
		rightRoom.passageInformation.down = rundom.boolean();
		rightRoom.passageInformation.left = true;

		numberOfRooms += 1;
		return
	},
	downRoom(downRoom) {
		downRoom.type = 'changed';
		downRoom.passageInformation.up = true;
		downRoom.passageInformation.right = rundom.boolean();
		downRoom.passageInformation.down = rundom.boolean();
		downRoom.passageInformation.left = rundom.boolean();

		numberOfRooms += 1;
		return
	},
	leftRoom(leftRoom) {
		leftRoom.type = 'changed';
		leftRoom.passageInformation.up = rundom.boolean();
		leftRoom.passageInformation.right = true;
		leftRoom.passageInformation.down = rundom.boolean();
		leftRoom.passageInformation.left = rundom.boolean();

		numberOfRooms += 1;
		return
	}
};


//Пошговое выполнение
autoFillFloarPlan();
const writingValues = []; //"список" количеств комнат для их сравнения
while (numberOfRooms < minRooms) {
	visitRoom();

	writingValues.push(numberOfRooms); //Добавление значения numberOfRooms после последнего visitRoom

	if (writingValues[writingValues.length-2] == numberOfRooms) { //если предидущее значение numberOfRooms равно текущемму, то должна проводиться повторная генерация
		
		corn = rundom.number(0, 99); //Изменяем координаты стартовой комнаты
		startRoom.passageInformation.up = rundom.boolean();//изменяем startRoom
		startRoom.passageInformation.right = rundom.boolean();
		startRoom.passageInformation.down = rundom.boolean();
		startRoom.passageInformation.left = rundom.boolean();

		while (startRoom.passageInformation.up == false &&
			startRoom.passageInformation.right == false &&
			startRoom.passageInformation.down == false &&
			startRoom.passageInformation.left == false) { //Проверка стартовой комнаты на наличие выходов

			startRoom.passageInformation.up = rundom.boolean();
			startRoom.passageInformation.right = rundom.boolean();
			startRoom.passageInformation.down = rundom.boolean();
			startRoom.passageInformation.left = rundom.boolean();
		};
		
		floorPlan.length = 0; //Очищаем старый план полностью, чтобы не морочиться с одной комнатой
		autoFillFloarPlan(); //Генерируем план заново
		numberOfRooms = 0; 
		writingValues.length = 0; //зачищение списка, т.к. создать новый нельзя из-за const
	}
};
genRing();

	
//Визуализация
console.log('Карта: ');
const map = [];
for (cordRoom = 0; cordRoom <= 99; cordRoom++) {
	map[cordRoom] = floorPlan[cordRoom].type;
};
for (cordRoom = 0; cordRoom <= 99; cordRoom++) {
	let type = map[cordRoom]

	if (type == null) {
		map[cordRoom] = 0
		continue
	};
	if (type == 'changed') {
		map[cordRoom] = 1
		continue
	}
};
for (cordRoom = 0; cordRoom <= 99; cordRoom += 10) {
	const a = map.slice(cordRoom, cordRoom + 10);
	let l = '>'
	for (; a.length > 0; ) {
		l = l + ' ' + a.shift();
	}
	console.log(l);
};
console.log('Количество комнат: ' + numberOfRooms);
console.log('Ending', startRoom);