import { NgModule } from "@angular/core";
import { HttpModule, Http } from "@angular/http";
import { ModelParserService } from "./model-parser.service";
import { ModelService } from "./model.service";
import { Model } from "./model";
import { ModelColumn } from "./model-column";
import { ModelTable } from "./model-table";

/**
 * Module responsible for parsing and storing database model
 * based on EDMX xml schema.
 */
@NgModule({
    imports: [
        HttpModule
    ],
    providers: [
        ModelService,
        ModelParserService
    ]
})
export class ModelModule {
}

export {
    ModelService,
    Model,
    ModelColumn,
    ModelTable
};
