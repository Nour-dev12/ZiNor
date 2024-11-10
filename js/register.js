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
});



// Add event listener for the eye icon click
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('togglePassword');
  
    // Check the current input type and toggle the visibility
    if (passwordField.type === 'password') {
      passwordField.type = 'text';  // Show the password
      eyeIcon.classList.remove('fa-eye');  // Change icon to open eye
      eyeIcon.classList.add('fa-eye-slash');  // Open eye icon
    } else {
      passwordField.type = 'password';  // Hide the password
      eyeIcon.classList.remove('fa-eye-slash');  // Change icon to closed eye
      eyeIcon.classList.add('fa-eye');  // Closed eye icon
    }
});
