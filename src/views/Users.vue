<template>
	<div>
		<UsersToolbar
			v-bind:label="$t('Add User')"
			v-bind:filters="filters"
			@add-user="addUser"
		/>

		<UsersDataTable
			v-bind:users="users"
			v-bind:filters="filters"
			@edir-user="editUser"
		/>

		<UsersDialog
			v-bind:visible="userDialog"
			v-bind:dialog="dialog"
			v-bind:user="user"
			@hide-dialog="hideDialog"
			@confirm-dialog="saveUser"
		/>
	</div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
// eslint-disable-next-line import/extensions, import/no-unresolved
import { User } from '@/store/types';
import UsersDataTable from '../components/UsersDataTable.vue';
import UsersToolbar from '../components/UsersToolbar.vue';
import UsersDialog from '../components/UsersDialog.vue';

export default Vue.extend({
	name: 'Users',
	components: {
		UsersDataTable: Vue.extend(UsersDataTable),
		UsersToolbar: Vue.extend(UsersToolbar),
		UsersDialog: Vue.extend(UsersDialog)
	},
	data() {
		return {
			users: [] as User[],
			filters: {},
			userDialog: false,
			dialog: {
				title: this.$t('Title Add'),
				confirm: this.$t('Confirm Add'),
				submitted: false
			},
			user: {} as User
		};
	},
	methods: {
		async getUsers() {
			try {
				const response = await fetch('/api/users');
				const json = await response.json();
				this.users = json.users;
				this.$toast.add({
					severity: 'success',
					summary: this.$t('Loaded'),
					detail: this.$t('Loaded Msg'),
					life: 3000
				});
			} catch (err) {
				this.$toast.add({
					severity: 'error',
					summary: this.$t('Error'),
					detail: err,
					life: 3000
				});
			}
		},
		hideDialog() {
			this.userDialog = false;
			this.dialog.submitted = false;
		},
		addUser() {
			this.user = {} as User;
			this.dialog.title = this.$t('Title Add');
			this.dialog.confirm = this.$t('Confirm Add');
			this.dialog.submitted = false;
			this.userDialog = true;
		},
		editUser(user: User) {
			this.user = { ...user } as User;
			this.dialog.title = this.$t('Title Edit');
			this.dialog.confirm = this.$t('Title Edit');
			this.dialog.submitted = false;
			this.userDialog = true;
		},
		saveUser() {
			this.dialog.submitted = true;
			if (
				this.user.name &&
				this.user.name.trim() &&
				this.user.userName &&
				this.user.userName.trim() &&
				this.user.email &&
				this.user.email.trim() &&
				this.user.role
			) {
				if (this.user.id) {
					let index = -1;
					for (let i = 0; i < this.users.length; i += 1)
						if (this.user.id === this.users[i].id) {
							index = i;
							break;
						}
					this.$set(this.users, index, this.user);
					this.$toast.add({
						severity: 'info',
						summary: this.$t('Save Edit'),
						detail: `${this.user.name} ${this.$t('Save Edit Msg')}`,
						life: 5000
					});
				} else {
					const last = this.users.length - 1;
					this.user.id = this.users[last].id + 1;
					this.user.active = true;
					this.users.push(this.user);
					this.$toast.add({
						severity: 'info',
						summary: this.$t('Save Add'),
						detail: `${this.user.name} ${this.$t('Save Add Msg')}`,
						life: 5000
					});
				}
				this.userDialog = false;
				this.user = {} as User;
			}
		}
	},
	async mounted() {
		await this.getUsers();
	}
});
</script>

<style lang="scss" scoped></style>
