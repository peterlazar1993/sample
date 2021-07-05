import { ProjectGraph } from '@nrwl/workspace/src/core/project-graph';
export declare function findAllNpmDependencies(graph: ProjectGraph, projectName: string, list?: string[], seen?: Set<string>): string[];
