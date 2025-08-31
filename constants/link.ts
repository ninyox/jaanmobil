
import axios from "axios"
export const ApiUrl = {
    link: "http://localhost:3000"
  }

export const BaseUrl = axios.create({
  baseURL:"http://192.168.1.192:3000",
})