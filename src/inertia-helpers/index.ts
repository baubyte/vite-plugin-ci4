/**
 * Resolve a page component from a list of pages.
 * 
 * This helper is inspired by Laravel's Inertia.js integration.
 * It allows you to dynamically resolve page components based on paths.
 * 
 * @template T - The type of the page component
 * @param {string | string[]} path - The path or paths to resolve
 * @param {Record<string, Promise<T> | (() => Promise<T>)>} pages - Object mapping paths to components
 * @returns {Promise<T>} The resolved page component
 * @throws {Error} If the page is not found
 * 
 * @example
 * ```typescript
 * // With Vite's glob import
 * const pages = import.meta.glob('./Pages/**\/*.tsx')
 * 
 * // Resolve a single page
 * const component = await resolvePageComponent('Home/Index', pages)
 * 
 * // Resolve with multiple possible paths
 * const component = await resolvePageComponent(
 *   ['Auth/Login', 'Login'],
 *   pages
 * )
 * ```
 */
export async function resolvePageComponent<T>(
	path: string | string[],
	pages: Record<string, Promise<T> | (() => Promise<T>)>
): Promise<T> {
	for (const p of Array.isArray(path) ? path : [path]) {
		const page = pages[p]

		if (typeof page === 'undefined') {
			continue
		}

		return typeof page === 'function' ? page() : page
	}

	throw new Error(`Page not found: ${path}`)
}
