import { ExecutorContext } from '@nrwl/devkit';
import { ReactNativeBuildOptions } from './schema';
export interface ReactNativeBuildOutput {
    success: boolean;
}
export default function buildAndroidExecutor(options: ReactNativeBuildOptions, context: ExecutorContext): AsyncGenerator<ReactNativeBuildOutput>;
