import colors from 'picocolors'
import type { JsonVersion } from '../types/index.js'

export const highlighter = (plugin: JsonVersion): string =>
	`  ${colors.green('➜')}  ${colors.white(plugin.name)}: ${colors.cyan(plugin.version)}`
