<svelte:head>
	<title>Symbols</title>
	<meta name="description" content="Available symbols to track" />
</svelte:head>
<script>
	const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;
	let symbols = [];
	let filteredSymbols = [];
	let loading = true;
	let error = '';
	let search = "";
	let mic = "";

	// fetch symbols
	async function doGETRequest(evt) {
		if (evt.target.dataset.mic === mic) return;
		mic = evt.target.dataset.mic;
		try {
			const res = await fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&mic=${mic}&type=Common%20Stock&token=${apiKey}`);
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			symbols = await res.json();
		} catch (err) {
			error = 'Failed to load symbols: ' + err.message;
		} finally {
			loading = false;
		}
	}

	// Apply filter when user types
	function doFilter(evt) {
		const query = evt.target.value.toLowerCase();
		filteredSymbols = symbols.filter((s) => {
			return s.description.toLowerCase().includes(query);
		});
	}
  </script>

<h1>Symbols</h1>
<div class="mic-buttons">
	<button data-mic="XNAS"on:click={doGETRequest}>NASDAQ</button>
	<button data-mic="XNYS" on:click={doGETRequest}>New York Stock Exchange</button>
</div>
{#if mic !== ""}
	<div class="input-box">
		<svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#a09c9c"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#a09c9c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
		<input type="text" placeholder="Search by name" bind:value={search} on:input={doFilter}>
	</div>

  {#if loading}
	<p>Loading symbols...</p>
  {:else if error}
	<p style="color: red">{error}</p>
  {:else}
	<table>
	  <thead>
		<tr>
		  <th>Symbol</th>
		  <th>Description</th>
		  <th>Currency</th>
		</tr>
	  </thead>
	  <tbody>
		{#if search.length !== 0}
			{#each filteredSymbols as s}
				<tr>
				<td>{s.displaySymbol}</td>
				<td>{s.description}</td>
				<td>{s.currency}</td>
				</tr>
			{/each}
		{:else}
			{#each symbols as s}
			<tr>
				<td>{s.displaySymbol}</td>
				<td>{s.description}</td>
				<td>{s.currency}</td>
			</tr>
			{/each}
		{/if}
	  </tbody>
	</table>
  {/if}
{/if}
  <style>
	table {
	  width: 100%;
	  border-collapse: collapse;
	  margin-top: 1rem;
	  font-size: 0.9rem;
	}
  
	thead {
	  background-color: #f3f4f6;
	  text-transform: uppercase;
	  font-weight: bold;
	  color: #374151;
	}
  
	th, td {
	  border: 1px solid #e5e7eb;
	  padding: 0.75rem;
	  text-align: left;
	}
  
	tbody tr:nth-child(even) {
	  background-color: #f9fafb;
	}
  
	tbody tr:hover {
	  background-color: #eef2f7;
	}
  
	p {
	  margin-top: 1rem;
	  font-size: 1rem;
	}

	.input-box {
	  position: relative;
	  width: 50%;
	  margin: 1rem auto;
	  display: flex;
	}

	.input-box input {
	  width: 100%;
	  padding: 8px 12px 8px 36px;
	  border: 1px solid #ccc;
	  border-radius: 6px;
	  font-size: 1rem;
	}

	.input-box .icon {
	  position: absolute;
	  top: 50%;
	  left: 10px;
	  width: 18px;
	  height: 18px;
	  transform: translateY(-50%);
	  pointer-events: none;
	}
	
	.mic-buttons{
		display:flex;
		justify-content: center;
		gap:1rem;
	}
</style>
  
  