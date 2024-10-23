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




// single product
const smallImages = document.querySelectorAll('.small-img-col'); 
const mainImage = document.getElementById('mainImg');
const prevButton = document.querySelector('.prev-img'); // Select the previous button
const nextButton = document.querySelector('.next-img'); // Select the next button

let currentIndex = 0;

// Function to update the main image and active state
function updateMainImage(index) {
    // Get the new source from the clicked image's data-image
    const newSrc = smallImages[index].querySelector('img').getAttribute('data-image');
    
    // Update the main image
    mainImage.src = newSrc;

    // Remove the 'active' class from all small image columns
    smallImages.forEach(col => {
        col.classList.remove('active');
    });

    // Add the 'active' class to the current small image column
    smallImages[index].classList.add('active');
}

// Add event listeners to each small image column
smallImages.forEach((smallImgCol, index) => {
    smallImgCol.addEventListener('click', () => {
        currentIndex = index; // Update the current index to the clicked image's index
        updateMainImage(currentIndex);
    });
});


// Event listener for the previous button
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--; // Decrement index if not at the first image
    } else {
        currentIndex = smallImages.length - 1; // Loop back to the last image
    }
    updateMainImage(currentIndex); // Update the main image
});

// Event listener for the next button
nextButton.addEventListener('click', () => {
    if (currentIndex < smallImages.length - 1) {
        currentIndex++; // Increment index if not at the last image
    } else {
        currentIndex = 0; // Loop back to the first image
    }
    updateMainImage(currentIndex); // Update the main image
});




//about section
const aboutItemHeader = document.getElementById('about-item-btn');
const itemDetails = document.querySelector('.item-details');
const collapsibleText = document.getElementById('collapsible-text');
const readMoreBtn = document.getElementById('read-more-btn');

// Click "About this item" to show the content
aboutItemHeader.addEventListener('click', function() {
    if (itemDetails.style.display === 'block') {
        itemDetails.style.display = 'none'; // Hide the paragraph and read more button
        readMoreBtn.style.display = 'none'; // Hide read more button
    } else {
        itemDetails.style.display = 'block'; // Show the paragraph and read more button
        readMoreBtn.style.display = 'inline'; // Show read more button
    }
});

// Click "Read more" to expand or collapse the text
readMoreBtn.addEventListener('click', function() {
    collapsibleText.classList.toggle('expanded');
    
    if (collapsibleText.classList.contains('expanded')) {
        readMoreBtn.textContent = 'Read less';
    } else {
        readMoreBtn.textContent = 'Read more';
    }
});


const aboutItemHeader2 = document.getElementById('about-item-btn-2');
const itemDetails2 = document.querySelector('.item-details-2');
const collapsibleText2 = document.getElementById('collapsible-text-2');

window.addEventListener("DOMContentLoaded", function(){
    itemDetails2.style.display = 'block';
})

aboutItemHeader2.addEventListener('click', function() {
    if (itemDetails2.style.display === 'block') {
        itemDetails2.style.display = 'none'; // Hide the paragraph and read more button
    } else {
        itemDetails2.style.display = 'block'; // Show the paragraph and read more button
    }
});




// reviews 

const reviews = document.querySelectorAll('.reviewer-rating'); // Select all review elements
const reviewsPerPage = 3; // Number of reviews to show per page
let currentPage = 1;
const totalPages = Math.ceil(reviews.length / reviewsPerPage); // Total number of pages

// Show the current page reviews
function showPage(page) {
    const start = (page - 1) * reviewsPerPage;
    const end = start + reviewsPerPage;

    // Show/hide reviews
    reviews.forEach((review, index) => {
        if (index >= start && index < end) {
            review.style.display = 'block';
        } else {
            review.style.display = 'none';
        }
    });

    updateButtons();
}

// Update the visibility of buttons
function updateButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageInfo = document.getElementById('page-info');

    // Show/hide previous button
    if (currentPage === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline';
    }

    // Show/hide next button
    if (currentPage === totalPages) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'inline';
    }

    // Update page info
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

// Navigate to the next page
function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
}

// Navigate to the previous page
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

// Add event listeners to buttons
document.getElementById('next-btn').addEventListener('click', nextPage);
document.getElementById('prev-btn').addEventListener('click', prevPage);

// Initial display
showPage(currentPage);




// add to basket 
// product.js

document.addEventListener('DOMContentLoaded', () => {
    const addToBasketBtn = document.querySelector('.add-to-basket');
    const cartCountElement = document.getElementById('cart-count');

    // Function to update the cart count
    function updateCartItemCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Calculate total item quantity (sum of quantities of all items in the cart)
        const totalItems = cartItems.reduce((sum, item) => {
            const quantity = Number(item.quantity) || 0; // Ensure quantity is a number
            return sum + quantity;
        }, 0);

        // Update the cart count element with the total number of items
        cartCountElement.textContent = totalItems;

        // Add or remove the 'active' class based on item count
        if (totalItems > 0) {
            cartCountElement.classList.add('active');
        } else {
            cartCountElement.classList.remove('active');
        }
    }

    // Update cart count on page load
    updateCartItemCount();

    // Ensure only one event listener is added
    if (addToBasketBtn) {
        addToBasketBtn.addEventListener('click', () => {
            const productDetails = {
                name: "cartoon Astronaut T-shirt",
                img: "./img/products/f1.jpg",
                price: 118.00,
                quantity: 1 // You can make this dynamic based on user input
            };
        
            // Get existing cart items from localStorage
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            console.log("Before adding:", cartItems.length);
        
            // Check if the item is already in the cart
            const itemExists = cartItems.some(item => item.name === productDetails.name);
            
            if (itemExists) {
                alert('Item already in cart!');
            } else {
                // Add the new product to the cart items
                cartItems.push(productDetails);
        
                // Save updated cart items back to localStorage
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                
                updateCartItemCount(); // Update cart count only after adding the item
                alert('Item added to cart!'); // Optional feedback to the user
                console.log("After adding:", cartItems.length);
                console.log('Cart items in localStorage:', cartItems);
                
            }
        });
        
    }
});
