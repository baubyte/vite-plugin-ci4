import { build } from 'esbuild'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { dirname, join } from 'path'
import { minify } from 'html-minifier-terser'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

;(async () => {
	console.log('\n🛠️  Starting building library... \n')

	try {
		// Build main plugin
		await build({
			entryPoints: ['./src/index.ts'],
			bundle: true,
			minify: true,
			format: 'esm',
			platform: 'node',
			target: ['node18', 'node20'],
			outdir: './dist',
			external: ['vite', 'semver', 'picocolors', 'vite-plugin-full-reload'],
			sourcemap: false
		})

		// Build inertia helpers
		await build({
			entryPoints: ['./src/inertia-helpers/index.ts'],
			bundle: true,
			minify: true,
			format: 'esm',
			platform: 'node',
			target: ['node18', 'node20'],
			outdir: './dist/inertia-helpers',
			external: [],
			sourcemap: false
		})

		// Minify HTML file if exists
		try {
			const htmlContent = await readFile('./index.html', 'utf-8')
			const compressedHtml = await minify(htmlContent, {
				removeComments: true,
				removeEmptyAttributes: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				minifyCSS: true,
				minifyJS: true,
				minifyURLs: true,
				collapseWhitespace: true
			})

			await mkdir(dirname(join(__dirname, './dist/index.html')), { recursive: true })
			await writeFile('./dist/index.html', compressedHtml, 'utf-8')
		} catch (error) {
			// HTML file is optional, continue if not found
			if (error.code !== 'ENOENT') {
				console.warn('Warning: Could not minify HTML file:', error.message)
			}
		}

		console.log('✅ Library build successfully.')
	} catch (error) {
		console.error('❌ Error: Something went wrong with building library!', error)
		process.exit(1)
	}
})()
