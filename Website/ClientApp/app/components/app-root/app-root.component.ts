import { Component } from "@angular/core"


/**
 * Main application component.
 * Contains the general UI structure.
 *
 *
 * Files in the component:
 *
 * app-root.component.html - describes structure of the whole application
 *
 * app-root.component.less - describes position of components
 */
@Component({
    selector: "app-root",
    template: require("./app-root.component.html"),
    styles: [require("./app-root.component.less")],
})

export class AppRootComponent {

}
