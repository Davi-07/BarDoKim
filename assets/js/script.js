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
    const menuCarousel   = document.getElementById('js-menu-container');
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
    const SCROLL_BG_THRESHOLD = 100;

    const updateActiveNavLink = () => {
        if (window.scrollY > SCROLL_BG_THRESHOLD) {
            navbar.classList.add('is-scrolled');
        } else {
            navbar.classList.remove('is-scrolled');
        }

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
        updateActiveNavLink();
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
    // CARDÁPIO — setas de navegação do carrossel (Com Loop)
    // =========================================================
    if (btnNext && btnPrev && menuCarousel) {
        const getScrollAmount = () => {
            const firstCard = menuCarousel.querySelector('.menu__card');
            if (!firstCard) return 0;
            // largura do card + gap (1.5rem = 24px)
            return firstCard.offsetWidth + 24;
        };

        btnNext.addEventListener('click', () => {
            // maxScrollLeft é o máximo que a barra de rolagem consegue ir para a direita
            const maxScrollLeft = menuCarousel.scrollWidth - menuCarousel.clientWidth;
            
            // Se já chegou no final (com uma tolerância de 5px para arredondamentos do navegador)
            if (menuCarousel.scrollLeft >= maxScrollLeft - 5) {
                // Rola suavemente de volta para o começo (posição 0)
                menuCarousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // Caso contrário, continua avançando normalmente
                menuCarousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
            }
        });

        btnPrev.addEventListener('click', () => {
            // Se estiver no começo da lista (com tolerância de 5px)
            if (menuCarousel.scrollLeft <= 5) {
                // Rola suavemente direto para o final
                menuCarousel.scrollTo({ left: menuCarousel.scrollWidth, behavior: 'smooth' });
            } else {
                // Caso contrário, volta normalmente
                menuCarousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
            }
        });
    }

});