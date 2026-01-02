import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore("cart", () => {
    const cartItems = ref ([]);

    const addToCart = (product) => {
        const existingItem = cartItems.value.find(item => item.id === product.id);
        if(existingItem){
            existingItem.quantity++;
        }else{
            cartItems.value.push({...product, quantity: 1})
        }
        alert('Product added to cart')
    }

    const removeFromCart = (productId) => {
        cartItems.value = cartItems.value.filter(item => item.id !== productId);
        alert('Product removed from cart')
    }

    const totalItems = computed(() => {
        return cartItems.value.reduce((total, item) => total + item.quantity, 0)
    })
    const totalPrice = computed(() => {
        return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
    })

    return {
        cartItems,
        addToCart,
        removeFromCart,
        totalItems,
        totalPrice
    }
})