// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const messageEl = document.getElementById('message');
    const subjectEl = document.getElementById('subject');

    // Pre-fill message (and subject) when arriving from a bike detail "Book a service" link
    const params = new URLSearchParams(window.location.search);
    const bike = params.get('bike');
    if (bike && messageEl) {
        const decodedBike = decodeURIComponent(bike);
        messageEl.value = 'I would like to book a service for the ' + decodedBike + '.';
        if (subjectEl) {
            subjectEl.value = 'repair';
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Show success message (in a real application, this would send the data to a server)
            alert('Thank you for your message! We will get back to you shortly.');

            // Reset form
            contactForm.reset();
        });
    }
});
