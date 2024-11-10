document.getElementById('billingForm').addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();
    
    // Clear previous invalid styles
    clearInvalidStyles();

    // Check if the form is valid
    if (this.checkValidity()) {
        // Validate if at least one shipping option is selected
        const shippingOptions = document.querySelectorAll('input[name="shipping"]');
        const shippingSelected = Array.from(shippingOptions).some(option => option.checked);

        if (!shippingSelected) {
            showNotification('Please select a shipping option.');
            return; // Exit the function if no shipping option is selected
        }

        // Change the Purchase Done link to active (if you have this functionality)
        const purchaseDoneLink = document.querySelector(".purchase-done");
        if (purchaseDoneLink) {
            purchaseDoneLink.classList.remove("disabled");
            purchaseDoneLink.classList.add("active");
            purchaseDoneLink.innerText = "Purchase Done"; // Update text if needed
        }

        // Redirect to the thank you page after a short delay
        setTimeout(function() {
            window.location.href = "thankyou.html"; // Redirect to thank-you page
        }, 1000); // 1 second delay (adjust as needed)
    } else {
        showNotification('Please fill in all required fields.');
        highlightInvalidFields(); // Highlight invalid fields
        this.reportValidity(); // This will display the browser's built-in validation messages
    }
});

// Function to highlight invalid fields
function highlightInvalidFields() {
    const inputs = document.querySelectorAll('#billingForm input[required], #billingForm select[required], #billingForm textarea[required]');
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.classList.add('invalid'); // Add a class for invalid inputs
        }
    });
}

// Function to clear invalid styles
function clearInvalidStyles() {
    const inputs = document.querySelectorAll('#billingForm input[required], #billingForm select[required], #billingForm textarea[required]');
    inputs.forEach(input => {
        input.classList.remove('invalid'); // Remove invalid class from inputs
    });
}

// Function to show the notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.classList.remove('hidden');
    notification.classList.add('visible');

    // Hide notification after 3 seconds
    setTimeout(function() {
        notification.classList.remove('visible');
        notification.classList.add('hidden');
    }, 3000); // Adjust duration as needed
}
