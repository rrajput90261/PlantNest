
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const notifyCartUpdate = () => {
  window.dispatchEvent(new Event("cartUpdate"));
};

export const notifyWishlistUpdate = () => {
  window.dispatchEvent(new Event("wishlistUpdate"));
};

export default api;