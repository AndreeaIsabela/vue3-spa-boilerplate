<script lang="ts" setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';

import { userStore } from '@/stores';

const router: Router = useRouter();

const showPassword = ref(false);
const loginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8)
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
.container
  .row
    #login.col-md-4.offset-md-4.pt-5
      h1.text-center.pt-5.pb-5 Log In
      form(@submit='authenticate')
        .form-group(:class='{"has-danger": errors.email && meta.touched}')
          .form-floating
            input.form-control(name='email' type='text' :class='{"is-invalid": errors.email && meta.touched}' v-model='email' :bind='emailAttrs' placeholder='Email address')
            label(for="email") Email address
          .validation-error(v-if='errors.email && meta.touched')
            span {{ errors.email }}
        .form-group.mt-4.mb-4(:class='{"has-danger": errors.password && meta.touched}')
          .input-group
            .form-floating
              input.form-control(name='password' :class='{"is-invalid": errors.password && meta.touched}' :type='showPassword ? "text" : "password"' v-model='password' :bind='passwordAttrs' placeholder='Password')
              label(for="password") Password
            button.btn.btn-light(type='button' @click='showPassword = !showPassword') 
              i.fa.fa-fw(:class='showPassword ? "fa-eye" : "fa-eye-slash"')
          .validation-error(v-if='errors.password && meta.touched')
            span {{ errors.password }}
        button.btn.btn-info.w-100(type='submit') Log In
</template>
