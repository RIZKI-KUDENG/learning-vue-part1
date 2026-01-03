<script setup>
import AuthLayouts from "../components/layouts/AuthLayouts.vue";
import InputField from "../components/elements/InputField.vue";
import { useForm } from "vee-validate";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { getAllUsers } from "../service/authService";


const router = useRouter()
const auth = useAuthStore()
const { handleSubmit, errors, defineField } = useForm();

const [username] = defineField("username");
const [password] = defineField("password");
onMounted(() => {
  getAllUsers()
})

const onSubmit = handleSubmit(async(values) => {
  const success = await auth.loginUser(values)

  if(success){
    alert("login success")
    router.push("/")
  }
})


</script>

<template>
  <AuthLayouts
    title="Login"
    subtitle="Please login to continue"
    submitText="Login"
    footerText="Don't have an account?"
    footerLinkText="Sign up"
    footerLinkTo="/register"
    @submit="onSubmit"
  >
    <InputField label="Username" v-model="username" />
    <span class="text-red-500 text-sm">{{ errors.username }}</span>
    <InputField label="Password" type="password" v-model="password" />
    <span class="text-red-500 text-sm">{{ errors.password }}</span>
  </AuthLayouts>
</template>
