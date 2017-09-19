import "hammerjs";
import "reflect-metadata";
import "zone.js"

import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ServerModule } from "@angular/platform-server";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { DialogModule } from "../dialog/dialog.module";
import { QueryModule } from "../query/query.module";
import { ModelModule } from "../model/model.module";
import { GlobalCssModule } from "../global-css/global-css.module";
import { ExpressionModule } from "../expression-tree/expression.module";

import { AppRootComponent } from "./components/app-root/app-root.component";
import { QdMenuComponent } from "./components/qd-menu/qd-menu.component";
import { QdHeaderComponent } from "./components/qd-header/qd-header.component";
import { QdPlaygroundComponent } from "./components/qd-playground/qd-playground.component";
import { QdqQueryMenuCommunicationService } from "./qd-menu-communication.service";

/**
 * According to the angular conventions this is module which exposes
 * our application and manages imports.
 */
@NgModule({
    bootstrap: [AppRootComponent],
    declarations: [
        AppRootComponent,
        QdMenuComponent,
        QdHeaderComponent,
        QdPlaygroundComponent
    ],
    imports: [
        FormsModule,
        DialogModule,
        QueryModule,
        ExpressionModule,
        ModelModule,
        GlobalCssModule,
        BrowserModule,
        BrowserAnimationsModule
    ],
    providers: [
        QdqQueryMenuCommunicationService
    ]
})

export class AppModule {
}
