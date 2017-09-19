import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { DialogModule } from "../dialog/dialog.module";

import { QdqQueryComponent } from "./components/qdq-query/qdq-query.component";

/**
* Module responsisble for displaying designing query in playground.
*/
@NgModule({
    declarations: [
        QdqQueryComponent
    ],
    imports: [
        CommonModule,
        DialogModule,
        HttpModule
    ],
    exports: [QdqQueryComponent]
})

export class QueryModule {
}

export {
    QdqQueryComponent
}
