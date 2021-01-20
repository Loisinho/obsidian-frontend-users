<template>
	<Toolbar>
		<template slot="left">
			<router-link :to="{ name: 'Home' }">
				<span id="logo">CLIENT-LOGO</span>
			</router-link>
			<router-link :to="{ name: 'Users' }">
				{{ $t('User Management') }}
			</router-link>
		</template>
		<template slot="right">
			<i
				id="user-icon"
				class="pi pi-user"
				label="Toggle"
				aria-hidden="true"
				@click="toggle"
			/>
			<OverlayPanel id="user-dropdown" ref="navbar-dropdown">
				<p class="dropdown-text">
					<i class="pi pi-user" aria-hidden="true" />
					<span>ozona</span>
				</p>
			</OverlayPanel>
		</template>
	</Toolbar>
</template>

<script>
import Toolbar from 'primevue/toolbar';
import OverlayPanel from 'primevue/overlaypanel';

export default {
	components: {
		Toolbar,
		OverlayPanel
	},
	methods: {
		toggle(event) {
			this.$refs['navbar-dropdown'].toggle(event);
		}
	}
};
</script>

<style lang="scss" scoped>
.p-toolbar {
	background-color: black;
	color: white;
	padding: 8px 16px;
	border: none;
	border-radius: unset;

	/deep/ .p-toolbar-group-left {
		display: flex;
		align-items: center;

		#logo {
			font-size: 1.4rem;
			margin-right: 16px;
		}

		a:not(:first-child) {
			color: rgba(255, 255, 255, 0.8);

			&:hover {
				color: rgba(255, 255, 255, 1);
			}
		}
	}
}

#user-icon {
	padding: 5px;
	background: white;
	color: black;
	border-radius: 100px;
	cursor: pointer;
}

.p-overlaypanel {
	min-width: 150px;
	margin-top: 6px;
	box-shadow: 0 0 3px 0 hsla(0, 0%, 0%, 0.2);
	border-radius: 6px;
	&::before,
	&::after {
		display: none;
	}
	/deep/ .p-overlaypanel-content {
		padding: 12px;
	}
}

.dropdown-text {
	margin: 0;
	color: hsl(300, 0, 68);
	font-size: 16px;
	user-select: none;
	> .pi-user {
		margin-right: 10px;
	}
}
</style>
