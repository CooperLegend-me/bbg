document.addEventListener('DOMContentLoaded', function() {
    // Элементы для старой системы (с суффиксом 23)
    const authButton23 = document.getElementById('authButton23');
    const authModal23 = document.getElementById('authModal23');
    const closeBtn23 = document.querySelector('.auth-close-23');
    const tabBtns23 = document.querySelectorAll('.auth-tab-btn-23');
    const authForms23 = document.querySelectorAll('.auth-form-23');
    const loginForm23 = document.getElementById('loginForm23');
    const registerForm23 = document.getElementById('registerForm23');
    const logoutBtn23 = document.getElementById('logoutBtn23');
    const userAccount23 = document.getElementById('userAccount23');
    
    // Элементы для новой системы (с префиксом LC)
    const authButtonLC = document.getElementById('authButtonLC');
    const authModalLC = document.getElementById('authModalLC');
    const userAccountLC = document.getElementById('userAccountLC');
    
    // Проверка авторизации в обеих системах
    const user23 = JSON.parse(localStorage.getItem('user23'));
    const userLC = JSON.parse(localStorage.getItem('userLC'));
    
    // Инициализация старой системы
    if (authButton23 && authModal23) {
        if (user23) {
            showUserAccount23(user23);
            authButton23.textContent = 'Личный кабинет';
        }
        
        authButton23.addEventListener('click', function(e) {
            e.preventDefault();
            if (user23) {
                userAccount23.style.display = 'block';
                document.body.style.overflow = 'hidden';
            } else {
                authModal23.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
        
        if (closeBtn23) {
            closeBtn23.addEventListener('click', function() {
                authModal23.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Остальной код для старой системы...
        window.addEventListener('click', function(e) {
            if (e.target === authModal23) {
                authModal23.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            if (e.target === userAccount23) {
                userAccount23.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        if (tabBtns23.length) {
            tabBtns23.forEach(btn => {
                btn.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');
                    
                    tabBtns23.forEach(b => b.classList.remove('active'));
                    authForms23.forEach(form => form.classList.remove('active'));
                    
                    this.classList.add('active');
                    document.getElementById(tabId).classList.add('active');
                });
            });
        }
        
        if (loginForm23) {
            loginForm23.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('loginEmail23').value;
                const password = document.getElementById('loginPassword23').value;
                
                const users23 = JSON.parse(localStorage.getItem('users23')) || [];
                const foundUser23 = users23.find(u => u.email === email && u.password === password);
                
                if (foundUser23) {
                    localStorage.setItem('user23', JSON.stringify(foundUser23));
                    authModal23.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    showUserAccount23(foundUser23);
                    authButton23.textContent = 'Личный кабинет';
                    alert('Вы успешно вошли!');
                } else {
                    alert('Неверные данные!');
                }
            });
        }
        
        if (registerForm23) {
            registerForm23.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const user = {
                    firstName: document.getElementById('regFirstName23').value,
                    lastName: document.getElementById('regLastName23').value,
                    phone: document.getElementById('regPhone23').value,
                    email: document.getElementById('regEmail23').value,
                    password: document.getElementById('regPassword23').value,
                    projects: []
                };
                
                let users23 = JSON.parse(localStorage.getItem('users23')) || [];
                if (users23.some(u => u.email === user.email)) {
                    alert('Email уже используется!');
                    return;
                }
                
                users23.push(user);
                localStorage.setItem('users23', JSON.stringify(users23));
                localStorage.setItem('user23', JSON.stringify(user));
                
                authModal23.style.display = 'none';
                document.body.style.overflow = 'auto';
                showUserAccount23(user);
                authButton23.textContent = 'Личный кабинет';
                alert('Регистрация успешна!');
            });
        }
        
        if (logoutBtn23) {
            logoutBtn23.addEventListener('click', function() {
                localStorage.removeItem('user23');
                userAccount23.style.display = 'none';
                authButton23.textContent = 'Личный кабинет';
                document.body.style.overflow = 'auto';
                alert('Вы вышли из системы');
            });
        }
        
        function showUserAccount23(user) {
            if (!user) return;
            
            const userName23 = document.getElementById('userName23');
            const userEmail23 = document.getElementById('userEmail23');
            const userPhone23 = document.getElementById('userPhone23');
            const projectsList23 = document.getElementById('projectsList23');
            
            if (userName23) userName23.textContent = `${user.firstName} ${user.lastName}`;
            if (userEmail23) userEmail23.textContent = user.email;
            if (userPhone23) userPhone23.textContent = user.phone;
            
            if (projectsList23) {
                projectsList23.innerHTML = user.projects && user.projects.length > 0 
                    ? user.projects.map(p => `
                        <div class="account-project-item-23">
                            <h4>${p.name}</h4>
                            <p>Статус: ${p.status}</p>
                            <p>Дата: ${p.date}</p>
                        </div>
                    `).join('')
                    : '<p>У вас пока нет проектов</p>';
            }
            
            if (userAccount23) {
                userAccount23.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }
    }
    
    // Инициализация новой системы (LC)
    if (authButtonLC && authModalLC) {
        authButtonLC.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (userLC) {
                // Показать личный кабинет новой системы
                userAccountLC.style.display = 'block';
                document.body.style.overflow = 'hidden';
            } else {
                // Показать модальное окно авторизации новой системы
                authModalLC.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === authModalLC) {
                authModalLC.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            if (e.target === userAccountLC) {
                userAccountLC.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Общая функция закрытия всех модальных окон
    function closeAllModals() {
        if (authModal23) authModal23.style.display = 'none';
        if (userAccount23) userAccount23.style.display = 'none';
        if (authModalLC) authModalLC.style.display = 'none';
        if (userAccountLC) userAccountLC.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Добавляем обработчик Escape для закрытия окон
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
});