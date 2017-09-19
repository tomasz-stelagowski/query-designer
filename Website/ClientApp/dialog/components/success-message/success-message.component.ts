import { Component, Input, Output } from "@angular/core";
import { IMessage } from "../../message";
import { EventEmitter } from "@angular/core";

/**
 * success message component. No logic
 *
 * Files in the component:
 * success-message.component.html - describes structure of the dialog
 * success-message.component.less - styling
 */
@Component({
    selector: "success-message",
    template: require("./success-message.component.html"),
    styles: [require("./success-message.component.less")]
})
export class SuccessMessageComponent implements IMessage {
    @Input() message: string = "Operation succeeded!";

    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    private popupCancel() {
        this.cancel.next(true);
    }
}
