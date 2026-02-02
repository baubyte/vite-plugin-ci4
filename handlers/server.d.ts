import type { ViteDevServer } from 'vite';
export declare const handleConfigureServer: (server: ViteDevServer) => (() => void) | void | Promise<(() => void) | void>;
