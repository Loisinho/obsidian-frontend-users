<template>
	<div id="app">
		<app-header />
		<Toast />
		<router-view id="content" />
		<app-footer />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';

export default Vue.extend({
	name: 'Main',
	components: {
		AppHeader,
		AppFooter
	}
});
</script>

<style lang="scss">
.vue-dialog button {
	letter-spacing: 1px;
	outline: none;
	text-transform: uppercase;
}

#content {
	padding: 42px 5%;
}
</style>
