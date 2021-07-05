import { Schema } from './schema';
import { Tree, GeneratorCallback } from '@nrwl/devkit';
export declare function reactNativeApplicationGenerator(host: Tree, schema: Schema): Promise<GeneratorCallback>;
export default reactNativeApplicationGenerator;
export declare const reactNativeApplicationSchematic: (options: Schema) => (tree: any, context: any) => Promise<any>;
