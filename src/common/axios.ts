import axios from "axios"


export const clientHttp = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})