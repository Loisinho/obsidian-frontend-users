<template>
	<header>
		<the-navbar />
	</header>
</template>

<script>
import Vue from 'vue';
import TheNavbar from './TheNavbar.vue';

export default Vue.extend({
	name: 'AppHeader',
	components: {
		TheNavbar
	}
});
</script>
