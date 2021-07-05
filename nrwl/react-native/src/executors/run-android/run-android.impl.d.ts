import { ExecutorContext } from '@nrwl/devkit';
import { ReactNativeRunAndroidOptions } from './schema';
export interface ReactNativeRunAndroidOutput {
    success: boolean;
}
export default function runAndroidExecutor(options: ReactNativeRunAndroidOptions, context: ExecutorContext): AsyncGenerator<ReactNativeRunAndroidOutput>;
