import { Tree } from '@nrwl/devkit';
import { Schema } from '../schema';
export interface NormalizedSchema extends Schema {
    className: string;
    projectName: string;
    appProjectRoot: string;
    lowerCaseName: string;
    iosProjectRoot: string;
    androidProjectRoot: string;
    parsedTags: string[];
    entryFile: string;
}
export declare function normalizeOptions(host: Tree, options: Schema): NormalizedSchema;
