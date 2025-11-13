const hamburger = document.querySelector('.hamburger-menu')
const menu = document.querySelector('.hamburgerMenu')

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active')
})
