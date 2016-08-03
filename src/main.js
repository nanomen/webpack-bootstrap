// Полифилл для Babel
import 'babel-polyfill';

// Модули react
import React from 'react';
import { render } from 'react-dom';

// Модуль приложения
import App from './components/App/App';

// Инициализация приложения
(() => {
	
    // Создаем контейнер для приложения
    let app = document.createElement('div');

    // Вставляем в DOM
    document.body.appendChild(app);

    // Рендерим компонент
    render(
        <App />, // компонент
        app // куда рендерим
    );

})();
