import { writable } from "svelte/store";

export const age = Math.abs(
	new Date(Date.now() - new Date(2006, 5, 6).getTime()).getUTCFullYear() - 1970
);

export let title = writable("newt!");
export let description = writable(`${age}-year-old full-stack engineer from the UK.`);
export let icon = writable("favicon.png");
