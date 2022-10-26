const checkPassword = (password) => {
  let lowerCaseValue = password.match(/[a-z]/);
  let upperCaseValue = password.match(/[A-Z]/);
  let numberCaseValue = password.match(/[0-9]/);
  if (!lowerCaseValue) {
    return "atleast one lowercase character required";
  }
  if (!upperCaseValue) {
    return "atleast one uppercase character required";
  }
  if (!numberCaseValue) {
    return "atleast one number required";
  }
  if (password.length < 5) {
    return "password should be alteast 5 character long";
  }
};

module.exports = checkPassword;
