<script setup>
import { useProductStore } from '../stores/ProductStore';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const store = useProductStore();
const { product, loading, error } = storeToRefs(store);
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

    <div v-if="product">
      <h2>{{ product.title }}</h2>
      <p>{{ product.description }}</p>
      <p>Price: {{ product.price }}</p>
    </div>
  </div>

</template>