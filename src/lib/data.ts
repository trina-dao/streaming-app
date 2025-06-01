import { writable } from 'svelte/store';
import type { DataPoint } from 'sparkline-svelte';

// Stream
export const symbol = writable("");
export const waveType = writable("");
export const doneClick = writable(false);


// Sparkline
export const priceData = writable<DataPoint[]>([]);
export const maxPoints = writable(200); 