import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../nodes/node';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css'],
})
export class ChipsComponent implements OnInit {
  @Input()
  chips: Node[];
  constructor(private globalService: GlobalService) {}

  ngOnInit() {}

  remove(fruit: string): void {}
}
