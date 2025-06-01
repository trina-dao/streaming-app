<script>
    import { onMount, onDestroy } from 'svelte';
    import * as Erie from "erie-web";
    import { spec } from './spec';
    import { priceData, maxPoints, symbol, waveType, doneClick } from '$lib/data.js';
    import { get } from 'svelte/store';
    

    const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;
    const url = `wss://ws.finnhub.io?token=${apiKey}`;

    let currentPrice = null;
    let currentTime = null;
    let lastPrice = null;
    let priceChange = null;

    let socket; 
    let currentSymbol = "";
    let audio;
    let isPlaying = false;

    // New symbol/wave inputted => reset everything, new socket and stream
    $: if ($doneClick && $symbol !== "") {
        doneClick.set(false);
        priceData.set([]);
        if (audio) stop();
        console.log(`Symbol changed to ${get(symbol)}`);
        currentPrice = null;
        currentTime = null;
        priceChange = null;
        lastPrice = null;

        // diff symbol, new socket
        if (get(symbol) !== currentSymbol) {
            currentSymbol = get(symbol);
            connectSocket(currentSymbol);
        }
        // new stream
        fetchLatestPrice(currentSymbol);
    }

    // fetches symbols current price to create valid domain
    async function fetchLatestPrice(newSymbol) {
        const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${newSymbol}&token=${apiKey}`);
        if (!res.ok) throw new Error('Failed to fetch price');
        const quote = await res.json();
        compileNewStream(quote);
    }

    // Connect to socket to symbol
    function connectSocket(sym) {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'unsubscribe', symbol: currentSymbol }));
            socket.close();
        }

        socket = new WebSocket(url);
        // socket = new WebSocket(`ws://localhost:80`);

        socket.onopen = () => {
            console.log(`WebSocket opened for ${sym}`);
            socket.send(JSON.stringify({ type: 'subscribe', symbol: sym }));
        };

        socket.onmessage = (evt) => {
            const message = JSON.parse(evt.data);
            // console.log(message);
            if (message.type === 'trade') {
                const trade = message.data[0];  
                const price = trade.p;
                const time = new Date(trade.t).toLocaleTimeString();
                const sym = trade.s;
                console.log(`[${sym}]:${time} ${price}`);
                if (currentPrice !== price) {
                    priceData.update((current) => {
                        const updated = [...current.slice(-maxPoints + 1), { label: time, value: price }];
                        return updated;
                    });
                    if (audio && isPlaying) {
                        audio.play([
                        { index: 0, price: currentPrice }, // old
                        { index: 1, price: price } // new
                    ]);
                    }
            
                }
                currentPrice = price;
                currentTime = time;
            }
        };

        socket.onerror = (error) => console.log("WebSocket closed:", error.code, error.reason);
        socket.onclose = () => console.log('WebSocket closed');
    }

    // Make new stream when symbol changes
    function compileNewStream(quote) {
        spec.title = `Live ${symbol} Price`;
        spec.tone.type = get(waveType);
        spec.tone.continued = true;
        spec.encoding.pitch.scale.domain = [(quote.l * 0.95).toFixed(2), (quote.h * 1.05).toFixed(2)];
        // console.log(spec);
        Erie.compileAudioGraph(spec, {})
            .then((audio_graph) => {
                audio = audio_graph;
            })
            .catch((e) => console.warn(e));
        console.log(`New stream created for ${get(symbol)} with tone ${get(waveType)}`);

        
    }

    onMount(() => {
        // compileNewStream();
    });

    onDestroy(() => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
            socket.close();
        }
        stop();
    });

    // Play button: starts stream
    function play() {
        if (isPlaying) return;
        audio.start();
        // audio.play_test();
        console.log("Audio started");
        isPlaying = true;
        audio.play_test();
    }

    // Stop button: stops stream
    function stop() {
        if (!isPlaying) return;
        audio.stop();
        console.log("audio stopped");
        isPlaying = false;
    }

    // Calculate price difference
    $: if (currentPrice !== null) {
        if (lastPrice !== null) {
            priceChange = currentPrice - lastPrice;
        }
        lastPrice = currentPrice;
    }

    function formatChange(change) {
        return change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
    }

    function changeClass(change) {
        if (change > 0) return 'up';
        if (change < 0) return 'down';
        return 'neutral';
    }

</script>

<div class="data-card">
    <div class="card-header">
      <h2 class="symbol-name">{currentSymbol}</h2>
    </div>
    <div class="card-body">
      {#if currentPrice !== null}
        <p class="price">
          {currentTime}: {currentPrice.toFixed(2)}
          {#if priceChange !== null}
            <span class="price-change {changeClass(priceChange)}">
              ({formatChange(priceChange)})
            </span>
          {/if}
        </p>
      {:else}
        <p class="price waiting">Waiting for data...</p>
      {/if}
      <div class="card-actions">
        <button class="start-btn" on:click={play}>Play</button>
        <button class="stop-btn" on:click={stop}>Stop</button>
      </div>
      {#if isPlaying}
        <p>Audio is playing</p>
        {/if}
    </div>
  </div>
  
  
<style>
    .data-card {
        background: #2b3b4d;
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
        width: 300px;
        color: #ffffff;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .symbol-name {
        font-size: 1.4rem;
        font-weight: 600;
        color: #4dd0e1;
        margin-bottom: 0.5rem;
    }

    .price {
        font-size: 1.1rem;
        font-weight: 500;
        color: #ffffff;
    }

    .price.waiting {
        color: #9eaab8;
        font-style: italic;
    }

    .card-actions {
        display: flex;
        justify-content: space-between;
        gap: 0.75rem;
    }

    .start-btn,
    .stop-btn {
        flex: 1;
        padding: 0.5rem 0.75rem;
        border: none;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        background-color: #4dd0e1;
        color: #1e2a38;
        transition: background-color 0.3s ease;
    }

    .stop-btn {
        background-color: #f44336;
        color: #ffffff;
    }

    .start-btn:hover {
        background-color: #3ac7d1;
    }

    .stop-btn:hover {
        background-color: #e53935;
    }
    .price-change {
        margin-left: 0.5rem;
        font-weight: 600;
    }

    .price-change.up {
        color: #4caf50;
    }

    .price-change.down {
        color: #f44336;
    }

    .price-change.neutral {
        color: #9eaab8; 
    }
</style>
