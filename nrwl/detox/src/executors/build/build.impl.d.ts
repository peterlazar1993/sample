import { ExecutorContext } from '@nrwl/tao/src/shared/workspace';
import { DetoxBuildOptions } from './schema';
export interface DetoxBuildOutput {
    success: boolean;
}
export default function detoxBuildExecutor(options: DetoxBuildOptions, context: ExecutorContext): AsyncGenerator<DetoxBuildOutput>;
