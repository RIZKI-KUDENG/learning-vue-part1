<script setup>
    import { useTodoStore } from "../../stores/todoStore";
    import { storeToRefs } from "pinia";
    import { ref } from "vue";

    const activeTab = ref('done')
    const {  toggleTask, getPriorityColor, removeTask} = useTodoStore()
    const store = useTodoStore();
    const { filteredDone, filteredTodos } = storeToRefs(store);
</script>

<template>
    <div class="grid grid-cols-2 gap-8 mt-2">
        <div
          :class="activeTab === 'done' ? 'bg-green-50' : ''"
          class="p-4 rounded-lg"
        >
          <h2
            class="text-center font-semibold text-green-700 mb-3 border-b border-green-200 pb-2"
            @click="activeTab = 'done'"
          >
            Completed
          </h2>
          <div
            v-if="activeTab === 'done'"
            v-for="done in filteredDone"
            class="flex justify-between items-center border p-1 rounded bg-gray-100"
            :key="done.id"
          >
            <input
              class="flex-none"
              type="checkbox"
              checked
              v-on:change="toggleTask(done.id)"
            />
            <div class="flex-none px-2">
              <p class="text-lg font-bold line-through">{{ done.text }}</p>
              <div>
                <span
                  :class="getPriorityColor(done.priority)"
                  class="text-[7px] border px-0.5"
                  >{{ done.priority.toUpperCase() }}</span
                >
              </div>
            </div>
            <button @click="removeTask(done.id)" class="flex-1 text-right">Delete</button>
          </div>
        </div>

        <div
          :class="activeTab === 'todo' ? 'bg-blue-50' : ''"
          class="p-4 rounded-lg"
        >
          <h2
            class="text-center font-semibold text-blue-700 mb-3 border-b border-blue-200 pb-2"
            @click="activeTab = 'todo'"
          >
            To Do
          </h2>
          <div
            v-if="activeTab === 'todo'"
            v-for="todo in filteredTodos"
            class="flex justify-between items-center border p-1 rounded bg-gray-100"
            :key="todo.id"
          >
            <input
              class="flex-none"
              type="checkbox"
              v-on:change="toggleTask(todo.id)"
            />
            <div class="flex-none px-2">
              <p class="text-lg font-bold">{{ todo.text }}</p>
              <div>
                <span
                  :class="getPriorityColor(todo.priority)"
                  class="text-[7px] border px-0.5"
                  >{{ todo.priority.toUpperCase() }}</span
                >
              </div>
            </div>
            <button @click="removeTask(todo.id)" class="flex-1 text-right">Delete</button>
          </div>
        </div>
      </div>
</template>