/**
 * Global type definitions for optional Bun runtime support
 */

declare global {
	// Bun global namespace (optional, only available in Bun runtime)
	const Bun:
		| {
				version: string
				file: (path: string) => {
					exists: () => Promise<boolean>
					text: () => Promise<string>
				}
				write: (path: string, content: string) => Promise<number>
				fileURLToPath: (url: string) => string
		  }
		| undefined

	namespace NodeJS {
		interface ProcessVersions {
			bun?: string
		}
	}
}

export {}
