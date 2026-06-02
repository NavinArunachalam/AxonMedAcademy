import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
	cloudflare: false,
	plugins: [
		nitro({
			preset: "vercel",
			routeRules: {
				// Proxy all /api/** requests to Railway backend
				// e.g. /api/v1/auth/login → Railway /api/v1/auth/login (no double /v1)
				"/api/**": {
					proxy: "https://zesty-vision-production-0cc0.up.railway.app/api/**",
				},
			},
		}),
	],
	vite: {
		server: {
			// Local dev proxy — only used during `npm run dev`
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

