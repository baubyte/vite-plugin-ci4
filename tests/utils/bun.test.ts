import { describe, expect, it } from 'vitest'
import { isBunRunning } from '@utils/bun'

describe('Bun Test', () => {
	it('isBunRunning() function returns correct value based on runtime', () => {
		// In Node.js runtime, this should return false
		// In Bun runtime, this would return true
		const result = isBunRunning()
		expect(typeof result).toBe('boolean')
		
		// Since we're running in Node.js with vitest, it should be false
		expect(result).toBe(false)
	})
})
