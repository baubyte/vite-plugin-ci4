import type { ResolvedConfig } from 'vite'

import { appConfig } from '@config/constant'
import { handleConfigureServer } from '@handlers/server'
import { configResolver } from '@resolvers/config'
import type { Ci4Plugin, PluginConfig } from '../types/index.js'

export const ci4 = (_config: Required<PluginConfig>): Ci4Plugin => {
	let devServerUrl = ''
	let config: ResolvedConfig

	return {
		enforce: 'post',
		name: appConfig.plugin,
		config: (config, env) => configResolver(config, env, _config),
		configResolved: (resolveConfig) => {
			config = resolveConfig
		},
		transform: (code) => {
			if (config.command === 'serve' && devServerUrl) {
				code = code.replace(/__ci4_vite_placeholder__/g, devServerUrl)

				if (_config.transformOnServe) {
					return _config.transformOnServe(code, devServerUrl)
				}
			}
		},
		configureServer: (server) => {
			// Update devServerUrl when server starts
			server.httpServer?.once('listening', () => {
				const address = server.httpServer?.address()
				if (address && typeof address === 'object') {
					const protocol = config.server.https ? 'https' : 'http'
					const host = config.server.host || 'localhost'
					devServerUrl = `${protocol}://${host}:${address.port}`
				}
			})
			
			return handleConfigureServer(server)
		}
	}
}
