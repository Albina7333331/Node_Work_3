const express = require('express');
const fs = require('fs');
const path = require('path');

// Инициализация приложения Express
const app = express();
const PORT = 3000;

// Путь к файлу, где будут сохраняться счетчики просмотров
const viewsFilePath = path.join(__dirname, 'viewsCount.json');

// Функция для чтения текущего значения счетчика из файла
function loadViews() {
    try {
        const data = fs.readFileSync(viewsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Если файл не существует или возникла ошибка чтения, возвращаем пустой объект
        return { '/': 0, '/about': 0 };
    }
}

// Функция для сохранения значения счетчика в файл
function saveViews(views) {
    fs.writeFileSync(viewsFilePath, JSON.stringify(views, null, 2), 'utf8');
}

// Загрузка данных о просмотрах при старте сервера
let views = loadViews();

// Обработчик для главной страницы "/"
app.get('/', (req, res) => {
    views['/'] += 1; // Увеличиваем счетчик для главной страницы
    saveViews(views); // Сохраняем обновленное значение счетчика
    res.send(`<h1>Главная страница</h1><a href="/about">О нас</a><p>Просмотров: ${views['/']}</p>`);
});

// Обработчик для страницы "/about"
app.get('/about', (req, res) => {
    views['/about'] += 1; // Увеличиваем счетчик для страницы "О нас"
    saveViews(views); // Сохраняем обновленное значение счетчика
    res.send(`<h1>О нас</h1><a href="/">Главная</a><p>Просмотров: ${views['/about']}</p>`);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

