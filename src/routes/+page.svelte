<script>
	import Stream from '$lib/components/Stream.svelte';
	import Sparkline from '$lib/components/Sparkline.svelte'; 
	import { doneClick, symbol, waveType } from '$lib/data.js';

  	// let symbol = 'BINANCE:BTCUSDT'; // crypto available 24/7
	let inputSymbol = "";
	let inputWave = "";
	
	function setData() {
		symbol.set(inputSymbol.trim().toUpperCase());
		waveType.set(inputWave);
		doneClick.set(true);
	}

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Sonify</h1>
	<main>
		<p>Enter a symbol: <input type="text" bind:value={inputSymbol} placeholder="e.g. AAPL"></p>
		<p>Set oscillator wave:
			<select bind:value={inputWave}>
				<option value="sine">Sine</option>
				<option value="square">Square</option>
				<option value="sawtooth">Sawtooth</option>
				<option value="triangle">Triangle</option>
			</select>
		</p>
		<button on:click={setData}>Done</button>
		<div class="obj-containers">
			<div class="stream">
				<Stream />
			</div>
			<div class="sparkline">
				<Sparkline />
			</div>
		</div>
	</main>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	button {
		margin-bottom: 1rem;
	}

	.obj-containers {
		display: flex;
		gap: 3rem;
		align-items: flex-end;
	}
	.sparkline {
		margin-top: 3.5rem;
	}
</style>
