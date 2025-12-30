<script setup>
import AuthLayouts from "../components/layouts/AuthLayouts.vue";
import InputField from "../components/elements/InputField.vue";
import { ref } from "vue";
const username = ref("");
const password = ref("");
</script>

<template>
  <AuthLayouts
    title="Login"
    subtitle="Please login to continue"
    submitText="Login"
    footerText="Don't have an account?"
    footerLinkText="Sign up"
    footerLinkTo="/register"
  >
    <InputField label="Username" v-model="username" />
    <InputField label="Password" type="password" v-model="password" />
  </AuthLayouts>
</template>
