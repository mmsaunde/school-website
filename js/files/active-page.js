const navLinkEls = document.querySelectorAll('.nav__link');
const windowPathName = window.location.pathname;

navLinkEls.forEach(navLinkEl => {
  const navLinkPathName = new URL(navLinkEl.href).pathname;

  if((windowPathName === navLinkPathName) || (windowPathName === '/index.html' && navLinkPathName === '/')) {
      navLinkEl.classList.add('active');
  }
})