import { Component, Input } from "@angular/core";
import { IMessage } from "../../message";

/**
 * warning message component. No logic
 *
 * Files in the component:
 * warning-message.component.html - describes structure of the dialog
 * warning-message.component.less - styling
 */
@Component({
    selector: "warning-message",
    template: require("./warning-message.component.html"),
    styles: [require("./warning-message.component.less")]
})
export class WarningMessageComponent implements IMessage {
    @Input() message: string;
}
