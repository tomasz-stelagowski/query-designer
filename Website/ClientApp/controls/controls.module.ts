import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SelectComponent } from "./components/select/select.component";
import { InputComponent } from "./components/input/input.component";
import { ErrorTooltipComponent } from "./components/error-tooltip/error-tooltip.component";
import { Validators } from "./validators";

/**
 * Controls module which exposes controls so we can use it in other modules.
 */
@NgModule({
    declarations: [
        SelectComponent,
        InputComponent,
        ErrorTooltipComponent
    ],
    entryComponents: [

    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        SelectComponent,
        InputComponent,
        ErrorTooltipComponent
    ]
})
export class ControlsModule { }

export { SelectComponent, InputComponent, Validators, ErrorTooltipComponent }