// ============================================================
// ÖVERSIKT / INNEHÅLL
// ------------------------------------------------------------
// 1. Hamburger-meny
//     1.1 Hämta element
//     1.2 Visa/dölj meny vid klick
//     1.3 Stäng meny vid klick utanför
// 2. Varukorgsikon
//     2.1 Hämta element
//     2.2 Visa meddelande vid klick
// ============================================================

// ============================================================
// 1. HAMBURGER-MENY
// ============================================================

// 1.1 Hämta element
// Container som innehåller hamburgerknappen och menyn
const hamburger = document.querySelector('.hamburger-menu')

// Själva menyn som ska visas/döljas
const menu = document.querySelector('.hamburgerMenu')

// Hamburgerknappen (ikon) som användaren klickar på
const button = document.querySelector('#hamburgerBtn')

// 1.2 Visa/dölj meny vid klick på hamburgerknappen
// När användaren klickar på knappen växlar vi klassen "active"
// CSS använder denna klass för att animera menyn in/ut
button.addEventListener('click', (event) => {
    event.stopPropagation() // Förhindrar att klicket bubblar upp och stänger menyn direkt
    menu.classList.toggle('active')
})

// 1.3 Stäng meny vid klick utanför
// Om menyn är öppen och användaren klickar någon annanstans → stäng menyn
document.addEventListener('click', (event) => {
    if (menu.classList.contains('active')) {
        // Klicket är inte på menyn och inte på hamburgerknappen
        if (!menu.contains(event.target) && !button.contains(event.target)) {
            menu.classList.remove('active')
        }
    }
})

// ============================================================
// 2. VARUKORGS-IKON
// ============================================================

// 2.1 Hämta element
const cart = document.querySelector('#cart')

// 2.2 Visa meddelande vid klick
// Temporär funktion – ersätts senare med riktig varukorgssida
cart.addEventListener('click', () => {
    alert('Du har inget i din varukorg!')
})
