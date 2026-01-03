import { api } from "../lib/axios";

export const register = async (data) => {
    const res = await api.post('/users', data)
    return res.data
}

export const login = async (data) => {
    const res = await api.post('/auth/login', data)
    return res.data
}

export const getAllUsers = async () => {
    const res = await api.get('/users')
    console.log(res.data)
    return res.data
}