<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { object, string, ref } from 'yup';
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';

import { userApi } from '@/api/user';

const router: Router = useRouter();

const loginSchema = object({
  email: string().required().email(),
  password: string().required().min(8),
  passwordConfirmation: string().required().oneOf([ref('password')], 'passwords do not match')
});
const { errors, defineField, meta, handleSubmit } = useForm({ validationSchema: loginSchema });
const [ email, emailAttrs ] = defineField('email', {
  validateOnModelUpdate: false
});

const [ password, passwordAttrs ] = defineField('password', {
  validateOnModelUpdate: false
});

const [ passwordConfirmation, passwordConfirmationAttrs ] = defineField('passwordConfirmation', {
  validateOnModelUpdate: false
});

/**
 * Authenticate the given user.
 *
 * @return {Promise<void>}
 */
const register = handleSubmit(async values => {
  try {
    await userApi.registerUser({
      email: values.email,
      password: values.password
    });

    alert('Registered!')
  } catch (error) {
    alert('Whoops, something went wrong. Please try again.');
  }
})
</script>

<template lang="pug">
.container
  .row
    #login.col-md-4.offset-md-4.pt-5
      h1.text-center.pt-5.pb-5 Sign Up
      form(@submit='register')
        .form-group
          input.form-control(name='email' type='text' v-model='email' :bind='emailAttrs' placeholder='john@doe.com')
          .validation-error(v-if='errors.email && meta.touched')
            span {{ errors.email }}
        .form-group
          input.form-control(name='password' type='password' v-model='password' :bind='passwordAttrs' placeholder='Password')
          .validation-error(v-if='errors.password && meta.touched')
            span {{ errors.password }}
        .form-group
          input.form-control(name='password-confirmation' type='password' v-model='passwordConfirmation' :bind='passwordConfirmationAttrs' placeholder='Password confirmation')
          .validation-error(v-if='errors.passwordConfirmation && meta.touched')
            span {{ errors.passwordConfirmation }}
        button.btn.btn-primary(type='submit') Sign up
</template>

<style>
.validation-error {
  color: red;
  margin: 2px 0 5px 0;
}
</style>