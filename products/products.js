const hamburger = document.querySelector('.hamburger-menu')
const menu = document.querySelector('.hamburgerMenu')

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active')
})

const cart = document.querySelector('#cart')
cart.addEventListener('click', () => {
    alert('Du har inget i din varukorg!')
})

// Ladda kategorier
async function loadCategories() {
    const container = document.getElementById('categoryButtons')
    try {
        const response = await fetch(
            'https://fakestoreapi.com/products/categories'
        )
        const categories = await response.json()

        const allButton = document.createElement('button')
        allButton.textContent = 'Alla'
        allButton.addEventListener('click', () => loadProducts())
        container.appendChild(allButton)

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

        container.innerHTML = '' // Rensa

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

const urlParams = new URLSearchParams(window.location.search)
const category = urlParams.get('category')

loadCategories()
loadProducts(category)
