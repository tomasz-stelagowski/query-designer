import { FormControl, Validators as ngValidators, AbstractControl, ValidationErrors } from "@angular/forms";

export class Validators {

    static validateColumnType(columnType: string): (c: AbstractControl) => ValidationErrors {
        switch (columnType) {
            case "int":
                return this.intColumnTypeValidator;
            case "nvarchar":
                return this.varcharColumnTypeValidator;
            case "datetime":
                return this.datetimeColumnTypeValidator;
            case "timestamp":
                return this.timestampColumnTypeValidator;
            case "smalldatetime":
                return this.datetimeColumnTypeValidator;
            case "decimal":
                return this.decimalColumnTypeValidator;
            case "money":
                return this.decimalColumnTypeValidator;
            default:
                return ngValidators.nullValidator;
        }
    }

    static validatorsFactory(type: string): (c: AbstractControl) => ValidationErrors {
        switch (type) {
            case "required":
                return ngValidators.required;
            case "maxlengthTop":
                return ngValidators.maxLength(9);
            case "number":
                return this.intColumnTypeValidator;
            case "string":
                return this.stringNameValidator;
            default:
                return ngValidators.nullValidator;
        }
    }

    static intColumnTypeValidator(c: AbstractControl): ValidationErrors {
        if (/^(?:0|-?[^0\D][\d]*)$/.test(c.value)) {
            return null;
        } else {
            return {
                intColumnType: "You must insert numeric value"
            }
        }
    }

    static varcharColumnTypeValidator(c: AbstractControl): ValidationErrors {
        if (/^[a-zA-Z0-9\%\_\[\]\^]+$/.test(c.value)) {
            return null;
        } else {
            return {
                varcharColumnType: "You must insert alphanumeric value"
            }
        }
    }

    static datetimeColumnTypeValidator(c: AbstractControl): ValidationErrors {
        let dates: string[] = c.value && c.value.match(/^([^0\D]\d{3})-(\d{2})-(\d{2})$/);
        if (!!dates) {
            let datesInts: number[] = dates.map(val => parseInt(val));
            if (datesInts[2] <= 12 && datesInts[3] <= 31) {
                return null;
            }
        }

        return {
            datetimeColumnType: "You must insert date in format yyyy-mm-dd"
        }
    }

    static decimalColumnTypeValidator(c: AbstractControl): ValidationErrors {
        if (/^(?:0|-?[^0\D]\d*)(?:|(?:\.|,)\d+)$/.test(c.value)) {
            return null;
        } else {
            return {
                decimalColumnType: "You must insert decimal value"
            }
        }
    }

    static timestampColumnTypeValidator(c: AbstractControl): ValidationErrors {
        if (/^[^0\D]\d*$/.test(c.value)) {
            return null;
        } else {
            return {
                timestampColumnType: true
            }
        }
    }

    static stringNameValidator(c: AbstractControl): ValidationErrors {
        if (/^[a-zA-Z0-9\-]+$/.test(c.value)) {
            return null;
        } else {
            return {
                nameType: "You must insert alphanumeric characters or \"-\""
            }
        }
    }
}