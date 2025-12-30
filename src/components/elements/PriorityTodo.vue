<script setup>
import { useTodoStore } from '../../stores/todoStore';
import { storeToRefs } from 'pinia';


const store = useTodoStore();
const { priority } = storeToRefs(store); 
const { priorities, getPriorityBtn } = store;
</script>

<template>
    <div class="w-full flex justify-around gap-2">
        <button
          v-for="item in priorities"
          class="border p-2 w-full rounded"
          :class="getPriorityBtn(item)"
          @click="priority = item"
        >
          {{ item }}
        </button>
      </div>
</template>