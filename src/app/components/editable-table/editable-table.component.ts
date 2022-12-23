import { Component, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { EditableTableDefinition } from 'src/app/models/editable-table-definition.model';
import { EditableTableCellComponent } from '../editable-table-cell/editable-table-cell.component';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss']
})
export class EditableTableComponent<T> implements OnInit, OnDestroy {
  @ViewChildren('cell') cells!: QueryList<EditableTableCellComponent<T>>;

  @Input() tableDefinition!: EditableTableDefinition<T>

  @Input()
  get rows() {
    return this._rows;
  }
  set rows(rows: T[]) {
    this._rows = rows;
  }
  _rows: T[] = [];
  
  selectedRowIndexes: number[] = [];

  constructor() { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    document.removeEventListener('click', (mouseEvent) => this.closeEditingCells(mouseEvent, this.cells));
  }

  selectAll(): void {
    if (this.selectedRowIndexes.length !== this.rows.length) {
      this.selectedRowIndexes = [];
      this.selectedRowIndexes.push(...Array.from(Array(this.rows.length).keys()));
    } else {
      this.selectedRowIndexes = [];
    }
  }

  toggleRow(rowIndex: number, mouseEvent: MouseEvent): void {
    const target: HTMLElement = (mouseEvent.target as HTMLElement);

    if (target == null || !target.classList.contains('editable-table-cell')) {
      const arrayIndex = this.selectedRowIndexes.findIndex(selectedIndex => selectedIndex === rowIndex);
    
      if (arrayIndex > -1) {
        this.selectedRowIndexes.splice(arrayIndex, 1);
      } else {
        this.selectedRowIndexes.push(rowIndex);
      }
    }       
  }

  closeEditingCells(mouseEvent: MouseEvent, cells: QueryList<EditableTableCellComponent<T>>): void {
    const target: HTMLElement = (mouseEvent.target as HTMLElement);

    if (target == null || !target.classList.contains('editable-table-cell')) {
      cells?.forEach(cell => cell.editing = false);
    }
  }

  editCell(rowIndex: number, cellIndex: number): void {
    const numberOfCellsInRow = this.tableDefinition.rowDefinition.cellDefinitions.length;
    const index = (rowIndex * numberOfCellsInRow) + cellIndex;

    const cell = this.cells.get(index);

    if (cell != null) {
      cell.editing = true;
      document.addEventListener('click', (mouseEvent) => this.closeEditingCells(mouseEvent, this.cells), );
    }
  }

  deleteSelected(): void {
    const rowsToDeleteReverseOrder = this.selectedRowIndexes.sort((a,b) => b - a);
    rowsToDeleteReverseOrder.forEach(index => this.rows.splice(index, 1));
    this.selectedRowIndexes = [];
  }
}
