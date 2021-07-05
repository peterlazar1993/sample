import { Tree } from '@nrwl/devkit';
import { Schema } from '../schema';
export interface NormalizedSchema extends Schema {
    projectSourceRoot: string;
    fileName: string;
    className: string;
}
export declare function normalizeOptions(host: Tree, options: Schema): Promise<NormalizedSchema>;
