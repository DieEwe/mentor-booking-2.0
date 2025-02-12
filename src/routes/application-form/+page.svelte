<script lang="ts">
  let fullName = '';
  let phone = '';
  let availability = '';

  function sendForm() {
    alert(`Form submitted for ${fullName} (dummy)`);
  }
</script>

<h2 class="section-title">Mentor Application Form</h2>

<form class="form-container">
  <div class="form-group">
    <label for="fullName">Full Name</label>
    <input id="fullName" type="text" bind:value={fullName} />
  </div>

  <div class="form-group">
    <label for="phone">Phone</label>
    <input id="phone" type="text" bind:value={phone} />
  </div>

  <div class="form-group">
    <label for="availability">Availability</label>
    <textarea id="availability" rows="3" bind:value={availability}></textarea>
  </div>

  <button type="button" on:click={sendForm} class="btn btn-primary">Submit</button>
</form>
