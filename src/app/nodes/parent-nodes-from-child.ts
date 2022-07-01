import { Node } from './node';

export class ParentNodesFromChild {
  constructor() {}

  getParent(root: Node[], id: number, parent?: Node): Node {
    let node;
    console.log(root, id, parent);
    root.some((n) => {
      if (n.id === id) {
        console.log('entra');
        node = parent;
        return true;
      }
      if (n.childdrens) {
        return (node = this.getParent(n.childdrens, id, n));
      }
    });
    console.log('node', node);
    return node || null;
  }
}
