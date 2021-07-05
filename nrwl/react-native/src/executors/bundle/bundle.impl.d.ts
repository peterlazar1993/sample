import { ExecutorContext } from '@nrwl/devkit';
import { ReactNativeBundleOptions } from './schema';
export interface ReactNativeBundleOutput {
    success: boolean;
}
export default function bundleExecutor(options: ReactNativeBundleOptions, context: ExecutorContext): AsyncGenerator<ReactNativeBundleOutput>;
