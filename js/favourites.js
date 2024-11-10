// Navbar Toggle Functionality
const toggleNavbar = document.querySelector('.toggle-navbar');
const navMenu = document.querySelector('.nav-menu-container');
const navClose = document.querySelector('.nav-close'); // Close button for navbar

// Dropdown menu toggle behavior in the navbar
document.querySelectorAll('.nav-menu-container .nav-menu > li').forEach((menuItem) => {
    const dropdownMenu = menuItem.querySelector('.dropdown-menu');
    const dropdownToggle = menuItem.querySelector('a');
    const dropdownClose = menuItem.querySelector('.dropdown-close');

    dropdownToggle.addEventListener('click', function (e) {
        e.preventDefault();
        if (window.innerWidth <= 945) {
            dropdownMenu.classList.add('show');
            toggleNavbar.classList.add('hide');
        }
    });

    if (dropdownClose) {
        dropdownClose.addEventListener('click', function () {
            if (window.innerWidth <= 945) {
                dropdownMenu.classList.remove('show');
                toggleNavbar.classList.remove('hide');
            }
        });
    }
});

// Open navbar menu when toggle button is clicked
toggleNavbar.addEventListener('click', function () {
    if (window.innerWidth <= 945) {
        navMenu.classList.add('show');
        toggleNavbar.classList.add('hide');
        navClose.classList.add('show');
    }
});

// Close navbar menu when close button is clicked
navClose.addEventListener('click', function () {
    navMenu.classList.remove('show');
    toggleNavbar.classList.remove('hide');
    navClose.classList.remove('show');
});

// Cart count update function
document.addEventListener('DOMContentLoaded', () => {
    const updateCartCount = () => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalItems = cartItems.reduce((sum, item) => {
            const quantity = Number(item.quantity) || 0; // Ensure quantity is a number
            return sum + quantity;
        }, 0);

        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;

            if (totalItems > 0) {
                cartCountElement.classList.add('active');
            } else {
                cartCountElement.classList.remove('active');
            }
        }
    };

    // Call this function when the page loads to update the cart count
    updateCartCount();
});

// Favorites page handling

console.log('Favorites Page Loaded');

document.addEventListener('DOMContentLoaded', () => {
    const favoritesList = document.getElementById('favorites-list');
    const initialFavoritesSection = document.querySelector('.initial-favorites-section');

    // Function to load favorites from localStorage
    const loadFavorites = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favoritesList.innerHTML = '';  // Clear the favorites list

        if (favorites.length === 0) {
            if (initialFavoritesSection) initialFavoritesSection.style.display = 'block';
        } else {
            if (initialFavoritesSection) initialFavoritesSection.style.display = 'none';

            // Create favorite articles
            favorites.forEach(item => {
                const article = document.createElement('div');
                article.classList.add('product-card');
                article.setAttribute('data-id', item.id);

                article.innerHTML = `
                    <div class="image-container">
                        <img src="${item.img}" alt="${item.name}" class="product-image">
                        <div class="icons">
                            <i class="fas fa-heart favorite-icon active" data-id="${item.id}" aria-disabled="true"></i>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${item.name}</h3>
                        <p class="product-price">$${item.price}</p>
                        <button class="remove-favorite" data-id="${item.id}">Remove</button>
                    </div>
                `;
                favoritesList.appendChild(article);
            });
        }
    };

    // Function to remove item from favorites
    const removeFavorite = (productId) => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        console.log(`Favorites before removal: ${JSON.stringify(favorites)}`);
    
        // Log product ID to ensure it's the correct ID
        console.log(`Removing product ID: ${productId}`);
    
        // Convert productId to a number before comparing with the id stored in favorites
        favorites = favorites.filter(item => item.id !== Number(productId));
    
        console.log(`Favorites after removal: ${JSON.stringify(favorites)}`);
    
        if (favorites.length === 0) {
            localStorage.removeItem('favorites');
        } else {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    
        loadFavorites(); // Refresh the list
        updateHeartIconOnShopPage(productId);  // Update the heart icon
    };
    

    // Function to update the heart icon on the shop page when an item is removed from favorites
    const updateHeartIconOnShopPage = (productId) => {
        console.log(`Updating heart icon for product ID: ${productId}`); // Debugging step
        const heartIcon = document.querySelector(`.product-card[data-id="${productId}"] .favorite-icon`);
        if (heartIcon) {
            heartIcon.classList.remove('active'); // Remove the "active" class to revert to the default heart state
        } else {
            console.log(`Heart icon not found for product ID: ${productId}`); // Debugging step if heart icon isn't found
        }
    };

    // Event listener for toggling favorites and "Remove" button functionality
    favoritesList.addEventListener('click', (e) => {
        // Handle "Remove" button click
        if (e.target.classList.contains('remove-favorite')) {
            const productId = e.target.getAttribute('data-id');
            console.log(`Remove button clicked for product ID: ${productId}`); // Debugging step
            removeFavorite(productId);  // Remove from the favorites
        }
    });

    // Initial load of favorites
    loadFavorites();
});
