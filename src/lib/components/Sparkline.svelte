<script lang="ts">
    import { Sparkline } from "sparkline-svelte"; 
    import type { DataPoint } from "sparkline-svelte";
    import { priceData } from "$lib/data";

    let color = "#3ac7d1";
    let cursorInfo: DataPoint | null = null;

    let data: { label: string; value: number }[] = [];

    let prices = [30, 100, 78, 62, 44, 60, 150, 198]; // Test

     // Doesn't do anything dramatic, satisfies TS
    $: data = $priceData.map((d): { label: string; value: number } => ({
        label: d.label ?? '',
        value: d.value,
    }));
</script>
<div class="w-full max-w-md p-4">
    <Sparkline
      data={data}
      options={{
        height: "9em",
        width: "100%",
        interactive: true,
        showTooltip: true,
        lineColor: color,
        showSpot: true,
      }}
      bind:cursorData={cursorInfo}
    />
  
    {#if cursorInfo}
      <p class="mt-2 text-sm">{cursorInfo.label}: ${cursorInfo.value.toFixed(2)}</p>
    {/if}
  </div>