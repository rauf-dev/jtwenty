document.addEventListener('DOMContentLoaded', function (event) {
  const openNavbarToggler = document.querySelector('#open-navbar-toggler');
  const offcanvas = new bootstrap.Offcanvas(document.querySelector('#offcanvasDarkNavbar'));

  openNavbarToggler.addEventListener('click', () => {
    offcanvas.show();
  });
});
