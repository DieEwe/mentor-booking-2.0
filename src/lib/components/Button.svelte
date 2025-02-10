<script lang="ts">
    export let type: 'primary' | 'secondary' | 'third' = 'primary';
  </script>
  
  <button
    class="btn-primary" 
    class:bg-secondary={type === 'secondary'}
    class:bg-third={type === 'third'}
    class:hover:bg-secondary-hover={type === 'secondary'}
    class:hover:bg-third-hover={type === 'third'}
  >
    <slot />
  </button>
  