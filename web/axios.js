import axios from "axios";

// todo вынести в env vite
export default axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})