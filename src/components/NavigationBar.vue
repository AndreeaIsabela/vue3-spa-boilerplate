<script lang="ts" setup>
import { userStore } from '@/stores';
import { useRouter } from 'vue-router';
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark();
const toggleDark = useToggle(isDark);

const router = useRouter();

const logOut = () => {
  userStore.destroySession();
  
  router.push({ name: 'login' });
}
</script>

<template lang="pug">
nav#navbar.navbar.navbar-expand-lg.bg-body-tertiary
  .container-fluid
    a.navbar-brand(href='#') Vue SPA Boilerplate
    
    button.navbar-toggler(v-if='userStore.isLoggedIn' type='button' data-bs-toggle='collapse' data-bs-target='#navbarColor03' aria-controls='navbarColor03' aria-expanded='false' aria-label='Toggle navigation')
      span.navbar-toggler-icon

    #navbarColor03.collapse.navbar-collapse
      ul.navbar-nav.ms-auto.mt-2.mt-lg-0
        li.nav-item(v-if='!userStore.isLoggedIn')
          router-link.nav-link(:to="{ name: 'login' }") Login

        li.nav-item(v-if='!userStore.isLoggedIn')
          router-link.nav-link(:to="{ name: 'signup' }") Sign Up

        li.nav-item(v-if='userStore.isLoggedIn')
          router-link.nav-link(:to="{ name: 'dashboard' }") Dashboard

        li.nav-item(v-if='userStore.isLoggedIn')
          a.nav-link.ps-4.pe-5(href='#' @click.prevent='logOut()') Log out

        li.nav-item.d-flex.align-items-center
          fieldset.form-group
            .form-check.form-switch
              input#flexSwitchCheckDefault.form-check-input(type='checkbox' :checked='isDark' @click='toggleDark()')

</template>
<style>
.form-check.form-switch > input {
  border: 1px solid gray;
}

html.dark > body {
  filter: invert(100%);
  background-color: rgb(29, 32, 31) !important;
}

</style>