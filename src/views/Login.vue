<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';

import { userStore } from '@/stores';

const router: Router = useRouter();

const loginSchema = object({
  email: string().required().email(),
  password: string().required().min(8)
});
const { errors, defineField, meta, handleSubmit } = useForm({ validationSchema: loginSchema });
const [ email, emailAttrs ] = defineField('email', {
  validateOnModelUpdate: false
});
const [ password, passwordAttrs ] = defineField('password', {
  validateOnModelUpdate: false
});

/**
 * Authenticate the given user.
 *
 * @return {Promise<void>}
 */
const authenticate = handleSubmit(async values => {
  try {
    userStore.authenticateUser(values.email, values.password);

    router.push({ name: 'dashboard' });
  } catch (error) {
    alert('Whoops, something went wrong. Please try again.');
  }
})
</script>

<template lang="pug">
<div class="container">
  <div class="row">
    <div id="login" class="col-md-4 offset-md-4 pt-5">
      <h1 class="text-center pt-5 pb-5">Log In</h1>

      <form @submit="authenticate">
        <div class="form-group">
          <input class="form-control" name="email" type="text" v-model="email" :bind="emailAttrs" placeholder="john@doe.com" />

          <div v-if="errors.email && meta.touched" class="validation-error">
            <span>{{ errors.email }}</span>
          </div>
        </div>

        <div class="form-group">
          <input class="form-control" name="password" type="password" v-model="password" :bind="passwordAttrs" placeholder="Password" />

          <div v-if="errors.password && meta.touched" class="validation-error">
            <span>{{ errors.password }}</span>
          </div>
        </div>
      
        <button class="btn btn-primary" type="submit">Log In</button>
      </form>
    </div>
  </div>
</div>
</template>

<style>
.validation-error {
  color: red;
  margin-top: 10px;
}
</style>