import { ValidatorFn } from "@angular/forms";
import { CellType } from "../enums/cell-type.enum";
import { Item } from "./item.model";

export interface EditableTableCellDefinition<T> {
    type: CellType,
    property: string;
    required: boolean;
    disabled: boolean;
    minLength?: number;
    maxLength?: number;
    options?: Item<unknown>[];
    extraValidators?: ValidatorFn[];

    textFunction?: (row: T) => string; //what to display when not editing, i.e. 0.12 could go to $0.12
}
