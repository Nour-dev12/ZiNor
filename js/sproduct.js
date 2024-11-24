const toggleNavbar = document.querySelector('.toggle-navbar');
const navMenu = document.querySelector('.nav-menu-container');
const navClose = document.querySelector('.nav-close'); // Select the dedicated close button

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

// Open the navbar menu
toggleNavbar.addEventListener('click', function () {
	if (window.innerWidth <= 945) {
		navMenu.classList.add('show');
		toggleNavbar.classList.add('hide'); // Hide the toggle button
		navClose.classList.add('show'); // Show the close button
	}
});

// Close the navbar menu
navClose.addEventListener('click', function () {
	navMenu.classList.remove('show');
	toggleNavbar.classList.remove('hide'); // Show the toggle button again
	navClose.classList.remove('show'); // Hide the close button
});







document.addEventListener('DOMContentLoaded', () => {
    const smallImgContainer = document.querySelector('.small-img-groupe');
    const smallImages = document.querySelectorAll('.small-img-col');
    const mainImage = document.getElementById('mainImg');
    const prevButton = document.querySelector('.prev-img');
    const nextButton = document.querySelector('.next-img');
    
    if (!smallImages.length) {
        console.error('No small images found!');
        return;
    }

    let currentIndex = 0;  // Initialize at 0, or any valid index.

    // Function to update the main image
    function updateMainImage(index) {
        // Ensure smallImages is re-queried for the most up-to-date DOM state
        const smallImages = document.querySelectorAll('.small-img-col');
        const smallImage = smallImages[index];

        if (!smallImage) {
            console.error(`smallImages[${index}] is undefined!`);
            return;
        }

        const newSrc = smallImage.querySelector('img').getAttribute('data-image');
        mainImage.src = newSrc;

        // Remove active class from all small image columns
        smallImages.forEach(col => col.classList.remove('active'));

        // Add the active class to the current small image column
        smallImage.classList.add('active');
    }

    // Event listener for each small image column
    smallImages.forEach((smallImgCol, index) => {
        smallImgCol.addEventListener('click', () => {
            currentIndex = index;
            updateMainImage(currentIndex);
        });
    });

    // Event listener for the previous button
    prevButton.addEventListener('click', () => {
        // Move to the previous image or loop to the last image if at the first one
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : smallImages.length - 1;
        updateMainImage(currentIndex);
    });

    // Event listener for the next button
    nextButton.addEventListener('click', () => {
        // Move to the next image or loop to the first image if at the last one
        currentIndex = (currentIndex < smallImages.length - 1) ? currentIndex + 1 : 0;
        updateMainImage(currentIndex);
    });

    // Initialize the first image
    updateMainImage(currentIndex);
});






// Select only the populated review elements
const reviews = Array.from(document.querySelectorAll('.review')).filter(review => review.innerHTML.trim() !== '');
const reviewsPerPage = 3; // Number of reviews to show per page
let currentPage = 1;

// Calculate the total number of pages
const totalPages = Math.ceil(reviews.length / reviewsPerPage);

// Show the current page reviews
function showPage(page) {
    const start = (page - 1) * reviewsPerPage;
    const end = start + reviewsPerPage;

    // Show/hide reviews
    reviews.forEach((review, index) => {
        if (index >= start && index < end) {
            review.style.display = 'flex'; // Set to 'flex' to maintain the styling
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
    prevBtn.style.display = currentPage === 1 ? 'none' : 'inline';

    // Show/hide next button
    nextBtn.style.display = currentPage === totalPages ? 'none' : 'inline';

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





/* add review modal  */

// Get modal elements
const modal = document.getElementById('review-modal');
const addReviewBtn = document.getElementById('add-review-btn');
const theCloseBtn = document.querySelector('.close-btn');
const reviewForm = document.getElementById('review-form');
const reviewsContainer = document.querySelector('.reviews-container');

// Open modal when clicking 'Add a Review'
addReviewBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Close modal
theCloseBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Initialize rating selection
let selectedRating = 0;

document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.rating-section .star');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-value'));
            highlightStars(selectedRating);
        });
    });

    function highlightStars(rating) {
        stars.forEach(star => {
            if (parseInt(star.getAttribute('data-value')) <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    // Load existing reviews from local storage
    loadReviews();
});

// Handle form submission to add a new review
reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const username = document.getElementById('username').value;
    const date = document.getElementById('date').value;
    const reviewText = document.getElementById('review-text').value;
    const purchasedItem = document.getElementById('purchased-item').value;
    const reviewImage = document.getElementById('review-image').files[0];
    
    // Create review object
    const review = {
        id: Date.now(), // Unique ID for the review
        username,
        date,
        reviewText,
        purchasedItem,
        reviewImage: reviewImage ? URL.createObjectURL(reviewImage) : './img/people/default.png',
        rating: selectedRating,
    };

    // Save review to local storage
    saveReview(review);
    
    // Close the modal and reset the form
    modal.style.display = 'none';
    reviewForm.reset();
    
    // Reset rating
    selectedRating = 0;
    highlightStars(selectedRating);
});

// Function to save review to local storage
function saveReview(review) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    displayReviews();
}

// Function to load and display reviews from local storage
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.forEach(review => displayReview(review));
}

// Function to display a single review
function displayReview(review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('review');
    reviewDiv.setAttribute('data-id', review.id); // Set the review ID for reference
    
    const reviewerInfo = document.createElement('div');
    reviewerInfo.classList.add('reviewer-info');

    const img = document.createElement('img');
    img.classList.add('reviewer-image');
    img.src = review.reviewImage;

    const name = document.createElement('span');
    name.classList.add('username');
    name.innerHTML = `<a href="#">${review.username}</a>`;

    const reviewDate = document.createElement('span');
    reviewDate.classList.add('date-of-the-purchase');
    reviewDate.textContent = review.date;

    reviewerInfo.appendChild(img);
    reviewerInfo.appendChild(name);
    reviewerInfo.appendChild(reviewDate);
    
    // Review rating and text
    const reviewerRating = document.createElement('div');
    reviewerRating.classList.add('reviewer-rating');

    const starRating = document.createElement('span');
    starRating.classList.add('star-rating');

    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        starsHTML += i <= review.rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
    }
    starRating.innerHTML = starsHTML;

    const text = document.createElement('p');
    text.classList.add('review-text');
    text.textContent = review.reviewText;

    const purchased = document.createElement('p');
    purchased.classList.add('purchased-item');
    purchased.innerHTML = `Purchased Item: <span>${review.purchasedItem}</span>`;

    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-review');
    deleteBtn.onclick = () => deleteReview(review.id); // Pass the ID to deleteReview

    reviewerRating.appendChild(starRating);
    reviewerRating.appendChild(text);
    reviewerRating.appendChild(purchased);
    reviewerRating.appendChild(deleteBtn); // Add delete button

    // Add new review to the container
    reviewDiv.appendChild(reviewerInfo);
    reviewDiv.appendChild(reviewerRating);
    reviewsContainer.appendChild(reviewDiv);
}

// Function to display all reviews
function displayReviews() {
    reviewsContainer.innerHTML = ''; // Clear existing reviews
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.forEach(review => displayReview(review));
}

// Function to delete a review
function deleteReview(id) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews = reviews.filter(review => review.id !== id); // Remove the review by ID
    localStorage.setItem('reviews', JSON.stringify(reviews)); // Update local storage
    displayReviews(); // Refresh the displayed reviews
}

/* add review modal end */


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

    // Function to display the notification
    function showNotification(message) {
        const notificationBox = document.getElementById('notification-box');
        notificationBox.textContent = message; // Set the message
    
        // Show the notification
        notificationBox.classList.add('visible');
        notificationBox.classList.remove('hidden');
    
        // Hide after 3 seconds
        setTimeout(() => {
            notificationBox.classList.remove('visible');
            notificationBox.classList.add('hidden');
        }, 3000);
    }
    // Ensure only one event listener is added
    if (addToBasketBtn) {
        addToBasketBtn.addEventListener('click', () => {
/*             const productDetails = {
                name: "woman dress",
                img: "/img/women/dresses/d1.jpg",
                price: 118.00,
                quantity: 1
            }; */
        
            let cartItems = JSON.parse(localStorage.getItem('selectedProduct')) || [];
            console.log("Before adding:", cartItems.length);
        
            // Check if the item is already in the cart
            const itemExists = cartItems.some(product => product.name === JSON.parse(product).name);
            
            if (itemExists) {
                showNotification('Item already in cart!');
            } else {
                // Add the new product to the cart items
                cartItems.push(cartItems);
        
                // Save updated cart items back to localStorage
                localStorage.setItem('selectedProduct', JSON.stringify(cartItems));
                
                updateCartItemCount(); // Update cart count only after adding the item
                showNotification('Item added to cart!'); // Optional feedback to the user
                console.log("After adding:", cartItems.length);
                console.log('Cart items in localStorage:', cartItems);
                
            }
        });
        
    }
});



document.querySelectorAll(".tab-link").forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class from all tabs and hide all content
        document.querySelectorAll(".tab-link").forEach(btn => btn.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(content => content.style.display = "none");

        // Add active class to clicked tab and show corresponding content
        button.classList.add("active");
        const tabId = button.getAttribute("data-tab");
        document.getElementById(tabId).style.display = "block";
    });
});

// Show first tab by default
document.querySelector(".tab-link[data-tab='details']").click();


document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the product data from local storage
    const productData = JSON.parse(localStorage.getItem('selectedProduct'));

    if (productData) {
        // Update the main product details
        document.querySelector('#prodetails h2').textContent = productData.name;
        document.querySelector('.new-price').textContent = `$${productData.price}`;
        document.querySelector('#mainImg').src = productData.img;
        document.querySelector('.collapsible-text p').textContent = `Rating: ${productData.rating} stars`;

        // Update the small images container
        const smallImgContainer = document.querySelector('.small-img-groupe');
        smallImgContainer.innerHTML = ''; // Clear any existing small images

        // Dynamically create small images
        productData.smallImages.forEach(imgSrc => {
            const imgCol = document.createElement("div");
            imgCol.classList.add("small-img-col");

            const imgElement = document.createElement("img");
            imgElement.src = imgSrc;
            imgElement.classList.add("small-img");
            imgElement.alt = "";
            imgElement.setAttribute("data-image", imgSrc);

            imgCol.appendChild(imgElement);
            smallImgContainer.appendChild(imgCol);
        });

        // Now re-query the small images container after adding them to the DOM
        const smallImages = document.querySelectorAll('.small-img-col');
        const mainImage = document.getElementById('mainImg');
        const prevButton = document.querySelector('.prev-img');
        const nextButton = document.querySelector('.next-img');

        let currentIndex = 0;

        // Function to update the main image and active state
        function updateMainImage(index) {
            // Ensure the small image exists
            const smallImage = smallImages[index];
            if (!smallImage) {
                console.error(`smallImages[${index}] is undefined!`);
                return;
            }

            // Get the new source from the clicked image's data-image
            const newSrc = smallImage.querySelector('img').getAttribute('data-image');
            
            // Update the main image
            mainImage.src = newSrc;

            // Remove the 'active' class from all small image columns
            smallImages.forEach(col => col.classList.remove('active'));

            // Add the 'active' class to the current small image column
            smallImage.classList.add('active');
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
    } else {
        console.error('No product data found');
    }
});
