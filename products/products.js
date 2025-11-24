// ============================================================
// ÖVERSIKT / INNEHÅLL
// ------------------------------------------------------------
// 1. HANTERA HAMBURGERMENY
// 2. HANTERA VARUKORGS-IKON
// 3. LADDA OCH VISA KATEGORIER
// 4. LADDA OCH VISA PRODUKTER
// 5. HÄMTA API-BILDER FÖR NYA PRODUKTER
// 6. LÄS URL-PARAMETRAR
// 7. STARTA SIDAN
// 8. LÄGG TILL NY PRODUKT VIA FORMULÄR
// ============================================================

// ============================================================
// 1. HANTERA HAMBURGERMENY
// ============================================================

// Hämta element
const menu = document.querySelector('.hamburgerMenu') // Själva menyn
const button = document.querySelector('#hamburgerBtn') // Hamburgerknappen

// Visa/dölj menyn vid klick
button.addEventListener('click', (event) => {
    event.stopPropagation() // Förhindrar att klicket stänger menyn direkt
    menu.classList.toggle('active')
})

// Stäng menyn vid klick utanför
document.addEventListener('click', (event) => {
    if (menu.classList.contains('active')) {
        if (!menu.contains(event.target) && !button.contains(event.target)) {
            menu.classList.remove('active')
        }
    }
})

// ============================================================
// 2. HANTERA VARUKORGS-IKON
// ============================================================

const cart = document.querySelector('#cart')

// Temporär alert vid klick på varukorg
cart.addEventListener('click', () => {
    alert('Du har inget i din varukorg!')
})

// ============================================================
// 3. LADDA OCH VISA KATEGORIER
// ============================================================

async function loadCategories() {
    const container = document.getElementById('categoryButtons')

    try {
        const response = await fetch(
            'https://fakestoreapi.com/products/categories'
        )
        const categories = await response.json()

        // Skapa "Alla"-knapp
        const allButton = document.createElement('button')
        allButton.textContent = 'Alla'
        allButton.addEventListener('click', () => {
            loadProducts()
        })
        container.appendChild(allButton)

        // Skapa en knapp för varje kategori
        categories.forEach((category) => {
            const button = document.createElement('button')
            button.textContent = category
            button.addEventListener('click', () => {
                loadProducts(category)
            })
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
    container.innerHTML = '<p>Laddar produkter...</p>'

    try {
        let url = 'https://fakestoreapi.com/products'

        if (category && category !== 'Alla') {
            url = `https://fakestoreapi.com/products/category/${encodeURIComponent(
                category
            )}`
        }

        const response = await fetch(url)
        const products = await response.json()

        container.innerHTML = '' // Töm tidigare produkter

        products.forEach((product) => {
            const div = document.createElement('div')
            div.className = 'product'

            div.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <div class="price">${product.price.toFixed(2)} kr</div>
            `

            container.appendChild(div)
        })
    } catch (error) {
        container.innerHTML = '<p>Fel vid hämtning av produkter 😢</p>'
        console.error(error)
    }
}

// ============================================================
// 5. HÄMTA API-BILDER FÖR NYA PRODUKTER
// ============================================================

let apiImages = []

async function loadApiImages() {
    const response = await fetch('https://fakestoreapi.com/products')
    const products = await response.json()

    apiImages = products

    const imageSelect = document.querySelector('#imageSelect')

    products.forEach((p) => {
        const option = document.createElement('option')
        option.value = p.image
        option.textContent = p.title
        imageSelect.appendChild(option)
    })
}

// ============================================================
// 6. LÄS URL-PARAMETRAR
// ============================================================

const urlParams = new URLSearchParams(window.location.search)
const category = urlParams.get('category')

// ============================================================
// 7. STARTA SIDAN
// ------------------------------------------------------------
// Laddar kategori från URL-parametern om den finns,
// annars visas alla produkter.
// ============================================================

loadCategories()
loadProducts(category || '')
loadApiImages()

// ============================================================
// 8. LÄGG TILL NY PRODUKT VIA FORMULÄR
// ============================================================

const productForm = document.querySelector('#productForm')
const productGrid = document.querySelector('#products')

// Lista på fält vi vill spara i localStorage
const formFields = ['title', 'description', 'price', 'imageSelect']

// Ladda tillbaka värden från localStorage när sidan öppnas
formFields.forEach((id) => {
    const savedValue = localStorage.getItem(id)
    if (savedValue) {
        document.querySelector('#' + id).value = savedValue
    }
})

// Spara värden i localStorage när användaren skriver i fälten
formFields.forEach((id) => {
    const input = document.querySelector('#' + id)
    input.addEventListener('input', () => {
        localStorage.setItem(id, input.value)
    })
})

// När formuläret skickas
productForm.addEventListener('submit', (event) => {
    event.preventDefault() // Förhindra sidladdning

    // Hämta värden från formulär
    const title = document.querySelector('#title').value
    const description = document.querySelector('#description').value
    const price = document.querySelector('#price').value
    const image = document.querySelector('#imageSelect').value

    // Skapa nytt produktkort
    const productDiv = document.createElement('div')
    productDiv.classList.add('product')

    productDiv.innerHTML = `
        <img src="${image}" alt="${title}">
        <h2>${title}</h2>
        <p>${description}</p>
        <div class="price">${Number(price).toFixed(2)} kr</div>
    `

    // Lägg till "Ta bort"-knapp
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Ta bort'
    deleteBtn.classList.add('delete-btn')

    deleteBtn.addEventListener('click', () => {
        productDiv.remove()
    })

    productDiv.appendChild(deleteBtn)
    productGrid.appendChild(productDiv)

    // Rensa sparade värden i localStorage
    formFields.forEach((id) => localStorage.removeItem(id))

    productForm.reset() // Töm formuläret
})
