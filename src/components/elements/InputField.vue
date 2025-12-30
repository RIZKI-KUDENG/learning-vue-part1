<script setup>
defineProps({
  label: {
    type: String,
  },
  type: {
    type: String,
    default: 'text',
  },
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>

<template>
      <div class="flex gap-2 items-center">
        <label>{{ label }} :</label>
        <input :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="border p-2 rounded-full flex-1" />
      </div>
</template>