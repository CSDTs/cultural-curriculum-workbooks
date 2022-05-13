import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "@rollup/plugin-commonjs";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],

	build: {
		// base: "/static/workbooks/",
		rollupOptions: {
			plugins: [commonjs()],
		},
		commonjsOptions: {
			exclude: [/./],
		},
	},
});
