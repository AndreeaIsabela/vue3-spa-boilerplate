import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { userApi } from '@/api/user';

import type { ComputedRef, Ref } from 'vue';
import type { UserStore } from '@/types/UserStore';

export const useUserStore = defineStore('users', (): UserStore => {
  const token: Ref<string|null> = ref(localStorage.getItem('token'));
  const isLoggedIn: ComputedRef<boolean> = computed(() => !!token.value);

  const destroySession = (): void => {
    token.value = null;
    localStorage.removeItem('token');
  };

  const authenticateUser = async (email: string, password: string): Promise<void> => {
    try {
      const resp: any = await userApi.authenticate({
        email, 
        password
      });
      localStorage.setItem('token', resp.jwt);
      token.value = resp.jwt;
    } catch(error) {
      console.log(error);
    }
  };

  return { token, isLoggedIn, destroySession, authenticateUser };
})
