import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "@rollup/plugin-commonjs";
const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "./",
	build: {
		// base: "/static/workbooks/",
		cssCodeSplit: false,
		jsCodeSplit: false,
		rollupOptions: {
			plugins: [commonjs()],
		},
		commonjsOptions: {
			exclude: [/./],
		},
	},
});
