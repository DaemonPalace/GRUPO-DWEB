document.querySelector('.hamburger').addEventListener('click', function() {
    const sideMenu = document.querySelector('.side-menu');
    const overlay = document.querySelector('.overlay');

    sideMenu.classList.toggle('open');
    overlay.classList.toggle('show');
});
