// auth.js

const USER_KEY = "user"; // Kullanıcı bilgilerini yerel depolamada saklamak için anahtar

// Kullanıcıyı oturum açtığında yerel depolamaya kaydeder
export const saveUserToLocalStorage = (userData) => {
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
};

// Kullanıcıyı oturum kapattığında yerel depolamadan siler
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem(USER_KEY);
};

// Şu anki kullanıcı bilgisini almak için
export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Kullanıcı oturumu açık mı kontrol etmek için
export const isAuthenticated = () => {
  return getUserFromLocalStorage() !== null;
};
