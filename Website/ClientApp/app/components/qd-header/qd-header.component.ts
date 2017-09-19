import { Component } from "@angular/core"
import { QdqQueryMenuCommunicationService } from "../../qd-menu-communication.service";
import { DialogService } from "../../../dialog/dialog.module";
import { Query, Table } from "../../../query/query.helpers";
import { ModelService, Model } from "../../../model/model.module";
import { ExpressionDefinitionBuilderService } from "../../../expression-tree/expression.module";
import { Deserialize } from "../../../serialize";

/**
 * Component responsible for a header, currently no logic.
 *
 * Files in the component:
 *
 * qd-header.component.html - describes structure of the header
 *
 * qd-header.component.less - describes position of components
 */
@Component({
    selector: "qd-header",
    template: require("./qd-header.component.html"),
    styles: [require("./qd-header.component.less")]
})
export class QdHeaderComponent {
    constructor(
        private qdqQueryMenuCommunicationService: QdqQueryMenuCommunicationService,
        private dialogService: DialogService,
        private modelService: ModelService,
        private expressionBuilderService: ExpressionDefinitionBuilderService) {

    }

    loadQuery() {
        this.dialogService.showInputDialog("Serialized Query", "Load Query").componentInstance.save.subscribe(
            (serializedQuery: string) => {
                let query = Deserialize(JSON.parse(serializedQuery), Query);
                query.expressionBuilderService = this.expressionBuilderService;

                this.qdqQueryMenuCommunicationService.loadQuery(query);
            });
    }
}
