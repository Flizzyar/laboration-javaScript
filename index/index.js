const hamburger = document.querySelector('.hamburger-menu')
const menu = document.querySelector('.hamburgerMenu')

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active')
})

const cart = document.querySelector('#cart')
cart.addEventListener('click', () => {
    alert('Du har inget i din varukorg!')
})
