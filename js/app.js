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
                    showNotification('Item added to favorites!'); // Show add message
                    // Change the heart icon to solid
                    favBtnClasslist.add("fa-solid");
                    favBtnClasslist.remove("fa-regular");

                } else {
                    // Remove the item from favorites
                    favorites = favorites.filter(item => item.title !== itemDetails.title);
                    showNotification('Item removed from favorites!'); // Show remove message
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






var trendingSlider = new Swiper('.trending-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',
    simulateTouch: true,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
// Store the current active slide index in localStorage before the page is unloaded
window.addEventListener('beforeunload', function() {
    localStorage.setItem('activeSlideIndex', trendingSlider.activeIndex);
});

// On page load, set the active slide based on the saved index
window.addEventListener('load', function() {
    const activeIndex = localStorage.getItem('activeSlideIndex');
    if (activeIndex !== null) {
        trendingSlider.slideTo(parseInt(activeIndex, 10), 0); // 0 is the speed for the transition
    }
});



// Get the category boxes container
const categoryBoxes = document.querySelector('.category-container'); 
const prevButton = document.querySelector('.scroll-button.prev');
const nextButton = document.querySelector('.scroll-button.next');

// Set how much to scroll per click
const scrollAmount = 240; // Adjust according to your box width and gap

// Define the scroll functions
function scrollLeft() {
    console.log('Scroll Left Clicked'); // For debugging
    categoryBoxes.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
}

function scrollRight() {
    console.log('Scroll Right Clicked'); // For debugging
    categoryBoxes.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

// Ensure the buttons are calling the correct functions
prevButton.onclick = scrollLeft;  // Attach the function correctly
nextButton.onclick = scrollRight;  // Attach the function correctly






document.querySelectorAll('.summary input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const accord = this.closest('.summary').nextElementSibling.querySelector('.accord');
        accord.style.display = this.checked ? 'flex' : 'none';
    });
});



/* the shop  */

