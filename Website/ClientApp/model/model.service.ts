import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { Model } from "./model";
import { ModelParserService } from "./model-parser.service";

const MODEL_FILE_ENDPOINT: string = "model.xml";

/**
 * Service which stores the model.
 */
@Injectable()
export class ModelService {
    private model: Model;
    private observable: Observable<Model>;

  /**
   * Serves the database model. Model is parsing only once, then service holds it for the another requests.
   * @returns {any}
   * @constructor
   */
    public get Model(): Observable<Model> {
        if (typeof this.model !== "undefined") {

            return Observable.of(this.model);
        }

        if (typeof this.observable !== "undefined") {

            return this.observable;
        }

        this.observable = this.modelParserService.parseModel(MODEL_FILE_ENDPOINT).map(model => {
            this.observable = null;
            this.model = model;

            return this.model;
        }).share();

        return this.observable;
    }

    constructor(private modelParserService: ModelParserService) {}
}
