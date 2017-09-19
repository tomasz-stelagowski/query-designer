import { } from "jasmine";

import { ModelService } from "./model.service";
import { ModelParserService } from "./model-parser.service";

import {TestBed, inject, async} from "@angular/core/testing";
import { HttpModule} from "@angular/http";

/**
 * 1. model service spec
 * 2. model parser service spec
 *
 */
describe("ModelService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpModule ],
            providers: [
                ModelParserService,
                ModelService
            ]
        }).compileComponents();
    });

    it("should return the same observable 2 times",
        async(inject([ModelService], (service: ModelService) => {
            let model1 = service.Model
            let model2 = service.Model

            expect(model1).toBe(model2)
                }
            )
        )
    );
});