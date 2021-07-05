import { GeneratorCallback } from '@nrwl/devkit';
/**
 * Run pod install on current working directory
 * @param cwd current working directory
 * @returns resolve with 0 if not error, reject with error otherwise
 */
export declare function runPodInstall(cwd: string): GeneratorCallback;
export declare function podInstall(cwd: string): Promise<void>;
