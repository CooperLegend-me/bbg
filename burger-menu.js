// burger-menu.js

document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burgerMenu');
    const navList = document.getElementById('navList');
    const body = document.body;

    // Открытие/закрытие меню
    burgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Закрытие меню при клике на ссылку (только на мобильных)
    document.querySelectorAll('.nav-list-12 a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) { // Проверяем мобильный режим
                burgerMenu.classList.remove('active');
                navList.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    });

    // Закрытие меню при ресайзе (если вдруг пользователь повернул экран)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            burgerMenu.classList.remove('active');
            navList.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
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