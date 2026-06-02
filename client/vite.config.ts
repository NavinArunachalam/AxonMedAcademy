import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

// Fallback to legacy URL if environment variables are not specified
const rawApiUrl = process.env.VITE_API_URL || process.env.BACKEND_URL || "https://oc-pro-production.up.railway.app/api/v1";

const getProxyTarget = (url: string) => {
	let cleaned = url.trim().replace(/\/+$/, "");

	// If the user specified a URL that ends with /v1, strip it so the /api/** match works correctly
	if (cleaned.endsWith("/v1")) {
		cleaned = cleaned.substring(0, cleaned.length - 3);
	}

	// Ensure it ends with /api (without trailing slash)
	if (!cleaned.endsWith("/api")) {
		cleaned = cleaned + "/api";
	}

	return cleaned + "/**";
};

const proxyTarget = getProxyTarget(rawApiUrl);
console.log("Setting Nitro proxy target to:", proxyTarget);

export default defineConfig({
	cloudflare: false,
	plugins: [
		nitro({
			preset: "vercel",
			routeRules: {
				// Proxy all /api/** requests to Railway backend
				"/api/**": {
					proxy: proxyTarget,
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

