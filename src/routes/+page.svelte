<script lang="ts">
  import Button from '$lib/components/Button.svelte';
</script>

<!-- Two “cards” side by side on md+; stacked on mobile -->
<div class="grid gap-6 md:grid-cols-2">
  <!-- Card #1 -->
  <div class="bg-white rounded-xl p-6 shadow-md">
    <h2 class="text-2xl font-bold mb-3">Was ist ein*e Mentor*in?</h2>
    <p class="text-gray-600 mb-3">
      Ein*e Mentor*in mit einer sichtbaren oder unsichtbaren Behinderung kann in einem inklusiven Coaching eine besonders inspirierende und wirkungsvolle Rolle übernehmen. Durch eigene Erfahrungen versteht diese Person die Herausforderungen und Barrieren, mit denen Menschen mit Behinderung konfrontiert sind – aber auch die Stärken, die daraus entstehen. Sie kann authentische Einblicke geben, Mut machen und zeigen, wie individuelle Potenziale entfaltet werden können. Gleichzeitig schafft sie durch ihre Vorbildfunktion eine inklusive Haltung, die andere ermutigt, über bestehende Vorurteile hinauszudenken. In einem Coaching für Inklusion kann ein*e Mentor*in so nicht nur Wissen vermitteln, sondern auch empowern, vernetzen und den Weg für echte gesellschaftliche Teilhabe ebnen.
    </p>
    <a href="/" class="text-blue-600 hover:underline font-medium">Read more</a>
  </div>

  <!-- Card #2 -->
  <div class="bg-white rounded-xl p-6 shadow-md">
    <h2 class="text-2xl font-bold mb-3">Wie kann ich mich bewerben?</h2>
    <p class="text-gray-600 mb-3">
      Wenn du selbst Mentor*in werden möchtest, kannst du dich über unser Bewerbungsformular bewerben. Wir freuen uns auf deine Bewerbung und melden uns so schnell wie möglich bei dir zurück. Wenn du Fragen hast, kannst du uns gerne eine E-Mail schreiben oder uns anrufen. Wir freuen uns auf dich!
    </p>
    <a href="/" class="text-blue-600 hover:underline font-medium">Read more</a>
  </div>
</div>

<!-- Example usage of your Buttons below, if desired -->
<div class="mt-8 flex space-x-4">
  <Button type="primary">Placeholder Button 1</Button>
  <Button type="secondary">Placeholder Button 2</Button>
</div>
