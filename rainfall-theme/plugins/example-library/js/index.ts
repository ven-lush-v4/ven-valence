/**
 * The dependency half of the dependency example. Nothing special is needed to be a dependency.
 * Any plugin can be depended on by ID. The plugin loader guarantees that the dependency is started before
 * every dependent plugin declaring it in `dependencies` in `manifest.json`.
 */

export default plugin({
	start() {
		console.log('[example-library] started (always before its dependents)')
	},
	stop() {
		// Stopping a plugin also stops every running plugin that depends on it.
		console.log('[example-library] stopped')
	},
})
