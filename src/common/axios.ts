import axios from "axios"

const token = localStorage.getItem("user") || undefined;

export const clientHttp = axios.create({
  baseURL: 'http://localhost/api/',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
   Authorization: token ? `Bearer ${token}` : ''
  }
})