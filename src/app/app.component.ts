import { Component, OnInit } from '@angular/core';
import { Node } from './nodes/node';
import { ParentNodesFromChild } from './nodes/parent-nodes-from-child';
import { GlobalService } from './services/global.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
export interface User {
  name: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  nodes: Node[] = [
    {
      id: 1,
      name: 'Nodo 1',
      backgroundColor: 'red',
      textColor: 'white',
      selectable: true,
      childdrens: [
        {
          id: 3,
          name: 'Nodo 1.1',
          backgroundColor: 'green',
          textColor: 'white',
          selectable: true,
        },
        {
          id: 7,
          name: 'Nodo 1.2',
          backgroundColor: 'green',
          textColor: 'white',
          selectable: true,
        },
        {
          id: 8,
          name: 'Nodo 1.2',
          backgroundColor: 'green',
          textColor: 'white',
          selectable: true,
          childdrens: [
            {
              id: 9,
              name: 'Nodo 1.2.1',
              backgroundColor: 'green',
              textColor: 'white',
              selectable: true,
            },
            {
              id: 10,
              name: 'Nodo 1.2.2',
              backgroundColor: 'green',
              textColor: 'white',
              selectable: true,
            },
            {
              id: 11,
              name: 'Nodo 1.2.3',
              backgroundColor: 'green',
              textColor: 'white',
              selectable: true,
              childdrens: [
                {
                  id: 12,
                  name: 'Nodo 1.2.3.1',
                  backgroundColor: 'green',
                  textColor: 'white',
                  selectable: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Nodo 2',
      backgroundColor: 'blue',
      textColor: 'white',
      selectable: true,
      childdrens: [
        {
          id: 4,
          name: 'Nodo 2.1',
          backgroundColor: 'blue',
          textColor: 'white',
          selectable: true,
        },
        {
          id: 5,
          name: 'Nodo 2.2',
          backgroundColor: 'blue',
          textColor: 'white',
          selectable: true,
          childdrens: [
            {
              id: 6,
              name: 'Nodo 2.2.1',
              backgroundColor: 'pink',
              textColor: 'white',
              selectable: true,
              childdrens: [
                {
                  id: 7,
                  name: 'Nodo 2.2.1.1',
                  backgroundColor: 'orange',
                  textColor: 'white',
                  selectable: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  myControl = new FormControl<string | Node>('');
  options: Node[] = [];
  filteredOptions$: Observable<User[]>;

  private initialNodes;
  chips = [];
  constructor(private globalService: GlobalService) {}

  ngOnInit() {
    this.nodes = this.nodes.map((node) => {
      return {
        ...node,
        root: true,
      };
    });
    this.initialNodes = this.nodes;

    this.globalService.chipSelected.subscribe((selectedChip: Node) => {
      console.log('Selected chip', selectedChip);
      const parentNode = new ParentNodesFromChild().getParent(
        this.initialNodes,
        selectedChip.id
      );
      console.log('chipp', parentNode);
      this.nodes =
        (!parentNode && [...this.initialNodes]) ||
        (parentNode && [...parentNode.childdrens]);

      console.log('after', this.nodes);

      const found = this.globalService.chips.findIndex((chip) => {
        return chip.id === selectedChip.id;
      });
      console.log(
        'foundinex',
        found,
        this.globalService.chips.length,
        this.globalService.chips.length - found
      );
      this.globalService.chips.splice(
        found,
        this.globalService.chips.length - found
      );
      this.chips = this.globalService.chips;
    });

    this.globalService.nodeSelected.subscribe((selectedNode: Node) => {
      this.globalService.addChip(selectedNode);
      console.log('total chips', this.globalService.chips);
      this.chips = this.globalService.chips;
    });

    this.globalService.resetNodes.subscribe((x) => {
      this.nodes = [...this.initialNodes];
      this.globalService.chips = [];
      this.chips = this.globalService.chips;
    });

    this.filteredOptions$ = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
    console.log('flatten');
    const flattenArray = this.nodes.reduce(flatTree(0), []);
    this.options = flattenArray;

    console.log('flatten', flattenArray);
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  public onOptionSelected($event) {
    this.globalService.nodeSelected.next($event);
  }
}

function flatTree(level) {
  return function (result, object) {
    var children = object.childdrens || [],
      item = Object.keys(object).reduce(function (o, k) {
        if (k !== 'children') o[k] = object[k];
        return o;
      }, {});

    level = level || 0;
    item['level'] = level;
    return result.concat(item, children.reduce(flatTree(level + 1), []));
  };
}
