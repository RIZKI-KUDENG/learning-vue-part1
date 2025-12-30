<script setup>
import InputField from "../components/elements/InputField.vue";
import FormTodo from "../components/fragments/FormTodo.vue";
import CarouselDate from "../components/fragments/CarouselDate.vue";
import PriorityTodo from "../components/elements/PriorityTodo.vue";
import ListTasks from "../components/fragments/ListTasks.vue";
import { onMounted } from "vue";
import { useTodoStore } from "../stores/todoStore";

const todoStore = useTodoStore();

onMounted(() => {
  todoStore.loadFromLocalStorage();
});
</script>

<template>
  <div class="p-4 max-w-xl mx-auto border mt-5 shadow-lg rounded-lg bg-white">
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Create Todo List</h1>
    </div>

    <div class="flex flex-col gap-4">
      <FormTodo />

      <CarouselDate />


      <PriorityTodo/>

      <ListTasks />
    </div>
  </div>
</template>
