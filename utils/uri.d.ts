import type { AddressInfo } from 'net';
import type { IsAddressInfo } from '../types/index.js';
export declare const isAddressInfo: IsAddressInfo;
export declare const isIpv6: (address: AddressInfo) => boolean;
export declare const getCurrentPath: () => string;
export declare const getPluginPackageJsonPath: () => string;
export declare const addSlash: (path: string) => string;
