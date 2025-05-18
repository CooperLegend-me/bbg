document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const authButton = document.getElementById('authButton');
    const authModal = document.getElementById('authModal');
    const closeBtn = document.querySelector('.close');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const userAccount = document.getElementById('userAccount');
    
    // Проверяем, авторизован ли пользователь
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        showUserAccount(user);
    }
    
    // Открытие модального окна
    authButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (user) {
            // Если пользователь уже авторизован, показываем личный кабинет
            userAccount.style.display = 'block';
            document.body.classList.add('modal-open');
        } else {
            authModal.style.display = 'block';
            document.body.classList.add('modal-open');
        }
    });
    
    // Закрытие модального окна
    closeBtn.addEventListener('click', function() {
        authModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });
    
    // Закрытие при клике вне модального окна
    window.addEventListener('click', function(e) {
        if (e.target === authModal) {
            authModal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });
    
    // Переключение между вкладками
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Убираем активный класс у всех кнопок и форм
            tabBtns.forEach(b => b.classList.remove('active'));
            authForms.forEach(form => form.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке и форме
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Обработка формы входа
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Проверяем существующего пользователя
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = users.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
            // Сохраняем пользователя в localStorage
            localStorage.setItem('user', JSON.stringify(foundUser));
            
            // Закрываем модальное окно
            authModal.style.display = 'none';
            document.body.classList.remove('modal-open');
            
            // Показываем личный кабинет
            showUserAccount(foundUser);
            
            // Обновляем текст кнопки
            authButton.textContent = 'Личный кабинет';
            
            alert('Вы успешно вошли в систему!');
        } else {
            alert('Неверный email или пароль!');
        }
    });
    
    // Обработка формы регистрации
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const user = {
            firstName: document.getElementById('regFirstName').value,
            lastName: document.getElementById('regLastName').value,
            phone: document.getElementById('regPhone').value,
            email: document.getElementById('regEmail').value,
            password: document.getElementById('regPassword').value,
            projects: []
        };
        
        // Проверяем, есть ли уже такой пользователь
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(u => u.email === user.email);
        
        if (userExists) {
            alert('Пользователь с таким email уже зарегистрирован!');
            return;
        }
        
        // Добавляем нового пользователя
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Автоматически авторизуем пользователя
        localStorage.setItem('user', JSON.stringify(user));
        
        // Закрываем модальное окно
        authModal.style.display = 'none';
        document.body.classList.remove('modal-open');
        
        // Показываем личный кабинет
        showUserAccount(user);
        
        // Обновляем текст кнопки
        authButton.textContent = 'Личный кабинет';
        
        alert('Регистрация прошла успешно!');
    });
    
    // Выход из системы
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('user');
        userAccount.style.display = 'none';
        authButton.textContent = 'Личный кабинет';
        alert('Вы вышли из системы');
    });
    
    // Функция показа личного кабинета
    function showUserAccount(user) {
        document.getElementById('userName').textContent = `${user.firstName} ${user.lastName}`;
        document.getElementById('userEmail').textContent = user.email;
        document.getElementById('userPhone').textContent = user.phone;
        
        // Показываем проекты пользователя
        const projectsList = document.getElementById('projectsList');
        projectsList.innerHTML = '';
        
        if (user.projects && user.projects.length > 0) {
            user.projects.forEach(project => {
                const projectEl = document.createElement('div');
                projectEl.className = 'project-item';
                projectEl.innerHTML = `
                    <h4>${project.name}</h4>
                    <p>Статус: ${project.status}</p>
                    <p>Дата создания: ${project.date}</p>
                `;
                projectsList.appendChild(projectEl);
            });
        } else {
            projectsList.innerHTML = '<p>У вас пока нет проектов</p>';
        }
        
        userAccount.style.display = 'block';
    }
    
    // Блокировка прокрутки при открытом модальном окне
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
});