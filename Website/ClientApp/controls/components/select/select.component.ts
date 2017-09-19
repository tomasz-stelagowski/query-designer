import { Component, Input, forwardRef } from "@angular/core";
import { IMessage } from "../../../dialog/message";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

/**
 * Component with custom select.
 */
@Component({
    selector: "qd-select",
    template: require("./select.component.html"),
    styles: [require("./select.component.less")],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ]
})
export class SelectComponent<T extends IMessage> implements ControlValueAccessor {

    @Input() optionList: T[];
    @Input() float: boolean;
    private value: T = undefined;

    unfolded: boolean = false;

    /**
    * Function that clears select state.
    * @param none
    * @return void
    */
    public cleanSelect() {
        this.selectOption(undefined);
        this.unfolded = false;
    }

    toogleFold() {
        this.unfolded = this.unfolded !== true;
    }

    /**
    * Event handler for chosing an option in select.
    * @param value chosen in select
    * @return void
    */
    private selectOption(val: T) {
        this.value = val;
        this.toogleFold();
        this.propagateChange(val);
    }

    writeValue(val: T) {
        if (val !== undefined) {
            this.value = val;
        }
    }

    propagateChange: (_: any) => void;
    onTouched: () => void;

    registerOnChange(fn: (_: any) => void) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }
}