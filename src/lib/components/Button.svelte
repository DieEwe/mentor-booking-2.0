<script lang="ts">
    export let type: 'primary' | 'secondary' | 'third' = 'primary';
  </script>
  
  <button
    class="px-5 py-2.5 rounded-lg font-medium text-sm text-black transition"
    class:bg-primary={type === 'primary'}
    class:bg-secondary={type === 'secondary'}
    class:bg-third={type === 'third'}
    class:hover:bg-primary-hover={type === 'primary'}
    class:hover:bg-secondary-hover={type === 'secondary'}
    class:hover:bg-third-hover={type === 'third'}
  >
    <slot />
  </button>
  