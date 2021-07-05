import { Tree } from '@nrwl/devkit';
import { Schema } from './schema';
export declare function detoxInitGenerator(host: Tree, schema: Schema): Promise<import("@nrwl/devkit").GeneratorCallback>;
export declare function updateDependencies(host: Tree): import("@nrwl/devkit").GeneratorCallback;
export default detoxInitGenerator;
export declare const detoxInitSchematic: (options: Schema) => (tree: any, context: any) => Promise<any>;
