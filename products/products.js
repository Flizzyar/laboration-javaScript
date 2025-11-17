// ============================================================
// ÖVERSIKT / INNEHÅLL
// ------------------------------------------------------------
// 1. HANTERA HAMBURGERMENY
// 2. HANTERA VARUKORGS-IKON
// 3. LADDA OCH VISA KATEGORIER
// 4. LADDA OCH VISA PRODUKTER
// 5. LÄS URL-PARAMETRAR
// 6. STARTA SIDAN
// ============================================================

// ============================================================
// 1. HANTERA HAMBURGERMENY
// ============================================================

// Hämta element: container och meny
const hamburger = document.querySelector('.hamburger-menu')
const menu = document.querySelector('.hamburgerMenu')
const button = document.querySelector('#hamburgerBtn')

// Visa/dölj menyn vid klick på hamburgermenyn
hamburger.addEventListener('click', () => {
    menu.classList.toggle('active')
})

// Stäng menyn om användaren klickar utanför menyn
document.addEventListener('click', (event) => {
    // Kontrollera om menyn är öppen
    if (menu.classList.contains('active')) {
        // Klicket är inte på menyn eller hamburgerknappen → stäng menyn
        if (!menu.contains(event.target) && !button.contains(event.target)) {
            menu.classList.remove('active')
        }
    }
})

// ============================================================
// 2. HANTERA VARUKORGS-IKON
// ============================================================

const cart = document.querySelector('#cart')

// Visa ett meddelande när användaren klickar på varukorgen
cart.addEventListener('click', () => {
    alert('Du har inget i din varukorg!')
})

// ============================================================
// 3. LADDA OCH VISA KATEGORIER
// ============================================================

async function loadCategories() {
    const container = document.getElementById('categoryButtons')

    try {
        // Hämta kategorier från API
        const response = await fetch(
            'https://fakestoreapi.com/products/categories'
        )
        const categories = await response.json()

        // Skapa knapp för "Alla" produkter
        const allButton = document.createElement('button')
        allButton.textContent = 'Alla'
        allButton.addEventListener('click', () => loadProducts())
        container.appendChild(allButton)

        // Skapa knapp för varje kategori
        categories.forEach((category) => {
            const button = document.createElement('button')
            button.textContent = category
            button.addEventListener('click', () => loadProducts(category))
            container.appendChild(button)
        })
    } catch (error) {
        console.error('Fel vid hämtning av kategorier', error)
    }
}

// ============================================================
// 4. LADDA OCH VISA PRODUKTER
// ============================================================

async function loadProducts(category = '') {
    const container = document.getElementById('products')

    // Visa laddningsmeddelande
    container.innerHTML = '<p>Laddar produkter...</p>'

    try {
        let url = 'https://fakestoreapi.com/products'

        // Använd kategori-URL om en kategori är vald
        if (category && category !== 'Alla') {
            url = `https://fakestoreapi.com/products/category/${encodeURIComponent(
                category
            )}`
        }

        const response = await fetch(url)
        const products = await response.json()

        // Rensa container
        container.innerHTML = ''

        // Skapa HTML för varje produkt
        products.forEach((product) => {
            const div = document.createElement('div')
            div.className = 'product'

            div.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <div class="price">${product.price.toFixed(2)} USD</div>
            `

            container.appendChild(div)
        })
    } catch (error) {
        container.innerHTML = '<p>Fel vid hämtning av produkter 😢</p>'
        console.error(error)
    }
}

// ============================================================
// 5. LÄS URL-PARAMETRAR
// ============================================================

const urlParams = new URLSearchParams(window.location.search)
const category = urlParams.get('category')

// ============================================================
// 6. STARTA SIDAN: LADDA KATEGORIER + PRODUKTER
// ============================================================

loadCategories()
loadProducts(category)
