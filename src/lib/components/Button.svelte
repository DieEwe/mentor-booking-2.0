<script lang="ts">
    export let type: 'primary' | 'secondary' | 'third' | 'navbutton1' = 'primary'; // Default to primary button style
  </script>
  
  <button class="btn {type === 'primary' ? 'btn-primary' : type === 'secondary' ? 'btn-secondary' : type === 'navbutton1' ? 'btn-nav1' : 'btn-third'}">
    <slot />
  </button>
  
  