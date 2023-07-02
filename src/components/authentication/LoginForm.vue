<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="username"
        label="User name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please enter your user name ']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Password"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please enter your password']"
      />

      <div>
        <q-btn label="Login" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
import AuthenticationApi from "src/services/api/Authentication.api";
import { userStore } from "src/stores/user-store";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const username = ref(null);
    const password = ref(null);
    const store = userStore();
    const router = useRouter();

    return {
      username,
      password,
      store,

      async onSubmit() {
        try {
          const user = await AuthenticationApi.loginWithPassword({
            username: username.value,
            password: password.value,
          });
          store.user = user;
          store.isAuthenticated = true;
          router.push("/admin/syllabus");
        } catch (error) {
          console.log(error);
        }
      },

      onReset() {
        username.value = null;
        password.value = null;
      },
    };
  },
};
</script>
