(function() {
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');
    var navOverlay = document.getElementById('navOverlay');
    var navbar = document.getElementById('navbar');
    var topBar = document.querySelector('.top-bar');
    var lastScroll = 0;

    var mobileNav = document.getElementById('mobileNav');

    function closeNav() {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('open');
        if (mobileNav) mobileNav.style.display = '';
    }

    function toggleNav() {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('open');
        if (navOverlay) navOverlay.classList.toggle('open');
        if (mobileNav) {
            if (navLinks.classList.contains('open')) {
                mobileNav.style.display = 'none';
            } else {
                mobileNav.style.display = '';
            }
        }
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', toggleNav);
        if (navOverlay) navOverlay.addEventListener('click', closeNav);
        document.querySelectorAll('.nav-links a').forEach(function(link) {
            link.addEventListener('click', closeNav);
        });
    }

    if (navbar) {
        window.addEventListener('scroll', function() {
            var currentScroll = window.scrollY;
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
                if (currentScroll > lastScroll) {
                    navbar.classList.add('hidden');
                    if (topBar) topBar.classList.add('hidden');
                } else {
                    navbar.classList.remove('hidden');
                    if (topBar) topBar.classList.remove('hidden');
                }
            } else {
                navbar.classList.remove('scrolled');
                navbar.classList.remove('hidden');
                if (topBar) topBar.classList.remove('hidden');
            }
            lastScroll = currentScroll;
        });
    }

    var sections = document.querySelectorAll('[id]');
    var navAnchors = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        var scrollY = window.scrollY + 150;
        var currentId = '';

        sections.forEach(function(section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                currentId = section.getAttribute('id');
            }
        });

        navAnchors.forEach(function(anchor) {
            anchor.classList.remove('active');
            var href = anchor.getAttribute('href');
            if (href === '#' + currentId) {
                anchor.classList.add('active');
            }
        });
    }

    if (navAnchors.length && sections.length) {
        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav();
    }
})();
