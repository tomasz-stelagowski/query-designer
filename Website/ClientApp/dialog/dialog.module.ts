import { NgModule } from "@angular/core";
import { MaterialModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ControlsModule } from "../controls/controls.module"

import { MessageService } from "./message.service";
import { DialogService } from "./dialog.service";

import { ConfirmMessageComponent } from "./components/confirm-message/confirm-message.component";
import { ErrorMessageComponent } from "./components/error-message/error-message.component";
import { SuccessMessageComponent } from "./components/success-message/success-message.component";
import { WarningMessageComponent } from "./components/warning-message/warning-message.component";
import { InputDialogComponent } from "./components/input-dialog/input-dialog.component";
import { SelectDialogComponent } from "./components/select-dialog/select-dialog.component";
import { JoinDialog, JoinOrderComponent, JoinParametersComponent } from "./components/join-dialog/join-dialog.component";
import { FilterDialogComponent } from "./components/filter-dialog/filter-dialog.component";
import { OrderDialogComponent } from "./components/order-dialog/order-dialog.component";

/**
 * Dialog module which exposes dialogs so we can use it in other modules.
 */
@NgModule({
    declarations: [
        ConfirmMessageComponent,
        ErrorMessageComponent,
        SuccessMessageComponent,
        WarningMessageComponent,
        InputDialogComponent,
        SelectDialogComponent,
        JoinDialog,
        FilterDialogComponent,
        OrderDialogComponent,
        JoinOrderComponent,
        JoinParametersComponent
    ],
    entryComponents: [
        ConfirmMessageComponent,
        ErrorMessageComponent,
        SuccessMessageComponent,
        WarningMessageComponent,
        InputDialogComponent,
        SelectDialogComponent,
        JoinDialog,
        FilterDialogComponent,
        OrderDialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ControlsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
    ],
    providers: [
        MessageService,
        DialogService
    ]
})
export class DialogModule {
}

export { MessageService, DialogService };
