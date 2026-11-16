(function () {
    var root = document.documentElement;
    var key = 'apexsave-theme';
    var saved = null;

    /* 1. Pick the starting theme: saved choice first, then the device setting */
    try {
        saved = localStorage.getItem(key);
    } catch (e) {}

    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    root.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));

    /* 2. Wait for the page, then connect the toggle button */
    document.addEventListener('DOMContentLoaded', function () {
        var btn = document.getElementById('theme-toggle');

        function sync() {
            var isDark = root.getAttribute('data-theme') === 'dark';

            btn.setAttribute('aria-pressed', String(!isDark));
            btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }

        sync();

        btn.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

            root.setAttribute('data-theme', next);

            try {
                localStorage.setItem(key, next);
            } catch (e) {}

            sync();
        });

        /* 3. Pause the background video if the visitor prefers less motion */
        var video = document.querySelector('.bg video');

        if (video && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            video.pause();
        }
    });
})();