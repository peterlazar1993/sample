import { ExecutorContext } from '@nrwl/devkit';
import { ReactNativeSyncDepsOptions } from './schema';
export interface ReactNativeSyncDepsOutput {
    success: boolean;
}
export default function syncDepsExecutor(options: ReactNativeSyncDepsOptions, context: ExecutorContext): AsyncGenerator<ReactNativeSyncDepsOutput>;
export declare function syncDeps(projectName: string, projectRoot: string, include?: string): string[];
export declare function displayNewlyAddedDepsMessage(projectName: string, deps: string[]): void;
