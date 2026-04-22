document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // SELETORES
    // =========================================================
    const mobileMenuBtn  = document.getElementById('js-mobile-menu-btn');
    const mobileMenu     = document.getElementById('js-mobile-menu');
    const navbar         = document.getElementById('navbar');
    const heroSlides     = document.querySelectorAll('#js-bg-carousel .hero__slide');
    const sections       = document.querySelectorAll('#inicio, #cardapio, #espaco, #contato');
    const allNavLinks    = document.querySelectorAll('.navbar__link, .mobile-menu__link');
    const filterBtns     = document.querySelectorAll('.filter-btn');
    const menuCards      = document.querySelectorAll('.menu__card');
    const menuCarousel   = document.getElementById('js-menu-container');
    const arrowsWrapper  = document.getElementById('js-carousel-arrows');
    const btnPrev        = document.getElementById('js-btn-prev');
    const btnNext        = document.getElementById('js-btn-next');

    // =========================================================
    // MENU MOBILE — abre / fecha
    // =========================================================
    if (mobileMenuBtn && mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');

        const closeMobileMenu = () => {
            mobileMenu.classList.remove('is-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
        };

        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('is-open');
            mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
            mobileMenu.setAttribute('aria-hidden', String(!isOpen));
        });

        mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
    }

    // =========================================================
    // NAVBAR — destaca link ativo conforme scroll
    // =========================================================
    const NAVBAR_OFFSET = 150;

    const updateActiveNavLink = () => {
        let currentSectionId = '';

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - NAVBAR_OFFSET) {
                currentSectionId = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.toggle(
                'is-active',
                link.getAttribute('href') === `#${currentSectionId}`
            );
        });
    };

    if (navbar) {
        window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    }

    // =========================================================
    // HERO — carrossel automático (apenas se houver mais de 1 slide)
    // =========================================================
    if (heroSlides.length > 1) {
        const SLIDE_INTERVAL_MS = 5000;
        let currentSlide = 0;

        setInterval(() => {
            heroSlides[currentSlide].classList.remove('is-active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('is-active');
        }, SLIDE_INTERVAL_MS);
    }

    // =========================================================
    // CARDÁPIO — filtros por categoria
    // =========================================================
    const applyFilter = (category) => {
        menuCards.forEach(card => {
            const isVisible = card.dataset.category === category;
            card.style.display = isVisible ? 'flex' : 'none';
        });

        if (menuCarousel) {
            menuCarousel.scrollTo({ left: 0, behavior: 'smooth' });
        }

        const isDesktop = window.innerWidth > 768;
        if (arrowsWrapper) {
            arrowsWrapper.style.display = isDesktop ? 'flex' : 'none';
        }
    };

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            applyFilter(btn.dataset.filter);
        });
    });

    // Aplica o filtro do botão marcado como ativo na carga da página
    const initialActiveBtn = document.querySelector('.filter-btn.is-active');
    if (initialActiveBtn) {
        applyFilter(initialActiveBtn.dataset.filter);
    }

    // =========================================================
    // CARDÁPIO — setas de navegação do carrossel
    // =========================================================
    if (btnNext && btnPrev && menuCarousel) {
        const getScrollAmount = () => {
            const firstCard = menuCarousel.querySelector('.menu__card:not([style*="display: none"])');
            if (!firstCard) return 0;
            // largura do card + gap (1.5rem = 24px)
            return firstCard.offsetWidth + 24;
        };

        btnNext.addEventListener('click', () => {
            menuCarousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        btnPrev.addEventListener('click', () => {
            menuCarousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }

});