import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { MdMenuModule } from "@angular/material";
import { Validators as qdValidators } from "../../../controls/controls.module";

@Component({
    selector: "input-dialog",
    template: require("./input-dialog.component.html"),
    styles: [require("./input-dialog.component.less")]
})
export class InputDialogComponent implements OnInit {
    @Input() placeholder: string;
    @Input() title: string;
    @Input() validationType: string[];

    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>(false);
    @Output() save: EventEmitter<string> = new EventEmitter<string>();

    constructor(private fb: FormBuilder) { }

    myForm: FormGroup;
    inputsValue;

    ngOnInit() {
        let validators = !this.validationType ? [] : this.validationType.map(
            (type: string) => qdValidators.validatorsFactory(type)
        );
        this.myForm = this.fb.group({
            input: ["", [Validators.required, ...validators]]
        });
    }


    private popupCancel() {
        this.cancel.next(true);
    }

    private popupSave() {
        if (this.myForm.valid)
            this.save.next(this.inputsValue);
    }
}