import { mount } from '@vue/test-utils';
import Users from '../../../src/views/Users.vue';
import mirageServer from '../../../mirage/server';

let server;
let wrapper;

const waitFor = function selectorEnters(dom, selector) {
	return new Promise(resolve => {
		const timer = setInterval(() => {
			const userEl = dom.findAll(selector);
			if (userEl.length > 0) {
				clearInterval(timer);
				resolve();
			}
		}, 100);
	});
};

beforeEach(async () => {
	server = mirageServer({ environment: 'test' });

	server.create('user', {
		id: 1,
		uuid: '91c44638-0f01-4e0a-9d70-c54478e274c7',
		role: 'user',
		active: true,
		name: 'Test',
		userName: 'test',
		email: 'test@gmail.com'
	});

	wrapper = mount(Users, {
		mocks: {
			$t: () => 'i18n mock',
			$toast: {
				add: () => 'PrimeVue Toast mock'
			}
		}
	});

	await waitFor(wrapper, '.p-datatable-row');
});

afterEach(() => {
	server.shutdown();
});

describe('Users.vue', () => {
	test('addUser function', async () => {
		const addUser = jest.spyOn(wrapper.vm, 'addUser');
		await wrapper.vm.$forceUpdate();

		expect(wrapper.find('.p-dialog').exists()).toBe(false);

		await wrapper
			.find('.p-toolbar .p-splitbutton-defaultbutton')
			.trigger('click');

		expect(wrapper.find('.p-dialog').exists()).toBe(true);
		expect(wrapper.find('.p-dialog .p-inputtext').element.value).toBe('');
		expect(addUser).toHaveBeenCalled();
	});

	test('editUser function', async () => {
		const editUser = jest.spyOn(wrapper.vm, 'editUser');
		await wrapper.vm.$forceUpdate();

		expect(wrapper.find('.p-dialog').exists()).toBe(false);

		await wrapper.find('.p-datatable-row > td > button').trigger('click');

		expect(wrapper.find('.p-dialog').exists()).toBe(true);
		expect(wrapper.find('.p-dialog .p-inputtext').element.value).not.toBe('');
		expect(editUser).toHaveBeenCalled();
	});

	test('hideDialog function', async () => {
		const hideDialog = jest.spyOn(wrapper.vm, 'hideDialog');

		expect(wrapper.find('.p-dialog').exists()).toBe(false);

		await wrapper
			.find('.p-toolbar .p-splitbutton-defaultbutton')
			.trigger('click');

		expect(wrapper.find('.p-dialog').exists()).toBe(true);

		await wrapper
			.find('.p-dialog-header .p-dialog-header-close')
			.trigger('click');

		expect(wrapper.find('.p-dialog').exists()).toBe(false);
		expect(hideDialog).toHaveBeenCalled();
	});

	test('saveUser function', async () => {
		const saveUser = jest.spyOn(wrapper.vm, 'saveUser');

		await wrapper.find('.p-datatable-row > td > button').trigger('click');

		const input = wrapper.find('.p-dialog-content input.p-inputtext');
		await input.setValue('Change');

		await wrapper.find('.p-dialog-footer .p-button-primary').trigger('click');

		expect(wrapper.find('.p-dialog').exists()).toBe(false);
		expect(
			wrapper.find('.p-datatable-row:first-child > td:nth-child(2)').text()
		).toMatch(/Change/);
		expect(saveUser).toHaveBeenCalled();
	});

	test('openContextMenu function', async () => {
		expect(wrapper.find('.p-contextmenu').exists()).toBe(false);

		await wrapper.find('.p-datatable-row > td').trigger('contextmenu');

		expect(wrapper.find('.p-contextmenu').exists()).toBe(true);
	});
});
