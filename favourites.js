// Get the category button and dropdown menu
const categoryBtn = document.querySelector('.category-btn');
const dropdownMenu = document.getElementById('dropdownMenu');


// Toggle dropdown visibility when the button is clicked
categoryBtn.addEventListener('click', function() {
    dropdownMenu.classList.toggle('show');
});

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.category-btn')) {
        if (dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
        }
    }
};

// overlay language
const modalBtn = document.querySelector(".address-btn");
const modalOverlay = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");

modalBtn.addEventListener("click", function(){
    modalOverlay.classList.add("open-modal");
    console.log("Modal Button clicked");
});

closeBtn.addEventListener("click", function(){
    modalOverlay.classList.remove("open-modal");
});

// overlay sign in 
const modalSignInBtn = document.getElementById("sign-in");
const modalSignInOverlay = document.querySelector(".sign-in-modal-overlay");
const closeSignInBtn = document.querySelector(".close-sign-in-btn");

modalSignInBtn.addEventListener("click", function(){
    modalSignInOverlay.classList.add("open-sign-in-modal");
    
});
closeSignInBtn.addEventListener("click", function(){
    modalSignInOverlay.classList.remove("open-sign-in-modal");
    
});


document.addEventListener('DOMContentLoaded', () => {
    // Function to update cart count based on items in localStorage
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalItems = cartItems.reduce((sum, item) => {
            const quantity = Number(item.quantity) || 0; // Make sure quantity is a number
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
    }

    // Call this function when the page loads to update the cart count
    updateCartCount();

    // Your existing favorites logic goes here...
    const favoritesList = document.getElementById('favorites-list');
    const favouritesContainer = document.querySelector('.favourites-container');

    const updateFavoritesList = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        favoritesList.innerHTML = '';

        if (favorites.length === 0) {
            favoritesList.innerHTML = '<p>No favorite items yet.</p>';
            favouritesContainer.style.display = 'block'; 
        } else {
            favouritesContainer.style.display = 'none'; 

            favorites.forEach(item => {
                const favoriteItemHTML = `
                    <div class="article-box favorites-box">
                        <img src="${item.image}" alt="Product Image">
                        <span class="add-fav">
                            <i class="fa-solid fa-heart"></i>
                        </span>
                        <h4>${item.title}</h4>
                        <span class="new-price">
                            <span class="currency-symbol">USD</span>
                            <span class="currency-value">${item.newPrice}</span>
                        </span>
                        <span class="old-price">
                            <span class="currency-symbol">USD</span>
                            <span class="currency-value">${item.oldPrice}
                                <span class="discount">${item.discount}</span>
                            </span>
                        </span>
                        <span class="rating">
                            <span class="rating-value">${item.rating}</span>
                            <span><i class="fa-solid fa-star"></i></span>
                            <span class="likes">(${item.likes})</span>
                        </span>
                    </div>
                `;
                favoritesList.innerHTML += favoriteItemHTML;
            });

            const favIcons = document.querySelectorAll('.favorites-box .add-fav i');
            favIcons.forEach((icon, index) => {
                icon.addEventListener('click', () => {
                    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                    favorites.splice(index, 1); 
                    localStorage.setItem('favorites', JSON.stringify(favorites)); 
                    updateFavoritesList(); 
                });
            });
        }
    };

    updateFavoritesList();
});
