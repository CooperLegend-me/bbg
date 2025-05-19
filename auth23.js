document.addEventListener('DOMContentLoaded', function() {
    // Основные элементы
    const authButton = document.getElementById('authBtn10');
    
    // Проверяем обязательные элементы
    if (!authButton) {
        console.error('Кнопка авторизации не найдена');
        return;
    }

    // Проверяем авторизацию пользователя
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Обновляем текст кнопки если пользователь авторизован
    if (user) {
        authButton.textContent = 'Личный кабинет';
    }

    // Обработчик клика по кнопке
    authButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (user) {
            // Если пользователь авторизован - показываем информацию
            showUserInfo(user);
        } else {
            // Если не авторизован - показываем упрощенную форму входа
            showSimpleAuthForm();
        }
    });

    // Показ информации о пользователе
    function showUserInfo(user) {
        const info = `Вы вошли как: ${user.email}\n` +
                     `Имя: ${user.firstName || 'Не указано'}\n` +
                     `Телефон: ${user.phone || 'Не указан'}`;
        alert(info);
    }

    // Упрощенная форма авторизации/регистрации
    function showSimpleAuthForm() {
        const action = confirm('У вас нет аккаунта. Хотите зарегистрироваться?') ? 
                      'register' : 'login';
        
        if (action === 'login') {
            const email = prompt('Введите ваш email:');
            if (!email) return;
            
            const password = prompt('Введите ваш пароль:');
            if (!password) return;
            
            // Проверка пользователя (упрощенная)
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const foundUser = users.find(u => u.email === email && u.password === password);
            
            if (foundUser) {
                localStorage.setItem('user', JSON.stringify(foundUser));
                authButton.textContent = 'Личный кабинет';
                alert('Вы успешно вошли!');
            } else {
                alert('Неверные данные для входа');
            }
        } else {
            // Упрощенная регистрация
            const email = prompt('Введите email для регистрации:');
            if (!email) return;
            
            const password = prompt('Введите пароль:');
            if (!password || password.length < 6) {
                alert('Пароль должен содержать минимум 6 символов');
                return;
            }
            
            const newUser = {
                firstName: prompt('Введите ваше имя:') || 'Пользователь',
                lastName: prompt('Введите вашу фамилию:') || '',
                phone: prompt('Введите ваш телефон:') || '',
                email: email,
                password: password,
                projects: []
            };
            
            // Сохраняем пользователя
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('user', JSON.stringify(newUser));
            
            authButton.textContent = 'Личный кабинет';
            alert('Регистрация прошла успешно!');
        }
    }
});