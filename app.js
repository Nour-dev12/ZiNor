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





// Ensure everything runs after the DOM is loaded
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

    // Favorite button logic
    const addFavBtns = document.querySelectorAll(".add-fav i");
    if (addFavBtns.length > 0) {

        // Function to update heart icons based on favorites in localStorage
        const updateHeartIcons = () => {
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            favorites.forEach(item => {
                addFavBtns.forEach(favBtn => {
                    const articleBox = favBtn.parentElement.parentElement;
                    const title = articleBox.querySelector('h4').textContent;
                    if (item.title === title) {
                        // Change the heart icon to solid if the item is in favorites
                        favBtn.classList.add("fa-solid");
                        favBtn.classList.remove("fa-regular");
                    }
                });
            });
        };

        // Call the function to update heart icons on page load
        updateHeartIcons();

        addFavBtns.forEach((favBtn) => {
            favBtn.addEventListener("click", (e) => {
                const favBtnClasslist = e.target.classList;
                const articleBox = e.target.parentElement.parentElement;

                // Get details of the article
                const itemDetails = {
                    image: articleBox.querySelector('img').src,
                    title: articleBox.querySelector('h4').textContent,
                    newPrice: articleBox.querySelector('#new-price .currency-value').textContent.trim(),
                    oldPrice: articleBox.querySelector('#old-price .currency-value').textContent.trim(),
                    discount: articleBox.querySelector('.discount') ? articleBox.querySelector('.discount').textContent.trim() : '',
                    rating: articleBox.querySelector('.rating-value').textContent.trim(),
                    likes: articleBox.querySelector('.likes').textContent.trim()
                };

                // Retrieve existing favorites from localStorage
                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

                // Check if the item already exists in favorites
                const isFavorite = favorites.some(item => item.title === itemDetails.title);
                if (!isFavorite) {
                    // Add the new favorite item
                    favorites.push(itemDetails);
                    alert('Item added to favorites!'); // Optional feedback
                    // Change the heart icon to solid
                    favBtnClasslist.add("fa-solid");
                    favBtnClasslist.remove("fa-regular");

                } else {
                    // Remove the item from favorites
                    favorites = favorites.filter(item => item.title !== itemDetails.title);
                    alert('Item removed from favorites!'); // Optional feedback
                    // Change the heart icon back to regular
                    favBtnClasslist.add("fa-regular");
                    favBtnClasslist.remove("fa-solid");
        
                }

                // Save updated favorites back to localStorage
                localStorage.setItem('favorites', JSON.stringify(favorites));
            });
        });
    }
    const articleContainer = document.querySelector('.article-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Set scroll amount (you can adjust this value as needed)
    const scrollAmount = 200; // Change this value to control how much to scroll

    // Add event listener for the next button
    nextBtn.addEventListener('click', () => {
        articleContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth' // Smooth scroll effect
        });
    });

    // Add event listener for the previous button
    prevBtn.addEventListener('click', () => {
        articleContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth' // Smooth scroll effect
        });
    });
});













