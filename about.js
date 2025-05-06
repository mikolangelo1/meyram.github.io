document.addEventListener('DOMContentLoaded', function () {
    // Анимация статистики
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-card__number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-value'));
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    stat.textContent = target.toLocaleString();
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, 20);
        });
    };

    // Intersection Observer для статистики
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Карусель команды
    const carousel = document.querySelector('.team-carousel');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');

    if (carousel && prevBtn && nextBtn) {
        let currentSlide = 0;
        const slides = carousel.children;
        const slideWidth = slides[0].offsetWidth + 24; // width + gap

        const updateCarousel = () => {
            carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        };

        prevBtn.addEventListener('click', () => {
            currentSlide = Math.max(currentSlide - 1, 0);
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = Math.min(currentSlide + 1, slides.length - 1);
            updateCarousel();
        });
    }

    // Кнопка прокрутки наверх
    const scrollTop = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Форма обратной связи
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            // Здесь будет логика отправки формы
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            contactForm.reset();
        });
    }

    // Анимации при скролле
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.value-card, .team-member').forEach(el => {
        el.classList.add('animate-prepare');
        animateOnScroll.observe(el);
    });

    // Добавляем стили для анимаций
    const style = document.createElement('style');
    style.textContent = `
        .animate-prepare {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .team-carousel {
            transition: transform 0.3s ease-out;
        }
    `;
    document.head.appendChild(style);
});