document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountContainer = document.getElementById('cart-count');

    // Load cart from localStorage and update the cart count
    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCountContainer.textContent = cart.length;
    }

    // Add product to cart when the button is clicked
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const productName = e.target.dataset.name;
            const productPrice = e.target.dataset.price;
            const productImg = e.target.dataset.img;

            // Create a product object
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                img: productImg,
                quantity: 1
            };

            // Get the cart from localStorage, or initialize an empty array
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if product already exists in the cart
            const existingProduct = cart.find(item => item.id === productId);

            if (existingProduct) {
                existingProduct.quantity += 1; // Increase quantity if already in cart
            } else {
                cart.push(product); // Add new product to cart
            }

            // Save the updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Update the cart count
            loadCart();
        });
    });

    // Initial load of cart count
    loadCart();
});
