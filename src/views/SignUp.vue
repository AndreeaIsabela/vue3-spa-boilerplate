<script lang="ts" setup>
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { userApi } from '@/api/user';

const router: Router = useRouter();

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const loginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  passwordConfirmation: yup.string().required().oneOf([yup.ref('password')], 'passwords do not match')
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
const registerStatus: Ref<String> = ref('');
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
    registerStatus.value = 'success';
  } catch (error) {
    registerStatus.value = 'error';
  }
})
</script>

<template lang="pug">
.container
  .row
    #login.col-md-4.offset-md-4.pt-5
      h1.text-center.pt-5.pb-5 Sign Up
      form(@submit='register')
        .form-group(:class='{"has-danger": errors.email && meta.touched}')
          .form-floating
            input.form-control(name='email' type='text' v-model='email' :class='{"is-invalid": errors.email && meta.touched}' :bind='emailAttrs' placeholder='john@doe.com')
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

        .form-group.mb-4(:class='{"has-danger": errors.passwordConfirmation && meta.touched}')
          .input-group
            .form-floating
              input.form-control(name='password-confirmation' :type='showConfirmPassword ? "text" : "password"' :class='{"is-invalid": errors.passwordConfirmation && meta.touched}' v-model='passwordConfirmation' :bind='passwordConfirmationAttrs' placeholder='Password confirmation')
              label(for="password-confirmation") Password Confirmation
            button.btn.btn-light(type='button' @click='showConfirmPassword = !showConfirmPassword') 
              i.fa.fa-fw(:class='showConfirmPassword ? "fa-eye" : "fa-eye-slash"')
          .validation-error(v-if='errors.passwordConfirmation && meta.touched')
            span {{ errors.passwordConfirmation }}

        button.btn.btn-info.w-100.mb-4(type='submit') Sign up
        .alert.alert-dismissible.alert-success(v-if='registerStatus==="success"')
          button.btn-close(type='button' data-bs-dismiss='alert' @click='registerStatus = ""')
          strong Well done!
          |  You successfully  
          a.alert-link(href='#') signed up
          | .
        .alert.alert-dismissible.alert-danger(v-if='registerStatus==="error"')
          button.btn-close(type='button' data-bs-dismiss='alert'  @click='registerStatus = ""')
          strong Error
          |  Something went  
          a.alert-link(href='#') wrong
          | . Try again later
</template>
