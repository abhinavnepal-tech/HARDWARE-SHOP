let currentFilter = 'all';
let currentSearchTerm = '';
let productsData = null;

// Sample products data as fallback
const fallbackProducts = {
    "products": [
        {
            "id": 1,
            "name": "PVC Pipe 4 inch",
            "category": "pipes",
            "price": "Contact for price",
            "description": "High-quality PVC pipe suitable for drainage and irrigation systems.",
            "icon": "🚿"
        },
        {
            "id": 2,
            "name": "Copper Pipe 1/2 inch",
            "category": "pipes",
            "price": "Contact for price",
            "description": "Premium copper pipe for plumbing applications.",
            "icon": "🔧"
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
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        productsData = await response.json();
        console.log('Products loaded:', productsData.products.length);
    } catch (error) {
        console.log('Error loading products, using fallback data:', error);
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
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <h3 style="font-size: 2rem; margin-bottom: 1rem;">🔍 ${noResultsMessage}</h3>
                <p style="color: rgba(255, 255, 255, 0.8); font-size: 1.1rem;">Try searching with different keywords or view all products.</p>
                ${currentSearchTerm ? `<button onclick="clearSearch()" class="cta-button" style="margin-top: 2rem;">Clear Search</button>` : ''}
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
                        product.icon.includes('.webp') ||
                        product.icon.includes('cloudinary'));
        
        // Handle empty or missing price
        const displayPrice = product.price && product.price.trim() !== '' ? product.price : 'Contact for price';
        
        // Format category name for display
        const categoryDisplay = product.category
            .split(/[-_/]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        
        productCard.innerHTML = `
            <div class="category-badge">${categoryDisplay}</div>
            <div class="product-image">
                ${isImage ? 
                    `<img src="${product.icon}" alt="${product.name}" 
                          onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'font-size: 4rem;\\'>📦</div>';">` : 
                    `<div style="font-size: 4rem; padding: 2rem;">${product.icon || '📦'}</div>`
                }
            </div>
            <h3>${product.name}</h3>
            ${product.description ? `<p>${product.description}</p>` : ''}
            <div class="product-price">${displayPrice}</div>
            <button class="contact-btn" onclick="contactUs('${product.name}')">Contact Us</button>
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

// Contact function
function contactUs(productName) {
    // Scroll to footer contact section
    const footer = document.querySelector('footer');
    if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
    }
    
    // You can also open email client or WhatsApp
    // window.location.href = `mailto:hardwarepasale@gmail.com?subject=Inquiry about ${productName}`;
    // Or WhatsApp: window.open(`https://wa.me/9779849940823?text=I'm interested in ${productName}`, '_blank');
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
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
}