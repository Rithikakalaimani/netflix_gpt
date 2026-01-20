
const validate = (email, password, userName, isSignInForm) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isSignInForm) {
    if (!userName || userName.trim().length === 0) {
      return "Please enter your full name.";
    }
    const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(userName);
    if (!isNameValid) {
      return "Please enter a valid name (e.g., John Doe).";
    }
  }

  if (!email || email.trim().length === 0) {
    return "Please enter your email address.";
  }
  if (!isEmailValid) {
    return "Please enter a valid email address (e.g., example@email.com).";
  }
  
  if (!password || password.trim().length === 0) {
    return "Please enter your password.";
  }
  if (!isPasswordValid) {
    return "Password must be at least 8 characters and contain uppercase, lowercase, and a number.";
  }
  
  return null;
};

export default validate;
