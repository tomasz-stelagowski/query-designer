import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { IMessage } from "../../message";
import { MdMenuModule } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "select-dialog",
    template: require("./select-dialog.component.html"),
    styles: [require("./select-dialog.component.less")]
})
export class SelectDialogComponent<T extends IMessage> implements OnInit {
    @Input() title: string;
    @Input() optionList: T[];

    private _selected: T;
    myForm: FormGroup;

    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>(false);
    @Output() save: EventEmitter<T> = new EventEmitter<T>();

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.myForm = this.fb.group({
            select: ["", Validators.required]
        })
    }

    private popupCancel() {
        this.cancel.next(true);
    }

    private popupSave() {
        if (this.myForm.valid) this.save.next(this._selected);
    }
}