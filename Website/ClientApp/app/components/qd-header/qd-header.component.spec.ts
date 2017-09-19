import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GlobalCssModule } from "../../../global-css/global-css.module";
import { DialogService } from "../../../dialog/dialog.service";
import { DialogModule } from "../../../dialog/dialog.module";
import { ModelModule } from "../../../model/model.module";
import { ExpressionDefinitionBuilderService } from "../../../expression-tree/expression-definition-builder.service";
import { QdHeaderComponent } from "./qd-header.component";
import { QdqQueryMenuCommunicationService } from "../../qd-menu-communication.service";

describe("headerComponent", () => {
    let component: QdHeaderComponent;
    let fixture: ComponentFixture<QdHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                GlobalCssModule,
                DialogModule,
                ModelModule
            ],
            declarations: [QdHeaderComponent],
            providers: [
                ExpressionDefinitionBuilderService,
                QdqQueryMenuCommunicationService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QdHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });


});
