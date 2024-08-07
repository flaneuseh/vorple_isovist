<script lang="ts">
	import { isovist } from '$lib/world';
	import { onMount } from 'svelte';
	import 'vorple/lib/css/vorple.css';

	onMount(async () => {
		const vorple = (await import('vorple')).default;
		vorple.options = {
			// Container for the interpreter
			container: '#vorple',
			// @ts-ignore
			story: 'StatelyGardens.gblorb'
		};
		vorple.init();
		// @ts-ignore
		window.isovist = isovist(vorple, true);
		// // @ts-ignore
		// window.isovist.loadWorld();
	});

	function on_key_down(event: any) {
		// `keydown` event is fired continuously while the physical key is held down.
		// If you only want to handle the first event (not while it is held down),
		// uncomment the following line
		// if (event.repeat) return;

		switch (event.key) {
			case 'w':
				// @ts-ignore
				window.isovist.stepForward('player');
				break;
			case 'a':
				// @ts-ignore
				window.isovist.turnLeft('player');
				break;
			case 's':
				// @ts-ignore
				window.isovist.stepBack('player');
				break;
			case 'd':
				// @ts-ignore
				window.isovist.turnRight('player');
				break;
		}
		//@ts-ignore
		window.isovist.clear();
		// @ts-ignore
		window.isovist.command('isovist');
		// @ts-ignore
		window.isovist.command('look');
		event.preventDefault();
	}
</script>

<svelte:window on:keydown={on_key_down} />
<div>
	<div class="map inner" />
	<div id="vorple" class="inner" />
</div>

<style>
	:global(.lineinput) {
		display: none;
	}
	:global(label#lineinput-prefix, input#lineinput-field) {
		color: transparent;
		font-size: 1px;
	}
	.inner {
		float: left;
		width: 50%;
		height: 100%;
	}

	:global(svg) {
		display: block;
		width: 500px;
		height: 1000px;
		border: 2px solid black;
	}
	:global(.isovist) {
		fill: yellow;
		stroke: lightgrey;
		stroke-width: 1;
		display: block;
		opacity: 0.3;
	}

	:global(.visTriangle) {
		opacity: 0.3;
	}

	:global(.isovist.right) {
		fill: red;
	}

	:global(.visTriangle.right) {
		fill: pink;
	}

	:global(.isovist.left) {
		fill: blue;
	}

	:global(.visTriangle.left) {
		fill: lightblue;
	}

	:global(.isovist.front) {
		fill: green;
	}

	:global(.visTriangle.front) {
		fill: lightgreen;
	}

	:global(.visTriangle) {
		fill: purple;
		stroke: lightgrey;
		stroke-width: 1;
		display: block;
	}

	:global(.pov) {
		fill: red;
	}

	:global(.invisible) {
		fill: darkgrey;
		stroke: black;
		stroke-width: 2;
	}

	:global(.visible) {
		fill: green;
		stroke: black;
		stroke-width: 2;
	}

	:global(.segment) {
		stroke: blue;
		stroke-width: 2;
	}

	:global(.visibleSegment) {
		stroke: lime;
		stroke-width: 2;
	}

	:global(.status-line-isovist) {
		flex: 1;
		text-align: center;
	}
</style>
