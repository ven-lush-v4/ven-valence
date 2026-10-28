/**
 * Plugin JS entry point (`dist.script`).
 */

import { callNativeMethod } from '@valenced/modules/native'

export default plugin({
	// Runs as soon as possible with heavily limited APIs.
	// You generally don't need to use this unless you need to patch something very early.
	// Even then, try `init()` instead.
	preInit() {},

	// Runs as soon as important modules are initialized with limited APIs.
	// You generally don't need to use this unless you need to patch something early.
	init() {},

	// Runs during the AppRegistry.runApplication call. All APIs are available.
	start() {
		// See `logcat | grep ReactNativeJS` on Android.
		console.log('[plugin] JS started')

		callNativeMethod('com.example.plugin.ping', [])
		callNativeMethod('com.example.plugin.alert', [
			'Hello',
			'This is an alert from the plugin!',
			'Close',
		])
	},

	stop() {
		console.log('[plugin] JS stopped')
	},
})

// Declare the contract for native bridge methods
declare module '@valenced/modules/native' {
	export interface NativeMethods {
		'com.example.plugin.ping': [args: any[], returnValue: null]
		'com.example.plugin.alert': [
			args: [title: string, message: string, negativeButton?: string],
			returnValue: null,
		]
	}
}
