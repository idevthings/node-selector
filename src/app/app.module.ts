import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NodesComponent } from './nodes/nodes.component';
import { NodeComponent } from './nodes/node/node.component';
import { ChipComponent } from './chips/chip/chip.component';
import { ChipsComponent } from './chips/chips.component';
import { GlobalService } from './services/global.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  declarations: [
    AppComponent,
    NodesComponent,
    NodeComponent,
    ChipComponent,
    ChipsComponent,
  ],
  bootstrap: [AppComponent],
  providers: [GlobalService],
})
export class AppModule {}
