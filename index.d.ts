import type { PluginOption } from 'vite';
import type { PluginConfig } from './types';
declare const plugin: (config: string | string[] | PluginConfig) => PluginOption;
export default plugin;
