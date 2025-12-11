
document.addEventListener('DOMContentLoaded', function () {
    // Lógica do Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>`;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            themeIcon.innerHTML = sunIcon;
        } else {
            document.documentElement.classList.remove('dark');
            themeIcon.innerHTML = moonIcon;
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // Lógica do Typewriter
    const typewriterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.typed) {
                entry.target.dataset.typed = true;
                const text = entry.target.textContent;
                entry.target.innerHTML = '';

                text.split('').forEach(char => {
                    const span = document.createElement('span');
                    span.className = 'char';
                    span.textContent = char;
                    entry.target.appendChild(span);
                });

                anime({
                    targets: entry.target.querySelectorAll('.char'),
                    opacity: [0, 1],
                    easing: 'linear',
                    duration: 15,
                    delay: anime.stagger(25)
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.typewriter-text').forEach(el => typewriterObserver.observe(el));

    // Lógica para Copiar
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.previousElementSibling.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                const originalText = btn.textContent;
                btn.textContent = 'Copiado!';
                btn.classList.add('bg-green-500');
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('bg-green-500');
                }, 2000);
            });
        });
    });

    // Lógica de Navegação
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Lógica do Modal "Guia de Campo"
    const guideButton = document.getElementById('guide-button');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const closeModalButton = document.getElementById('close-modal-button');

    const openModal = () => {
        modalOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        anime({
            targets: modalOverlay,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
        anime({
            targets: modalContent,
            scale: [0.95, 1],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    };

    const closeModal = () => {
        anime({
            targets: modalOverlay,
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                modalOverlay.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    };

    guideButton.addEventListener('click', openModal);
    closeModalButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Menu hamburger mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navbarLinks = document.getElementById('navbar-links');

    mobileMenuButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('hidden');
    });
});