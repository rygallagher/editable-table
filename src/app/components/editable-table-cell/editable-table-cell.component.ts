import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CellType } from 'src/app/enums/cell-type.enum';
import { EditableTableCellDefinition } from 'src/app/models/editable-table-cell-definition.model';

@Component({
  selector: 'app-editable-table-cell',
  templateUrl: './editable-table-cell.component.html',
  styleUrls: ['./editable-table-cell.component.scss']
})
export class EditableTableCellComponent<T> implements OnInit {
  editing = false;
  
  @Input()
  get cellDefinition(): EditableTableCellDefinition<T> {
    return this._cellDefinition;
  }
  set cellDefinition(_cellDefinition: EditableTableCellDefinition<T>) {
    this._cellDefinition = _cellDefinition;
    this.setValidators();
    this.setValue();
  }
  _cellDefinition!: EditableTableCellDefinition<T>;

  @Input() 
  get row(): T{
    return this._row;
  }
  set row(row: T) {
    this._row = row; 
    this.setValue()
  }
  _row!: T;

  formGroup = new FormGroup({
    cell: new FormControl()
  });  

  none = CellType.None;
  text = CellType.Text;
  number = CellType.Number;
  integer = CellType.Integer;
  date = CellType.Date;
  dropDown = CellType.DropDown;

  constructor() {
    const row = this.row;

    this.formGroup.controls.cell.valueChanges.subscribe(value => {
      console.log('value', value)

      if (row != null && this.cellDefinition != null) {
        type ObjectKey = keyof typeof row;
        const key = this.cellDefinition.property as ObjectKey;
        row[key] = value;

        console.log(row);
      } 
    });
  }

  ngOnInit(): void {
    this.setValue();
    this.setValidators();
    this.setDisabled();
  }

  setValidators(): void {
    const validators: ValidatorFn[] = [];

    validators.push(...this._cellDefinition.extraValidators ?? []);
    
    switch(this.cellDefinition.type) {
      case CellType.Number: {
        validators.push(Validators.pattern('^\d*\.?\d*$'));
        break;
      }
      case CellType.Integer: {
        validators.push(Validators.pattern('^[0-9]*$'));
        break;
      }
      default: {
        break;
      }
    }

    if (this.cellDefinition.required) {
      validators.push(Validators.required);
    }

    if (this.cellDefinition.minLength != null) {
      validators.push(Validators.minLength(this.cellDefinition.minLength));
    }

    if (this.cellDefinition.maxLength != null) {
      validators.push(Validators.maxLength(this.cellDefinition.maxLength));
    }

    this.formGroup.controls.cell.setValidators(validators);
  }

  setValue(): void {
    const row = this.row;

    if (row && this.cellDefinition != null) {
      type ObjectKey = keyof typeof row;
      const key = this.cellDefinition.property as ObjectKey;
      this.formGroup.controls.cell.setValue(row[key]);
    }    
  }

  setDisabled(): void {
    if (this.cellDefinition.disabled) {
      this.formGroup.controls.cell.disable();
    } else {
      this.formGroup.controls.cell.enable();
    }
  }

  getBackgroundColor(): string {
    if (this.formGroup.controls.cell.valid) {
      return ''
    } else {
      'lightpink'
    }

    return '';
  }
}
