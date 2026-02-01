#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { execSync } from 'node:child_process'

// Only run build if dist doesn't exist (git install scenario)
// Skip if installing from npm registry (dist already exists)
if (!existsSync('dist/index.js')) {
	console.log('📦 Building package from source...')
	try {
		execSync('npm run build', { stdio: 'inherit' })
		console.log('✅ Build completed successfully')
	} catch (error) {
		console.error('❌ Build failed:', error.message)
		process.exit(1)
	}
} else {
	console.log('✅ Package already built, skipping build step')
}
