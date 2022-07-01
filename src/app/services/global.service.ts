import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { Node } from '../nodes/node';

@Injectable()
export class GlobalService {
  chipSelected = new Subject<Node>();
  nodeSelected = new Subject<Node>();
  resetNodes = new Subject();

  public chips: Node[] = [];
  constructor() {}

  public addChip(selectedNode: Node) {
    this.chips.push(selectedNode);
  }
}
