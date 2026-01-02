<script setup>
import { onMounted, computed, ref } from "vue";
import { useWeatherStore } from "../stores/weatherStore";
import { storeToRefs } from "pinia";

const store = useWeatherStore();
const { loading, weather, error, history } = storeToRefs(store);
const { fetchWeather, getIcon, getBgCard, loadFromLocalStorage, setCity } = store;

const isNight = computed(() => {
  const icon = weather.value?.weather?.[0]?.icon
  return icon?.includes("n") ?? false
});


onMounted(() => {
  loadFromLocalStorage();
  fetchWeather();
});

const inputCity = ref('')

const search = () => {
  if (!inputCity.value) return
   console.log('SEARCH CLICK', inputCity.value)
  setCity(inputCity.value)
  fetchWeather()
  inputCity.value = ''
}
</script>

<template>
  <div class="p-4 w-1/2 mx-auto border mt-5 shadow-lg rounded-lg bg-white">
    <h1 class="text-xl text-center font-bold mb-4">Weather App</h1>

    <div class="flex gap-2 mb-4">
      <input
        class="border p-2 rounded w-full"
        v-model="inputCity"
        placeholder="Input City"
      />
      <button
        v-on:click="search"
        :disabled="loading"
        class="bg-blue-300 p-2 rounded w-full"
      >
        Input
      </button>
    </div>
    <div class="flex gap-2 mt-4">
  <button
    v-for="city in history"
    :key="city"
    @click="setCity(city); fetchWeather()"
    class="px-2 py-1 border rounded"
  >
    {{ city }}
  </button>
</div>

    <!-- Loading -->
    <p v-if="loading">Loading weather...</p>

    <!-- Error -->
    <p v-else-if="error" class="text-red-500">
      {{ error }}
    </p>

    <!-- Success -->
     
    
    <div
      v-else-if="weather"
      :class="[getBgCard(weather.weather[0].icon), isNight ? 'text-white' : 'text-slate-900']"
      class="flex flex-col items-center justify-center gap-2.5 mt-4 border p-3 transition-colors duration-500 ease-in-out"
    >
      <h3>{{ weather.name }}</h3>
      <div class="text-center">
        <span>{{ weather.main.temp }}°C</span>
        <img :src="getIcon(weather.weather[0].icon)" alt="" />
        <span>{{ weather.weather[0].description }}</span>
      </div>
    </div>
  </div>
</template>
