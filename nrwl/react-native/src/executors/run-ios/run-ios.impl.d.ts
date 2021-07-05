import { ExecutorContext } from '@nrwl/tao/src/shared/workspace';
import { ReactNativeRunIosOptions } from './schema';
export interface ReactNativeRunIosOutput {
    success: boolean;
}
export default function runIosExecutor(options: ReactNativeRunIosOptions, context: ExecutorContext): AsyncGenerator<ReactNativeRunIosOutput>;
