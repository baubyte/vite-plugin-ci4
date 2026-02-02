import type { PluginConfig } from '../types/index.js';
import type { ConfigEnv, UserConfig } from 'vite';
export declare const configResolver: (config: UserConfig, configEnv: ConfigEnv, pluginConfig: Required<PluginConfig>) => UserConfig;
