document.addEventListener('DOMContentLoaded', function () {
    var HEADER_OFFSET = 70;

    function changeLanguage(lang) {
        var dict = window.translations[lang];
        if (!dict) return;

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) {
                el.textContent = dict[key];
            }
        });

        document.title = dict.pageTitle;

        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        localStorage.setItem('language', lang);
        document.documentElement.setAttribute('lang', lang);
    }

    // 言語切り替えボタン（デスクトップ・モバイルモーダル共通）
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            changeLanguage(btn.getAttribute('data-lang'));
            var modal = document.getElementById('languageModal');
            if (modal) modal.style.display = 'none';
        });
    });

    var savedLang = localStorage.getItem('language') || 'ja';
    changeLanguage(savedLang);

    // スムーススクロール（ヘッダー分のオフセットを差し引く）
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = link.getAttribute('href');
            if (!href || href === '#') return;
            var target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            var top = target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

    // 言語選択モーダル（モバイル）
    var modal = document.getElementById('languageModal');
    var modalToggle = document.getElementById('languageModalToggle');
    if (modalToggle && modal) {
        modalToggle.addEventListener('click', function (e) {
            e.preventDefault();
            modal.style.display = 'block';
        });
        window.addEventListener('click', function (e) {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    // ライトボックス（デザイン制作物ギャラリー）
    var lightbox = document.getElementById('lightbox');
    var lightboxBody = document.getElementById('lightbox-body');
    var lightboxClose = document.getElementById('lightbox-close');

    document.querySelectorAll('.gallery-list').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = link.getAttribute('href').slice(1);
            var source = document.getElementById(targetId);
            if (!source || !lightbox || !lightboxBody) return;
            lightboxBody.innerHTML = source.innerHTML;
            lightbox.showModal();
        });
    });

    if (lightboxClose && lightbox) {
        lightboxClose.addEventListener('click', function () {
            lightbox.close();
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) lightbox.close();
        });
    }
});
