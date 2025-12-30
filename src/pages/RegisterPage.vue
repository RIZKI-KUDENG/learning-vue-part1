<script setup>
import { ref } from "vue";
import InputField from "../components/elements/InputField.vue";
import AuthLayouts from "../components/layouts/AuthLayouts.vue";

const username = ref("");
const confirmPassword = ref("");
const password = ref("");
</script>

<template>
  <AuthLayouts
    title="Register"
    subtitle="Create a new account"
    submitText="Register"
    footerText="Already have an account?"
    footerLinkText="Login"
    footerLinkTo="/login"
  >
    <InputField label="Username" v-model="username" />
    <InputField label="Password" type="password" v-model="password" />
    <InputField label="Confirm Password" type="password" v-model="confirmPassword" />
  </AuthLayouts>
</template>
