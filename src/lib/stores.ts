import { writable } from 'svelte/store';

export interface Toast {
	message?: string;
	hasMessage: boolean;
}
const defaultToast = {
	hasMessage: false
};
export const toast = writable<Toast>(defaultToast);
