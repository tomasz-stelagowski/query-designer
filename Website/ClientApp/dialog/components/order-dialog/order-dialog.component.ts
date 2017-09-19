import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { MdMenuModule } from "@angular/material";
import { Column, Order } from "../../../query/query.helpers";
import { OrderType } from "../../../expression-tree/OrderType";
import { IMessage } from "../../../dialog/message";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "order-dialog",
    template: require("./order-dialog.component.html"),
    styles: [require("./order-dialog.component.less")]
})
export class OrderDialogComponent {
    @Input() selectList: Column[];
    @Input() title: string = "";

    selectValue: Column;
    orderByValue: OrderTypeWrapper;
    orderByList: OrderTypeWrapper[] = [];

    myForm: FormGroup;

    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>(false);
    @Output() save: EventEmitter<Order> = new EventEmitter<Order>();

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        if (this.selectList.length == 1) {
            this.selectValue = this.selectList[0];

            this.myForm = this.formBuilder.group({
                orderBy: ["", Validators.required]
            })
        } else {
            this.myForm = this.formBuilder.group({
                select: ["", Validators.required],
                orderBy: ["", Validators.required]
            })
        }

        this.orderByList.push(new OrderTypeWrapper(OrderType.Ascending, "Ascending"));
        this.orderByList.push(new OrderTypeWrapper(OrderType.Descending, "Descending"));
    }

    private popupCancel() {
        this.cancel.next(true);
    }

    private popupSave() {
        if (this.myForm.valid) {
            this.save.next(new Order(this.selectValue, this.orderByValue.value, this.orderByValue.message));
        }
    }

    public setOrder(order: Order) {
        this.orderByValue = new OrderTypeWrapper(order.orderType, order.orderTypeName);
    }
}

interface Condition {
    left: Column,
    right: string
}

class OrderTypeWrapper implements IMessage {
    value: OrderType;
    message: string;
    constructor(val: OrderType, message: string) {
        this.value = val;
        this.message = message;
    }
}