<script setup>
import { useTodoStore } from "../../stores/todoStore";

const {shiftDate, visibleDates, selectDate, isSelectedDate, selectedDate} = useTodoStore()

const formatDateDisplay = (date) => {
    return new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date)
}
</script>

<template>
    <div
        class="flex items-center justify-between gap-2 my-4 bg-gray-50 p-2 rounded-lg"
      >
        <button
          @click="shiftDate(-1)"
          class="p-2 hover:bg-gray-200 rounded-full"
        >
          &lt;
        </button>

        <div class="flex gap-2 overflow-hidden">
          <div
            v-for="date in visibleDates"
            :key="date.toISOString()"
            @click="selectDate(date)"
            class="flex flex-col items-center justify-center w-16 h-20 border rounded-lg cursor-pointer transition-all duration-200 text-sm select-none"
            :class="
              isSelectedDate(date)
                ? 'bg-blue-500 text-white border-blue-500 scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            "
          >
            <span class="text-xs font-medium">{{
              new Intl.DateTimeFormat("id-ID", { weekday: "short" }).format(
                date
              )
            }}</span>
            <span class="text-xl font-bold">{{ date.getDate() }}</span>
          </div>
        </div>

        <button
          @click="shiftDate(1)"
          class="p-2 hover:bg-gray-200 rounded-full"
        >
          &gt;
        </button>
      </div>

      <div class="text-center mb-2">
        <span class="text-sm text-gray-500"
          >Menampilkan tugas untuk:
          <b>{{ formatDateDisplay(selectedDate) }}</b></span
        >
      </div>
</template>