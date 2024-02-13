import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import type { ComputedRef, Ref } from 'vue';
import type { UserStore } from '@/types/UserStore';

export const useUserStore = defineStore('users', (): UserStore => {
  const token: Ref<string|null> = ref(localStorage.getItem('token'));
  const isLoggedIn: ComputedRef<boolean> = computed(() => !!token.value);

  const destroySession = (): void => {
    token.value = null;
    localStorage.removeItem('token');
  };

  const authenticateUser = (email: string, password: string): void => {
    const jwt: string = 'secret_token';
    localStorage.setItem('token', jwt);
    token.value = jwt;
  };

  return { token, isLoggedIn, destroySession, authenticateUser };
})
