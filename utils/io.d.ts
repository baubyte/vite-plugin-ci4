import type { ComposerJson } from '../types/index.js';
export declare const isFileExists: (path: string) => Promise<boolean>;
export declare const readFileAsString: (filePath: string) => Promise<string>;
export declare const readFileAsJson: (filePath: string) => Promise<ComposerJson>;
export declare const writingFile: (filePath: string, content: string) => Promise<boolean>;
export declare const removeFile: (filepath: string) => Promise<boolean>;
