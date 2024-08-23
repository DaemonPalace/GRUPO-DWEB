document.addEventListener('DOMContentLoaded', function() {
    const paymentMethodSelect = document.getElementById('payment-method-select');
    const cardDetails = document.querySelector('.card-details');
    const changeTransaction = document.querySelector('.change-transaction');
    const submitButton = document.querySelector('.submit-button');

    // Handle payment method selection
    paymentMethodSelect.addEventListener('change', function() {
        const selectedMethod = paymentMethodSelect.value;

        // Hide both sections initially
        cardDetails.style.display = 'none';
        changeTransaction.style.display = 'none';

        // Show relevant section based on selected method
        switch (selectedMethod) {
            case 'card':
                cardDetails.style.display = 'block';
                break;
            case 'change':
            case 'transaction':
                changeTransaction.style.display = 'block';
                break;
        }
    });

    // Handle form submission
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission

        const selectedMethod = paymentMethodSelect.value;

        // Basic validation (you can add more comprehensive validation here)
        if (!selectedMethod) {
            alert('Please select a payment method.');
            return;
        }

        if (selectedMethod === 'card') {
            const cardNumber = document.getElementById('card-number').value;
            const expiryDate = document.getElementById('expiry-date').value;
            const cvv = document.getElementById('cvv').value;

            if (!cardNumber || !expiryDate || !cvv) {
                alert('Please fill in all card details.');
                return;
            }
        } else if ((selectedMethod === 'change' || selectedMethod === 'transaction') && !document.getElementById('amount').value) {
            alert('Please enter the amount.');
            return;
        }

        // Redirect to the landing page after submission
        window.location.href =  'LandingPage_POKE.html'; // Replace with your landing page URL
    });
});

