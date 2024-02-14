<script lang="ts" setup>
import { userStore } from '@/stores';
import { useRouter } from 'vue-router';

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
</template>