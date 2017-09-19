import { ViewEncapsulation, Component } from "@angular/core";

@Component({
    selector: "global-css",
    template: "",
    styles: [
        require("./variables.less"),
        require("./icons.css")
    ],
    encapsulation: ViewEncapsulation.None
})
export class GlobalCss { }