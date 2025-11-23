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
const hamburger = document.querySelector('.hamburger-menu') // Wrapper
const menu = document.querySelector('.hamburgerMenu') // Själva menyn
const button = document.querySelector('#hamburgerBtn') // Hamburgerknappen
let customProducts = [] // Array för egna produkter

// 1.2 Visa/dölj menyn vid klick
button.addEventListener('click', (event) => {
    event.stopPropagation() // Förhindrar att klicket stänger menyn direkt
    menu.classList.toggle('active')
})

// 1.3 Stäng meny om man klickar utanför
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
            localStorage.setItem('lastCategory', '')
            loadProducts()
        })
        container.appendChild(allButton)

        // Skapa en knapp för varje kategori
        categories.forEach((category) => {
            const button = document.createElement('button')
            button.textContent = category
            button.addEventListener('click', () => {
                localStorage.setItem('lastCategory', category)
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

function loadCustomProducts() {
    const saved = localStorage.getItem('customProducts')
    if (!saved) return

    customProducts = JSON.parse(saved)
    customProducts.forEach((product) => {
        renderCustomProduct(product)
    })
}

// ============================================================
// 6. LÄS URL-PARAMETRAR
// ============================================================

const urlParams = new URLSearchParams(window.location.search)
const category = urlParams.get('category')

// ============================================================
// 7. STARTA SIDAN
// ============================================================

loadCategories()

// Om en kategori sparats i localStorage → använd den
const savedCategory = localStorage.getItem('lastCategory')
loadProducts(savedCategory || category)

loadCustomProducts()
loadApiImages()

// ============================================================
// 8. LÄGG TILL NY PRODUKT VIA FORMULÄR
// ============================================================

const productForm = document.querySelector('#productForm')
const productGrid = document.querySelector('#products')

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

    productForm.reset() // Töm formuläret
})
