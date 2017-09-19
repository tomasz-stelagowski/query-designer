import { Injectable } from "@angular/core"
import { MdDialog, ComponentType } from "@angular/material";

import { IMessage } from "./message";

import { ConfirmMessageComponent } from "./components/confirm-message/confirm-message.component";
import { ErrorMessageComponent } from "./components/error-message/error-message.component";
import { SuccessMessageComponent } from "./components/success-message/success-message.component";
import { WarningMessageComponent } from "./components/warning-message/warning-message.component";

/**
 * Service allows to show a dialog popup message
 * Services are mockable because of dependency injection
 */
@Injectable()
export class MessageService {
    constructor(private dialog: MdDialog) { }

    /**
     * @param message what you want to say
     * @param component type of message you want to show
     * @returns {MdDialogRef<T>} reference to the dialog
     */
    private showMessage<T extends IMessage>(message: string, component: ComponentType<T>) {
        let dialogRef = this.dialog.open(component);

        dialogRef.componentInstance.message = message;

        return dialogRef;
    }

    /**
     * @param message what you want to say
     * @returns {MdDialogRef<WarningMessageComponent>} reference to the dialog
     */
    showWarningMessage(message: string) {
        return this.showMessage(message, WarningMessageComponent)
    }

    /**
     * @param message what you want to say
     * @returns {MdDialogRef<SuccessMessageComponent>} reference to the dialog
     */
    showSuccessMessage(message: string) {
        return this.showMessage(message, SuccessMessageComponent);
    }

    /**
     * @param message what you want to say
     * @returns {MdDialogRef<ErrorMessageComponent>} reference to the dialog
     */
    showErrorMessage(message: string) {
        return this.showMessage(message, ErrorMessageComponent);
    }

    /**
     * different because you can get "yes/cancel" information
     * @param message what you want to ask
     * @returns {MdDialogRef<ConfirmMessageComponent>} reference to the dialog
     */
    showConfirmMessage(question: string) {
        let dialogRef = this.dialog.open(ConfirmMessageComponent, {
            disableClose: true
        });

        dialogRef.componentInstance.message = question;

        return dialogRef;
    }
}
