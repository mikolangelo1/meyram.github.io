document.addEventListener('DOMContentLoaded', function () {
    // Фильтрация курсов
    initializeFilters();
    // Инициализация диаграмм
    initializeCharts();
    // Анимации
    initializeAnimations();
});

function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const courseCards = document.querySelectorAll('.course-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            courseCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 0);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

function initializeCharts() {
    // Диаграмма популярности курсов
    const coursesCtx = document.getElementById('coursesChart');
    if (coursesCtx) {
        new Chart(coursesCtx, {
            type: 'doughnut',
            data: {
                labels: ['Веб-разработка', 'Data Science', 'UI/UX Дизайн', 'Java', 'Python', 'DevOps'],
                datasets: [{
                    data: [30, 20, 15, 12, 13, 10],
                    backgroundColor: [
                        '#5A54F0',
                        '#6F69FF',
                        '#8884FF',
                        '#A19FFF',
                        '#BABBFF',
                        '#D3D4FF'
                    ],
                    borderColor: 'white',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            font: {
                                family: 'Roboto',
                                size: 12
                            },
                            padding: 15
                        }
                    }
                }
            }
        });
    }

    // Диаграмма трудоустройства
    const employmentCtx = document.getElementById('employmentChart');
    if (employmentCtx) {
        new Chart(employmentCtx, {
            type: 'bar',
            data: {
                labels: ['2023', '2024', '2025'],
                datasets: [{
                    label: 'Процент трудоустройства',
                    data: [85, 92, 95],
                    backgroundColor: '#5A54F0',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: value => value + '%'
                        }
                    }
                }
            }
        });
    }
}
function initializeAnimations() {
    const elements = document.querySelectorAll('.course-card, .info-card');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    elements.forEach(el => {
        el.classList.add('animate-prepare');
        observer.observe(el);
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
    `;
    document.head.appendChild(style);
}