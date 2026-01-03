<script setup>

import InputField from "../components/elements/InputField.vue";
import AuthLayouts from "../components/layouts/AuthLayouts.vue";
import { registerSchema } from "../validation/registerSchema";
import { useForm } from "vee-validate";
import { useAuthStore } from "../stores/authStore";
import { toTypedSchema } from "@vee-validate/zod";
import { useRouter } from "vue-router";





const router = useRouter()
const auth = useAuthStore()
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: toTypedSchema(registerSchema),
});

const [username] = defineField("username");
const [email] = defineField("email");
const [password] = defineField("password");

const onSubmit = handleSubmit(async(values) => {
  const success = await auth.registerUser(values)

  if(success){
    alert("register success")
    router.push("/login")
  }
})
</script>

<template>
  <AuthLayouts
    title="Register"
    subtitle="Create a new account"
    submitText="Register"
    footerText="Already have an account?"
    footerLinkText="Login"
    footerLinkTo="/login"
    @submit="onSubmit"
  >
    <InputField label="Username" v-model="username" />
    <span class="text-red-500 text-sm">{{ errors.username }}</span>
    <InputField label="Email" type="email" v-model="email" />
    <span class="text-red-500 text-sm">{{ errors.email }}</span>
    <InputField label="Password" type="password" v-model="password" />
    <span class="text-red-500 text-sm">{{ errors.password }}</span>
  </AuthLayouts>
</template>
