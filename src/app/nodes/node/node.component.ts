import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Node } from '../node';

export interface NodeSelectedEvent {
  selectedNode: Node;
}

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css'],
})
export class NodeComponent implements OnInit {
  @Input()
  node: Node;

  @Output()
  onNodeSelected: EventEmitter<NodeSelectedEvent> = new EventEmitter<NodeSelectedEvent>();

  constructor() {}

  ngOnInit() {}

  public nodeClicked() {
    console.log(this.node);
    if (this.node.childdrens?.length) {
      this.onNodeSelected.emit({
        selectedNode: this.node,
      });
    } else {
      console.log('No childs');
    }
  }
}
