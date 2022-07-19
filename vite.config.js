import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "@rollup/plugin-commonjs";
const { resolve } = require("path");
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "./",
	resolve: {
		alias: {
			"#components": resolve(__dirname, "/src/components"),
			"#assets": resolve(__dirname, "/src/img"),
			"#utils": resolve(__dirname, "/src/utils"),
			"#slices": resolve(__dirname, "/src/slices"),
		},
	},
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				nested: resolve(__dirname, "/pages/cultural_curriculum/index.html"),
			},
		},
	},
});
