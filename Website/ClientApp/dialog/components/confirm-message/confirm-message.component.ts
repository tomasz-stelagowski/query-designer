import { Component, Input } from "@angular/core";
import { IMessage } from "../../message";
import { MdDialogRef } from "@angular/material";

/**
 * confirm message component. No logic
 *
 * Files in the component:
 * confirm-message.component.html - describes structure of the dialog
 * confirm-message.component.less - styling
 */
@Component({
    selector: "confirm-message",
    template: require("./confirm-message.component.html"),
    styles: [require("./confirm-message.component.less")]
})
export class ConfirmMessageComponent implements IMessage {
    @Input() message: string = "Please confirm action.";

    constructor(private dialogRef: MdDialogRef<ConfirmMessageComponent>) { }
}
