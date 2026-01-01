import { defineStore } from "pinia";
import { ref } from "vue";

export const useWeatherStore = defineStore("weather", () => {
  const loading = ref(false);
  const weather = ref(null);
  const error = ref(null);
  const city = ref("Jakarta");

  const fetchWeather = async () => {
    loading.value = true;
    error.value = null;
    try {
      const url = `${import.meta.env.VITE_WEATHER_BASE_URL}?q=${
        city.value
      }&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await res.json();
      weather.value = data;
      console.log(weather.value);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const getIcon = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

const bgMap = {
  '01': {
    d: 'bg-sky-300',  
    n: 'bg-slate-400'  
  },
  '02': {
    d: 'bg-sky-400',
    n: 'bg-slate-500'
  },
  '03': {
    d: 'bg-slate-300',
    n: 'bg-slate-600'
  },
  '04': {
    d: 'bg-slate-200',
    n: 'bg-slate-200'
  },
  '09': {
    d: 'bg-sky-100',
    n: 'bg-slate-600'
  },
  '10': {
    d: 'bg-blue-500',
    n: 'bg-blue-900'
  },
  '11': {
    d: 'bg-blue-400',
    n: 'bg-blue-800'
  },
  '13': {
    d: 'bg-blue-300',
    n: 'bg-slate-500'
  },
  '50': {
    d: 'bg-blue-200',
    n: 'bg-slate-500'
  },
}
const getBgCard = (icon) => {
  const code = icon.slice(0, 2) 
  const time = icon.slice(2)    

  return bgMap[code]?.[time] || 'bg-slate-200'
}


  return {
    loading,
    weather,
    error,
    city,
    bgMap,
    fetchWeather,
    getIcon,
    getBgCard,
  };
});
