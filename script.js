let currentFilter = 'all';
let currentSearchTerm = '';
let productsData = null;

// Load products data when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadProductsData();
    initializeSearch();
});

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');

    if (searchInput) {
        // Add input event listener for real-time search
        searchInput.addEventListener('input', function(e) {
            currentSearchTerm = e.target.value.toLowerCase().trim();
            performSearch();
            toggleClearButton();
        });

        // Add keypress event listener for Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }

    if (clearButton) {
        clearButton.addEventListener('click', clearSearch);
    }
}

// Perform search function
function performSearch() {
    if (!productsData) return;

    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const products = productsData.products;
    
    // Filter by category first
    let filteredProducts = products;
    if (currentFilter !== 'all') {
        filteredProducts = products.filter(product => product.category === currentFilter);
    }

    // Then filter by search term
    if (currentSearchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(currentSearchTerm) ||
            product.description.toLowerCase().includes(currentSearchTerm) ||
            product.category.toLowerCase().includes(currentSearchTerm)
        );
    }

    displayProducts(filteredProducts);
}

// Display products function
function displayProducts(products) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        productCard.innerHTML = `
            <div class="product-image">
                <span>${product.icon}</span>
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                <div class="product-price">${product.price}</div>
                <div class="product-description">${product.description}</div>
            </div>
        `;
        grid.appendChild(productCard);
    });

    // Show no products message if filtered results are empty
    if (products.length === 0) {
        const noResultsMessage = currentSearchTerm ? 
            `No products found for "${currentSearchTerm}"` : 
            'No products found';
        
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--neutral-500);">
                <div style="font-size: 2rem; margin-bottom: 1rem;">🔍</div>
                <h3>${noResultsMessage}</h3>
                <p>Try searching with different keywords or view all products.</p>
                ${currentSearchTerm ? `<button onclick="clearSearch()" style="margin-top: 1rem; padding: 0.5rem 1rem; border: none; background: var(--primary); color: white; border-radius: 0.5rem; cursor: pointer;">Clear Search</button>` : ''}
            </div>
        `;
    }
}

// Clear search function
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
        clearButton.style.display = currentSearchTerm ? 'block' : 'none';
    }
}

// Load products from JSON file
async function loadProductsData() {
    try {
        const response = await fetch('products.json');
        productsData = await response.json();
        loadProducts();
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to embedded data if JSON file is not available
        loadFallbackData();
    }
}

// Fallback data in case JSON file is not available
function loadFallbackData() {
    productsData = {
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
                "name": "Steel Angle Bar",
                "category": "steel",
                "price": "$18.75",
                "description": "L-shaped steel bars for structural support and framing.",
                "icon": "📐"
            },
            {
                "id": 5,
                "name": "Acrylic Wall Paint",
                "category": "paints",
                "price": "$45.99",
                "description": "Premium interior wall paint with excellent coverage and durability.",
                "icon": "🎨"
            },
            {
                "id": 6,
                "name": "Metal Primer Paint",
                "category": "paints",
                "price": "$32.50",
                "description": "Anti-rust primer paint for metal surfaces.",
                "icon": "🖌️"
            },
            {
                "id": 7,
                "name": "Ceramic Wash Basin",
                "category": "bathroom/sanitary",
                "price": "$89.99",
                "description": "Modern ceramic wash basin with sleek design.",
                "icon": "🚰"
            },
            {
                "id": 8,
                "name": "Stainless Steel Basin",
                "category": "bathroom/sanitary",
                "price": "$125.00",
                "description": "Durable stainless steel kitchen basin with double bowl.",
                "icon": "🥄"
            },
            {
                "id": 9,
                "name": "Electrical Wire 2.5mm",
                "category": "electricals",
                "price": "$1.25",
                "description": "High-quality electrical wire suitable for household wiring.",
                "icon": "⚡"
            },
            {
                "id": 10,
                "name": "LED Light Bulb 12W",
                "category": "electricals",
                "price": "$8.99",
                "description": "Energy-efficient LED bulb with warm white light.",
                "icon": "💡"
            },
            {
                "id": 11,
                "name": "Hammer 16oz",
                "category": "tools",
                "price": "$22.99",
                "description": "Professional grade claw hammer with comfortable grip.",
                "icon": "🔨"
            },
            {
                "id": 12,
                "name": "Electric Drill Set",
                "category": "tools",
                "price": "$89.99",
                "description": "Cordless electric drill with complete bit set.",
                "icon": "🔩"
            },
            {
                "id": 13,
                "name": "Portland Cement 50kg",
                "category": "cement",
                "price": "$15.99",
                "description": "High-strength Portland cement for construction projects.",
                "icon": "🏭"
            },
            {
                "id": 14,
                "name": "Construction Sand",
                "category": "cement",
                "price": "$35.00",
                "description": "Fine construction sand suitable for concrete mixing.",
                "icon": "⏳"
            },
            {
                "id": 15,
                "name": "Safety Helmet",
                "category": "others",
                "price": "$18.50",
                "description": "High-impact safety helmet with adjustable straps.",
                "icon": "⛑️"
            },
            {
                "id": 16,
                "name": "Work Gloves",
                "category": "others",
                "price": "$12.99",
                "description": "Durable work gloves with enhanced grip and protection.",
                "icon": "🧤"
            }
        ]
    };
    loadProducts();
}

// Load and display products (updated to use the new displayProducts function)
function loadProducts() {
    if (!productsData) {
        console.error('Products data not available');
        return;
    }

    const products = productsData.products;
    
    let filteredProducts = products;
    if (currentFilter !== 'all') {
        filteredProducts = products.filter(product => product.category === currentFilter);
    }

    // Also apply search filter if there's a search term
    if (currentSearchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(currentSearchTerm) ||
            product.description.toLowerCase().includes(currentSearchTerm) ||
            product.category.toLowerCase().includes(currentSearchTerm)
        );
    }

    displayProducts(filteredProducts);
}

// Filter products by category (updated to work with search)
function filterProducts(category) {
    currentFilter = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Add loading animation
    const grid = document.getElementById('productsGrid');
    grid.style.opacity = '0.5';
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        loadProducts();
        grid.style.opacity = '1';
    }, 200);
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scrolling for anchor links
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

    // Add scroll effect to header with throttling
    let lastScrollTop = 0;
    let scrollTimeout = null;
    const header = document.querySelector('header');
    
    function handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (Math.abs(lastScrollTop - scrollTop) <= 5) return; // Prevent micro-scrolling
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            if (header) header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            if (header) header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10); // Throttle scroll events
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);

    // Observe service cards and product cards
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
});

// Add keyboard navigation for filters
document.addEventListener('keydown', function(e) {
    if (e.target.classList.contains('filter-btn')) {
        const buttons = Array.from(document.querySelectorAll('.filter-btn'));
        const currentIndex = buttons.indexOf(e.target);
        let newIndex = currentIndex;

        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            newIndex = currentIndex - 1;
        } else if (e.key === 'ArrowRight' && currentIndex < buttons.length - 1) {
            newIndex = currentIndex + 1;
        }

        if (newIndex !== currentIndex) {
            buttons[newIndex].focus();
            e.preventDefault();
        }
    }
});

// Add loading states and error handling
function showLoader() {
    const grid = document.getElementById('productsGrid');
    if (grid) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <div style="font-size: 2rem; margin-bottom: 1rem;">⏳</div>
                <p>Loading products...</p>
            </div>
        `;
    }
}

function showError(message) {
    const grid = document.getElementById('productsGrid');
    if (grid) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--neutral-500);">
                <div style="font-size: 2rem; margin-bottom: 1rem;">⚠️</div>
                <h3>Error Loading Products</h3>
                <p>${message}</p>
                <button onclick="loadProductsData()" style="margin-top: 1rem; padding: 0.5rem 1rem; border: none; background: var(--primary); color: white; border-radius: 0.5rem; cursor: pointer;">
                    Try Again
                </button>
            </div>
        `;
    }
}
function displayProducts(products) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        
        // Check if it's an image file
        const isImage = product.icon.includes('.jpeg') || 
                       product.icon.includes('.jpg') || 
                       product.icon.includes('.png') || 
                       product.icon.includes('.webp');
        
        productCard.innerHTML = `
            <div class="product-image">
                ${isImage ? 
                    `<img src="${product.icon}" alt="${product.name}" 
                          style="width: 80%; height: 80%; object-fit: contain; border-radius: 8px;"
                          onerror="console.log('Failed to load: ${product.icon}'); this.style.display='none'; this.nextElementSibling.style.display='block';">
                     <span style="display: none; font-size: 4rem;">📦</span>` : 
                    `<span style="font-size: 4rem;">${product.icon}</span>`
                }
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                <div class="product-price">${product.price}</div>
                <div class="product-description">${product.description}</div>
            </div>
        `;
        grid.appendChild(productCard);
    });
    
    // Rest of your function...
}
// ============================================
// PDF MANUAL FUNCTIONALITY - Add to existing JS
// ============================================

// Print PDF function
function printPDF() {
    // Method 1: Try to print the embedded PDF
    const pdfEmbed = document.querySelector('.pdf-embed');
    if (pdfEmbed) {
        try {
            // For browsers that support it, try to print the embed directly
            pdfEmbed.contentWindow.print();
        } catch (e) {
            // Fallback: Open PDF in new window and trigger print
            const printWindow = window.open('manual.pdf', '_blank');
            if (printWindow) {
                printWindow.onload = function() {
                    printWindow.print();
                };
            }
        }
    } else {
        // If no embed found, just open PDF for printing
        const printWindow = window.open('manual.pdf', '_blank');
        if (printWindow) {
            printWindow.onload = function() {
                printWindow.print();
            };
        }
    }
}

// PDF Loading and Error Handling
function initializePDFSection() {
    const pdfEmbed = document.querySelector('.pdf-embed');
    const pdfFallback = document.querySelector('.pdf-fallback');
    
    if (pdfEmbed && pdfFallback) {
        // Show loading state initially
        showPDFLoading();
        
        // Load PDF after a short delay
        setTimeout(function() {
            const pdfContainer = document.querySelector('.pdf-container');
            if (pdfContainer) {
                pdfContainer.innerHTML = `
                    <embed 
                        src="manual.pdf" 
                        type="application/pdf" 
                        width="100%" 
                        height="600"
                        class="pdf-embed">
                    </embed>
                    
                    <div class="pdf-fallback">
                        <div class="fallback-icon">📄</div>
                        <h4>Unable to display PDF</h4>
                        <p>Your browser doesn't support PDF viewing</p>
                        <a href="manual.pdf" target="_blank" class="pdf-download-btn">
                            📥 Download Manual
                        </a>
                    </div>
                `;
                
                // Re-attach error handlers to the new embed
                attachPDFErrorHandlers();
            }
        }, 500);
    }
}

// Attach error handlers to PDF embed
function attachPDFErrorHandlers() {
    const pdfEmbed = document.querySelector('.pdf-embed');
    const pdfFallback = document.querySelector('.pdf-fallback');
    
    if (pdfEmbed && pdfFallback) {
        // Check if PDF loaded successfully
        pdfEmbed.addEventListener('error', function() {
            console.log('PDF embed failed to load');
            pdfEmbed.style.display = 'none';
            pdfFallback.classList.add('active');
        });
        
        // Also check after a delay (some browsers don't trigger error event)
        setTimeout(function() {
            try {
                if (pdfEmbed.offsetHeight === 0 || !pdfEmbed.contentDocument) {
                    console.log('PDF embed appears to have failed');
                    pdfEmbed.style.display = 'none';
                    pdfFallback.classList.add('active');
                }
            } catch (e) {
                // If we can't access contentDocument, PDF might not be supported
                console.log('PDF content not accessible, showing fallback');
                pdfEmbed.style.display = 'none';
                pdfFallback.classList.add('active');
            }
        }, 2000);
    }
}

// Show PDF loading state
function showPDFLoading() {
    const pdfContainer = document.querySelector('.pdf-container');
    if (pdfContainer) {
        pdfContainer.innerHTML = `
            <div class="pdf-loading">
                <div class="loading-spinner"></div>
                <p>Loading PDF Manual...</p>
            </div>
        `;
    }
}

// Quick link navigation for PDF sections
function navigatePDFSection(sectionId) {
    const pdfEmbed = document.querySelector('.pdf-embed');
    if (pdfEmbed) {
        try {
            // Try to navigate to section in PDF (limited browser support)
            pdfEmbed.src = `manual.pdf#${sectionId}`;
        } catch (e) {
            // Fallback: just open PDF in new tab with anchor
            window.open(`manual.pdf#${sectionId}`, '_blank');
        }
    } else {
        // No embed, open in new tab
        window.open(`manual.pdf#${sectionId}`, '_blank');
    }
}

// Enhanced DOMContentLoaded to include PDF initialization
const originalDOMContentLoaded = document.addEventListener;
document.addEventListener('DOMContentLoaded', function() {
    // Run your existing initialization
    loadProductsData();
    initializeSearch();
    
    // Initialize PDF section if it exists
    if (document.querySelector('.manual-section')) {
        initializePDFSection();
    }
    
    // Handle smooth scrolling for anchor links (your existing code)
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

    // Your existing scroll effect code...
    let lastScrollTop = 0;
    let scrollTimeout = null;
    const header = document.querySelector('header');
    
    function handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (Math.abs(lastScrollTop - scrollTop) <= 5) return;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            if (header) header.style.transform = 'translateY(-100%)';
        } else {
            if (header) header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });

    // Your existing intersection observer code...
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);

    // Observe service cards, product cards, and manual cards
    document.querySelectorAll('.service-card, .manual-viewer-card, .manual-info-card').forEach(card => {
        observer.observe(card);
    });
});

// Add event listener for quick links if they exist
document.addEventListener('click', function(e) {
    if (e.target.closest('.quick-link')) {
        e.preventDefault();
        const link = e.target.closest('.quick-link');
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const sectionId = href.substring(1);
            navigatePDFSection(sectionId);
        }
    }
});

// Error handling for PDF operations
function handlePDFError(operation, error) {
    console.error(`PDF ${operation} failed:`, error);
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--danger);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        z-index: 1000;
        max-width: 300px;
    `;
    errorDiv.innerHTML = `
        <strong>PDF Error</strong><br>
        Unable to ${operation} PDF. <a href="manual.pdf" target="_blank" style="color: white; text-decoration: underline;">Try opening directly</a>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// Enhanced print function with error handling
function printPDF() {
    try {
        const pdfEmbed = document.querySelector('.pdf-embed');
        if (pdfEmbed) {
            try {
                pdfEmbed.contentWindow.print();
            } catch (e) {
                const printWindow = window.open('manual.pdf', '_blank');
                if (printWindow) {
                    printWindow.onload = function() {
                        try {
                            printWindow.print();
                        } catch (printError) {
                            handlePDFError('print', printError);
                        }
                    };
                } else {
                    handlePDFError('print', new Error('Popup blocked'));
                }
            }
        } else {
            const printWindow = window.open('manual.pdf', '_blank');
            if (printWindow) {
                printWindow.onload = function() {
                    try {
                        printWindow.print();
                    } catch (printError) {
                        handlePDFError('print', printError);
                    }
                };
            } else {
                handlePDFError('print', new Error('Popup blocked'));
            }
        }
    } catch (error) {
        handlePDFError('print', error);
    }
}