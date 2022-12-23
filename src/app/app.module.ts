import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EditableTableComponent } from './components/editable-table/editable-table.component';
import { EditableTableCellComponent } from './components/editable-table-cell/editable-table-cell.component';
import { DoubleClickDirective } from './directives/double-click.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EditableTableComponent,
    EditableTableCellComponent,
    DoubleClickDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
