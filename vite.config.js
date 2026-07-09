import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
const { resolve } = require("path");

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "./",
	envDir: "./src",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src/"),
		},
	},
	build: {
		chunkSizeWarningLimit: 2000,
		rollupOptions: {
			input: { main: resolve(__dirname, "index.html") },
		},
	},
});
