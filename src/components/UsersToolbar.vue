<template>
	<Toolbar class="p-mb-4">
		<template #left>
			<SplitButton
				:label="label"
				icon="pi pi-plus"
				class="p-button-primary p-mr-2"
				@click="add"
			/>
		</template>

		<template #right>
			<span class="p-input-icon-left">
				<i class="pi pi-search" />
				<InputText v-model="filters['global']" :placeholder="$t('Search')" />
			</span>
		</template>
	</Toolbar>
</template>

<script lang="ts">
import Vue from 'vue';
import Toolbar from 'primevue/toolbar';
import SplitButton from 'primevue/splitbutton';
import InputText from 'primevue/inputtext';

export default Vue.extend({
	name: 'UsersToolbar',
	components: {
		Toolbar: Vue.extend(Toolbar),
		SplitButton: Vue.extend(SplitButton),
		InputText: Vue.extend(InputText)
	},
	props: {
		label: {
			type: String
		},
		filters: {
			type: Object
		}
	},
	methods: {
		add() {
			this.$emit('add-user');
		}
	}
});
</script>

<style lang="scss" scoped></style>
