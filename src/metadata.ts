import { writable } from "svelte/store";

export let title = writable<string>();
export let description = writable<string>();
