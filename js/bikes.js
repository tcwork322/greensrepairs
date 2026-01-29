// Regular (non-electric) bikes page – uses same grid/pagination as shop
import { bikesDataRegular } from './bikes-data-regular.js';
import { generateSlug } from './utils.js';

const BIKES_PER_PAGE = 12;
let currentPage = 1;

function displayBikes(page = 1) {
    const bikesGrid = document.getElementById('bikesGrid');
    if (!bikesGrid) return;

    const startIndex = (page - 1) * BIKES_PER_PAGE;
    const endIndex = startIndex + BIKES_PER_PAGE;
    const bikesToDisplay = bikesDataRegular.slice(startIndex, endIndex);

    bikesGrid.innerHTML = bikesToDisplay.map(bike => `
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

    displayPagination(page);
}

function displayPagination(page) {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const totalPages = Math.ceil(bikesDataRegular.length / BIKES_PER_PAGE);
    const prevPage = page - 1;
    const nextPage = page + 1;

    let paginationHTML = '';

    paginationHTML += `
        <button type="button" data-page="${prevPage}" ${page === 1 ? 'disabled' : ''} aria-label="Previous page">
            <i class="fas fa-chevron-left"></i>
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button type="button" data-page="${i}" ${page === i ? 'class="active"' : ''} aria-label="Page ${i}" ${page === i ? 'aria-current="page"' : ''}>
                ${i}
            </button>
        `;
    }

    paginationHTML += `
        <button type="button" data-page="${nextPage}" ${page === totalPages ? 'disabled' : ''} aria-label="Next page">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(bikesDataRegular.length / BIKES_PER_PAGE);

    if (page < 1 || page > totalPages) return;

    currentPage = page;
    displayBikes(currentPage);

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function() {
    displayBikes(1);

    const pagination = document.getElementById('pagination');
    if (pagination) {
        pagination.addEventListener('click', function(e) {
            const btn = e.target.closest('button[data-page]');
            if (!btn || btn.disabled) return;
            const page = parseInt(btn.dataset.page, 10);
            if (!Number.isNaN(page)) changePage(page);
        });
    }
});
