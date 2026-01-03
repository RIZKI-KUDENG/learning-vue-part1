<script setup>
defineProps({
  title: String,
  subtitle: {
    type: String,
    default: "",
  },
  submitText: {
    type: String,
    default: "Submit",
  },
  footerText: String,
  footerLinkText: String,
  footerLinkTo: String,
});
defineEmits(["submit"]);
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="border rounded p-4">
      <div class="text-center">
        <h1 class="text-2xl font-bold">{{ title }}</h1>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>
      <div class="mt-4">
        <form action="" @submit.prevent="$emit('submit')" class="flex flex-col gap-3">
          <slot></slot>
          <div class="text-center">
            <button
              type="submit"
              class="bg-blue-500 text-white p-2 rounded-full w-full"
            >
              {{ submitText }}
            </button>
          </div>
        </form>
      </div>
        <p class="text-sm text-gray-500 mt-2" v-if="footerText">{{ footerText }} <a :href="footerLinkTo">{{ footerLinkText }}</a></p>
    </div>
  </div>
</template>
