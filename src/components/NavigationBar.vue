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
nav#navbar.navbar.navbar-expand-lg.bg-light 
  .container-fluid
    a.navbar-brand(href='#') Vue SPA Boilerplate
    
    button.navbar-toggler(v-if='userStore.isLoggedIn' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation')
      span.navbar-toggler-icon

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
        <li class="nav-item" v-if='!userStore.isLoggedIn'>
          <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
        </li>

        <li class="nav-item" v-if='!userStore.isLoggedIn'>
          <router-link :to="{ name: 'signup' }" class="nav-link">Sign Up</router-link>
        </li>

        <li class="nav-item" v-if='userStore.isLoggedIn'>
          <router-link :to="{ name: 'dashboard' }" class="nav-link">Dashboard</router-link>
        </li>

        <li class="nav-item" v-if='userStore.isLoggedIn'>
          <a class="nav-link ps-4 pe-5" href='#' @click.prevent='logOut()'>Log out</a>
        </li>
      </ul>
    </div>
</template>