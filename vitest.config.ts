import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		include: ['tests/**/*.test.ts'],
		setupFiles: ['./tests/setup.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html']
		}
	},
	resolve: {
		alias: {
			'@config': resolve(__dirname, './src/config'),
			'@handlers': resolve(__dirname, './src/handlers'),
			'@plugins': resolve(__dirname, './src/plugins'),
			'@resolvers': resolve(__dirname, './src/resolvers'),
			'@utils': resolve(__dirname, './src/utils')
		}
	}
})
