/**
 * Custom matchers for Vitest to match Bun's test API
 */
import { expect } from 'vitest'

expect.extend({
	toBeTrue(received) {
		const pass = received === true
		return {
			message: () => `expected ${received} to be true`,
			pass
		}
	},
	toBeFalse(received) {
		const pass = received === false
		return {
			message: () => `expected ${received} to be false`,
			pass
		}
	},
	toBeString(received) {
		const pass = typeof received === 'string'
		return {
			message: () => `expected ${received} to be a string`,
			pass
		}
	},
	toBeFunction(received) {
		const pass = typeof received === 'function'
		return {
			message: () => `expected ${received} to be a function`,
			pass
		}
	}
})

// Extend TypeScript types
declare module 'vitest' {
	interface Assertion<T = any> {
		toBeTrue(): T
		toBeFalse(): T
		toBeString(): T
		toBeFunction(): T
	}
}
