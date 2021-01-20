<template>
	<div id="users-datatable">
		<DataTable
			:value="users"
			class="p-datatable-responsive"
			:filters="filters"
			:selection.sync="selectedUsers"
			dataKey="id"
			:paginator="true"
			:rows="10"
			paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
			:rowsPerPageOptions="[10, 20, 50]"
			contextMenu
			:contextMenuSelection.sync="selectedUser"
			@row-contextmenu="openContextMenu"
		>
			<template #empty>
				{{ $t('Not Users') }}
			</template>
			<Column selectionMode="multiple" headerStyle="width: 3em"></Column>

			<Column field="name" :header="$t('Name')">
				<template #body="slotProps">
					<span class="p-column-title">{{ $t('Name') }}</span>
					{{ slotProps.data.name }}
				</template>
			</Column>

			<Column field="userName" :header="$t('User Name')">
				<template #body="slotProps">
					<span class="p-column-title">{{ $t('User Name') }}</span>
					{{ slotProps.data.userName }}
				</template>
			</Column>

			<Column field="email" :header="$t('Email')">
				<template #body="slotProps">
					<span class="p-column-title">{{ $t('Email') }}</span>
					{{ slotProps.data.email }}
				</template>
			</Column>

			<Column field="role" :header="$t('Roles')">
				<template #body="slotProps">
					<span class="p-column-title">{{ $t('Roles') }}</span>
					{{ slotProps.data.role }}
				</template>
			</Column>

			<Column headerStyle="width: 5em">
				<template #body="slotProps">
					<Button
						icon="pi pi-pencil"
						class="p-button-secondary p-mr-2"
						@click="edit(slotProps.data)"
					/>
				</template>
			</Column>
		</DataTable>

		<UsersContextMenu ref="ucm" v-bind:model="menuModel" />
	</div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// eslint-disable-next-line import/extensions, import/no-unresolved
import { User } from '@/store/types';
import UsersContextMenu from './UsersContextMenu.vue';

export default Vue.extend({
	name: 'UsersDataTable',
	components: {
		DataTable: Vue.extend(DataTable),
		Column: Vue.extend(Column),
		UsersContextMenu: Vue.extend(UsersContextMenu)
	},
	props: {
		users: {
			type: Array
		},
		filters: {
			type: Object
		}
	},
	data() {
		return {
			selectedUsers: [] as User[],
			selectedUser: {} as User,
			menuModel: [
				{
					label: this.$t('Reset One'),
					icon: 'pi pi-fw pi-key',
					command: () => (this as any).resetPassword()
				},
				{
					label: this.$t('Disable One'),
					icon: 'pi pi-fw pi-eye-slash',
					command: () => (this as any).disableUsers()
				},
				{
					label: this.$t('Delete One'),
					icon: 'pi pi-fw pi-trash',
					command: () => (this as any).deleteUsers()
				}
			]
		};
	},
	methods: {
		edit(user: User) {
			this.$emit('edir-user', user);
		},
		openContextMenu(event: any) {
			const n = this.selectedUsers.length;
			if (n > 1) {
				this.menuModel[0].label = `${this.$t('Reset Many')} ${n} ${this.$t(
					'Users'
				)}`;
				this.menuModel[1].label = `${this.$t('Disable Many')} ${n} ${this.$t(
					'Users'
				)}`;
				this.menuModel[2].label = `${this.$t('Delete Many')} ${n} ${this.$t(
					'Users'
				)}`;
			} else {
				this.menuModel[0].label = this.$t('Reset One');
				this.menuModel[1].label = this.$t('Disable One');
				this.menuModel[2].label = this.$t('Delete One');
			}
			(this as any).$refs.ucm.show(event);
		},
		resetPassword() {
			let detail = `${this.$t('Reset Many')} `;
			if (this.selectedUsers.length)
				detail += `${this.selectedUsers.length} ${this.$t('Users')}`;
			else detail += this.selectedUser.name;
			this.$toast.add({
				severity: 'info',
				summary: `${this.$t('Reset One')}`,
				detail,
				life: 5000
			});
		},
		disableUsers() {
			let detail = '';
			if (this.selectedUsers.length)
				detail += `${this.$t('Disable Many')} ${
					this.selectedUsers.length
				} ${this.$t('Users')}`;
			else detail += `${this.$t('Disable One')} ${this.selectedUser.name}`;
			this.$toast.add({
				severity: 'info',
				summary: `${this.$t('Disable Many')}`,
				detail,
				life: 5000
			});
		},
		deleteUsers() {
			let detail = '';
			if (this.selectedUsers.length)
				detail += `${this.$t('Delete Many')} ${
					this.selectedUsers.length
				} ${this.$t('Users')}`;
			else detail += `${this.$t('Delete One')} ${this.selectedUser.name}`;
			this.$toast.add({
				severity: 'info',
				summary: `${this.$t('Delete Many')}`,
				detail,
				life: 5000
			});
		}
	}
});
</script>

<style lang="scss" scoped>
.p-datatable-responsive {
	/deep/ .p-datatable-tbody {
		> tr > td .p-column-title {
			display: none;
		}

		> .p-datatable-row {
			&.p-highlight {
				background: #f8f9fa;
				color: #495057;
			}
		}
	}

	/deep/ .p-paginator-bottom {
		margin-top: 30px;
		border: none;

		> .p-dropdown,
		> .p-paginator-first {
			margin-left: auto;
		}
	}
}

@media screen and (max-width: 991px) {
	/deep/ .p-datatable {
		&.p-datatable-responsive {
			.p-datatable-thead > tr > th,
			.p-datatable-tfoot > tr > td {
				display: none !important;
			}

			.p-datatable-tbody > tr > td {
				text-align: left;
				display: block;
				width: 100%;
				float: left;
				clear: left;
				border: 0 none;

				.p-column-title {
					padding: 0.4rem;
					min-width: 30%;
					display: inline-block;
					margin: -0.4em 1em -0.4em -0.4rem;
					font-weight: bold;
				}

				&:last-child {
					border-bottom: 1px solid rgba(0, 0, 0, 0.08);
				}
			}
		}
	}
}
</style>
