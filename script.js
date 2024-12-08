// Объект для хранения расписаний
const schedules = {
    group1: '',
    group2: '',
    group3: '',
    group4: '', 
    group5: '',
    group6: '',
    group7: '',
    group8: '',
    group9: '',
    group10: '',
    group11: '',
    group12: '',
    group13: '',
    group14: '',
    group15: '',
    group16: '',
    group17: '',
    group18: '',
    group19: '',
    group20: '',
    group21: '',
};

// Пароль администратора
const adminPassword = 'admin123'; // Замените на свой пароль

function togglePasswordInput() {
    const userType = document.getElementById('userType').value;
    const passwordInput = document.getElementById('adminPassword');
    passwordInput.style.display = userType === 'admin' ? 'block' : 'none';
}

function authorize() {
    const userType = document.getElementById('userType').value;
    const password = document.getElementById('adminPassword').value;

    if (userType === 'admin') {
        if (password === adminPassword) {
            document.getElementById('authSection').style.display = 'none';
            document.getElementById('adminSection').style.display = 'block';
            document.getElementById('studentSection').style.display = 'none';
        } else {
            alert('Неверный пароль!');
        }
    } else {
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('adminSection').style.display = 'none';
        document.getElementById('studentSection').style.display = 'block';
    }
}

function showSchedule() {
    const group = document.getElementById('groupSelect').value;
    const scheduleContainer = document.getElementById('scheduleContainer');
    
    // Очистка предыдущего расписания
    scheduleContainer.innerHTML = '';

    // Создание элемента изображения для расписания
    const img = document.createElement('img');
    const dataUrl = localStorage.getItem(`schedule_${group}`) || schedules[group];
    console.log(`Data URL for ${group}: ${dataUrl}`); // Debug log
    img.src = dataUrl; // Получение URL изображения из объекта или localStorage
    img.alt = 'Расписание для ' + group;
    img.style.maxWidth = '100%'; // Ограничение ширины изображения

    // Проверка, есть ли расписание для выбранной группы
    if (dataUrl) {
        // Добавление изображения в контейнер
        scheduleContainer.appendChild(img);
    } else {
        scheduleContainer.innerHTML = 'Расписание не найдено для этой группы.';
    }
}

function updateSchedule() {
    const groupName = document.getElementById('groupSelectAdmin').value; // Получаем выбранную группу
    const scheduleImageInput = document.getElementById('scheduleImageInput');

    // Проверка, существует ли группа
    if (schedules[groupName] !== undefined) {
        const file = scheduleImageInput.files[0]; // Получение выбранного файла

        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const dataUrl = event.target.result; // Обновление расписания с помощью данных файла
                localStorage.setItem(`schedule_${groupName}`, dataUrl);
                console.log(`Data URL for ${groupName}: ${dataUrl}`); // Debug log
                alert('Расписание обновлено!');
            };
            reader.readAsDataURL(file); // Чтение файла как URL
        } else {
            alert('Пожалуйста, выберите файл изображения.');
        }
    } else {
        alert('Группа не найдена!');
    }

    // Очистка полей ввода
    document.getElementById('scheduleImageInput').value = ''; // Сброс выбора файла
}
