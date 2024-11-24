document.querySelector('#sign-in-icon').addEventListener('click', function() {
    const parentListItem = this.closest('.sign-in-container'); // Find the parent container
    parentListItem.classList.toggle('clicked'); // Toggle the visibility of the signup message
});



// Declare products array globally so it can be accessed in both event listeners
let products = [
    {
        id: 1,
        name: "Product 1",
        price: 5,
        img: "/img/women/dresses/d1.jpg",
        smallImages: [
            "/img/women/dresses/d1.jpg",
            "/img/women/dresses/d2.jpg",
            "/img/women/dresses/d3.jpg",
            "/img/women/dresses/d4.jpg"
        ],
        popularity: 20,
        rating: 4.5,
        latest: "2023-10-01"
    },
    {
        id: 2,
        name: "Product 2",
        price: 10,
        img: "/img/women/dresses/d5.jpg",
        smallImages: [
            "/img/women/dresses/d5.jpg",
            "/img/women/dresses/d6.jpg",
            "/img/women/dresses/d7.jpg",
            "/img/women/dresses/d8.jpg"
        ],
        popularity: 15,
        rating: 4.0,
        latest: "2023-11-01"
    },
    {
        id: 3,
        name: "Product 3",
        price: 15,
        img: "/img/women/dresses/f2.jpeg",
        smallImages: [
            "/img/women/dresses/f2.jpeg",
            "/img/women/dresses/alt7.jpeg",
            "/img/women/dresses/alt8.jpeg",
            "/img/women/dresses/alt9.jpeg"
        ],
        popularity: 25,
        rating: 5.0,
        latest: "2023-09-15"
    },
    {
        id: 4,
        name: "Product 4",
        price: 20,
        img: "/img/women/dresses/f3.jpeg",
        smallImages: [
            "/img/women/dresses/f3.jpeg",
            "/img/women/dresses/alt10.jpeg",
            "/img/women/dresses/alt11.jpeg",
            "/img/women/dresses/alt12.jpeg"
        ],
        popularity: 10,
        rating: 3.5,
        latest: "2023-08-10"
    },
    {
        id: 5,
        name: "Product 5",
        price: 25,
        img: "/img/women/dresses/f4.jpeg",
        smallImages: [
            "/img/women/dresses/f4.jpeg",
            "/img/women/dresses/alt13.jpeg",
            "/img/women/dresses/alt14.jpeg",
            "/img/women/dresses/alt15.jpeg"
        ],
        popularity: 30,
        rating: 4.8,
        latest: "2023-11-05"
    },
    {
        id: 6,
        name: "Product 6",
        price: 30,
        img: "/img/women/dresses/f5.jpeg",
        smallImages: [
            "/img/women/dresses/f5.jpeg",
            "/img/women/dresses/alt16.jpeg",
            "/img/women/dresses/alt17.jpeg",
            "/img/women/dresses/alt18.jpeg"
        ],
        popularity: 5,
        rating: 2.5,
        latest: "2023-10-20"
    },
    {
        id: 7,
        name: "Product 7",
        price: 35,
        img: "/img/women/dresses/f6.jpeg",
        smallImages: [
            "/img/women/dresses/f6.jpeg",
            "/img/women/dresses/alt19.jpeg",
            "/img/women/dresses/alt20.jpeg",
            "/img/women/dresses/alt21.jpeg"
        ],
        popularity: 18,
        rating: 3.8,
        latest: "2023-11-02"
    },
    {
        id: 8,
        name: "Product 8",
        price: 40,
        img: "/img/women/dresses/f7.jpeg",
        smallImages: [
            "/img/women/dresses/f7.jpeg",
            "/img/women/dresses/alt22.jpeg",
            "/img/women/dresses/alt23.jpeg",
            "/img/women/dresses/alt24.jpeg"
        ],
        popularity: 40,
        rating: 4.2,
        latest: "2023-10-30"
    },
    {
        id: 9,
        name: "Product 9",
        price: 45,
        img: "/img/women/dresses/f8.jpeg",
        smallImages: [
            "/img/women/dresses/f8.jpeg",
            "/img/women/dresses/alt25.jpeg",
            "/img/women/dresses/alt26.jpeg",
            "/img/women/dresses/alt27.jpeg"
        ],
        popularity: 22,
        rating: 4.6,
        latest: "2023-11-03"
    },
    {
        id: 10,
        name: "Product 10",
        price: 50,
        img: "/img/women/dresses/f9.jpeg",
        smallImages: [
            "/img/women/dresses/f9.jpeg",
            "/img/women/dresses/alt28.jpeg",
            "/img/women/dresses/alt29.jpeg",
            "/img/women/dresses/alt30.jpeg"
        ],
        popularity: 32,
        rating: 3.9,
        latest: "2023-10-05"
    }
];


document.addEventListener('DOMContentLoaded', () => {
    let currentProductIndex = 0;
    const productsToShow = 8;

    // Show products
    function showProducts(sortedProducts) {
        const container = document.querySelector('.products-container');
        const productsToDisplay = sortedProducts || products;
        const endProductIndex = Math.min(currentProductIndex + productsToShow, productsToDisplay.length);

        for (let i = currentProductIndex; i < endProductIndex; i++) {
            const product = productsToDisplay[i];
            const productBox = document.createElement('div');
            productBox.className = 'product-card';
            productBox.innerHTML = `
                <div class="product-card">
                    <div class="image-container">
                    <img src="${product.img}" alt="${product.name}" class="product-image" />
                    <div class="icons">
                    <i class="far fa-heart favorite-icon" data-id="${product.id}"></i>
                    </div>
                    </div>
                    <div class="product-info">
                    <span class="product-name">${product.name}</span>
                    <span class="product-price">$${product.price}</span>
                    </div>
                </div>
            `;
            container.appendChild(productBox);

            // Set the heart icon state based on localStorage favorites
            const heartIcon = productBox.querySelector('.favorite-icon');
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const isFavorite = favorites.some(favProduct => favProduct.id === product.id);

            if (isFavorite) {
                heartIcon.classList.add('fas'); // Filled heart
                heartIcon.classList.remove('far'); // Remove empty heart
            } else {
                heartIcon.classList.add('far'); // Empty heart
                heartIcon.classList.remove('fas'); // Remove filled heart
            }

        // Add click event to navigate to the single product page
productBox.addEventListener('click', (e) => {
    // Check if the click was not on the heart icon
    if (!e.target.classList.contains('favorite-icon')) {
        // Save product details to local storage
        localStorage.setItem('selectedProduct', JSON.stringify(product));

        // Redirect to single product page
        window.location.href = 'sproduct.html';
    }
});

        }

        currentProductIndex = endProductIndex;
        updateResultsMessage();
    }

    // Update results message
    function updateResultsMessage() {
        const resultsMessage = document.querySelector('.showing-results p');
        const totalProducts = products.length;
        const displayedProducts = currentProductIndex;
        resultsMessage.textContent = `Showing ${displayedProducts} of ${totalProducts} results`;
    }

    // Initial load of products
    showProducts();

    document.querySelector('.show-more-btn').addEventListener('click', function() {
        if (currentProductIndex < products.length) {
            showProducts();
        }
    });

    // Function to toggle the heart icon and add/remove products to favorites
// Function to toggle the heart icon and add/remove products to favorites
function toggleFavorite(event, productId) {
    event.preventDefault(); // Prevent default link navigation behavior
    
    const heartIcon = event.target; // Get the clicked heart icon directly from the event target
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    const productIndex = favorites.findIndex(product => product.id === productId);
    
    if (productIndex === -1) {
        // Add product to favorites
        const product = products.find(p => p.id === productId);
        favorites.push(product);
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
        
        // Show the notification for adding to favorites
        showNotification("Added to favorites");
    } else {
        // Remove product from favorites
        favorites.splice(productIndex, 1);
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
        
        // Show the notification for removing from favorites
        showNotification("Removed from favorites");
    }
    
    // Save updated favorites list to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
}



// Event listener for heart icons to toggle favorites
document.querySelector('.products-container').addEventListener('click', (e) => {
    // Ensure the clicked element is the heart icon
    if (e.target && e.target.classList.contains('favorite-icon')) {
        const productId = e.target.dataset.id; // Get product ID from data attribute
        toggleFavorite(e, Number(productId)); // Call the toggleFavorite function with the correct ID

        // Prevent event bubbling to the parent product card
        e.preventDefault(); 
        e.stopPropagation();
        e.stopImmediatePropagation(); // Ensures no further propagation
    }
});




    
    
    function showNotification(message) {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notification-text');
        
        notificationText.textContent = message; // Set the message
        notification.classList.add('show'); // Show the notification
        
        // Hide the notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    

    // Loading favorites on favourites.html page
    if (window.location.pathname.includes('favourites.html')) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const container = document.querySelector('.favorites-container');
        if (favorites.length > 0) {
            favorites.forEach(product => {
                const productBox = document.createElement('div');
                productBox.className = 'product-card';
                productBox.innerHTML = `
                <div class="image-container">
                <img src="${product.img}" alt="${product.name}" class="product-image" />
                <div class="icons">
                    <i class="fas fa-heart favorite-icon" data-id="${product.id}"></i>
                </div>
            </div>
            <div class="product-info">
                <span class="product-name">${product.name}</span>
                <span class="product-price">$${product.price}</span>
            </div>
                `;
                container.appendChild(productBox);
            });
        } else {
            const message = document.createElement('p');
            message.textContent = "No favorites added yet.";
            container.appendChild(message);
        }
    }
});

// Toggle sidebar open when clicking the filter button
document.getElementById("filterBtn").addEventListener("click", function () {
    document.querySelector(".sidebar").classList.toggle("open");
});
document.getElementById("closeBtn").addEventListener("click", function () {
    document.querySelector(".sidebar").classList.remove("open");
});










