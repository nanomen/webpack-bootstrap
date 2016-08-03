/*
 * Детали сборки для Production версии
 *
 */

// ОБъявляем webpack для плагина
var webpack = require('webpack');

// Экспортируем настройки
module.exports = function(param) {

	return {

		// Объявляем свойство контекста,
		// чтобы сократить длину пути для модуля в entry
		context: `${param._path}/${param.ENV}`,

		output: {
			path: `${param._path}/${param.ENV}/js`,
		},

		// Выключаем режим отладки у лоадеров (loaders)
		debug: false,

		// Source maps
		devtool: 'cheap-source-map',

		// Плагины
		// Подключается на разных стадиях компиляции
		// и что-то делает
		plugins: [

			// Минификация скриптов
			// настраиваем через конфиг
			new webpack.optimize.UglifyJsPlugin({

				compress: {

					// Удаляем вызов console.log в коде
					drop_console: true,

					// Скрываем warning при минификации
					warnings: false

				},

				output: {

					// Удаляем комментарии
					comments: false
				}

			})

		]

	};

};