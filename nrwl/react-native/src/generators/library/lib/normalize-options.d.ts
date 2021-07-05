import { Tree } from '@nrwl/devkit';
import { Schema } from '../schema';
export interface NormalizedSchema extends Schema {
    name: string;
    fileName: string;
    projectRoot: string;
    routePath: string;
    projectDirectory: string;
    parsedTags: string[];
    appMain?: string;
    appSourceRoot?: string;
}
export declare function normalizeOptions(host: Tree, options: Schema): NormalizedSchema;
