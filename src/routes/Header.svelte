<script lang="ts">
	import { page } from '$app/state';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
</script>

<header>
	<nav class="navbar">
		<div class="brand">
			<a href="/">
				Stock Sonifier
			</a>
		</div>
		<ul class="nav-links">
		  <li><a href="/about">About</a></li>
		  <li><a href="/symbols">Symbols</a></li>
		</ul>
	  </nav>
</header>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	body {
		font-family: 'Segoe UI', sans-serif;
		background-color: #f5f7fa;
	}

	/* Navbar Styles */
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #1e2a38;
		padding: 1rem 2rem;
		color: #ffffff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.brand a {
		font-size: 1.5rem;
		font-weight: bold;
		color: #4dd0e1;
		text-decoration: none;
	}

	.nav-links {
		list-style: none;
		display: flex;
		gap: 1.5rem;
	}

	.nav-links a {
		color: #ffffff;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.3s;
	}

	.nav-links a:hover {
		color: #4dd0e1;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.nav-links {
			flex-direction: column;
			position: absolute;
			top: 60px;
			right: 2rem;
			background-color: #1e2a38;
			padding: 1rem;
			display: none;
		}

		.navbar.active .nav-links {
			display: flex;
		}
	}
</style>
