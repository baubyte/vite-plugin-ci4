#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { execSync } from 'node:child_process'

// Skip if we're in development (node_modules doesn't exist yet or we have src/)
// Only build if:
// 1. dist/index.js doesn't exist (git install scenario)
// 2. We're not in the root of this package being developed
const isDevEnvironment = existsSync('src') && existsSync('package.json') && !existsSync('../../package.json')

if (isDevEnvironment) {
	// We're developing this package locally, skip postinstall
	process.exit(0)
}

// Only run build if dist doesn't exist (git install scenario)
// Skip if installing from npm registry (dist already exists)
if (!existsSync('dist/index.js')) {
	console.log('📦 Building @fabithub/vite-plugin-ci4 from source...')
	console.log('⏳ This may take a moment...\n')
	try {
		execSync('npm run build', { stdio: 'inherit' })
		console.log('\n✅ Build completed successfully!')
	} catch (error) {
		console.error('\n❌ Build failed:', error.message)
		console.error('Please ensure all devDependencies are installed.')
		process.exit(1)
	}
}
