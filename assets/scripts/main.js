function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;

    function fadeInUp(element) {
        element.classList.add('animated', 'fadeInUp');
    }

    function checkPosition() {
        sections.forEach(section => {
            const position = section.getBoundingClientRect().top;

            if (position < windowHeight * 0.75) {
                fadeInUp(section);
                section.style.opacity = '1';
                section.style.visibility = 'visible';
            }
        });
    }

    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', checkPosition);
    checkPosition();
});