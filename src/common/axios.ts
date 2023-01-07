import axios from "axios"

const token = localStorage.getItem("user") || undefined;

export const clientHttp = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
   Authorization: token ? `Bearer ${token}` : ''
  }
})