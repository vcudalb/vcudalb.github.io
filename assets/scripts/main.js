(function () {
    const root = document.documentElement;
    const header = document.querySelector('.site-header');
    const navLinks = document.getElementById('nav-links');
    const hamburger = document.getElementById('hamburger');
    const themeToggle = document.getElementById('theme-toggle');

    // Mobile menu
    function setMenu(open) {
        navLinks.classList.toggle('open', open);
        hamburger.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', String(open));
    }

    hamburger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

    // Theme toggle (light / dark), remembered per browser
    function currentTheme() {
        const explicit = root.getAttribute('data-theme');
        if (explicit) return explicit;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    themeToggle.addEventListener('click', () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try {
            localStorage.setItem('theme', next);
        } catch (e) {
            /* storage unavailable: theme still applies for this visit */
        }
    });

    // Header border + back-to-top button on scroll
    const toTop = document.getElementById('to-top');
    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 8);
        toTop.classList.toggle('show', window.scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    onScroll();

    // Reveal sections on scroll
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    io.unobserve(e.target);
                }
            });
        }, {threshold: 0.05});
        reveals.forEach(el => io.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('visible'));
    }

    // Highlight the active nav link
    const links = [...navLinks.querySelectorAll('a')];
    const targets = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    if ('IntersectionObserver' in window) {
        const spy = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
                }
            });
        }, {rootMargin: '-45% 0px -50% 0px'});
        targets.forEach(t => spy.observe(t));
    }

    // Printing / saving as PDF: show everything
    const earlier = document.querySelectorAll('details.earlier');
    window.addEventListener('beforeprint', () => {
        earlier.forEach(d => d.setAttribute('open', ''));
        reveals.forEach(el => el.classList.add('visible'));
    });

    document.getElementById('year').textContent = new Date().getFullYear();
})();
