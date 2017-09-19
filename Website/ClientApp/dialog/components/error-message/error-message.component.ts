import { Component, Input } from "@angular/core";
import { IMessage } from "../../message";

/**
 * error message component. No logic
 *
 * Files in the component:
 * error-message.component.html - describes structure of the dialog
 * error-message.component.less - styling
 */
@Component({
    selector: "error-message",
    template: require("./error-message.component.html"),
    styles: [require("./error-message.component.less")]
})
export class ErrorMessageComponent implements IMessage {
    @Input() message: string = "Error occured.";
}
