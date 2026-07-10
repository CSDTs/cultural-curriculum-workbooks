import { cpSync } from "fs";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// Public sub-directories to keep OUT of the production build. These are large,
// vendored, and served separately by the Django platform (see VITE_CSNAP_BASE_URL),
// so copying them into dist/ only bloats the deploy artifact. Dev is unaffected —
// Vite still serves them live from public/.
const EXCLUDE_FROM_BUILD = ["csnap-pro"];

// Replaces Vite's default public/ copy (disabled via build.copyPublicDir) with a
// filtered copy that omits EXCLUDE_FROM_BUILD, so the excluded folders are never
// copied at all (not copied-then-deleted).
function copyPublicExcept() {
	let outDir = "dist";
	return {
		name: "copy-public-except",
		apply: "build",
		configResolved(config) {
			outDir = config.build.outDir;
		},
		closeBundle() {
			const publicDir = path.resolve(__dirname, "public");
			const dest = path.resolve(__dirname, outDir);
			const excluded = EXCLUDE_FROM_BUILD.map((name) => path.resolve(publicDir, name));
			cpSync(publicDir, dest, {
				recursive: true,
				filter: (src) => !excluded.some((dir) => src === dir || src.startsWith(dir + path.sep)),
			});
		},
	};
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), copyPublicExcept()],
	base: "./",
	envDir: "./src",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src/"),
		},
	},
	build: {
		copyPublicDir: false,
		chunkSizeWarningLimit: 2000,
		rollupOptions: {
			input: { main: path.resolve(__dirname, "index.html") },
		},
	},
});
