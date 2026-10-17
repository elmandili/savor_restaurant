// script.js
// ---------- Menu data ----------
const menuItems = [
    {
        name: "Charred Octopus",
        price: "$28",
        desc: "Smoked paprika, fingerling potatoes, salsa verde, preserved lemon.",
        tag: "Signature"
    },
    {
        name: "Wild Mushroom Risotto",
        price: "$24",
        desc: "Acquerello rice, porcini, truffle oil, aged parmesan, fresh herbs.",
        tag: "Vegetarian"
    },
    {
        name: "Wood-Fired Lamb",
        price: "$36",
        desc: "Rack of lamb, charred eggplant, pomegranate glaze, mint yogurt.",
        tag: "Chef's pick"
    },
    {
        name: "Seared Sea Bass",
        price: "$32",
        desc: "Fennel purée, blood orange, crispy capers, brown butter.",
        tag: "Seasonal"
    },
    {
        name: "Burrata & Heirloom",
        price: "$18",
        desc: "Creamy burrata, heirloom tomatoes, basil oil, aged balsamic.",
        tag: "Vegetarian"
    },
    {
        name: "Dark Chocolate Tart",
        price: "$14",
        desc: "70% Valrhona chocolate, sea salt, olive oil, vanilla cream.",
        tag: "Dessert"
    }
];

// ---------- Render menu ----------
function renderMenu() {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;

    menuGrid.innerHTML = '';

    menuItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-item';
        card.innerHTML = `
            <div class="menu-item-header">
                <h3>${item.name}</h3>
                <span class="menu-item-price">${item.price}</span>
            </div>
            <p class="menu-item-desc">${item.desc}</p>
            <span class="menu-item-tag">${item.tag}</span>
        `;
        menuGrid.appendChild(card);
    });
}

// ---------- Active nav link on scroll ----------
function setupActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}

// ---------- Header scroll effect ----------
function setupHeaderScroll() {
    const header = document.querySelector('.main-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

// ---------- Smooth scroll for nav links (with fixed header offset) ----------
function setupSmoothScroll() {
    const headerHeight = 72;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ---------- Show server response after a reservation submission ----------
function showReservationFeedback() {
    const feedback = document.getElementById('formFeedback');
    if (feedback && feedback.textContent.trim()) {
        feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ---------- Initialize everything on DOM ready ----------
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    setupActiveNav();
    setupHeaderScroll();
    setupSmoothScroll();
    showReservationFeedback();
});