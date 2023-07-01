<template>
  <q-layout>
    <q-page-container class="flex flex-center">
      <login-form></login-form>
    </q-page-container>
  </q-layout>
</template>

<script>
import LoginForm from "src/components/authentication/LoginForm.vue";

export default { components: { LoginForm } };
</script>

<style scoped></style>
