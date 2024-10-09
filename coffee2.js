window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        document.getElementById('header').style.display = 'block';
        document.querySelector('footer').style.display = 'block';
    }, 3000);
});