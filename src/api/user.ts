import { ref } from 'vue';
import { useFetch, createFetch } from '@vueuse/core';

import type { Ref } from 'vue';
import type { Credentials }  from '@/types/Credentials';

const url: Ref<string> = ref('');

const loggedInFetch = createFetch({
  baseUrl: url,
  options: {
    async beforeFetch({ options }) {
      const myToken = localStorage.getItem('token');
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${myToken}`,
      };

      return { options }
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})

async function authenticate(credentials: Credentials) {
  const { isFetching, error, data } = await useFetch(url).post(credentials);
  return data;
}

async function registerUser(user: Credentials) {
  const { isFetching, error, data } = await useFetch(url).post(user);
}

async function getDashboardData() {
  const dashboardData = await loggedInFetch(url).get();
  return dashboardData;
}

export const userApi = {
  authenticate,
  registerUser
}