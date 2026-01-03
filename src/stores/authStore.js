import { defineStore } from "pinia";
import { login, register } from "../service/authService";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const user = ref(null)
    const token = ref(localStorage.getItem("token"))
    const isAuthenticated = ref(!!localStorage.getItem("token"))
    const loading = ref(false) 
    const error = ref(null)

   const loginUser = async (data) => {
    loading.value = true
    error.value = null
    try {
        const res = await login(data)
        token.value = res.token
        isAuthenticated.value = true
        user.value = data.username
        localStorage.setItem("user", data.username)
        localStorage.setItem("token", res.token)
        return true
    }catch (err){
        error.value = err.message || "login gagal"
        console.log(error.value)
        return false
    }finally{
        loading.value = false
    }
   }
   const registerUser = async (data) => {
    loading.value = true
    error.value = null
    try {
        const res = await register(data)
        user.value = res
        return true;
    } catch (err) {
        error.value = err.message
        return false
    }finally{
        loading.value = false
    }
   }
   const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    token.value = null
    user.value = null
    isAuthenticated.value = false
   }
    return { user, token, isAuthenticated, loading, error, loginUser, registerUser, logout }
})