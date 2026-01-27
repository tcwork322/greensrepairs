// Function to generate URL-friendly slug
function generateSlug(name) {
    return name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// Bike detail page functionality
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bikeId = parseInt(urlParams.get('id'));

    if (!bikeId) {
        window.location.href = 'shop.html';
        return;
    }

    const bike = bikesData.find(b => b.id === bikeId);

    if (!bike) {
        window.location.href = 'shop.html';
        return;
    }

    displayBikeDetail(bike);
    displayRelatedBikes(bike);
    initializeSwiper();
});

function displayBikeDetail(bike) {
    const bikeDetail = document.getElementById('bikeDetail');
    if (!bikeDetail) return;

    bikeDetail.innerHTML = `
        <div class="bike-gallery">
            <div class="swiper">
                <div class="swiper-wrapper">
                    ${bike.images.map(img => `
                        <div class="swiper-slide">
                            <img src="${img}" alt="${bike.name}">
                        </div>
                    `).join('')}
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        </div>
        <div class="bike-details">
            <h1>${bike.name}</h1>
            <p class="bike-price-large">£${bike.price}</p>
            <span class="bike-condition">${bike.condition} Condition</span>
            <p class="bike-description">${bike.description}</p>
            
            <div class="bike-specs">
                <h3>Specifications</h3>
                <div class="specs-grid">
                    <div class="spec-item">
                        <span class="spec-label">Type</span>
                        <span class="spec-value">${bike.type}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Frame</span>
                        <span class="spec-value">${bike.specs.frame}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Fork</span>
                        <span class="spec-value">${bike.specs.fork}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Gears</span>
                        <span class="spec-value">${bike.specs.gears}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Brakes</span>
                        <span class="spec-value">${bike.specs.brakes}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Wheels</span>
                        <span class="spec-value">${bike.specs.wheels}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Weight</span>
                        <span class="spec-value">${bike.specs.weight}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Color</span>
                        <span class="spec-value">${bike.specs.color}</span>
                    </div>
                </div>
            </div>

            <div class="contact-seller">
                <h3>Interested in this bike?</h3>
                <div class="contact-buttons">
                    <a href="tel:+447402665293" class="btn btn-primary">
                        <i class="fas fa-phone"></i> Call Us
                    </a>
                    <a href="mailto:Greens.repairs9@outlook.com?subject=Inquiry about ${bike.name}" class="btn btn-secondary">
                        <i class="fas fa-envelope"></i> Email Us
                    </a>
                    <a href="contact.html" class="btn btn-outline">
                        <i class="fas fa-map-marker-alt"></i> Visit Our Shop
                    </a>
                </div>
            </div>
        </div>
    `;
}

function displayRelatedBikes(currentBike) {
    const relatedBikes = document.getElementById('relatedBikes');
    if (!relatedBikes) return;

    // Get 3 random bikes excluding the current one
    const otherBikes = bikesData.filter(b => b.id !== currentBike.id);
    const shuffled = otherBikes.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    relatedBikes.innerHTML = selected.map(bike => `
        <a href="/bikes/${generateSlug(bike.name)}.html" class="bike-card">
            <img src="${bike.image}" alt="${bike.name}" class="bike-image">
            <div class="bike-info">
                <span class="bike-type">${bike.type}</span>
                <h3>${bike.name}</h3>
                <ul class="bike-features">
                    <li><i class="fas fa-check"></i> ${bike.specs.gears}</li>
                    <li><i class="fas fa-check"></i> ${bike.specs.brakes}</li>
                    <li><i class="fas fa-check"></i> ${bike.condition} condition</li>
                </ul>
                <p class="bike-price">£${bike.price}</p>
            </div>
        </a>
    `).join('');
}

function initializeSwiper() {
    // Wait a bit for the DOM to be fully ready
    setTimeout(() => {
        new Swiper('.swiper', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
        });
    }, 100);
}
