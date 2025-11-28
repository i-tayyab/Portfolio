// FILTER SYSTEM
const filterBtns = document.querySelectorAll('.pf-btn');
const cards = document.querySelectorAll('.proj-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.pf-btn.active').classList.remove('active');
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        cards.forEach(card => {
            if (filter === "all" || card.dataset.category === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// THEME TOGGLE
const body = document.body;
const themeBtn = document.getElementById('themeBtn');

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light');
    themeBtn.textContent = body.classList.contains('light') ? "☀️" : "🌙";
});

   const bars = document.querySelectorAll('.bar-fill');
        window.onload = () => {
            bars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        };

        function toggleProjects() {
            const box = document.getElementById('projects');
            box.style.display = box.style.display === 'none' ? 'block' : 'none';
        }
