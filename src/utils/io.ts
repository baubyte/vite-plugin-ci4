import { access, constants, readFile, unlink, writeFile } from 'node:fs/promises'
import type { ComposerJson } from 'src/types'
import { normalizePath } from 'vite'

export const isFileExists = async (path: string): Promise<boolean> => {
	try {
		await access(path, constants.F_OK)
		return true
	} catch (_error: unknown) {
		return false
	}
}

export const readFileAsString = async (filePath: string): Promise<string> => {
	// Normalize the file path to ensure it is in a consistent format.
	const path = normalizePath(filePath)

	// Check if the file exists.
	if (!(await isFileExists(path))) {
		throw new Error(path + ' not found.')
	}

	// Read the file contents.
	const content = await readFile(path, { encoding: 'utf8' })

	return content
}

export const readFileAsJson = async (filePath: string): Promise<ComposerJson> => {
	try {
		// Parse the file contents as a JSON object.
		return JSON.parse(await readFileAsString(filePath))
	} catch (error: unknown) {
		// If the error is a SyntaxError, it means that the file is not a valid JSON file.
		if (error instanceof SyntaxError) {
			throw new SyntaxError('It is not a valid Json file.', { cause: error.message })
		}
		// Otherwise, rethrow the error.
		throw error
	}
}

export const writingFile = async (filePath: string, content: string): Promise<boolean> => {
	// Normalize the file path to ensure that it uses the correct separators for the current platform.
	const path = normalizePath(filePath)

	try {
		await writeFile(path, content)
		return true
	} catch (_error: unknown) {
		// If an error occurred while writing the file, return false.
		return false
	}
}

export const removeFile = async (filepath: string): Promise<boolean> => {
	// Normalize the file path to ensure that it is in a consistent format.
	const path = normalizePath(filepath)

	// Attempt to remove the file.
	try {
		await unlink(path)
		return true
	} catch (_error: unknown) {
		// If an error occurred while attempting to remove the file, return `false`.
		return false
	}
}
