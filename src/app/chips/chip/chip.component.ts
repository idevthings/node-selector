import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Node } from '../../nodes/node';
import { GlobalService } from '../../services/global.service';

export interface ChipSelectedEvent {
  selectedChip: Node;
}
@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css'],
})
export class ChipComponent implements OnInit {
  @Input()
  public chip: Node;

  @Output()
  onChipSelected: EventEmitter<ChipSelectedEvent> = new EventEmitter<ChipSelectedEvent>();

  constructor(private globalService: GlobalService) {}

  ngOnInit() {}

  public chipClicked() {
    if (this.globalService.chips.length) {
      console.log('len', this.globalService.chips.length);
      this.globalService.chipSelected.next(this.chip);
    }
  }
}
