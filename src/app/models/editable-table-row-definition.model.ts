import { EditableTableCellDefinition } from "./editable-table-cell-definition.model";

export interface EditableTableRowDefinition<T> {
    cellDefinitions: EditableTableCellDefinition<T>[];
}