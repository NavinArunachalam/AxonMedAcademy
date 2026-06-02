import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
	cloudflare: false,
	plugins: [
		nitro({
			preset: "vercel",
			routeRules: {
				"/api/**": {
					proxy: "https://oc-pro-qqsz.vercel.app/api/v1/**",
				},
			},
		}),
	],
	vite: {
		server: {
			proxy: {
				'/api': {
					target: 'http://localhost:5000',
					changeOrigin: true,
					secure: false,
				},
			},
		},
	},
});
