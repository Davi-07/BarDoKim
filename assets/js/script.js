document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Elementos do DOM ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    const slides = document.querySelectorAll('#bg-carousel .slide');
    const iconMenu = document.getElementById('icon-menu');
    const iconClose = document.getElementById('icon-close');
    
    // --- 2. Lógica do Menu Mobile ---
    if (btn && menu) {
        const mobileLinks = menu.querySelectorAll('.nav-link');

        btn.addEventListener('click', () => {
            menu.classList.toggle('active');
            
            if (iconMenu && iconClose) {
                if (menu.classList.contains('active')) {
                    iconMenu.style.display = 'none';
                    iconClose.style.display = 'block';
                } else {
                    iconMenu.style.display = 'block';
                    iconClose.style.display = 'none';
                }
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                
                if (iconMenu && iconClose) {
                    iconMenu.style.display = 'block';
                    iconClose.style.display = 'none';
                }
            });
        });
    }

    // --- 3. Controle da Navbar translúcida/preta ---
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- 4. Controle do Carrossel Hero (Página Inicial) ---
    if (slides.length > 1) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); 
    }

    // --- 5. Lógica da Seção de Favoritos (Filtros e Carrossel) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const plates = document.querySelectorAll('.favorites-plate');
    const container = document.getElementById('menu-container');
    const arrowsContainer = document.getElementById('carousel-arrows');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    // Navegação pelas Setas (Corrigido com Cálculo Dinâmico)
    if (btnNext && btnPrev && container) {
        
        btnNext.addEventListener('click', () => {
            const firstCard = container.querySelector('.favorites-plate');
            if (firstCard) {
                // Largura do card + gap (24px = 1.5rem)
                const scrollAmount = firstCard.offsetWidth + 24; 
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });

        btnPrev.addEventListener('click', () => {
            const firstCard = container.querySelector('.favorites-plate');
            if (firstCard) {
                const scrollAmount = firstCard.offsetWidth + 24;
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });
    }

    // Filtros de Categoria
    if (filterBtns.length > 0 && container) {
        
        const applyFilter = (filterValue) => {
            container.classList.remove('grid-mode');
            container.classList.add('carousel-mode');
            
            if (arrowsContainer && window.innerWidth > 768) {
                arrowsContainer.style.display = 'flex';
            }

            plates.forEach(plate => {
                if (plate.getAttribute('data-category') === filterValue) {
                    plate.classList.remove('hidden');
                } else {
                    plate.classList.add('hidden');
                }
            });

            container.scrollTo({ left: 0, behavior: 'smooth' });
        };

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');
                applyFilter(filterValue);
            });
        });

        // Inicialização
        const activeBtnOnLoad = document.querySelector('.filter-btn.active');
        if (activeBtnOnLoad) {
            applyFilter(activeBtnOnLoad.getAttribute('data-filter'));
        }
    }
});