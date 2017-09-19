import { Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from "@angular/forms";

/*export function validateVarchar(c: FormControl){
    return (!(c.value && c.value.length < 5)) ? null : {
        jsonParseError: {
            valid: false,
        },
    }; 
}*/

@Component({
    selector: "qd-input",
    template: require("./input.component.html"),
    styles: [require("./input.component.less")],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ]
})
export class InputComponent implements ControlValueAccessor {
    @Input() placeholder: string;

    _value: any;

    change(event) {
        this.value = event;
        this.propagateChange(event);

    };

    writeValue(value: any) {
        if (value !== undefined) {
            this._value = value;
        }
    };

    get value(): any {
        return this._value;
    };

    set value(v: any) {
        if (v !== this._value) {
            this._value = v;
            this.propagateChange(v);
        }
    }

    onBlur() {
        this.onTouchedCallback();
    }

    private propagateChange: (_: any) => void;
    private onTouchedCallback: () => void;

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
}