<script lang="ts">
	import colour from "$lib/stores/colour";
</script>

newty<button class="cursor-pointer inline {$colour}" on:click={(mouse) => (mouse.button === 0 ? colour.next() : null)} on:contextmenu|preventDefault={(_) => colour.back()} tabindex={-1}>.dev</button>
