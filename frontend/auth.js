// auth.js
export const setToken = (token) => {
    localStorage.setItem("authToken", token);
};
  
export const getToken = () => {
    return localStorage.getItem("authToken");
};
  
export const isAuthenticated = () => {
   return !!getToken();
};
  
export const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  };
  