import { ExecutorContext } from '@nrwl/tao/src/shared/workspace';
import { DetoxTestOptions } from './schema';
export interface DetoxTestOutput {
    success: boolean;
}
export default function detoxTestExecutor(options: DetoxTestOptions, context: ExecutorContext): AsyncGenerator<DetoxTestOutput>;
