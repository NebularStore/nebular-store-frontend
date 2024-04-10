export class RepositoryNode {
    name: string;
    is_file: boolean;
    parent: RepositoryNode | undefined;
    children: RepositoryNode[];
    depth: number;


    constructor(name: string, is_file: boolean, parent: RepositoryNode|undefined, depth: number) {
        this.name = name;
        this.is_file = is_file;
        this.parent = parent;
        this.children = [];
        this.depth = depth;
    }

    setParent(parent: RepositoryNode) {
        this.parent = parent;
    }

    setChildren(children: RepositoryNode[]) {
        this.children = children;
    }

    clearChildren() {
        this.children = [];
    }

    getPath(): string {
        return this.parent == undefined ? "" : ((this.parent as RepositoryNode).getPath() + "/" + this.name);
    }
}