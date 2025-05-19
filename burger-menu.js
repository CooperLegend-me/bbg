document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burgerMenu');
    const navList = document.getElementById('navList');
    const body = document.body;
    const authBtn = document.getElementById('authBtn10');

    // Проверяем, что элементы существуют
    if (!burgerMenu || !navList) {
        console.error("Не найдены необходимые элементы DOM");
        return;
    }

    // Функция для закрытия меню
    const closeMenu = () => {
        burgerMenu.classList.remove('active');
        navList.classList.remove('active');
        body.classList.remove('menu-open');
    };

    // Открытие/закрытие меню
    burgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Закрытие меню при клике на ссылки (мобильные)
    document.querySelectorAll('.nav-list-12 a, .auth-btn10').forEach(element => {
        element.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // Закрытие меню при ресайзе
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // Модальное окно для изображений
    document.querySelectorAll('.project-slider .project img').forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <span class="close">&times;</span>
                <img class="modal-content" src="${this.src}" alt="${this.alt}">
            `;
            document.body.appendChild(modal);
            
            modal.style.display = "block";
            
            modal.querySelector('.close').onclick = function() {
                modal.style.display = "none";
                modal.remove();
            }
            
            modal.onclick = function(e) {
                if (e.target === modal) {
                    modal.style.display = "none";
                    modal.remove();
                }
            }
        });
    });
});