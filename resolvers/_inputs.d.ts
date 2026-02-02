import type { PluginConfig } from '../types/index.js';
import type { UserConfig } from 'vite';
export declare const _resolveInputs: (config: UserConfig, pluginConfig: Required<PluginConfig>, isSSR: boolean) => Partial<Record<"input", string | string[]>>;
