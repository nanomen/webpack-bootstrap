/*
 * Команды в консоли:
 *	--display-modules - показывает, какие файлы пошли в какую сборку
 *	--display-modules -v - показывает, почему файлы так собрались
 *	--json - выведет статистику о сборке + --profile выведет временную информацию + > ИМЯ_ФАЙЛА.json
 *		получается так --json --profile > log.json
 *		открываем файл на сайте webpack.github.io/analyse/
 */

// ОБъявляем webpack для плагина
var webpack = require('webpack');

// Подключаем lodash как инструментарий
var _ = require('lodash');

// Переменная окружения
var ENV = process.env.NODE_ENV || 'dev';

// Автосборка объекта конфигов
// Принимает корневой путь
// На выходе получаем объект с подключенными конфигами
var setConfigObj = function(_rootPath) {

	var
		// Будущий конфиг
		config = {},

		// Массив конфигов
		configList = [];

	// Заполняем массив:

		// global по-умолчанию
		configList.push('global');

		// и кастомный, в зависимости от окружения
		configList.push(ENV);

	// Генерируем конфиг
	configList.forEach(function(item){

		// Подключаем конфиг
		// и инициализируем
		config[item] = require(`${_rootPath}/config/${item}`)({
			_path: __dirname,
			ENV: ENV
		});

	});

	return config;

};

// ОБъект с настройками
var configMap = setConfigObj(__dirname);

// Получаем настройки
// Собираются как вызовы функциий
var getConfig = function(env) {

	// Если Объект с настройками не собрался
	// выдаем ошибку
	if (!configMap) {
		throw 'configMap is not created';
	}

	// Соединяем конфиги, используя lodash метод
	// и функцию, объединяющую массивы
	return _.mergeWith(configMap[env], configMap['global'], function(objValue, srcValue) {

		if (_.isArray(objValue)) {
			return objValue.concat(srcValue);
		}

	});

};

// Получаем готовый конфиг
var config = getConfig(ENV);

// Экспортируем Конфиг в webpack
module.exports = config;