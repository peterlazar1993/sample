import { Tree } from '@nrwl/devkit';
import { Schema } from './schema';
export declare function reactNativeInitGenerator(host: Tree, schema: Schema): Promise<import("@nrwl/devkit").GeneratorCallback>;
export declare function updateDependencies(host: Tree): import("@nrwl/devkit").GeneratorCallback;
export default reactNativeInitGenerator;
export declare const reactNativeInitSchematic: (options: Schema) => (tree: any, context: any) => Promise<any>;
