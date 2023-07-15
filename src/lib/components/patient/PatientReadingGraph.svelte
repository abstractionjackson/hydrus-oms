<script lang="ts">
	import { HOMS_INTERVAL } from "$lib/constants";
	import type { Patient } from "$types";
	import { Chart, type ChartItem, BarController, BarElement, CategoryScale, LinearScale, type ChartConfiguration, Legend } from "chart.js";
	import { onMount } from "svelte";

  Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend);

  let canvas: HTMLCanvasElement;

  export let patient: Patient;

  const CHART_COLORS = {
    red: "rgb(255, 99, 132)",
    redBorder: "rgb(255, 99, 132)",
    blue: "rgb(54, 162, 235)",
    blueBorder: "rgb(54, 162, 235)",
  }

  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: [...HOMS_INTERVAL].slice(1),
      datasets: [
        {
          label: "IOP",
          data: patient.iop_readings.map(({ mmhg }) => mmhg),
          backgroundColor: CHART_COLORS.red,
          borderColor: CHART_COLORS.redBorder,
          borderWidth: 1
        },
        {
          label: "Medication",
          data: patient.medication_readings.map(({ quantity }) => quantity),
          backgroundColor: CHART_COLORS.blue,
          borderColor: CHART_COLORS.blueBorder,
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      }
    }
  }
  onMount(() => {
    const ctx = canvas.getContext("2d") as ChartItem;
    new Chart(ctx, config);
  });
</script>

<div>
	<canvas bind:this={canvas}></canvas>
</div>
