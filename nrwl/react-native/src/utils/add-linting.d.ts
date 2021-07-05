import { Linter } from '@nrwl/linter';
import { Tree } from '@nrwl/devkit';
export declare function addLinting(host: Tree, projectName: string, appProjectRoot: string, tsConfigPaths: string[], linter: Linter, setParserOptionsProject?: boolean): Promise<import("@nrwl/devkit").GeneratorCallback>;
