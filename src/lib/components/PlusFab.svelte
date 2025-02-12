<!-- PlusFab.svelte -->
<script lang="ts">
    import { mdiPlus } from '@mdi/js';
    import Fab, { Icon } from '@smui/fab';
    import { createEventDispatcher } from 'svelte';
  
    // Local click counter
    let clicked: number = 0;
  
    // Optionally dispatch events when clicked (for parent communication)
    const dispatch = createEventDispatcher();
  
    function handleClick() {
      clicked++;
      dispatch('click', { clicked });
    }
  </script>
  
  <!-- Use Tailwind classes for layout -->
  <div class="flex flex-col items-center justify-center p-4">
    <div class="mb-2">
      <!--
        We use viewBox="2 2 20 20" to enlarge the mdiPlus icon.
      -->
      <Fab on:click={handleClick} class="bg-blue-600 hover:bg-blue-700">
        <Icon tag="svg" viewBox="2 2 20 20">
          <path fill="currentColor" d={mdiPlus} />
        </Icon>
      </Fab>
    </div>
    <pre class="text-sm text-gray-700">Clicked: {clicked}</pre>
  </div>
  
  <style>
    /* Remove default focus outline on SVGs globally */
    :global(svg:focus) {
      outline: 0;
    }
  </style>
  