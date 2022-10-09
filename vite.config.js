import commonjs from "@rollup/plugin-commonjs";
import react from "@vitejs/plugin-react";
import { defineConfig, splitVendorChunkPlugin } from "vite";
const { resolve } = require("path");
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "./",
	envDir: "./src",

	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				nested: resolve(__dirname, "/pages/cultural_curriculum/index.html"),
				view_results: resolve(__dirname, "/pages/view_results/index.html"),
			},
		},
	},
});
