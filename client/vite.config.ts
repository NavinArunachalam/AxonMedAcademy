import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:5000',
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
