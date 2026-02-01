import type { AddressInfo } from 'net'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import type { IsAddressInfo } from '../types/index.js'

export const isAddressInfo: IsAddressInfo = (x): x is AddressInfo => typeof x === 'object'

export const isIpv6 = (address: AddressInfo): boolean => {
	return (
		address.family === 'IPv6' ||
		// In node >=18.0 <18.4 this was an integer value.
		// See: https://nodejs.org/api/net.html#serveraddress
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore-next-line
		address.family === 6
	)
}

export const getCurrentPath = (): string => {
	const path = new URL('.', import.meta.url)
	return fileURLToPath(path)
}

export const getPluginPackageJsonPath = (): string => {
	// Get the directory of this file
	const currentFile = fileURLToPath(import.meta.url)
	const currentDir = dirname(currentFile)
	
	// In the release build, index.js and package.json are in the same directory
	// So package.json is in currentDir, not in parent directory
	return join(currentDir, 'package.json')
}

export const addSlash = (path: string): string => path.replace(/\/?$/, '/')
