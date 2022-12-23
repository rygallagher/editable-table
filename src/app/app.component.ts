import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EditableTableComponent } from './components/editable-table/editable-table.component';
import { CellType } from './enums/cell-type.enum';
import { EditableTableDefinition } from './models/editable-table-definition.model';

interface Person {
  id: number;
  name: string;
  age: number;
  favoriteColor?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('table') editableTable!: EditableTableComponent<Person>;

  tableDefinition: EditableTableDefinition<Person> = {
    headers: ['ID', 'Name', 'Age', 'Favorite Color'],
    rowDefinition: {
      cellDefinitions: [
        {
          property: 'id',
          type: CellType.None,
          required: true,
          disabled: false,
        },
        {
          property: 'name',
          type: CellType.Text,
          required: true,
          disabled: false,
        },
        {
          property: 'age',
          type: CellType.Integer,
          required: true,
          disabled: false,
        },
        {
          property: 'favoriteColor',
          type: CellType.DropDown,
          required: false,
          disabled: false,
          options: [
            {value: 'blue', text: 'blue'},
            {value: 'green', text: 'green'},
            {value: 'red', text: 'red'},
            {value: 'yellow', text: 'yellow'},
          ]
        },
      ]
    },
    multiSelect: true,
  };

  ngAfterViewInit(): void {
    const people = [
      {
        id: 1,
        name: 'Steve Stevenson',
        age: 15,
      },
      {
        id: 2,
        name: 'Rob Robinson',
        age: 25,
      },
      {
        id: 3,
        name: 'Jeff Jefferson',
        age: 35,
        favoriteColor: 'blue',
      },
    ]

    this.editableTable.rows.push(...people);
  }

  deleteSelected(): void {
    this.editableTable.deleteSelected();
  }
}
