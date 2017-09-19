import { Component, Input, OnChanges } from "@angular/core";
import { ValidationErrors } from "@angular/forms";



@Component({
    selector: "error-tooltip",
    template: require("./error-tooltip.component.html"),
    styles: [require("./error-tooltip.component.less")]
})
export class ErrorTooltipComponent implements OnChanges {
    @Input() validationErrors: undefined | ValidationErrors;
    required: boolean;
    //any is correct type here as ValidationErrors type is
    // ValidationErrors: {[key: string]: any}
    errors: any[];
    errorsPresent: boolean = false;

    ngOnChanges(){
        this.errors = Object.keys(this.validationErrors || {})
                                .filter(er=>!/^required$/gi.test(er))
                                .map(key=>this.validationErrors[key]);
        this.required = !!this.validationErrors && this.validationErrors.required == true;
        this.errorsPresent = this.errors.length > 0 || this.required;
    }


    constructor(){}
}