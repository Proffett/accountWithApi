export const validateUsername = (inputValue: string): boolean => {
  const regMatch = inputValue.match(/^[\w.@+-]+$/i);
  return !(regMatch == null || inputValue.length < 1 || inputValue.length > 150);
};
export const validateName = (inputValue: string): boolean => {
  const regMatch = inputValue.match(/^[\w.@+-]+$/i);
  return !(regMatch == null || inputValue.length < 1 || inputValue.length > 30);
};
export const validatePassword = (inputValue: string): boolean => {
  const regMatch = inputValue.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
  return !(regMatch == null || inputValue.length < 1 || inputValue.length > 128);
};
