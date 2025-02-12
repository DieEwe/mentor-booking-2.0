<script lang="ts">
  import { mdiPlus } from '@mdi/js';
  import Fab, { Icon } from '@smui/fab';
  import { createEventDispatcher } from 'svelte';

  let clicked: number = 0;
  const dispatch = createEventDispatcher();

  function handleClick() {
    clicked++;
    dispatch('click', { clicked });
  }
</script>

<div class="plusfab-container">
  <div>
    <Fab on:click={handleClick} class="plus-fab">
      <Icon tag="svg" viewBox="2 2 20 20">
        <path fill="currentColor" d={mdiPlus} />
      </Icon>
    </Fab>
  </div>
  <pre>Clicked: {clicked}</pre>
</div>

<style>
  :global(svg:focus) {
    outline: 0;
  }
</style>
