<template>
	<ContextMenu ref="cm" :model="model" />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import ContextMenu from 'primevue/contextmenu';

export default Vue.extend({
	name: 'UsersContextMenu',
	components: {
		ContextMenu: Vue.extend(ContextMenu)
	},
	props: {
		model: {
			type: Array
		}
	},
	methods: {
		show(event: any) {
			(this as any).$refs.cm.show(event.originalEvent);
		}
	}
});
</script>

<style lang="scss" scoped>
.p-contextmenu {
	width: auto;

	/deep/ ul > .p-menuitem:last-child > .p-menuitem-link {
		> .p-menuitem-text,
		> .p-menuitem-icon {
			color: #ff0000;
		}
	}
}
</style>
