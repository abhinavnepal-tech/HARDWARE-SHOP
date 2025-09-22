let currentFilter = 'all';
let currentSearchTerm = '';
let productsData = null;

// Sample products data
const fallbackProducts = {
    "products": [
        {
            "id": 1,
            "name": "PVC Pipe 4 inch",
            "category": "pipes",
            "price": "$12.99",
            "description": "High-quality PVC pipe suitable for drainage and irrigation systems.",
            "icon": "🚿"
        },
        {
            "id": 2,
            "name": "Copper Pipe 1/2 inch",
            "category": "pipes",
            "price": "$8.50",
            "description": "Premium copper pipe for plumbing applications.",
            "icon": "🔧"
        },
        {
            "id": 3,
            "name": "Steel Rebar 10mm",
            "category": "steel",
            "price": "$25.99",
            "description": "High-grade steel reinforcement bars for concrete construction.",
            "icon": "🏗️"
        },
        {
            "id": 4,
            "name": "Acrylic Wall Paint",
            "category": "paints",
            "price": "$45.99",
            "description": "Premium interior wall paint with excellent coverage and durability.",
            "icon": "🎨"
        },
        {
            "id": 5,
            "name": "Ceramic Wash Basin",
            "category": "bathroom/sanitary",
            "price": "$89.99",
            "description": "Modern ceramic wash basin with sleek design.",
            "icon": "🚰"
        },
        {
            "id": 6,
            "name": "Hammer 16oz",
            "category": "tools",
            "price": "$22.99",
            "description": "Professional grade claw hammer with comfortable grip.",
            "icon": "🔨"
        },
        {
            "id": 7,
            "name": "Electric Drill Set",
            "category": "tools",
            "price": "$89.99",
            "description": "Cordless electric drill with complete bit set.",
            "icon": "🔩"
        },
        {
            "id": 8,
            "name": "Safety Helmet",
            "category": "others",
            "price": "$18.50",
            "description": "High-impact safety helmet with adjustable straps.",
            "icon": "⛑️"
        },
        {
            "id": 9,
            "name": "Work Gloves",
            "category": "others",
            "price": "$12.99",
            "description": "Durable work gloves with enhanced grip and protection.",
            "icon": "🧤"
        },
        {
            "id": 10,
            "name": "Waterproof Sealant",
            "category": "waterproof",
            "price": "$28.75",
            "description": "High-performance waterproof sealant for various surfaces.",
            "icon": "🛡️"
        }
    ]
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadProductsData();
    initializeSearch();
    initializeScrollEffects();
});

// Load products data
async function loadProductsData() {
    try {
        const response = await fetch('products.json');
        productsData = await response.json();
    } catch (error) {
        console.log('Using fallback product data');
        productsData = fallbackProducts;
    }
    loadProducts();
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            currentSearchTerm = e.target.value.toLowerCase().trim();
            performSearch();
            toggleClearButton();
        });
    }

    if (clearButton) {
        clearButton.addEventListener('click', clearSearch);
    }
}

// Perform search
function performSearch() {
    if (!productsData) return;

    let filteredProducts = productsData.products;
    
    // Filter by category
    if (currentFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === currentFilter);
    }

    // Filter by search term
    if (currentSearchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(currentSearchTerm) ||
            product.description.toLowerCase().includes(currentSearchTerm) ||
            product.category.toLowerCase().includes(currentSearchTerm)
        );
    }

    displayProducts(filteredProducts);
}

// Display products
function displayProducts(products) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    
    if (products.length === 0) {
        const noResultsMessage = currentSearchTerm ? 
            `No products found for "${currentSearchTerm}"` : 
            'No products found in this category';
        
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <div style="font-size: 2rem; margin-bottom: 1rem;">🔍</div>
                <h3>${noResultsMessage}</h3>
                <p>Try searching with different keywords or view all products.</p>
                ${currentSearchTerm ? `<button onclick="clearSearch()" style="margin-top: 1rem; padding: 0.75rem 1.5rem; border: none; background: var(--primary); color: white; border-radius: 50px; cursor: pointer; transition: var(--transition);">Clear Search</button>` : ''}
            </div>
        `;
        return;
    }
    
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        
        // Check if icon is an image URL
        const isImage = typeof product.icon === 'string' && 
                       (product.icon.includes('.jpg') || 
                        product.icon.includes('.jpeg') || 
                        product.icon.includes('.png') || 
                        product.icon.includes('.webp'));
        
        productCard.innerHTML = `
            <div class="product-image">
                ${isImage ? 
                    `<img src="${product.icon}" alt="${product.name}" 
                          onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                     <span style="display: none; font-size: 4rem;">📦</span>` : 
                    `<span>${product.icon}</span>`
                }
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1).replace(/[-_]/g, ' ')}</div>
                <div class="product-price">${product.price}</div>
                <div class="product-description">${product.description}</div>
            </div>
        `;
        
        grid.appendChild(productCard);
    });
}

// Load products with current filters
function loadProducts() {
    if (!productsData) return;

    let filteredProducts = productsData.products;
    
    if (currentFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === currentFilter);
    }

    if (currentSearchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(currentSearchTerm) ||
            product.description.toLowerCase().includes(currentSearchTerm) ||
            product.category.toLowerCase().includes(currentSearchTerm)
        );
    }

    displayProducts(filteredProducts);
}

// Filter products by category
function filterProducts(category) {
    currentFilter = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    loadProducts();
}

// Clear search
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
        currentSearchTerm = '';
        performSearch();
        toggleClearButton();
        searchInput.focus();
    }
}

// Toggle clear button visibility
function toggleClearButton() {
    const clearButton = document.getElementById('clearSearch');
    if (clearButton) {
        clearButton.style.display = currentSearchTerm ? 'flex' : 'none';
    }
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (Math.abs(lastScrollTop - scrollTop) <= 5) return;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            if (header) header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            if (header) header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for animations
    document.querySelectorAll('.service-card, .product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}