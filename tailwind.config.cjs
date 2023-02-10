const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		colors: {
			blue: '#013595'
		},
		extend: {
			backgroundImage: {
				home: "url('https://plus.unsplash.com/premium_photo-1663011672158-e4484ddb5641?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80')"
			}
		}
	},

	plugins: [require('daisyui')],
	daisyui: {
		logs: false
	}
};

module.exports = config;
