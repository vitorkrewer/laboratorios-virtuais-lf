document.addEventListener('DOMContentLoaded', function () {
    // Theme Management
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // Check local storage or system preference
    if (localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        updateThemeIcon(true);
    } else {
        htmlElement.classList.remove('dark');
        updateThemeIcon(false);
    }

    function updateThemeIcon(isDark) {
        if (themeIcon) {
            if (isDark) {
                // Sun Icon
                themeIcon.innerHTML = `<svg class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`;
            } else {
                // Moon Icon
                themeIcon.innerHTML = `<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
            }
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            const isDark = htmlElement.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcon(isDark);
        });
    }

    // Typewriter Effect (Improved with Anime.js)
    const typewriterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.typed) {
                entry.target.dataset.typed = true;
                const text = entry.target.textContent.trim();
                entry.target.innerHTML = ''; // Clear text

                // Create spans for each character
                text.split('').forEach(char => {
                    const span = document.createElement('span');
                    span.className = 'char';
                    span.textContent = char;
                    entry.target.appendChild(span);
                });

                // Animate
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
    }, { threshold: 0.1 });

    document.querySelectorAll('.typewriter-text').forEach(el => typewriterObserver.observe(el));


    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const navbarLinks = document.getElementById('navbar-links');

    if (mobileMenuBtn && navbarLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navbarLinks.classList.toggle('hidden');
            navbarLinks.classList.toggle('flex');
        });
    }

    // Copy to Clipboard Functionality
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const codeBlock = btn.previousElementSibling;
            const code = codeBlock.innerText; // Uses innerText to get newlines correctly
            navigator.clipboard.writeText(code).then(() => {
                const originalText = btn.innerText;
                btn.innerText = 'Copiado!';
                setTimeout(() => {
                    btn.innerText = originalText;
                }, 2000);
            });
        });
    });

    // Animations on Scroll (Simple Fade In)
    const fadeObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    document.querySelectorAll('.content-card, .mission-card, .glass').forEach(el => {
        // Only apply if it doesn't already have the class (avoid flickering)
        if (!el.classList.contains('fade-in-up')) {
            el.style.opacity = '0'; // Initial state
            fadeObserver.observe(el);
        }
    });
});