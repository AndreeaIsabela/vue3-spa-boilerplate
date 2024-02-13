import { createPinia } from 'pinia';
import type { Pinia } from 'pinia';

import { useUserStore } from './users';

export const pinia: Pinia = createPinia();

export const userStore = useUserStore(pinia);
