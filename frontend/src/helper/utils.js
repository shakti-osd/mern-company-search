const isValidUrl = (url) => {
  const urlPattern = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/i;
  return urlPattern.test(url);
};

const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const isValidPhoneNumber = (phone) => {
  const phonePattern = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;
  return phonePattern.test(phone);
};

export { isValidUrl, isValidEmail, isValidPhoneNumber };
