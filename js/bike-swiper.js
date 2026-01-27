// Import Swiper and its styles
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Initialize Swiper
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.swiper')) {
        new Swiper('.swiper', {
            modules: [Navigation, Pagination, Autoplay],
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
    }
});
