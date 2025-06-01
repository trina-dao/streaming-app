<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="about-container">
	<h1>About this app</h1>

	<p>
		This application provides real-time market data visualization through sound. It streams live stock trade prices and sonifies them, offering an alternative way to experience data through audio.
	</p>

	<p>
		<strong>Market data</strong> is powered by <a href="https://finnhub.io" target="_blank" rel="noopener">Finnhub</a>, a free and open API for real-time stock quotes and financial data.
	</p>

	<p>
		The <strong>sonification engine</strong> is built using <a href="https://see-mike-out.github.io/erie-documentation/docs/future/" target="_blank" rel="noopener">Erie</a>, a declarative grammar for creating and playing data-driven sound sequences in the browser.
	</p>

	<p>
		This project is intended as an experimental tool for exploring alternative interfaces to financial data, particularly for accessibility, education, or creative applications.
	</p>

	<p>
		Feel free to explore, listen, and interact with the data in a whole new way.
	</p>

	<p><strong>Disclaimer:</strong>
		The data presented on this page is sourced from a third-party provider and is intended for informational purposes only. While we strive to display accurate and timely information, we cannot guarantee its completeness or reliability. Please verify with official sources before making any decisions based on this data.</p>
</div>

<style>
	.about-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		font-family: system-ui, sans-serif;
	}
	h1 {
		font-size: 2rem;
		margin-bottom: 1rem;
	}
	p {
		margin-bottom: 1rem;
		line-height: 1.6;
	}
</style>
