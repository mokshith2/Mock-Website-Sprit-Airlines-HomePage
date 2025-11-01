/* script.js */
// Carousel data
const carouselData = [
    {
        location: "Lake Buena Vista, FL",
        rating: "⭐⭐⭐⭐",
        hotelName: "Caribe Royale Orlando",
        origin: "from Atlanta (ATL)",
        duration: "3 nights hotel + flight from",
        savings: "USD 507.16",
        taxes: "includes estimated taxes & fees",
        points: "earn from 3814 points per member",
        departDate: "Depart Nov 24, 2025",
        image: "https://photos.hotelbeds.com/giata/01/013268/013268a_hb_a_002.jpg?20250205050547"
    },
    {
        location: "Orlando, FL",
        rating: "⭐⭐⭐⭐",
        hotelName: "The Grove Resort & Water Park Orlando",
        origin: "from Dallas (DAL)",
        duration: "3 nights hotel + flight from",
        savings: "USD 502.71",
        taxes: "includes estimated taxes & fees",
        points: "earn from 3438 points per member",
        departDate: "Depart Nov 16, 2025",
        image: "https://photos.hotelbeds.com/giata/47/478624/478624a_hb_a_007.jpg"
    },
    {
        location: "Saint James, Jamaica",
        rating: "⭐⭐⭐⭐⭐",
        hotelName: "Hyatt Ziva Rose Hall",
        origin: "from Las Vegas (LAS)",
        duration: "3 nights hotel + flight from",
        savings: "USD 945.08",
        taxes: "includes estimated taxes & fees",
        points: "earn from 7345 points per member",
        departDate: "Depart Dec 07, 2025",
        image: "https://cdn.propertyview.net/media/images/081/a2/91/d50c3f74c78327c42cd6240db339.jpg"
    }
];

// Initialize carousel
function initCarousel() {
    const container = document.querySelector('.carousel-container');
    const navContainer = document.querySelector('.carousel-nav');
    
    if (!container || !navContainer) return;
    
    // Clear existing content
    container.innerHTML = '';
    navContainer.innerHTML = '';
    
    // Create carousel items
    carouselData.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        carouselItem.innerHTML = `
            <img src="${item.image}" alt="${item.hotelName}">
            <div class="package-details">
                <div class="location">${item.location}</div>
                <div class="rating">${item.rating}</div>
                <div class="hotel-name">${item.hotelName}</div>
                <div class="from-origin">${item.origin}</div>
                <div class="duration">${item.duration}</div>
                <div class="savings"><span class="savingsAmount">${item.savings}</span> <span class="savingsText">per guest</span></div>
                <div class="taxAndFeeInfo">${item.taxes}</div>
                <div class="points">${item.points}</div>
                <div class="depart-date">${item.departDate}</div>
                <a class="btn btn-yellow" href="#">Explore package</a>
            </div>
        `;
        container.appendChild(carouselItem);
        
        // Create navigation dot
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => scrollToItem(index));
        navContainer.appendChild(dot);
    });
    
    // Setup scroll listener
    setupCarouselScroll();
}

// Setup carousel scroll behavior
function setupCarouselScroll() {
    const container = document.querySelector('.carousel-container');
    const dots = document.querySelectorAll('.carousel-nav .dot');
    
    if (!container || !dots.length) return;
    
    let currentIndex = 0;
    
    function updateDots(activeIndex) {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }
    
    function scrollToItem(index) {
        const items = container.querySelectorAll('.carousel-item');
        if (items[index]) {
            container.scrollTo({
                left: items[index].offsetLeft,
                behavior: 'smooth'
            });
            currentIndex = index;
            updateDots(index);
        }
    }
    
    // Listen for scroll events
    container.addEventListener('scroll', () => {
        const scrollLeft = container.scrollLeft;
        const itemWidth = container.querySelector('.carousel-item').offsetWidth + 32; // including gap
        const newIndex = Math.round(scrollLeft / itemWidth);
        
        if (newIndex !== currentIndex && newIndex < dots.length) {
            currentIndex = newIndex;
            updateDots(currentIndex);
        }
    });
    
    // Expose scroll function globally (useful for dots)
    window.scrollToItem = scrollToItem;
}

// Tab switching
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Form handling (one-way)
function initForm() {
    const form = document.getElementById('searchForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const from = formData.get('from');
        const to = formData.get('to');
        const departDate = formData.get('depart');
        const pax = formData.get('pax') || '1';
        
        if (!from || !to) {
            alert('Please enter both departure and destination cities');
            return;
        }
        
        if (!departDate) {
            alert('Please select a departure date');
            return;
        }
        
        const submitBtn = form.querySelector('.btn-large');
        const originalText = submitBtn ? submitBtn.textContent : 'Searching...';
        
        if (submitBtn) {
            submitBtn.textContent = 'Searching...';
            submitBtn.disabled = true;
        }
        
        setTimeout(() => {
            alert(`Searching one-way flights from ${from} to ${to} on ${departDate} for ${pax} passenger(s).`);
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }, 900);
    });
}

// Swap origin and destination
function initSwapButton() {
    const swapBtn = document.querySelector('.swap-btn');
    if (!swapBtn) return;
    swapBtn.addEventListener('click', () => {
        const fromInput = document.querySelector('input[name="from"]');
        const toInput = document.querySelector('input[name="to"]');
        if (!fromInput || !toInput) return;
        const temp = fromInput.value;
        fromInput.value = toInput.value || '';
        toInput.value = temp || '';
    });
}

// Global click handler
function initClickHandlers() {
    document.addEventListener('click', function(e) {
        const target = e.target.closest('button, a');
        if (!target) return;
        
        // Handle specific button clicks
        if (target.classList.contains('login-btn')) {
            alert('Opening login form (placeholder)');
        } else if (target.classList.contains('language-switcher')) {
            alert('Switching language (placeholder)');
        } else if (target.classList.contains('nav-item') && target.classList.contains('icon-only')) {
            const svg = target.querySelector('svg');
            const ariaLabel = svg ? svg.getAttribute('aria-label') : 'icon';
            alert(`Clicked ${ariaLabel} icon (placeholder)`);
        } else if (target.textContent.includes('Learn more') && target.classList.contains('btn')) {
            alert('Redirecting to credit card offer details (placeholder)');
        } else if (target.textContent.includes('Book now')) {
            alert('Booking now (placeholder)');
        } else if (target.textContent.includes('Sign up')) {
            alert('WiFi signup (placeholder)');
        } else if (target.textContent.includes('Explore')) {
            alert('Exploring package (placeholder)');
        }
        
        // Handle create account link
        if (target.classList.contains('link-blue') && target.textContent.includes('Create account')) {
            alert('Opening account creation form (placeholder)');
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initTabs();
    initForm();
    initSwapButton();
    initClickHandlers();
});
