const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		colors: {
			blue: '#013595'
		},
		extend: {}
	},

	plugins: [require('daisyui')]
};

module.exports = config;
