<script setup>

import { onMounted } from 'vue';
import { useProductStore } from '../stores/ProductStore';
import { storeToRefs } from 'pinia';
import { formatToRupiah } from '../utils/currency';
import { useCartStore } from '../stores/CartStore';

const store = useProductStore();
const { products } = storeToRefs(store);
const { fetchProducts } = store;
const cartStore = useCartStore();
const { addToCart, removeFromCart } = cartStore;
const { cartItems, totalPrice } = storeToRefs(cartStore);




onMounted(() => {
    fetchProducts()
})

</script>

<template>
  <div class="flex justify-center py-10 bg-gray-100 min-h-screen">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6 w-1/2">
      <div
        v-for="item in products"
        :key="item.id"
        class="bg-white w-44 rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer"
      >
        <!-- Image -->
        <div class="h-28 bg-gray-100 flex items-center justify-center">
          <img
            :src="item.image"
            alt=""
            class="h-full object-contain p-2"
          />
        </div>

        <!-- Content -->
        <router-link class="p-3" :to="{ name: 'product-detail', params: { id: item.id }}">
          <p class="text-sm font-semibold line-clamp-2">
            {{ item.title }}
          </p>

          <p class="text-blue-600 font-bold mt-1">
            {{ formatToRupiah(item.price) }}
          </p>
        </router-link>
        <button @click="addToCart(item)" class="bg-slate-500 p-2 rounded">Add To Cart</button>
      </div>
    </div>
    <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Keranjang Belanja</h1>

    <div v-if="cartItems.length === 0" class="text-gray-500">
        Keranjang masih kosong.
    </div>

    <div v-else>
        <div v-for="item in cartItems" :key="item.id" class="flex justify-between items-center border-b py-4">
            <div>
                <h3 class="font-bold">{{ item.title }}</h3>
                <p class="text-sm text-gray-600">
                    {{ formatToRupiah(item.price) }} x {{ item.quantity }}
                </p>
            </div>
            <div class="flex items-center gap-4">
                <span class="font-bold">{{ formatToRupiah(item.price * item.quantity) }}</span>
                <button @click="removeFromCart(item.id)" class="text-red-500 hover:text-red-700">Hapus</button>
            </div>
        </div>

        <div class="mt-8 text-right">
            <p class="text-xl">Total: <span class="font-bold text-green-600">{{ formatToRupiah(totalPrice) }}</span></p>
        </div>
    </div>
  </div>
  </div>
</template>
