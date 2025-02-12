<script lang="ts">
  import { goto } from '$app/navigation';
  function handleClick() {
    goto('https://cloud.seatable.io/...');
  }
</script>

<p class="section-text">
  Wir freuen uns, dass du dich als MentorIn bewerben möchtest. Bitte nimm dir kurz Zeit und fülle unser Bewerbungsformular aus.
</p>
<button class="btn btn-primary" on:click={handleClick}>
  Zur Bewerbung
</button>
