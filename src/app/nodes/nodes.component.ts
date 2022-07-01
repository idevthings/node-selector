import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { FindInNodes } from './find-in-nodes';
import { Node } from './node';
import { NodeSelectedEvent } from './node/node.component';
@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.css'],
})
export class NodesComponent implements OnInit {
  @Input()
  nodes: Node[];

  constructor(private globalService: GlobalService) {}

  ngOnInit() {}

  public selectNode(event: NodeSelectedEvent) {
    console.log('Node Selected!', event);
    const findNode = new FindInNodes(this.nodes).findByNode(event.selectedNode);
    this.nodes = event.selectedNode.childdrens;
    this.globalService.nodeSelected.next(event.selectedNode);
  }

  public reset() {
    if (this.globalService.chips.length) {
      this.globalService.resetNodes.next(true);
    }
  }
}
