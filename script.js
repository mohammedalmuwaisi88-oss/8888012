/**
 * NEXORA GAMING - Luxury Gaming Digital Store Script
 * Handles Cart Management, Modal Popups, Validation, Filter & Search, LocalStorage and WhatsApp Checkout
 */

// Global State
const CONFIG = {
    whatsappNumber: "96872420072",
    storeName: "NEXORA GAMING",
    currency: "OMR"
};

// Products Array Data (12 Products)
const products = [
    {
        id: 1,
        name: "PlayStation Plus Essential – 1 Month",
        price: 4.900,
        category: "PS Plus",
        badge: "BEST SELLER",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
        description: "اشتراك بلايستيشن بلس إسنشال لمدة شهر كامل. استمتع بالألعاب الشهرية المجانية واللعب الجماعي عبر الإنترنت."
    },
    {
        id: 2,
        name: "PlayStation Plus Essential – 3 Months",
        price: 11.900,
        category: "PS Plus",
        badge: "POPULAR",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
        description: "اشتراك بلايستيشن بلس إسنشال لمدة 3 أشهر. وصول كامل للعب أونلاين وتخزين سحابي للألعاب."
    },
    {
        id: 3,
        name: "PlayStation Plus Extra – 3 Months",
        price: 18.900,
        category: "PS Plus",
        badge: "HOT",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
        description: "اشتراك بلايستيشن بلس إكسترا لمدة 3 أشهر. يتضمن كاتالوج يتكون من مئات ألعاب PS4 و PS5."
    },
    {
        id: 4,
        name: "PlayStation Plus Deluxe – 12 Months",
        price: 39.900,
        category: "PS Plus",
        badge: "LIMITED",
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
        description: "الاشتراك الأفضل والقمة لمدة سنة كاملة. يشمل الكاتالوج الضخم إضافة للألعاب الكلاسيكية والتجريبية."
    },
    {
        id: 5,
        name: "EA SPORTS FC 24 - PS5",
        price: 19.900,
        category: "Games",
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=600&q=80",
        description: "تجربة كرة القدم الأكثر واقعية على جهاز PS5 مع تحسينات التكنولوجيا والتراخيص الكاملة."
    },
    {
        id: 6,
        name: "Call of Duty: Modern Warfare III",
        price: 24.900,
        category: "Games",
        badge: "BEST SELLER",
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80",
        description: "معارك حماسية وطور طور لعب جماعي متطور، نسخة رقمية مجهزة للتفعيل السريع."
    },
    {
        id: 7,
        name: "Grand Theft Auto V (GTA V)",
        price: 14.900,
        category: "Games",
        badge: "POPULAR",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
        description: "عالم مفتوح مغامر وممتع مع GTA Online ومحتويات حصرية معدة لجهازي PS4 و PS5."
    },
    {
        id: 8,
        name: "Minecraft Digital Edition",
        price: 9.900,
        category: "Games",
        badge: "CLASSIC",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
        description: "ابنِ وعبر عن إبداعك في عالم بلا حدود. كود رقمي أصلي مع تسليم فوري."
    },
    {
        id: 9,
        name: "PlayStation Account Package",
        price: 12.900,
        category: "Accounts",
        badge: "SPECIAL",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
        description: "حساب بلايستيشن مفعل وجاهز يحتوي على باقة ألعاب مميزة مع ضمان كامل على الحساب."
    },
    {
        id: 10,
        name: "Premium Gaming Account PS5",
        price: 19.900,
        category: "Accounts",
        badge: "VIP",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
        description: "حساب بريميوم خاص يحتوي على اشتراكات وألعاب مجهزة بالكامل مع دعم تغيير كافة البيانات."
    },
    {
        id: 11,
        name: "PlayStation Store Gift Card $10",
        price: 10.000,
        category: "Digital Codes",
        badge: "CODE",
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
        description: "كود رقمي لشحن رصيد ستور بلايستيشن بقيمة 10 دولار فورياً بحسابك."
    },
    {
        id: 12,
        name: "Gaming Digital Bundle",
        price: 22.900,
        category: "Digital Codes",
        badge: "BUNDLE",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
        description: "حزمة شاملة تتضمن كروت شحن واشتراكات رقمية بخصم حقيقي مميز."
    }
];

// App State
let cart = [];
let showingAll = false;
let currentFilter = 'all';
let searchQuery = '';
let activeProductForModal = null;

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const toggleProductsBtn = document.getElementById('toggle-products-btn');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');

// Cart Elements
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartCountEl = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartTotalEl = document.getElementById('cart-total');

// Product Modal Elements
const productModal = document.getElementById('product-modal');
const closeProductModalBtn = document.getElementById('close-product-modal');
const modalImg = document.getElementById('modal-product-img');
const modalBadge = document.getElementById('modal-product-badge');
const modalCategory = document.getElementById('modal-product-category');
const modalTitle = document.getElementById('modal-product-title');
const modalPrice = document.getElementById('modal-product-price');
const modalDesc = document.getElementById('modal-product-desc');
const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');
const modalBuyNowBtn = document.getElementById('modal-buy-now-btn');

// Checkout Modal Elements
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckoutModalBtn = document.getElementById('close-checkout-modal');
const checkoutStartBtn = document.getElementById('checkout-start-btn');
const checkoutForm = document.getElementById('checkout-form');
const checkoutSummaryItems = document.getElementById('checkout-summary-items');
const checkoutSummaryTotal = document.getElementById('checkout-summary-total');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderProducts();
    setupEventListeners();
    setupScrollEffects();
    initStatsCounter();
});

// Setup All Main Event Listeners
function setupEventListeners() {
    // Navbar Hamburger Toggle
    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    hamburger?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Filter Buttons Click
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-category');
            renderProducts();
        });
    });

    // Search Bar Input
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderProducts();
    });

    // Toggle View Products Button
    toggleProductsBtn.addEventListener('click', () => {
        showingAll = !showingAll;
        renderProducts();
    });

    // Cart Drawer Toggle
    cartToggleBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Product Modal Close
    closeProductModalBtn.addEventListener('click', closeProductModal);
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeProductModal();
    });

    // Modal Action Buttons
    modalAddToCartBtn.addEventListener('click', () => {
        if (activeProductForModal) {
            addToCart(activeProductForModal.id);
            closeProductModal();
        }
    });

    modalBuyNowBtn.addEventListener('click', () => {
        if (activeProductForModal) {
            addToCart(activeProductForModal.id);
            closeProductModal();
            openCheckout();
        }
    });

    // Checkout Flow Modal
    checkoutStartBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast("السلة فارغة! يرجى إضافة منتجات أولاً.");
            return;
        }
        closeCart();
        openCheckout();
    });

    closeCheckoutModalBtn.addEventListener('click', closeCheckout);
    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) closeCheckout();
    });

    // Payment Selection Options Styling
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            paymentOptions.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            const radio = opt.querySelector('input[type="radio"]');
            radio.checked = true;
        });
    });

    // Form Submit Handler
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);

    // Accordion Toggle Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            item.classList.toggle('active');
        });
    });

    // Keyboard Accessibility Support (Escape key)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCart();
            closeProductModal();
            closeCheckout();
        }
    });
}

// Render Products Dynamic Grid
function renderProducts() {
    let filtered = products.filter(p => {
        const matchesCategory = (currentFilter === 'all') || (p.category === currentFilter);
        const matchesSearch = p.name.toLowerCase().includes(searchQuery) || p.description.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    // Handle 5 items initially or View All
    let displayList = showingAll ? filtered : filtered.slice(0, 5);

    productsGrid.innerHTML = '';

    if (displayList.length === 0) {
        productsGrid.innerHTML = '<div class="empty-cart-msg" style="grid-column: 1/-1; padding: 40px;">لا توجد منتجات مطابقة للبحث.</div>';
        toggleProductsBtn.style.display = 'none';
        return;
    }

    displayList.forEach(product => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-wrapper" onclick="openProductModal(${product.id})">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title" onclick="openProductModal(${product.id})">${product.name}</h3>
                <p class="product-short-desc">${product.description.substring(0, 60)}...</p>
                <div class="product-bottom">
                    <div class="product-price">${product.price.toFixed(3)} ${CONFIG.currency}</div>
                    <button class="add-cart-btn" onclick="addToCart(${product.id})" aria-label="إضافة إلى السلة">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });

    // Update Button Text & Icon based on view status
    if (filtered.length <= 5) {
        toggleProductsBtn.style.display = 'none';
    } else {
        toggleProductsBtn.style.display = 'inline-flex';
        toggleProductsBtn.querySelector('span').innerText = showingAll ? 'عرض أقل' : 'عرض جميع المنتجات';
        toggleProductsBtn.querySelector('i').className = showingAll ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
    }
}

// CART FUNCTIONS
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
    showToast(`تمت إضافة "${product.name}" إلى السلة بنجاح.`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            renderCart();
        }
    }
}

function calculateTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function renderCart() {
    // Update Badge
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.innerText = totalCount;

    // Render Drawer Content
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">السلة فارغة حالياً</p>';
    } else {
        cart.forEach(item => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${(item.price * item.quantity).toFixed(3)} ${CONFIG.currency}</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="delete-item-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });
    }

    const total = calculateTotal();
    cartSubtotalEl.innerText = `${total.toFixed(3)} ${CONFIG.currency}`;
    cartTotalEl.innerText = `${total.toFixed(3)} ${CONFIG.currency}`;
}

function saveCart() {
    localStorage.setItem('nexora_cart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('nexora_cart');
    if (saved) {
        try {
            cart = JSON.parse(saved);
        } catch (e) {
            cart = [];
        }
    }
    renderCart();
}

// CART DRAWER MODAL CONTROL
function openCart() {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
}

function closeCart() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
}

// PRODUCT MODAL CONTROL
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    activeProductForModal = product;
    modalImg.src = product.image;
    modalBadge.innerText = product.badge || 'NEXORA';
    modalCategory.innerText = product.category;
    modalTitle.innerText = product.name;
    modalPrice.innerText = `${product.price.toFixed(3)} ${CONFIG.currency}`;
    modalDesc.innerText = product.description;

    productModal.classList.add('active');
}

function closeProductModal() {
    productModal.classList.remove('active');
    activeProductForModal = null;
}

// CHECKOUT CONTROL & VALIDATION
function openCheckout() {
    renderCheckoutSummary();
    checkoutModal.classList.add('active');
}

function closeCheckout() {
    checkoutModal.classList.remove('active');
}

function renderCheckoutSummary() {
    checkoutSummaryItems.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'summary-item-line';
        div.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>${(item.price * item.quantity).toFixed(3)} ${CONFIG.currency}</span>
        `;
        checkoutSummaryItems.appendChild(div);
    });
    checkoutSummaryTotal.innerText = `${calculateTotal().toFixed(3)} ${CONFIG.currency}`;
}

function handleCheckoutSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('checkout-name').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const email = document.getElementById('checkout-email').value.trim();
    const instagram = document.getElementById('checkout-instagram').value.trim();
    const notes = document.getElementById('checkout-notes').value.trim();
    const paymentMethod = document.querySelector('input[name="payment_method"]:checked').value;

    // Reset Errors
    document.getElementById('error-name').innerText = '';
    document.getElementById('error-phone').innerText = '';

    let isValid = true;

    if (!name) {
        document.getElementById('error-name').innerText = 'الرجاء أدخل الاسم الكامل.';
        isValid = false;
    }

    if (!phone) {
        document.getElementById('error-phone').innerText = 'الرجاء أدخل رقم الهاتف.';
        isValid = false;
    } else if (!/^[0-9+]+$/.test(phone)) {
        document.getElementById('error-phone').innerText = 'رقم الهاتف يجب أن يحتوي على أرقام فقط.';
        isValid = false;
    }

    if (!isValid) return;

    if (paymentMethod === 'whatsapp') {
        processWhatsAppCheckout({ name, phone, email, instagram, notes });
    } else {
        processElectronicPaymentDemo();
    }
}

// Generate Invoice & Redirect to WhatsApp
function processWhatsAppCheckout(userData) {
    const orderId = 'NG-' + Math.floor(10000 + Math.random() * 90000);
    const total = calculateTotal().toFixed(3);

    let itemsList = '';
    cart.forEach(item => {
        itemsList += `▪️ *${item.name}*\n  الكمية: ${item.quantity} | السعر: ${(item.price * item.quantity).toFixed(3)} ${CONFIG.currency}\n`;
    });

    const message = `السلام عليكم ورحمة الله،\n` +
        `أرغب في شراء المنتجات التالية من *${CONFIG.storeName}*:\n\n` +
        `🔖 *رقم الطلب:* ${orderId}\n` +
        `👤 *الاسم:* ${userData.name}\n` +
        `📱 *رقم الهاتف:* ${userData.phone}\n` +
        (userData.email ? `📧 *البريد:* ${userData.email}\n` : '') +
        (userData.instagram ? `📸 *الانستجرام:* ${userData.instagram}\n` : '') +
        `-----------------------------------\n` +
        `📦 *المنتجات المطلوبة:*\n${itemsList}` +
        `-----------------------------------\n` +
        `💰 *المجموع والإجمالي:* ${total} ${CONFIG.currency}\n` +
        `💳 *طريقة الدفع:* إكمال عبر واتساب\n` +
        (userData.notes ? `📝 *ملاحظات:* ${userData.notes}\n` : '') +
        `\nشكرًا لكم!`;

    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMsg}`;

    // Clear Cart State
    cart = [];
    saveCart();
    renderCart();
    closeCheckout();

    showToast("جاري توجيهك إلى WhatsApp لإكمال الطلب...");

    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 1200);
}

// Placeholder for Electronic Gateway integration
function processElectronicPaymentDemo() {
    /* ===================================================================
       IMPORTANT: Real Payment Gateway Backend Integration Point.
       Here you can integrate with Stripe, PayTabs, Thawani or Tap APIs.
       Send cart data and user details to your secure backend endpoint.
       ===================================================================
    */
    alert("سيتم ربط بوابة الدفع الإلكتروني الآمنة هنا مستقبلاً (Stripe / Thawani / PayTabs).\nتم تنفيذ الواجهة بنجاح للعرض التجريبي.");
}

// UTILITY FUNCTIONS
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--accent-blue)"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    window.addEventListener('scroll', () => {
        const aboutSection = document.getElementById('about');
        if (!aboutSection) return;

        const pos = aboutSection.getBoundingClientRect().top;
        if (pos < window.innerHeight - 100 && !animated) {
            animated = true;
            statNumbers.forEach(num => {
                const target = +num.getAttribute('data-target');
                let count = 0;
                const speed = target / 50;

                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        num.innerText = Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else {
                        num.innerText = target;
                    }
                };
                updateCount();
            });
        }
    });
}

function setupScrollEffects() {
    // Reveal Animations during scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .product-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease-out';
        observer.observe(el);
    });
}
