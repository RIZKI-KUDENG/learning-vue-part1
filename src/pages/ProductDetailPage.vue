<script setup>
import { useProductStore } from '../stores/ProductStore';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const store = useProductStore();
const { products, loading, error } = storeToRefs(store);
const { fetchProductsById } = store;

const props = defineProps({
    id: String
})

onMounted(() => {
    fetchProductsById(props.id)
})

</script>

<template>
<div>
    <h1>Detail Product</h1>

    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>

    <div v-if="products">
      <h2>{{ products.title }}</h2>
      <p>{{ products.description }}</p>
      <p>Price: {{ products.price }}</p>
    </div>
  </div>

</template>