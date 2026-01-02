import { api } from "../lib/axios";


export const getProducts = async () => {
    const res = await api.get('/products')
    return res.data
}

export const getProductsById = async (id) => {
    const res = await api.get(`/products/${id}`)
    return res.data
}