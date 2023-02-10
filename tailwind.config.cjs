const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		colors: {
			blue: '#013595'
		},
		extend: {
			backgroundImage: {
				home: "url('images/bg_home.avif')"
			}
		}
	},

	plugins: [require('daisyui')],
	daisyui: {
		logs: false
	}
};

module.exports = config;
