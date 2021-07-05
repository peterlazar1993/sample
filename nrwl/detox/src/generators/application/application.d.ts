import { Tree } from '@nrwl/devkit';
import { Schema } from './schema';
export declare function detoxApplicationGenerator(host: Tree, schema: Schema): Promise<import("@nrwl/devkit").GeneratorCallback>;
export default detoxApplicationGenerator;
export declare const detoxApplicationSchematic: (options: Schema) => (tree: any, context: any) => Promise<any>;
