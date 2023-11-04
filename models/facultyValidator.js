function validateUser(user) {
  const errors = [];

  if (!user.username || typeof user.username !== 'string') {
    errors.push('Username is required and must be a string.');
  }

  if (!user.email || typeof user.email !== 'string' || !isValidEmail(user.email)) {
    errors.push('Email is required and must be a valid email address.');
  }

  if (!user.contactNumber || typeof user.contactNumber !== 'string') {
    errors.push('Contact Number is required and must be a string.');
  } else if (!/^\d{10}$/.test(user.contactNumber)) {
    errors.push('Contact Number must be a valid 10-digit number.');
  }

  if (!user.joiningDate || typeof user.joiningDate !== 'string') {
    errors.push('Joining Date is required .');
  }

  if (!user.dob || typeof user.dob !== 'string') {
    errors.push('Date of Birth  is required .');
  } 

  // if (!user.joiningDate || typeof user.joiningDate !== 'string') {
  //   errors.push('Joining Date is required and must be a string.');
  // } else {
  //   const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  //   if (!datePattern.test(user.joiningDate)) {
  //     errors.push('Joining Date must be in YYYY-MM-DD format.');
  //   }
  // }


  // if (!user.dob || typeof user.dob !== 'string') {
  //   errors.push('Date of Birth  is required and must be a string.');
  // } else {
  //   const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  //   if (!datePattern.test(user.dob)) {
  //     errors.push('Date of Birth must be in YYYY-MM-DD format.');
  //   }
  // }

  // Validate 'role' field
  if (!user.role || (user.role !== 'teacher' && user.role !== 'admin')) {
    errors.push('Role is required and must be "teacher" or "admin".');
  }


  if (!user.name || typeof user.name !== 'string') {
    errors.push('Name is required and must be a string.');
  }

  return errors;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = {
  validateUser
}
