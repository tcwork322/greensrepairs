# Greens Repairs Ltd - Website Prototype

A modern, responsive website prototype for a bike repair shop and refurbished bike sales business based in Manchester.

## 🚀 Deployment to GitHub Pages

### Automatic Deployment (Recommended)

This project is configured for automatic deployment using GitHub Actions:

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/greensrepairs.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to Pages → Source
   - Select "GitHub Actions" as the source
   - The site will deploy automatically on every push to main branch

3. **Access your site:**
   - Your site will be live at: `https://YOUR_USERNAME.github.io/greensrepairs/`

### Manual Deployment

If you prefer manual deployment:

```bash
npm run deploy
```

This will build and push to the gh-pages branch.

**Important:** Update the `base` path in `vite.config.js` if your repository name is different from 'greensrepairs'.

## Features

- **Homepage**: Introduction to services, about section, and contact call-to-action
- **Shop Page**: Browse 16 refurbished bikes with pagination (12 bikes per page)
- **Bike Detail Page**: Individual bike pages with image carousel and detailed specifications
- **Contact Page**: Contact information and inquiry form
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Brand Colors**: Design based on the Greens Repairs logo with forest green, gold, and black color scheme

## Technologies Used

- Pure HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript (no frameworks)
- Font Awesome 6.4.0 for icons
- Swiper.js 11 for image carousels
- Unsplash images for bike photos

## Project Structure

```
greensrepairs/
├── index.html          # Homepage
├── shop.html           # Bike listing page
├── bike.html           # Individual bike detail page
├── contact.html        # Contact page
├── css/
│   └── styles.css      # Main stylesheet with brand colors
├── js/
│   ├── script.js       # Global JavaScript (navigation, etc.)
│   ├── shop.js         # Shop page functionality
│   ├── bike-detail.js  # Bike detail page functionality
│   ├── bikes-data.js   # Bike inventory data
│   └── contact.js      # Contact form functionality
├── images/
│   └── site-logo.png   # Company logo
└── README.md           # This file
```

## How to Use

1. Open `index.html` in any modern web browser
2. Navigate through the site using the navigation menu
3. Browse bikes on the Shop page
4. Click on any bike to view detailed specifications
5. Use the Contact page to see contact information

## Notes

- This is a **prototype** website with demo data
- The contact form does not actually send emails (shows alert instead)
- All bike specifications are accurate to real bike models
- Images are sourced from Unsplash (free stock photos)

## Company Information

**Greens Repairs Ltd**
- Company Registration: 16976747
- Registered in England, Manchester
- Address: 5 Hollinsclough Close, Manchester M22 4HS
- Email: Greens.repairs9@outlook.com
- Phone: +44 7402 665293

## Color Scheme

Based on the company logo:
- Primary Green: #2d5016
- Accent Green: #4a8c2a
- Gold/Yellow: #f4b824
- Black: #1a1a1a
- White: #ffffff

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Future Enhancements (if converting to production)

- Backend integration for bike inventory management
- Real contact form with email sending
- Payment processing integration
- Admin panel for managing bikes
- User accounts and saved searches
- Advanced filtering and search functionality
- Blog/news section
- Customer testimonials
- Integration with booking system for repairs
