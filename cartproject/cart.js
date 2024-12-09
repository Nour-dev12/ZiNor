document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    const cartCountContainer = document.getElementById('cart-count');
    const clearCartButton = document.getElementById('clear-cart');

    // Load cart from localStorage
    loadCart();

    // Load cart items from localStorage and display them
    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';

        let totalPrice = 0;

        cart.forEach(item => {
            totalPrice += item.price * item.quantity;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><button class="remove-item" data-id="${item.id}">Remove</button></td>
                <td><img src="${item.img}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            cartItemsContainer.appendChild(row);
        });

        totalPriceContainer.textContent = `Total: $${totalPrice.toFixed(2)}`;

        // Update cart count
        cartCountContainer.textContent = cart.length;

        // Add event listeners for remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                removeFromCart(e.target.dataset.id);
            });
        });
    }

    // Remove product from cart
    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }

    // Clear cart
    clearCartButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        loadCart();
    });
});
