<template>
	<Dialog
		:visible.sync="visibility"
		:style="{ width: '450px' }"
		:header="dialog.title"
		:modal="true"
		class="p-fluid"
	>
		<div class="p-field">
			<label for="name">{{ $t('Name') }}</label>
			<InputText
				id="name"
				v-model.trim="user.name"
				required="true"
				:class="{ 'p-invalid': dialog.submitted && !user.name }"
			/>
			<small class="p-invalid" v-if="dialog.submitted && !user.name">{{
				$t('Required')
			}}</small>
		</div>
		<div class="p-field">
			<label for="userName">{{ $t('User Name') }}</label>
			<InputText
				id="userName"
				v-model.trim="user.userName"
				required="true"
				:class="{ 'p-invalid': dialog.submitted && !user.userName }"
			/>
			<small class="p-invalid" v-if="dialog.submitted && !user.userName">{{
				$t('Required')
			}}</small>
		</div>
		<div class="p-field">
			<label for="email">{{ $t('Email') }}</label>
			<InputText
				id="email"
				v-model.trim="user.email"
				required="true"
				:class="{ 'p-invalid': dialog.submitted && !user.email }"
			/>
			<small class="p-invalid" v-if="dialog.submitted && !user.email">{{
				$t('Required')
			}}</small>
		</div>
		<div class="p-field">
			<label for="role">{{ $t('Roles') }}</label>
			<Dropdown
				id="role"
				v-model="user.role"
				:options="roles"
				optionLabel="role"
				optionValue="key"
				:placeholder="$t('Select Rol')"
				required="true"
				:class="{ 'p-invalid': dialog.submitted && !user.role }"
			/>
			<small class="p-invalid" v-if="dialog.submitted && !user.role">{{
				$t('Required')
			}}</small>
		</div>
		<template #footer>
			<Button
				:label="$t('Cancel')"
				class="p-button-text p-button-secondary"
				@click="hide"
			/>
			<Button
				:label="dialog.confirm"
				class="p-button-text p-button-primary"
				@click="confirm"
			/>
		</template>
	</Dialog>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

export default Vue.extend({
	name: 'UsersDialog',
	components: {
		Dialog: Vue.extend(Dialog),
		InputText: Vue.extend(InputText),
		Dropdown: Vue.extend(Dropdown)
	},
	props: {
		visible: {
			type: Boolean
		},
		dialog: {
			type: Object
		},
		user: {
			type: Object
		}
	},
	model: {
		prop: 'visible',
		event: 'visibility'
	},
	computed: {
		visibility: {
			get() {
				return (this as any).visible;
			},
			set() {
				(this as any).hide();
			}
		}
	},
	data() {
		return {
			roles: [
				{ role: this.$t('User Rol'), key: 'user' },
				{ role: this.$t('Admin Rol'), key: 'admin' },
				{ role: this.$t('Modeler Rol'), key: 'modeler' }
			]
		};
	},
	methods: {
		hide() {
			this.$emit('hide-dialog');
		},
		confirm() {
			this.$emit('confirm-dialog');
		}
	}
});
</script>

<style lang="scss" scoped>
/deep/ .p-dialog > .p-dialog-footer {
	display: flex;

	> .p-button {
		width: 100%;

		&:last-child {
			margin: 0;
		}
	}
}
</style>
