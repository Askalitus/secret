import axios from 'src/axios.ts';

export default axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
