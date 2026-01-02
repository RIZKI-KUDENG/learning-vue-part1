import axios from "axios";

const url = 'https://fakestoreapi.com'

export const api = axios.create({
    baseURL: url
})