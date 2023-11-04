async function validateBill(data) {
    if (!data.name || data.name.length < 3) {
        return 'Name must be at least 3 characters long';
    }
    if (!data.email || !isValidEmail(data.email)) {
        return 'Invalid email address';
    }
    if (!data.contactNumber || !data.contactNumber.length === 10) {
        return 'Contact Number shold be 10 digit ';
    }
    // if (!data.createdBy) {
    //     return 'createdBy must be required';
    // }
    if (!data.paymentMethod) {
        return 'payment Method must be required';
    }

    return null; // Validation passed
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}


module.exports = {
    validateBill
}
