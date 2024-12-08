const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
const upload = multer({ dest: '' });

let schedules = {};

// Эндпоинт для загрузки расписания
app.post('/upload', upload.single('schedule'), (req, res) => {
    const groupName = req.body.groupName;
    if (groupName) {
        schedules[groupName] = req.file.path; // Сохраняем путь к файлу
        res.send('Расписание обновлено!');
    } else {
        res.status(400).send('Группа не указана!');
    }
});

// Эндпоинт для получения расписания
app.get('/schedule/:groupName', (req, res) => {
    const groupName = req.params.groupName;
    if (schedules[groupName]) {
        res.sendFile(__dirname + '/' + schedules[groupName]);
    } else {
        res.status(404).send('Расписание не найдено!');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
