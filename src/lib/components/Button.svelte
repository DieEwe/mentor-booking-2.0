<script lang="ts">
  // Accept one of the four types – note that for nav buttons we map to the "nav-btn" class.
  export let type: 'primary' | 'secondary' | 'third' | 'navbutton1' = 'primary';
</script>

<button class={`btn ${type === 'primary' 
    ? 'btn-primary' 
    : type === 'secondary' 
      ? 'btn-secondary' 
      : type === 'navbutton1' 
        ? 'nav-btn' 
        : 'btn-secondary'}`}>
  <slot />
</button>
