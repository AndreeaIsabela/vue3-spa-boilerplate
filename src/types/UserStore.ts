import type { ComputedRef, Ref } from 'vue';

export interface UserStore { 
  token: Ref<string|null>;
  isLoggedIn: ComputedRef<boolean>;
  destroySession(): void;
  authenticateUser(email: string, password: string): void;
}