export interface Node {
  id: number;
  name: string;
  backgroundColor: string;
  textColor: string;
  selectable: boolean;
  root?: boolean;
  childdrens?: Array<Node>;
}
