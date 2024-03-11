import { defineConfig } from 'cypress';


export default defineConfig({
	e2e: {
		supportFile: false,
		defaultCommandTimeout: 50,
		baseUrl: 'http://localhost:8001',
		screenshotOnRunFailure: false,
	},
});
