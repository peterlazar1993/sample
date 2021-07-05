import { Tree } from '@nrwl/devkit';
import { Schema } from '../schema';
export interface NormalizedSchema extends Schema {
    appFileName: string;
    appClassName: string;
    projectName: string;
    projectRoot: string;
}
/**
 * if options.name = 'my-app-e2e' with no options.directory
 * projectName = 'my-app', projectRoot = 'apps/my-app'
 * if options.name = 'my-app' with options.directory = 'my-dir'
 * projectName = 'my-dir-my-app', projectRoot = 'apps/my-dir/my-apps'
 */
export declare function normalizeOptions(host: Tree, options: Schema): NormalizedSchema;
