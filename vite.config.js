import commonjs from "@rollup/plugin-commonjs";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";
const { resolve } = require("path");

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "./",
	envDir: "./src",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src/"),
			// components: `${path.resolve(__dirname, "./src/components/")}`,
			// features: `${path.resolve(__dirname, "./src/features/")}`,
			// hooks: `${path.resolve(__dirname, "./src/hooks/")}`,
			// public: `${path.resolve(__dirname, "./public/")}`,
			// pages: path.resolve(__dirname, "./src/pages"),
			// assets: path.resolve(__dirname, "./src/assets"),
			// types: `${path.resolve(__dirname, "./src/@types")}`,
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
