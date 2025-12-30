<script setup>
import { useTodoStore } from '../../stores/todoStore';
import InputField from '../elements/InputField.vue';

const {newTodo, addTodo} = useTodoStore()
</script>

<template>
    <form @submit.prevent="addTodo" class="flex gap-2">
        <div class="grow">
          <InputField
            label="Add Todo"
            type="text"
            v-model="newTodo"
            class="w-full"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2 transition"
        >
          Add
        </button>
      </form>
</template>