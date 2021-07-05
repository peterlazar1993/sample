import { GeneratorCallback, Tree } from '@nrwl/devkit';
import { Schema } from './schema';
export declare function reactNativeLibraryGenerator(host: Tree, schema: Schema): Promise<GeneratorCallback>;
export default reactNativeLibraryGenerator;
export declare const reactNativeLibrarySchematic: (options: Schema) => (tree: any, context: any) => Promise<any>;
