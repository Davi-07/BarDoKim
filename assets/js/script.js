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
     // CARDÁPIO — setas de navegação do carrossel (Loop Contínuo)
     // =========================================================
     if (btnNext && btnPrev && menuCarousel) {
     const getScrollAmount = () => {
         const firstCard = menuCarousel.querySelector('.menu__card');
             if (!firstCard) return 0;
            // largura do card + gap (1.5rem = 24px)
                return firstCard.offsetWidth + 24;
         };

        let isMoving = false; // Evita bugar se o usuário clicar várias vezes rápido
        const SCROLL_DURATION = 400; // Tempo aproximado para a animação de scroll terminar (em ms)

        btnNext.addEventListener('click', () => {
            if (isMoving) return;
            isMoving = true;

            const scrollAmount = getScrollAmount();
            
            // 1. Rola suavemente para o próximo item
            menuCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });

            // 2. Aguarda a animação visual terminar
            setTimeout(() => {
                // Pega o 1º elemento do HTML e joga lá pro final
                menuCarousel.appendChild(menuCarousel.firstElementChild);
                
                // Retorna a barra de rolagem instantaneamente para compensar o item que saiu do começo
                menuCarousel.scrollBy({ left: -scrollAmount, behavior: 'instant' }); 
                
                isMoving = false;
            }, SCROLL_DURATION);
        });

        btnPrev.addEventListener('click', () => {
            if (isMoving) return;
            isMoving = true;

            const scrollAmount = getScrollAmount();
            
            // 1. Pega o último elemento do HTML e joga para o começo
            menuCarousel.prepend(menuCarousel.lastElementChild);
            
            // 2. Empurra a barra de rolagem instantaneamente pra frente para esconder o item novo
            menuCarousel.scrollBy({ left: scrollAmount, behavior: 'instant' });

            // 3. Dá um micropasso para o navegador renderizar o DOM e então rola suavemente para trás
            requestAnimationFrame(() => {
                menuCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                
                setTimeout(() => {
                    isMoving = false;
                }, SCROLL_DURATION);
            });
        });
    }

});