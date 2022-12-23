import { ValidatorFn } from "@angular/forms";
import { EditableTableRowDefinition } from "./editable-table-row-definition.model";

export interface EditableTableDefinition<T> {
    headers: string[];
    rowDefinition: EditableTableRowDefinition<T>;
    multiSelect: boolean;
    extraValidators?: ValidatorFn[];
}