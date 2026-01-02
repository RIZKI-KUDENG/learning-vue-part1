import { defineStore } from "pinia";
import { ref } from "vue";
import { bgMap } from "../utils/weatherTheme";

export const useWeatherStore = defineStore("weather", () => {
  const loading = ref(false);
  const weather = ref(null);
  const error = ref(null);
  const city = ref("Jakarta");
  const history = ref([]);

  const fetchWeather = async () => {
    if(!city.value) return
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
      saveToLocalStorage();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const getIcon = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  const getBgCard = (icon) => {
    const code = icon.slice(0, 2);
    const time = icon.slice(2);

    return bgMap[code]?.[time] || "bg-slate-200";
  };

  const setCity = (newCity) => {
    if (!newCity) return;
    city.value = newCity.trim()

    history.value = history.value.filter(
      (c) => c.toLowerCase() !== newCity.toLowerCase()
    );

    history.value.unshift(newCity);
    if (history.value.length > 5) {
      history.value.pop();
    }

    saveToLocalStorage();
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(
      "weatherHistory",
      JSON.stringify({
        city: city.value,
        history: history.value,
      })
    );
  };

  const loadFromLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("weatherHistory"));
    if (data) {
      city.value = data.city || "Jakarta";
      history.value = data.history || [];
    }
  }
  return {
    loading,
    weather,
    error,
    city,
    history,
    fetchWeather,
    getIcon,
    getBgCard,
    setCity,
    saveToLocalStorage,
    loadFromLocalStorage
  };
});
