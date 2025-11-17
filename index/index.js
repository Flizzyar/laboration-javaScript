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
// När användaren klickar på hamburgermenyn växlar vi klassen "active"
// Denna klass används i CSS för att animera menyn in/ut
hamburger.addEventListener('click', () => {
    menu.classList.toggle('active')
})

// 1.3 Stäng meny vid klick utanför
// Om användaren klickar någonstans på sidan utanför menyn → stäng menyn
document.addEventListener('click', (event) => {
    if (menu.classList.contains('active')) {
        // Endast om menyn är öppen
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
