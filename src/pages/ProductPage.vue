<script setup>

import { onMounted } from 'vue';
import { useProductStore } from '../stores/ProductStore';
import { storeToRefs } from 'pinia';

const store = useProductStore();
const { products } = storeToRefs(store);
const { fetchProducts } = store;



onMounted(() => {
    fetchProducts()
})

</script>

<template>
  <div class="flex justify-center py-10 bg-gray-100 min-h-screen">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
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
            ${{ item.price }}
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>
