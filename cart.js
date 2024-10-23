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
    const cartTableBody = document.querySelector('#cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const shippingCostElement = document.getElementById('shipping-cost');
    const cartCount = document.getElementById('cart-count');

    // Assuming a fixed shipping cost for simplicity
    const shippingCost = parseFloat(shippingCostElement.textContent.replace('$', '')) || 0;

    // Function to update cart total
    function updateCartTotal() {
        const subtotalCells = cartTableBody.querySelectorAll('.subtotal');
        let total = 0;

        subtotalCells.forEach(cell => {
            const cellValue = parseFloat(cell.textContent.replace('$', '').trim());
            total += isNaN(cellValue) ? 0 : cellValue; // Ensure valid number, otherwise 0
        });

        const grandTotal = total + shippingCost;
        cartSubtotal.textContent = total.toFixed(2) + '$'; // Update subtotal display
        cartTotal.textContent = grandTotal.toFixed(2) + '$'; // Update total display
    }

    // Function to calculate subtotal when quantity changes
    cartTableBody.addEventListener('input', (e) => {
        if (e.target.matches('.quantity input')) {
            const input = e.target;
            const quantity = Math.max(1, parseInt(input.value)) || 1; // Ensure quantity can't be less than 1
            const row = input.closest('tr');
            const price = parseFloat(row.querySelector('.price').textContent.replace('$', '').trim()); // Get price
            const subtotal = price * quantity; // Calculate subtotal

            row.querySelector('.subtotal').textContent = subtotal.toFixed(2) + '$'; // Update subtotal
            updateCartTotal(); // Update overall totals

            // Update the quantity in localStorage
            const itemName = row.querySelector('td:nth-child(3)').textContent; // Get the item name
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems = cartItems.map(item => {
                if (item.name === itemName) {
                    item.quantity = quantity; // Update quantity in localStorage
                }
                return item;
            });
            localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save updated cart to localStorage
        }
    });

    // Handle delete button functionality
    cartTableBody.addEventListener('click', (e) => {
        if (e.target.closest('.delete-btn')) {
            const row = e.target.closest('tr');
            const itemName = row.querySelector('td:nth-child(3)').textContent; // Get the item name

            // Remove the row from the cart
            row.remove();
            updateCartTotal(); // Update the total after removal
            updateCartItemCount(); // Update item count after removal

            // Update localStorage to persist changes
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems = cartItems.filter(item => item.name !== itemName); // Remove the item from the array
            localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save updated cart to localStorage
        }
    });

    // Function to update the cart item count
    function updateCartItemCount() {
        const remainingRows = cartTableBody.querySelectorAll('tr'); // Get the remaining rows
        const itemCount = remainingRows.length; // Get the number of rows

        // Update the cart count element with the number of remaining rows
        cartCount.textContent = itemCount;

        // If the item count is greater than 0, add 'active' class; otherwise, remove it
        if (itemCount > 0) {
            cartCount.classList.add('active');
        } else {
            cartCount.classList.remove('active');
        }
    }

    // Function to render cart items
    function renderCartItems() {
        // Clear the table
        cartTableBody.innerHTML = '';

        // Retrieve items from localStorage
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Loop through the cart items and create rows
        cartItems.forEach(item => {
            if (item.name && item.price && item.quantity) { // Ensure item has all necessary properties
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><button class="delete-btn"><i class="fa-solid fa-trash"></i></button></td>
                    <td><img src="${item.img}" alt=""></td>
                    <td>${item.name}</td>
                    <td class="price">${item.price}$</td>
                    <td class="quantity"><input type="number" value="${item.quantity}" min="1"></td>
                    <td class="subtotal">${(item.price * item.quantity).toFixed(2)}$</td>
                `;
                cartTableBody.appendChild(row);
            
            }
        });

        updateCartTotal(); // Call a function to update the cart total
        updateCartItemCount(); // Update item count on load
    }

    // Initial call to render items when the page loads
    renderCartItems();
});























/* const cartCount = document.getElementById('cart-count');
const cartTableBody = document.querySelector('#cart tbody');


function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartTableBody.innerHTML = ''; 
    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><button class="delete-btn"><i class="fa-solid fa-trash"></i></button></td>
            <td><img src="${item.image}" alt=""></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><input type="number" value="${item.quantity}"></td>
            <td>${item.price * item.quantity}</td>
        `;
        cartTableBody.appendChild(row);
    });
    updateCartItemCount();
}


function updateCartItemCount() {
    const remainingRows = document.querySelectorAll('#cart tbody tr');
    cartCount.textContent = remainingRows.length; 
    if (remainingRows.length > 0) {
        cartCount.classList.add('active');
    } else {
        cartCount.classList.remove('active');
    }
}


function deleteCartRows() {
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('tr'); 
            if (row) {
                row.remove(); 
                removeItemFromLocalStorage(index); 
                updateCartItemCount(); 
            }
        });
    });
}


function removeItemFromLocalStorage(index) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1); 
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
}
loadCartItems();
deleteCartRows();
 */