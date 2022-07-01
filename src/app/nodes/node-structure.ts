import { Node } from './node';

export class NodeStructure {
  constructor(private nodes: Node[]) {}

  public transform() {
    const root: Node = {
      name: 'root',
      childdrens: this.nodes,
      backgroundColor: null,
      id: 0,
      selectable: false,
      textColor: null,
    };

    const nodes = [];

    return root;
  }
}
