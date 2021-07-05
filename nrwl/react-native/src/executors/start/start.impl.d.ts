import { ExecutorContext } from '@nrwl/devkit';
import { ReactNativeStartOptions } from './schema';
export interface ReactNativeStartOutput {
    baseUrl?: string;
    success: boolean;
}
export default function startExecutor(options: ReactNativeStartOptions, context: ExecutorContext): AsyncGenerator<ReactNativeStartOutput>;
export declare function runCliStart(workspaceRoot: string, projectRoot: string, options: ReactNativeStartOptions): Promise<void>;
