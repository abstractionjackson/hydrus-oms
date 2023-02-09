const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		colors: {
			blue: '#013595'
		},
		extend: {}
	},

	plugins: [require('daisyui')],
	daisyui: {
		logs: false
	}
};

module.exports = config;
