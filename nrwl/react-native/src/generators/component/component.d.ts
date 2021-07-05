import { Schema } from './schema';
import { Tree } from '@nrwl/devkit';
export declare function reactNativeComponentGenerator(host: Tree, schema: Schema): Promise<void>;
export default reactNativeComponentGenerator;
export declare const reactNativeComponentSchematic: (options: Schema) => (tree: any, context: any) => Promise<any>;
