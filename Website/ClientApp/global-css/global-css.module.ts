import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { GlobalCss } from "./components/global-css.component";

/**
* Module implementing global CSSes included in every page of the Application.
*/
@NgModule({
    declarations: [
        GlobalCss
    ],
    imports: [
        FormsModule,
        MaterialModule,
    ],
    exports: [
        GlobalCss
    ]
})

export class GlobalCssModule {
}
