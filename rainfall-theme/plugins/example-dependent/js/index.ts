/**
 * The dependent half of the dependency example. The manifest declares `"com.example.library": { "version": ">=1" }`,
 * which gives this plugin:
 *
 * - Resolution: Installing this plugin from a repository pulls Example Library in automatically.
 * - Linking: For native, you get access to the dependency's classes. For JS, the dependency can decorate your plugin's API.
 * - Ordering: Ensures the library is loaded and started before this plugin.
 * - Gating: If the library is missing or its version doesn't satisfy the range, this plugin is not loaded
 *   (visible as enabled-but-stopped with a dependency error).
 *
 * Add `"optional": true` to the dependency instead if your plugin should still run without it.
 */

export default plugin({
	start() {
		console.log('[example-dependent] started (example-library started first)')
	},
	stop() {
		console.log('[example-dependent] stopped')
	},
})
