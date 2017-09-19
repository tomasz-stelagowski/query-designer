import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { MdMenuModule } from "@angular/material";
import { Column } from "../../../query/query.helpers";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Validators as qdValidators } from "../../../controls/controls.module";
import { SqlExpressionType } from "../../../expression-tree/SqlExpressionType";
import { SqlTypeEnum } from "../../../expression-tree/SqlTypeEnum";

@Component({
    selector: "filter-dialog",
    template: require("./filter-dialog.component.html"),
    styles: [require("./filter-dialog.component.less")]
})
export class FilterDialogComponent {
    @Input() selectList: Column[];
    @Input() operationList: Operation[] = [];
    @Input() placeholder: string = "";
    @Input() title: string = "";

    selectValue: Column;
    inputsValue: string;
    operationValue: Operation;

    myForm: FormGroup;

    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>(false);
    @Output() save: EventEmitter<{
        left: Column, operation: SqlExpressionType, right: string
    }> = new EventEmitter<{ left: Column, operation: SqlExpressionType, right: string }>();

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        if (this.selectList.length == 1) {
            this.selectValue = this.selectList[0];

            this.myForm = this.formBuilder.group({
                operation: ["", Validators.required],
                input: ["", Validators.required]
            });
        } else {
            this.myForm = this.formBuilder.group({
                select: ["", Validators.required],
                operation: ["", Validators.required],
                input: ["", Validators.required]
            });
        }

        this.prepareOperationList(undefined);
    }

    private prepareOperationList(fieldType: string) {
        this.operationList = [];
        if (fieldType == undefined) {
            return;
        }
        else if (fieldType == "nvarchar") {
            this.operationList.push(new Operation("LIKE", SqlExpressionType.Like));
        } else {
            this.operationList.push(new Operation("=", SqlExpressionType.Equal));
            this.operationList.push(new Operation("<", SqlExpressionType.Smaller));
            this.operationList.push(new Operation("<=", SqlExpressionType.SmallerEqual));
            this.operationList.push(new Operation(">", SqlExpressionType.Greater));
            this.operationList.push(new Operation(">=", SqlExpressionType.GreaterEqual));
            this.operationList.push(new Operation("<>", SqlExpressionType.NotEqual));
        }
    }

    private selectValueChange() {
        if (!!this.selectValue) {
            this.myForm.controls["input"].setValidators([
                Validators.required,
                qdValidators.validateColumnType(this.selectValue.type)
            ]);

            this.myForm.controls["input"].updateValueAndValidity();
            this.prepareOperationList(this.selectValue.type);
        }
    }    

    private popupCancel() {
        this.cancel.next(true);
    }
    private popupSave() {
        if (this.myForm.valid) {
            this.save.next({
                left: this.selectValue,
                operation: this.operationValue.value,
                right: this.inputsValue
            });
        }
    }
    public input_errors(){
        let errors = this.myForm.controls.input.errors;
        return Object.keys(errors)
                           .filter(key=>!/^required$/gi.test(key))
                           .map(key=>errors[key]);
    }
}

class Operation {
    message: string;
    value: SqlExpressionType;

    constructor(message: string, value: SqlExpressionType) {
        this.message = message;
        this.value = value;
    }
}